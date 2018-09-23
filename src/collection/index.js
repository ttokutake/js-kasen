import clone from "clone";

import { TapIterator, MapIterator, ClearCurator } from "../iterator/index";

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

  tap(func) {
    this.__pile(TapIterator, func);
    return this;
  }

  map(func) {
    this.__pile(MapIterator, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static map(_coll, _func) {
    throw new Error("not implemented");
  }

  mapIf(bool, func) {
    return bool ? this.map(func) : this;
  }

  filter(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static filter(_coll, _func) {
    throw new Error("not implemented");
  }

  filterIf(bool, func) {
    return bool ? this.filter(func) : this;
  }

  filterNot(func) {
    return this.filter((v, k) => !func(v, k));
  }

  static filterNot(coll, func) {
    return this.filter(coll, (v, k) => !func(v, k));
  }

  filterNotIf(bool, func) {
    return bool ? this.filterNot(func) : this;
  }

  set(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static set(_coll, _key, _value) {
    throw new Error("not implemented");
  }

  setIf(bool, key, value) {
    return bool ? this.set(key, value) : this;
  }

  update(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  delete(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static delete(_coll, _key) {
    throw new Error("not implemented");
  }

  deleteIf(bool, key) {
    return bool ? this.delete(key) : this;
  }

  clear() {
    this.__pile(ClearCurator, null);
    return this;
  }

  clearIf(bool) {
    return bool ? this.clear() : this;
  }

  // TODO: merge()

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

  // eslint-disable-next-line no-unused-vars
  static every(_coll, _func) {
    throw new Error("not implemented");
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

  // eslint-disable-next-line no-unused-vars
  static find(_coll, _func) {
    throw new Error("not implemented");
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

  forEach(func) {
    const finalize = iter => {
      let key;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (!({ key, value } = iter.next()).done) {
        func(value, key);
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static forEach(_coll, _func) {
    throw new Error("not implemented");
  }
}
