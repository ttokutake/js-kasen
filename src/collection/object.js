import Collection from "./index";
import { OriginIterator, Curator } from "../iterator/index";
import { FilterIterator } from "../iterator/object";
import { isNumber, isString, isArray, isFunction } from "../type";

class ObjectIterator extends OriginIterator {
  constructor(object) {
    super(object, ObjectIterator);
    this.keys = Object.keys(object);
    this.reset();
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
  static __iterator(object) {
    return new ObjectIterator(object);
  }

  tap(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.tap(func);
  }

  map(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.map(func);
  }

  static map(object, func) {
    const result = {};
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      result[key] = func(object[key], key);
    }
    return result;
  }

  mapIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return super.mapIf(bool, func);
  }

  filter(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filter(FilterIterator, func);
  }

  static filter(object, func) {
    const result = {};
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      const value = object[key];
      if (func(value, key)) {
        result[key] = value;
      }
    }
    return result;
  }

  filterIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return super.filterIf(bool, func);
  }

  filterNot(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filterNot(func);
  }

  filterNotIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filterNotIf(bool, func);
  }

  pick(keys) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    const func = (_value, key) => keys.some(k => k === key);
    return super.filter(FilterIterator, func);
  }

  static pick(object, keys) {
    const func = (_value, key) => keys.some(k => k === key);
    return this.filter(object, func);
  }

  pickIf(bool, keys) {
    if (!isArray(keys)) {
      throw new TypeError("2nd argument must be Array");
    }
    return bool ? this.pick(keys) : this;
  }

  set(key, value) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      ObjectIterator.add(object, key, value);
      return object;
    };
    return super.set(Curator, curate);
  }

  static set(object, key, value) {
    const result = this.map(object, v => v);
    ObjectIterator.add(result, key, value);
    return result;
  }

  setIf(bool, key, value) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("2nd argument must be Number or String");
    }
    return super.setIf(bool, key, value);
  }

  delete(key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      delete object[key];
      return object;
    };
    return super.delete(Curator, curate);
  }

  // TODO: deleteAll()

  // TODO?: flip()

  reduce(func, init) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.reduce(func, init);
  }

  static reduce(object, func, init) {
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
      acc = func(acc, object[key], key);
    }
    return acc;
  }

  every(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.every(func);
  }

  static every(object, func) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (!func(object[key], key)) {
        return false;
      }
    }
    return true;
  }

  find(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.find(func);
  }

  static find(object, func) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      const value = object[key];
      if (func(value, key)) {
        return value;
      }
    }
    return undefined;
  }

  forEach(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.forEach(func);
  }

  static forEach(object, func) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      func(object[key], key);
    }
    return undefined;
  }
}
