import clone from "clone";

import { MapIterator, ReverseIterator } from "./iterator";

export default class Collection {
  constructor(Self, coll) {
    this.__coll = clone(coll);
    this.__depot = [];
    this.__warehouse = [];
    this.Self = Self;
  }

  // static __genIterator(_coll) {
  //   throw new Error("not implemented");
  // }

  // static __default() {
  //   throw new Error("not implemented");
  // }

  // static __add(_coll, _key, _value) {
  //   throw new Error(:not implemented");
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
    this.__pile([MapIterator, func]);
    return this;
  }

  // TODO: mapIf()

  // TODO: flatten()

  // TODO: flatMap()

  // filter(func) {
  //   this.__pile(["filter", func]);
  //   return this;
  // }

  // TODO: filterNot()

  // take(func) {
  //   this.__pile(["take", func]);
  //   return this;
  // }

  reverse() {
    this.__pile([ReverseIterator, null]);
    return this;
  }

  // set(func) {
  //   this.__collect(func);
  //   return this;
  // }

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

  __consume(lazyMethod) {
    const operations = this.__ship(lazyMethod);

    let coll = this.__coll;
    for (
      let i = 0, operationsLen = operations.length;
      i < operationsLen;
      i += 1
    ) {
      const [lazyMethods, layOut] = operations[i];
      const nextColl = this.Self.__default();
      let iter = this.Self.__genIterator(coll);
      lazyMethods.forEach(([Iter, func]) => {
        iter = new Iter(iter, func);
      });
      let key;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (!({ key, value } = iter.next()).done) {
        this.Self.__add(nextColl, key, value);
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
    return this.__consume(null);
  }

  // TODO: toArray()

  // TODO: toObject()

  reduce(func, init) {
    const coll = this.__consume(null);
    return this.Self.reduce(coll, func, init);
  }

  // static reduce(_coll, _func, _init) {
  //   throw new Error('not implemented');
  // }

  // TODO: partition() from Scala

  // every(func) {
  //   const result = this.__consume(["every", func]);
  //   return !Done.isMine(result);
  // }

  // TODO: some()

  // find(func) {
  //   const result = this.__consume(["find", func]);
  //   return Done.isMine(result) ? result.value : undefined;
  // }

  // findLast(func) {
  //   const result = this.__consume(["find", func]);
  //   return Done.isMine(result) ? result.value : undefined;
  // }

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
