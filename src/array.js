const clone = require('clone');

const {Some, None, Break} = require('./state');

class Iterator {
  constructor(array, isReverse) {
    this.array = array;
    this.i = isReverse ? array.length - 1 : 0;
    this.end = isReverse ? -1 : array.length;
    this.step = isReverse ? -1 : 1;
  }

  next() {
    if (this.i === this.end) {
      return {done: true};
    }
    const key = this.i;
    const value = this.array[key];
    this.i += this.step;
    return {key, value, done: false};
  }
}

const Methods = {
  map: (func, some, key) => some.set(func(some.value, key)),
  filter: (func, some, key) => func(some.value, key) ? some : new None(),
  every: (func, some, key) => func(some.value, key) ? some : new Break(false),
  find: (func, some, key) => func(some.value, key) ? new Break(some.value) : some,
};

class KasenArray {
  constructor(array) {
    this.__array = clone(array);
    this.__depot = [];
    this.__warehouse = [];
    this.__isReverse = false;
  }

  __pile(lazyMethod) {
    this.__depot.push(lazyMethod);
  }

  __collect(func) {
    this.__warehouse.push([this.__depot, func]);
    this.__depot = [];
  }

  __ship(lazyMethod) {
    const lazyMethods = lazyMethod ? [...this.__depot, lazyMethod] : this.__depot;
    return lazyMethods.length ? [...this.__warehouse, [lazyMethods, null]] : this.__warehouse;
  }

  map(func) {
    this.__pile(['map', func]);
    return this;
  }

  filter(func) {
    this.__pile(['filter', func]);
    return this;
  }

  reverse() {
    this.__isReverse = !this.__isReverse;
    return this;
  }

  set(index, value) {
    const func = (array) => {
      if (index < -array.length || array.length < index) {
        throw new Error('cannot set');
      }
      const key = index < 0 ? array.length + ((index + 1) % array.length) - 1 : index;
      array[key] = value;
      return array;
    };
    this.__collect(func);
    return this;
  }

  __consume(lazyMethod) {
    const operators = this.__ship(lazyMethod);
    let coll = this.__array;
    for (let i = 0, operatorsLen = operators.length; i < operatorsLen; i++) {
      const [lazyMethods, punctuator] = operators[i];
      const nextColl = [];
      const iter = new Iterator(coll, this.__isReverse);
      let key, value;
      while (!({key, value} = iter.next()).done) {
        let state = new Some(value);
        for (let j = 0, lazyMethodsLen = lazyMethods.length; j < lazyMethodsLen; j++) {
          const [methodName, func] = lazyMethods[j];
          const method = Methods[methodName];
          if (!method) {
            throw new Error('method not found');
          }
          state = method(func, state, key);
          if (Break.isMine(state)) {
            return state;
          }
          if (None.isMine(state)) {
            break;
          }
        }
        if (Some.isMine(state)) {
          nextColl.push(state.value);
        }
      }
      coll = punctuator ? punctuator(nextColl) : nextColl;
    }
    return coll;
  }

  toJs() {
    return this.__consume(null);
  }

  reduce(func, init) {
    const coll = this.__consume(null);
    let acc = init;
    let tail = coll;
    if (init === undefined) {
      if (coll.length === 0) {
        throw new Error('cannot reduce');
      }
      [acc, ...tail] = coll;
    }
    tail.forEach((value, index) => {
      acc = func(acc, value, index);
    });
    return acc;
  }

  every(func) {
    const result = this.__consume(['every', func]);
    return !Break.isMine(result);
  }

  find(func) {
    const result = this.__consume(['find', func]);
    return Break.isMine(result) ? result.value : undefined;
  }
}

module.exports = KasenArray;
