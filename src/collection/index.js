import clone from "clone";

import { TapIterator, MapIterator } from "../iterator/index";

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

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  mapIf(_bool, _func) {
    throw new Error("not implemented");
  }

  filter(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static filter(_coll, _func) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  filterIf(_bool, _func) {
    throw new Error("not implemented");
  }

  // TODO: filterNot()

  set(Iter, func) {
    this.__pile(Iter, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static set(_coll, _key, _value) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  setIf(_bool, _key, _value) {
    throw new Error("not implemented");
  }

  // TODO: delete()

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
