const clone = require('clone');

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

class KasenArray {
  constructor(array) {
    this.__array = clone(array);
    this.__depot = [];
    this.__warehouse = [];
    this.__isReverse = false;
  }

  __pile(methodName, ...args) {
    this.__depot.push([methodName, args]);
  }

  __collect(func) {
    this.__warehouse.push([this.__depot, func]);
    this.__depot = [];
  }

  __ship() {
    return this.__depot.length ? [...this.__warehouse, [this.__depot, null]] : this.__warehouse;
  }

  map(func) {
    this.__pile('map', func);
    return this;
  }

  reverse() {
    this.__isReverse = !this.__isReverse;
    return this;
  }

  set(index, value) {
    const func = (array) => {
      if (index > array.length) {
        throw new Error('cannot set');
      }
      const key = index < 0 ? array.length + ((index + 1) % array.length) - 1 : index;
      array[key] = value;
      return array;
    };
    this.__collect(func);
    return this;
  }

  __consume() {
    return this.__ship().reduce((nextColl, [lazyMethods, punctuator]) => {
      const coll = [];
      const iter = new Iterator(nextColl, this.__isReverse);
      let key, value;
      while (!({key, value} = iter.next()).done) {
        const finalValue = lazyMethods.reduce((nextValue, [method, args]) => {
          switch (method) {
            case 'map': {
              const [func] = args;
              return func(nextValue, key);
            }
            default: {
              throw new Error('method not found');
            }
          }
        }, value);
        coll.push(finalValue);
      }
      return punctuator ? punctuator(coll) : coll;
    }, this.__array);
  }

  toJs() {
    return this.__consume();
  }

  reduce(func, init) {
    const coll = this.__consume();
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
}

module.exports = KasenArray;
