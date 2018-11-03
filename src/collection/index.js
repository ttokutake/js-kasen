import { TapIterator, MapIterator, Curator, ClearCurator } from "../iterator";
import { isNumber, isString, isObject, isArray, isFunction } from "../type";

function copy(type, coll) {
  switch (type) {
    case "array": {
      return isArray(coll) ? coll.slice() : [];
    }
    default: {
      if (!isObject(coll)) {
        return {};
      }
      const object = {};
      Object.keys(coll).forEach(key => {
        object[key] = coll[key];
      });
      return object;
    }
  }
}

export default class Collection {
  constructor(coll, iter) {
    this.__coll = this.constructor.copy(coll);
    this.__iter = iter || this.constructor.__iterator(this.__coll);

    this.map.if = (bool, func) => {
      if (!isFunction(func)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.map(func) : this;
    };

    this.pluck.if = (bool, key) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      return bool ? this.pluck(key) : this;
    };

    this.filter.if = (bool, func) => {
      if (!isFunction(func)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.filter(func) : this;
    };

    this.filterNot.if = (bool, func) => {
      if (!isFunction(func)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.filterNot(func) : this;
    };

    this.clear.if = bool => (bool ? this.clear() : this);

    this.setIn.if = (bool, keys, value) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      return bool ? this.setIn(keys, value) : this;
    };

    this.updateIn.if = (bool, keys, func) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      if (!isFunction(func)) {
        throw new TypeError("3rd argument must be Function");
      }
      return bool ? this.updateIn(keys, func) : this;
    };

    this.deleteIn.if = (bool, keys) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      return bool ? this.deleteIn(keys) : this;
    };
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

  copy() {
    return new this.constructor(this.__coll, this.__iter);
  }

  // eslint-disable-next-line no-unused-vars
  static copy(_coll) {
    throw new Error("not implemented");
  }

  tap(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    this.__pile(TapIterator, func);
    return this;
  }

  map(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    this.__pile(MapIterator, func);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static map(_coll, _func) {
    throw new Error("not implemented");
  }

  pluck(key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    return this.map(v => v[key]);
  }

  static pluck(coll, key) {
    return this.map(coll, v => v[key]);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  filter(_func) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static filter(_coll, _func) {
    throw new Error("not implemented");
  }

  filterNot(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return this.filter((v, k) => !func(v, k));
  }

  static filterNot(coll, func) {
    return this.filter(coll, (v, k) => !func(v, k));
  }

  set(key, value) {
    return this.update(key, () => value);
  }

  static set(coll, key, value) {
    return this.update(coll, key, () => value);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  update(_func) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static update(_coll, _key, _func) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  delete(_func) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static delete(_coll, _key) {
    throw new Error("not implemented");
  }

  clear() {
    this.__pile(ClearCurator, null);
    return this;
  }

  // EXPERIMENTAL
  setIn(keys, value) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    return this.updateIn(keys, () => value);
  }

  static setIn(coll, keys, value) {
    return this.updateIn(coll, keys, () => value);
  }

  // EXPERIMENTAL
  updateIn(keys, func) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    const curate = iter => {
      const coll = iter.Origin.curate(iter);
      let nextColl = coll;
      for (let i = 0, { length } = keys; i < length; i += 1) {
        const key = keys[i];
        if (i >= length - 1) {
          nextColl[key] = func(nextColl[key], key);
        } else {
          nextColl[key] = copy(
            isNumber(keys[i + 1]) ? "array" : "object",
            nextColl[key]
          );
          nextColl = nextColl[key];
        }
      }
      return coll;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static updateIn(coll, keys, func) {
    const result = this.copy(coll);
    let nextColl = result;
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (i >= length - 1) {
        nextColl[key] = func(nextColl[key], key);
      } else {
        nextColl[key] = copy(
          isNumber(keys[i + 1]) ? "array" : "object",
          nextColl[key]
        );
        nextColl = nextColl[key];
      }
    }
    return result;
  }

  // EXPERIMENTAL
  deleteIn(keys) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    const curate = iter => {
      const coll = iter.Origin.curate(iter);
      let nextColl = coll;
      for (let i = 0, { length } = keys; i < length; i += 1) {
        const key = keys[i];
        if (i >= length - 1) {
          if (isArray(nextColl)) {
            nextColl.splice(key, 1);
          } else {
            delete nextColl[key];
          }
        } else {
          nextColl[key] = copy(
            isNumber(keys[i + 1]) ? "array" : "object",
            nextColl[key]
          );
          nextColl = nextColl[key];
        }
      }
      return coll;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static deleteIn(coll, keys) {
    const result = this.copy(coll);
    let nextColl = result;
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (i >= length - 1) {
        if (isArray(nextColl)) {
          nextColl.splice(key, 1);
        } else {
          delete nextColl[key];
        }
      } else {
        nextColl[key] = copy(
          isNumber(keys[i + 1]) ? "array" : "object",
          nextColl[key]
        );
        nextColl = nextColl[key];
      }
    }
    return result;
  }

  /* consumer */

  isEmpty() {
    const finalize = iter => iter.next().done;
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static isEmpty(_coll) {
    throw new Error("not implemented");
  }

  // TODO?: isSubset()

  // TODO?: isSuperset()

  count(func) {
    if (!(isFunction(func) || func === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = func || (() => true);
    const finalize = iter => {
      let counter = 0;
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        if (fn(value, key)) {
          counter += 1;
        }
      }
      return counter;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static count(_coll, _func) {
    throw new Error("not implemented");
  }

  // TODO: get()

  // TODO: has()

  // TODO: includes()

  // TODO: getIn()

  // TODO: hasIn()

  toJs() {
    return this.__consume(null);
  }

  // TODO: toArray()

  // TODO: toObject()

  reduce(func, init) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
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

  // TODO: groupBy()

  every(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
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

  some(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return !this.every((v, k) => !func(v, k));
  }

  // eslint-disable-next-line no-unused-vars
  static some(_coll, _func) {
    throw new Error("not implemented");
  }

  find(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
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
  // TODO: sumBy()

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
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
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
