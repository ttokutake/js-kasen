import clone from "clone";

import { MapIterator } from "./iterator/index";

export default class Collection {
  constructor(coll) {
    this.__iter = this.constructor.__iterator(clone(coll));
  }

  // eslint-disable-next-line no-unused-vars
  static __iterator(_coll) {
    throw new Error("not implemented");
  }

  __pile(Iter, func) {
    this.__iter = new Iter(this.__iter, func);
  }

  __consume(finalize) {
    const result = finalize
      ? finalize(this.__iter)
      : this.__iter.Origin.curate(this.__iter);
    this.__iter.reset();
    return result;
  }

  clone() {
    return clone(this);
  }

  // TODO: tap() from Ramda

  map(func) {
    this.__pile(MapIterator, func);
    return this;
  }

  // TODO: mapIf()

  filter(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  // TODO: filterNot()

  set(Iter, func) {
    this.__pile(Iter, func);
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
    return this.constructor.reduce(coll, func, init);
  }

  // eslint-disable-next-line no-unused-vars
  static reduce(_coll, _func, _init) {
    throw new Error("not implemented");
  }

  // TODO: reduceWhile() from Elixir

  // TODO: scan() from Scala

  // TODO: sliding() from Scala

  // TODO: partition() from Scala

  // TODO: join()

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

  // TODO: findEntry()
  // TODO: findKey()
  // TODO: keyOf()

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
