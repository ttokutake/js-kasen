import Collection from ".";
import { OriginIterator, Collector } from "../iterator";
import { FilterIterator, FlipIterator } from "../iterator/object";
import { isNumber, isString, isArray, isFunction, isObject } from "../type";

class ObjectIterator extends OriginIterator {
  constructor(object) {
    super(object, ObjectIterator);
    this.keys = Object.keys(object);
    this.index = 0;
  }

  static default() {
    return {};
  }

  static add(object, key, value) {
    // eslint-disable-next-line no-param-reassign
    object[key] = value;
  }

  next() {
    if (this.index === this.keys.length) {
      return { done: true };
    }
    const key = this.keys[this.index];
    this.index += 1;
    return { done: false, key, value: this.coll[key] };
  }

  reset() {
    this.index = 0;
  }
}

export default class KasenObject extends Collection {
  constructor(object, iter) {
    super(object, iter);

    this.pick.if = (bool, keys) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      return bool ? this.pick(keys) : this;
    };

    this.flip.if = (bool, fun) => {
      if (!(isFunction(fun) || fun === undefined)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.flip(fun) : this;
    };

    this.set.if = (bool, key, value) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      return bool ? this.set(key, value) : this;
    };

    this.update.if = (bool, key, fun) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      if (!isFunction(fun)) {
        throw new TypeError("3rd argument must be Function");
      }
      return bool ? this.update(key, fun) : this;
    };

    this.delete.if = (bool, key) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      return bool ? this.delete(key) : this;
    };

    this.deleteAll.if = (bool, keys) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      return bool ? this.deleteAll(keys) : this;
    };

    this.merge.if = (bool, ...objects) => {
      for (let i = 0, { length } = objects; i < length; i += 1) {
        if (!isObject(objects[i])) {
          throw new TypeError("Each argument except 1st one must be Object");
        }
      }
      return bool ? this.merge(...objects) : this;
    };

    this.assign.if = this.merge.if;

    this.mergeWith.if = (bool, fun, ...objects) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      for (let i = 0, { length } = objects; i < length; i += 1) {
        if (!isObject(objects[i])) {
          throw new TypeError(
            "Each argument except 1st & 2nd ones must be Object"
          );
        }
      }
      return bool ? this.mergeWith(fun, ...objects) : this;
    };
  }

  static __iterator(object) {
    return new ObjectIterator(object);
  }

  static copy(object) {
    const result = {};
    this.forEach(object, (value, key) => {
      result[key] = value;
    });
    return result;
  }

  static map(object, fun) {
    const result = {};
    this.forEach(object, (value, key) => {
      result[key] = fun(value, key);
    });
    return result;
  }

  filter(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || (v => v);
    this.__pile(FilterIterator, fn);
    return this;
  }

  static filter(object, fun) {
    const result = {};
    this.forEach(object, (value, key) => {
      if (fun(value, key)) {
        result[key] = value;
      }
    });
    return result;
  }

  pick(keys) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    const fun = (_value, key) => keys.some(k => k === key);
    return this.filter(fun);
  }

  static pick(object, keys) {
    const fun = (_value, key) => keys.some(k => k === key);
    return this.filter(object, fun);
  }

  flip(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function");
    }
    const fn = fun || (v => v);
    this.__pile(FlipIterator, fn);
    return this;
  }

  static flip(object, fun) {
    const result = {};
    this.forEach(object, (value, key) => {
      result[fun(value, key)] = key;
    });
    return result;
  }

  set(key, value) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    return super.set(key, value);
  }

  update(key, fun) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    if (!isFunction(fun)) {
      throw new TypeError("2nd argument must be Function");
    }
    const collect = iter => {
      const object = ObjectIterator.collect(iter);
      object[key] = fun(object[key]);
      return object;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static update(object, key, fun) {
    const result = this.copy(object);
    result[key] = fun(object[key]);
    return result;
  }

  delete(key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    const collect = iter => {
      const object = ObjectIterator.collect(iter);
      delete object[key];
      return object;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static delete(object, key) {
    const result = this.copy(object);
    delete result[key];
    return result;
  }

  deleteAll(keys) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    const collect = iter => {
      const object = ObjectIterator.collect(iter);
      keys.forEach(key => {
        delete object[key];
      });
      return object;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static deleteAll(object, keys) {
    const result = this.copy(object);
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  }

  merge(...objects) {
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError("Each argument must be Object");
      }
    }
    const collect = iter => {
      const object = ObjectIterator.collect(iter);
      objects.forEach(obj => {
        this.constructor.forEach(obj, (value, key) => {
          object[key] = value;
        });
      });
      return object;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static merge(objects) {
    const result = {};
    objects.forEach(object => {
      this.forEach(object, (value, key) => {
        result[key] = value;
      });
    });
    return result;
  }

  assign(...objects) {
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError("Each argument must be Object");
      }
    }
    return this.merge(...objects);
  }

  mergeWith(fun, ...objects) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError("Each argument except 1st one must be Object");
      }
    }
    const collect = iter => {
      const object = ObjectIterator.collect(iter);
      objects.forEach(obj => {
        this.constructor.forEach(obj, (value, key) => {
          object[key] = Object.prototype.hasOwnProperty.call(object, key)
            ? fun(object[key], value, key)
            : value;
        });
      });
      return object;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static mergeWith(object, fun, objects) {
    const result = this.copy(object);
    objects.forEach(obj => {
      this.forEach(obj, (value, key) => {
        result[key] = Object.prototype.hasOwnProperty.call(result, key)
          ? fun(result[key], value, key)
          : value;
      });
    });
    return result;
  }

  // TODO: mergeDeep()
  // TODO: mergeDeepWith()

  /* consumer */

  static isEmpty(object) {
    return !Object.keys(object).length;
  }

  get(key, protection) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    const finalize = iter => {
      let k;
      let value;
      while (!({ key: k, value } = iter.next()).done) {
        if (k === key) {
          return value;
        }
      }
      return protection;
    };
    return this.__consume(finalize);
  }

  static get(object, key, protection) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const k = keys[i];
      if (k === key) {
        return object[key];
      }
    }
    return protection;
  }

  has(key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    return super.has(key);
  }

  static has(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  static includes(object, value) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (object[key] === value) {
        return true;
      }
    }
    return false;
  }

  static toArray(object) {
    const array = [];
    this.forEach(object, value => {
      array.push(value);
    });
    return array;
  }

  static reduce(object, fun, init) {
    const keys = Object.keys(object);
    let acc = init;
    if (init === undefined) {
      if (!keys.length) {
        throw new TypeError("Reduce of empty object with no initial value");
      }
      acc = object[keys.pop()];
    }
    keys.forEach(key => {
      acc = fun(acc, object[key], key);
    });
    return acc;
  }

  static reduceWhile(object, fun, init) {
    const keys = Object.keys(object);
    let acc = init;
    if (init === undefined) {
      if (!keys.length) {
        throw new TypeError("Reduce of empty object with no initial value");
      }
      acc = object[keys.pop()];
    }
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      const [state, result] = fun(acc, object[key], key);
      if (state === "halt") {
        return result;
      }
      acc = result;
    }
    return acc;
  }

  static scan(object, fun, init) {
    const keys = Object.keys(object);
    let acc = init;
    if (init === undefined) {
      if (!keys.length) {
        throw new TypeError("Scan of empty object with no initial value");
      }
      acc = object[keys.pop()];
    }
    const result = [acc];
    keys.forEach(key => {
      acc = fun(acc, object[key], key);
      result.push(acc);
    });
    return result;
  }

  static partition(object, fun) {
    const result = [{}, {}];
    this.forEach(object, (value, key) => {
      const index = fun(value, key) ? 0 : 1;
      result[index][key] = value;
    });
    return result;
  }

  static join(object, delimiter) {
    const delim = delimiter || ",";
    let result = "";
    let isFirst = true;
    this.forEach(object, value => {
      if (isFirst) {
        isFirst = false;
        result += value;
      } else {
        result = `${result}${delim}${value}`;
      }
    });
    return result;
  }

  static every(object, fun) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (!fun(object[key], key)) {
        return false;
      }
    }
    return true;
  }

  static some(object, fun) {
    return !this.every(object, (v, k) => !fun(v, k));
  }

  static findEntry(object, fun) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      const value = object[key];
      if (fun(value, key)) {
        return [key, value];
      }
    }
    return undefined;
  }

  static keyOf(object, value) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (object[key] === value) {
        return key;
      }
    }
    return undefined;
  }

  static max(object, fun) {
    const keys = Object.keys(object);
    if (!keys.length) {
      return undefined;
    }
    let result = object[keys.pop()];
    keys.forEach(key => {
      const value = object[key];
      if (fun(value, result)) {
        result = value;
      }
    });
    return result;
  }

  equals(object) {
    if (!isObject(object)) {
      return false;
    }
    const finalize = iter => {
      let key;
      let value;
      let count = 0;
      while (!({ key, value } = iter.next()).done) {
        if (!Object.prototype.hasOwnProperty.call(object, key)) {
          return false;
        }
        if (value !== object[key]) {
          return false;
        }
        count += 1;
      }
      return count === Object.keys(object).length;
    };
    return this.__consume(finalize);
  }

  static equals(object, value) {
    if (!isObject(value)) {
      return false;
    }
    const keys = Object.keys(object);
    const { length } = keys;
    for (let i = 0; i < length; i += 1) {
      const key = keys[i];
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        return false;
      }
      if (object[key] !== value[key]) {
        return false;
      }
    }
    return length === Object.keys(value).length;
  }

  static keys(object) {
    return Object.keys(object);
  }

  static values(object) {
    const result = [];
    this.forEach(object, value => {
      result.push(value);
    });
    return result;
  }

  static entries(object) {
    const result = [];
    this.forEach(object, (value, key) => {
      result.push([key, value]);
    });
    return result;
  }

  static forEach(object, fun) {
    Object.keys(object).forEach(key => {
      fun(object[key], key);
    });
    return undefined;
  }
}
