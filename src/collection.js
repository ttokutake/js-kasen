import clone from "clone";

import { MapIterator } from "./iterator";

export default class Collection {
  constructor(Self, coll) {
    this.__coll = clone(coll);
    this.__depot = [];
    this.__warehouse = [];
    this.Self = Self;
  }

  // static __iterator(_coll) {
  //   throw new Error("not implemented");
  // }

  // static __default() {
  //   throw new Error("not implemented");
  // }

  // static __add(_coll, _key, _value) {
  //   throw new Error("not implemented");
  // }

  __pile(lazyMethod) {
    this.__depot.push(lazyMethod);
  }

  __collect(curate) {
    this.__warehouse.push([this.__depot, curate]);
    this.__depot = [];
  }

  __ship(finalize) {
    return this.__depot.length || finalize
      ? [...this.__warehouse, [this.__depot, finalize]]
      : this.__warehouse;
  }

  __curate(iter) {
    const coll = this.Self.__default();
    let key;
    let value;
    // eslint-disable-next-line no-cond-assign
    while (!({ key, value } = iter.next()).done) {
      this.Self.__add(coll, key, value);
    }
    return coll;
  }

  __consume(finalize) {
    const operations = this.__ship(finalize);
    let result = this.__coll;
    for (let i = 0; i < operations.length; i += 1) {
      const [lazyMethods, curate] = operations[i];
      let iter = this.Self.__iterator(result);
      lazyMethods.forEach(([Iter, func]) => {
        iter = new Iter(iter, func);
      });
      result = curate ? curate(iter) : this.__curate(iter);
    }
    return result;
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

  filter(Iter, func) {
    this.__pile([Iter, func]);
    return this;
  }

  // TODO: filterNot()

  // TODO: take() for Object

  set(curate) {
    this.__collect(curate);
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

  /* consumer */

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

  every(func) {
    const finalize = iter => {
      let key;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (!({ key, value } = iter.next()).done) {
        if (!func(value, key)) {
          return false;
        }
      }
      return true;
    };
    return this.__consume(finalize);
  }

  // TODO: some()

  find(func) {
    const finalize = iter => {
      let key;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (!({ key, value } = iter.next()).done) {
        if (func(value, key)) {
          return value;
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

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
