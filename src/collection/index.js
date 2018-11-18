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
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
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
  updateIn(keys, fun) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    if (!isFunction(fun)) {
      throw new TypeError("2nd argument must be Function");
    }
    const curate = iter => {
      const coll = iter.Origin.curate(iter);
      let nextColl = coll;
      for (let i = 0, { length } = keys; i < length; i += 1) {
        const key = keys[i];
        if (i >= length - 1) {
          nextColl[key] = fun(nextColl[key], key);
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

  static updateIn(coll, keys, fun) {
    const result = this.copy(coll);
    let nextColl = result;
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (i >= length - 1) {
        nextColl[key] = fun(nextColl[key], key);
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

  // TODO: Use SameValueZero algorithm
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

  // eslint-disable-next-line no-unused-vars
  static toObject(_coll) {
    throw new Error("not implemented");
  }

  reduce(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const coll = this.__consume(null);
    return this.constructor.reduce(coll, fun, init);
  }

  // eslint-disable-next-line no-unused-vars
  static reduce(_coll, _fun, _init) {
    throw new Error("not implemented");
  }

  reduceWhile(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const coll = this.__consume(null);
    return this.constructor.reduceWhile(coll, fun, init);
  }

  // eslint-disable-next-line no-unused-vars
  static reduceWhile(_coll, _fun, _init) {
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

  // eslint-disable-next-line no-unused-vars
  static groupBy(_coll, _fun) {
    throw new Error("not implemented");
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

  // eslint-disable-next-line no-unused-vars
  static sum(_coll, _fun) {
    throw new Error("not implemented");
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

  // TODO: equals()

  // TODO: hashCode()

  // TODO: keys()

  // TODO: values()

  // TODO: entries()

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
