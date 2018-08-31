import clone from "clone";

import { Some, None, Next, Gone, Done } from "./state";

const Methods = {
  map: (func, some, key) => some.set(func(some.value, key)),
  filter: (func, some, key) => (func(some.value, key) ? some : new None()),
  take: (func, some, key) => func(some, key),
  every: (func, some, key) => (func(some.value, key) ? some : new Done(false)),
  find: (func, some, key) =>
    func(some.value, key) ? new Done(some.value) : some
};

export default class Collection {
  constructor(Self, coll) {
    this.__coll = clone(coll);
    this.__depot = [];
    this.__warehouse = [];
    this.__isReverse = false;
    this.Self = Self;
  }

  // static __genIterator(_coll, _isReverse) {
  //   throw new Error('not implemented');
  // }

  // static __default() {
  //   throw new Error('not implemented');
  // }

  // static __add(_coll, _key, _value) {
  //   throw new Error('not implemented');
  // }

  __pile(lazyMethod) {
    this.__depot.push(lazyMethod);
  }

  __collect(func) {
    this.__warehouse.push([this.__depot, func]);
    this.__depot = [];
  }

  __ship(lazyMethod) {
    const lazyMethods = lazyMethod
      ? [...this.__depot, lazyMethod]
      : this.__depot;
    return lazyMethods.length
      ? [...this.__warehouse, [lazyMethods, null]]
      : this.__warehouse;
  }

  clone() {
    return clone(this);
  }

  // TODO: tap() from Ramda

  map(func) {
    this.__pile(["map", func]);
    return this;
  }

  // TODO: mapIf()

  // TODO: flatten()

  // TODO: flatMap()

  filter(func) {
    this.__pile(["filter", func]);
    return this;
  }

  // TODO: filterNot()

  take(func) {
    this.__pile(["take", func]);
    return this;
  }

  reverse() {
    this.__isReverse = !this.__isReverse;
    this.__pile(["map", v => v]); // TODO: Consider more efficient way
    return this;
  }

  set(func) {
    this.__collect(func);
    return this;
  }

  // TODO: setAll()

  // TODO: delete()

  // TODO: deleteAll()

  // TODO: clear()

  // TODO: update()

  // TODO: setIn()

  // TODO: deleteIn()

  // TODO: updateIn()

  // TODO: mergeIn()

  // TODO: mergeDeepIn()

  // TODO: groupBy()

  __consume(lazyMethod, toggleReverse) {
    const operations = this.__ship(lazyMethod);
    const isReverse = toggleReverse ? !this.__isReverse : this.__isReverse;

    let coll = this.__coll;
    for (
      let i = 0, operationsLen = operations.length;
      i < operationsLen;
      i += 1
    ) {
      const [lazyMethods, layOut] = operations[i];
      const nextColl = this.Self.__default();
      const iter = this.Self.__genIterator(coll, isReverse);
      let key;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (!({ key, value } = iter.next()).done) {
        let state = new Some(value);
        for (
          let j = 0, lazyMethodsLen = lazyMethods.length;
          j < lazyMethodsLen;
          j += 1
        ) {
          const [methodName, func] = lazyMethods[j];
          const method = Methods[methodName];
          if (!method) {
            throw new Error("method not found"); // TODO: Create CannotHappenError
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

  // TODO: isEmpty()

  // TODO: isSubset()

  // TODO: isSuperset()

  // TODO: count()

  // TODO: countBy()

  // TODO: get()

  // TODO: has()

  // TODO: includes()

  // TODO: getIn()

  // TODO: hasIn()

  // TODO: pluck() from Lodash

  toJs() {
    return this.__consume(null, false);
  }

  // TODO: toArray()

  // TODO: toObject()

  reduce(func, init) {
    const coll = this.__consume(null, false);
    return this.Self.reduce(coll, func, init);
  }

  // static reduce(_coll, _func, _init) {
  //   throw new Error('not implemented');
  // }

  // TODO: partition() from Scala

  every(func) {
    const result = this.__consume(["every", func], false);
    return !Done.isMine(result);
  }

  // TODO: some()

  find(func) {
    const result = this.__consume(["find", func], false);
    return Done.isMine(result) ? result.value : undefined;
  }

  findLast(func) {
    const result = this.__consume(["find", func], true);
    return Done.isMine(result) ? result.value : undefined;
  }

  // TODO: findEntry()

  // TODO: findLastEntry()

  // TODO: findKey()

  // TODO: findLastKey()

  // TODO: keyOf()

  // TODO: lastKeyOf()

  // TODO: sum() from Ramda

  // TODO: max()

  // TODO: maxBy()

  // TODO: min()

  // TODO: minBy()

  // TODO: equals()

  // TODO: hashCode()

  // TODO: keys()

  // TODO: values()

  // TODO: entries()

  // TODO: forEach()
}
