import hash from "hash-sum";

import {
  TapIterator,
  MapIterator,
  Collector,
  ClearCollector
} from "../iterator";
import { isNumber, isString, isArray, isFunction, isObject } from "../type";
import { copy } from "../util";

function updateInCore(coll, keys, fun) {
  let nextColl = coll;
  for (let i = 0, { length } = keys; i < length; i += 1) {
    let key = keys[i];
    let init;
    if (isArray(key)) {
      [key, init] = key;
    }
    const value = nextColl[key];
    if (i >= length - 1) {
      nextColl[key] = fun(value === undefined ? copy(init) : value, key);
    } else {
      nextColl[key] = copy(value === undefined ? init : value);
      nextColl = nextColl[key];
    }
  }
  return coll;
}

function deleteInCore(coll, keys) {
  let nextColl = coll;
  for (let i = 0, { length } = keys; i < length; i += 1) {
    const key = keys[i];
    if (i >= length - 1) {
      if (isArray(nextColl)) {
        nextColl.splice(key, 1);
      } else if (isObject(nextColl)) {
        delete nextColl[key];
      }
    } else {
      const value = nextColl[key];
      if (!(isArray(value) || isObject(value))) {
        break;
      }
      nextColl[key] = copy(value);
      nextColl = nextColl[key];
    }
  }
  return coll;
}

export default class Collection {
  constructor(coll, iter) {
    this.__iter = iter || this.constructor.__iterator(coll);

    this.map.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.map(fun) : this;
    };

    this.pluck.if = (bool, key) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      return bool ? this.pluck(key) : this;
    };

    this.filter.if = (bool, fun) => {
      if (!(isFunction(fun) || fun === undefined)) {
        throw new TypeError("2nd argument must be Function or Undefined");
      }
      return bool ? this.filter(fun) : this;
    };

    this.filterNot.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.filterNot(fun) : this;
    };

    this.clear.if = bool => (bool ? this.clear() : this);

    this.setIn.if = (bool, keys, value) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      return bool ? this.setIn(keys, value) : this;
    };

    this.updateIn.if = (bool, keys, fun) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      if (!isFunction(fun)) {
        throw new TypeError("3rd argument must be Function");
      }
      return bool ? this.updateIn(keys, fun) : this;
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

  __pile(Iter, fun) {
    this.__iter = new Iter(this.__iter, fun);
  }

  __consume(finalize) {
    const result = finalize
      ? finalize(this.__iter)
      : this.__iter.Origin.collect(this.__iter);
    this.__iter.reset();
    return result;
  }

  // TODO: Rethink the definition
  copy() {
    return new this.constructor(null, this.__iter);
  }

  // eslint-disable-next-line no-unused-vars
  static copy(_coll) {
    throw new Error("not implemented");
  }

  tap(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    this.__pile(TapIterator, fun);
    return this;
  }

  map(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    this.__pile(MapIterator, fun);
    return this;
  }

  // eslint-disable-next-line no-unused-vars
  static map(_coll, _fun) {
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
  filter(_fun) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static filter(_coll, _fun) {
    throw new Error("not implemented");
  }

  filterNot(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    return this.filter((v, k) => !fun(v, k));
  }

  static filterNot(coll, fun) {
    return this.filter(coll, (v, k) => !fun(v, k));
  }

  set(key, value) {
    return this.update(key, () => value);
  }

  static set(coll, key, value) {
    return this.update(coll, key, () => value);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  update(_fun) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static update(_coll, _key, _fun) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  delete(_fun) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static delete(_coll, _key) {
    throw new Error("not implemented");
  }

  clear() {
    this.__pile(ClearCollector, null);
    return this;
  }

  setIn(keys, value) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    return this.updateIn(keys, () => value);
  }

  static setIn(coll, keys, value) {
    return this.updateIn(coll, keys, () => value);
  }

  updateIn(keys, fun) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    if (!isFunction(fun)) {
      throw new TypeError("2nd argument must be Function");
    }
    const collect = iter => {
      const coll = iter.Origin.collect(iter);
      return updateInCore(coll, keys, fun);
    };
    this.__pile(Collector, collect);
    return this;
  }

  static updateIn(coll, keys, fun) {
    return updateInCore(this.copy(coll), keys, fun);
  }

  deleteIn(keys) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    const collect = iter => {
      const coll = iter.Origin.collect(iter);
      return deleteInCore(coll, keys);
    };
    this.__pile(Collector, collect);
    return this;
  }

  static deleteIn(coll, keys) {
    return deleteInCore(this.copy(coll), keys);
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

  count(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || (() => true);
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

  static count(coll, fun) {
    const fn = fun || (() => true);
    let counter = 0;
    this.forEach(coll, (value, key) => {
      if (fn(value, key)) {
        counter += 1;
      }
    });
    return counter;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  get(_key, _protection) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static get(_coll, _key, _protection) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  has(key) {
    const finalize = iter => {
      let k;
      while (!({ key: k } = iter.next()).done) {
        if (k === key) {
          return true;
        }
      }
      return false;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static has(_coll, _key) {
    throw new Error("not implemented");
  }

  // TODO?: Use SameValueZero algorithm
  includes(value) {
    const finalize = iter => {
      let v;
      while (!({ value: v } = iter.next()).done) {
        if (v === value) {
          return true;
        }
      }
      return false;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static includes(_coll, _value) {
    throw new Error("not implemented");
  }

  // TODO: getIn()

  // TODO: hasIn()

  toJs() {
    return this.__consume(null);
  }

  toArray() {
    const finalize = iter => {
      const array = [];
      let value;
      while (!({ value } = iter.next()).done) {
        array.push(value);
      }
      return array;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static toArray(_coll) {
    throw new Error("not implemented");
  }

  toObject() {
    const finalize = iter => {
      const object = {};
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        object[key] = value;
      }
      return object;
    };
    return this.__consume(finalize);
  }

  static toObject(coll) {
    const object = {};
    this.forEach(coll, (value, key) => {
      object[key] = value;
    });
    return object;
  }

  reduce(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let acc = init;
      let key;
      let value;
      let isFirst = true;
      while (!({ key, value } = iter.next()).done) {
        if (isFirst) {
          isFirst = false;
          if (init === undefined) {
            acc = value;
          } else {
            acc = fun(init, value, key);
          }
        } else {
          acc = fun(acc, value, key);
        }
      }
      if (isFirst && init === undefined) {
        throw new TypeError("Reduce of empty collection with no initial value");
      }
      return acc;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static reduce(_coll, _fun, _init) {
    throw new Error("not implemented");
  }

  reduceWhile(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let acc = init;
      let key;
      let value;
      let isFirst = true;
      let state;
      while (!({ key, value } = iter.next()).done) {
        if (isFirst) {
          isFirst = false;
          if (init === undefined) {
            state = "cont";
            acc = value;
          } else {
            [state, acc] = fun(init, value, key);
          }
        } else {
          [state, acc] = fun(acc, value, key);
        }
        if (state === "halt") {
          return acc;
        }
      }
      if (isFirst && init === undefined) {
        throw new TypeError("Reduce of empty collection with no initial value");
      }
      return acc;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static reduceWhile(_coll, _fun, _init) {
    throw new Error("not implemented");
  }

  scan(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      const result = init === undefined ? [] : [init];
      let acc;
      let key;
      let value;
      let isFirst = true;
      while (!({ key, value } = iter.next()).done) {
        if (isFirst) {
          isFirst = false;
          if (init === undefined) {
            acc = value;
          } else {
            acc = fun(init, value, key);
          }
        } else {
          acc = fun(acc, value, key);
        }
        result.push(acc);
      }
      if (isFirst && init === undefined) {
        throw new TypeError("Scan of empty collection with no initial value");
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static scan(_coll, _fun, _init) {
    throw new Error("not implemented");
  }

  partition(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      const result = [iter.Origin.default(), iter.Origin.default()];
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        const index = fun(value, key) ? 0 : 1;
        iter.Origin.add(result[index], key, value);
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static partition(_coll, _fun) {
    throw new Error("not implemented");
  }

  join(delimiter) {
    if (!(isString(delimiter) || delimiter === undefined)) {
      throw new TypeError("1st argument must be String or Undefined");
    }
    const delim = delimiter || ",";
    const finalize = iter => {
      let result = "";
      let value;
      let isFirst = true;
      while (!({ value } = iter.next()).done) {
        if (isFirst) {
          isFirst = false;
          result += value;
        } else {
          result = `${result}${delim}${value}`;
        }
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static join(_coll, _delimiter) {
    throw new Error("not implemented");
  }

  // TDOO: Need version to return KasenObject?
  groupBy(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      const object = {};
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        const k = fun(value, key);
        if (!Object.prototype.hasOwnProperty.call(object, k)) {
          object[k] = [];
        }
        object[k].push(value);
      }
      return object;
    };
    return this.__consume(finalize);
  }

  static groupBy(coll, fun) {
    const result = {};
    this.forEach(coll, (value, key) => {
      const k = fun(value, key);
      if (!Object.prototype.hasOwnProperty.call(result, k)) {
        result[k] = [];
      }
      result[k].push(value);
    });
    return result;
  }

  every(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        if (!fun(value, key)) {
          return false;
        }
      }
      return true;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static every(_coll, _fun) {
    throw new Error("not implemented");
  }

  some(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    return !this.every((v, k) => !fun(v, k));
  }

  // eslint-disable-next-line no-unused-vars
  static some(_coll, _fun) {
    throw new Error("not implemented");
  }

  find(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const result = this.findEntry(fun);
    return result ? result[1] : result;
  }

  // eslint-disable-next-line no-unused-vars
  static find(coll, fun) {
    const result = this.findEntry(coll, fun);
    return result ? result[1] : result;
  }

  findEntry(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        if (fun(value, key)) {
          return [key, value];
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static findEntry(_coll, _fun) {
    throw new Error("not implemented");
  }

  findKey(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const result = this.findEntry(fun);
    return result ? result[0] : result;
  }

  static findKey(coll, fun) {
    const result = this.findEntry(coll, fun);
    return result ? result[0] : result;
  }

  keyOf(value) {
    const finalize = iter => {
      let key;
      let v;
      while (!({ key, value: v } = iter.next()).done) {
        if (v === value) {
          return key;
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static keyOf(_coll, _value) {
    throw new Error("not implemented");
  }

  sum(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || (v => v);
    const finalize = iter => {
      let result = 0;
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        result += fn(value, key);
      }
      return result;
    };
    return this.__consume(finalize);
  }

  static sum(coll, fun) {
    let result = 0;
    this.forEach(coll, (value, key) => {
      result += fun(value, key);
    });
    return result;
  }

  max(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || ((v1, v2) => v1 > v2);
    const finalize = iter => {
      let result;
      let value;
      let isFirst = true;
      while (!({ value } = iter.next()).done) {
        if (isFirst) {
          isFirst = false;
          result = value;
        } else if (fn(value, result)) {
          result = value;
        }
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // TODO?: maxBy()

  // eslint-disable-next-line no-unused-vars
  static max(_coll, _fun) {
    throw new Error("not implemented");
  }

  min(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || ((v1, v2) => v1 < v2);
    return this.max(fn);
  }

  // TODO?: minBy()

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  equals(_value) {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static equals(_coll, _value) {
    throw new Error("not implemented");
  }

  hashCode() {
    const coll = this.__consume(null);
    return hash(coll);
  }

  keys() {
    const finalize = iter => {
      const result = [];
      let key;
      while (!({ key } = iter.next()).done) {
        result.push(key);
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static keys(_coll) {
    throw new Error("not implemented");
  }

  values() {
    const finalize = iter => {
      const result = [];
      let value;
      while (!({ value } = iter.next()).done) {
        result.push(value);
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static values(_coll) {
    throw new Error("not implemented");
  }

  entries() {
    const finalize = iter => {
      const result = [];
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        result.push([key, value]);
      }
      return result;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static entries(_coll) {
    throw new Error("not implemented");
  }

  forEach(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        fun(value, key);
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  // eslint-disable-next-line no-unused-vars
  static forEach(_coll, _fun) {
    throw new Error("not implemented");
  }
}
