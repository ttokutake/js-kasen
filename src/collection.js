const clone = require('clone');

const {Some, None, Next, Gone, Done} = require('./state');

const Methods = {
  map: (func, some, key) => some.set(func(some.value, key)),
  filter: (func, some, key) => func(some.value, key) ? some : new None(),
  take: (func, some, key) => func(some, key),
  every: (func, some, key) => func(some.value, key) ? some : new Done(false),
  find: (func, some, key) => func(some.value, key) ? new Done(some.value) : some,
};

class Collection {
  constructor(Self, coll) {
    this.__coll = clone(coll);
    this.__depot = [];
    this.__warehouse = [];
    this.__isReverse = false;
    this.Self = Self;
  }

  static __genIterator(_coll, _isReverse) {
    throw new Error('not implemented');
  }

  static __default() {
    throw new Error('not implemented');
  }

  static __add(_coll, _key, _value) {
    throw new Error('not implemented');
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

  take(func) {
    this.__pile(['take', func]);
    return this;
  }

  reverse() {
    this.__isReverse = !this.__isReverse;
    return this;
  }

  set(func) {
    this.__collect(func);
    return this;
  }

  __consume(lazyMethod, toggleReverse) {
    const operations = this.__ship(lazyMethod);
    const isReverse = toggleReverse ? !this.__isReverse : this.__isReverse;

    let coll = this.__coll;
    for (let i = 0, operationsLen = operations.length; i < operationsLen; i++) {
      const [lazyMethods, layOut] = operations[i];
      const nextColl = this.Self.__default();
      const iter = this.Self.__genIterator(coll, isReverse);
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
          if (Done.isMine(state)) {
            return state;
          }
          if (None.isMine(state)) {
            break;
          }
        }
        if (Some.isMine(state)) {
          this.Self.__add(nextColl, key, state.value);
          if (Next.isMine(state)) {
            break;
          }
        }
        if (Gone.isMine(state)) {
          break;
        }
      }
      coll = layOut ? layOut(nextColl) : nextColl;
    }
    return coll;
  }

  toJs() {
    return this.__consume(null, false);
  }

  reduce(func, init) {
    const coll = this.__consume(null, false);
    return this.Self.reduce(coll, func, init);
  }

  every(func) {
    const result = this.__consume(['every', func], false);
    return !Done.isMine(result);
  }

  find(func) {
    const result = this.__consume(['find', func], false);
    return Done.isMine(result) ? result.value : undefined;
  }

  findLast(func) {
    const result = this.__consume(['find', func], true);
    return Done.isMine(result) ? result.value : undefined;
  }
}

module.exports = Collection;
