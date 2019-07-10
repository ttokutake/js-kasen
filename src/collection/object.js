import Collection from ".";
import {
  EACH_ARGUMENT_MUST_BE_OBJECT,
  EACH_ARGUMENT_EXCEPT_FIRST_ONE_MUST_BE_OBJECT,
  FIRST_ARGUMENT_MUST_BE_ARRAY,
  FIRST_ARGUMENT_MUST_BE_FUNCTION,
  FIRST_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED,
  FIRST_ARGUMENT_MUST_BE_NUMBER_OR_STRING,
  REDUCE_OF_EMPTY_OBJECT_WITH_NO_INITIAL_VALUE,
  SCAN_OF_EMPTY_OBJECT_WITH_NO_INITIAL_VALUE
} from "../error-message";
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

function mergeDeepWithCore(fun, object, key, right) {
  if (!Object.prototype.hasOwnProperty.call(object, key)) {
    return right;
  }
  const left = object[key];
  if (isObject(left) && isObject(right)) {
    const obj = {};
    Object.keys(left).forEach(k => {
      obj[k] = left[k];
    });
    Object.keys(right).forEach(k => {
      obj[k] = mergeDeepWithCore(fun, obj, k, right[k]);
    });
    return obj;
  }
  return fun(left, right);
}

export default class KasenObject extends Collection {
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
    }
    return super.set(key, value);
  }

  update(key, fun) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
    }
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
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
        throw new TypeError(EACH_ARGUMENT_MUST_BE_OBJECT);
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
        throw new TypeError(EACH_ARGUMENT_MUST_BE_OBJECT);
      }
    }
    return this.merge(...objects);
  }

  mergeWith(fun, ...objects) {
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
    }
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError(EACH_ARGUMENT_EXCEPT_FIRST_ONE_MUST_BE_OBJECT);
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

  mergeDeep(...objects) {
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError(EACH_ARGUMENT_MUST_BE_OBJECT);
      }
    }
    return this.mergeDeepWith((left, right) => right, ...objects);
  }

  static mergeDeep(objects) {
    if (!Object.keys(objects).length) {
      return {};
    }
    const [object, ...objs] = objects;
    return this.mergeDeepWith(object, (left, right) => right, objs);
  }

  mergeDeepWith(fun, ...objects) {
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
    }
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError(EACH_ARGUMENT_EXCEPT_FIRST_ONE_MUST_BE_OBJECT);
      }
    }
    const collect = iter => {
      const object = ObjectIterator.collect(iter);
      objects.forEach(obj => {
        this.constructor.forEach(obj, (value, key) => {
          object[key] = mergeDeepWithCore(fun, object, key, value);
        });
      });
      return object;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static mergeDeepWith(object, fun, objects) {
    const result = this.copy(object);
    objects.forEach(obj => {
      this.forEach(obj, (value, key) => {
        result[key] = mergeDeepWithCore(fun, result, key, value);
      });
    });
    return result;
  }

  /* consumer */

  static isEmpty(object) {
    return !Object.keys(object).length;
  }

  get(key, defaultValue) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
    }
    const finalize = iter => {
      let k;
      let value;
      while (!({ key: k, value } = iter.next()).done) {
        if (k === key) {
          return value;
        }
      }
      return defaultValue;
    };
    return this.__consume(finalize);
  }

  static get(object, key, defaultValue) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const k = keys[i];
      if (k === key) {
        return object[key];
      }
    }
    return defaultValue;
  }

  has(key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
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
        throw new TypeError(REDUCE_OF_EMPTY_OBJECT_WITH_NO_INITIAL_VALUE);
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
        throw new TypeError(REDUCE_OF_EMPTY_OBJECT_WITH_NO_INITIAL_VALUE);
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
        throw new TypeError(SCAN_OF_EMPTY_OBJECT_WITH_NO_INITIAL_VALUE);
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
