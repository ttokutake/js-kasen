import Collection from "./index";
import { OriginIterator, Curator } from "../iterator/index";
import { FilterIterator } from "../iterator/object";
import { isNumber, isString, isObject, isArray, isFunction } from "../type";

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
    return this.update(key, () => value);
  }

  static set(object, key, value) {
    return this.update(object, key, () => value);
  }

  setIf(bool, key, value) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("2nd argument must be Number or String");
    }
    return super.setIf(bool, key, value);
  }

  update(key, func) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      object[key] = func(object[key]);
      return object;
    };
    return super.update(Curator, curate);
  }

  static update(object, key, func) {
    const result = this.filter(object, () => true);
    result[key] = func(object[key]);
    return result;
  }

  updateIf(bool, key, func) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("2nd argument must be Number or String");
    }
    if (!isFunction(func)) {
      throw new TypeError("3rd argument must be Function");
    }
    return super.updateIf(bool, key, func);
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

  static delete(object, key) {
    const result = this.filter(object, () => true);
    delete result[key];
    return result;
  }

  deleteIf(bool, key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("2nd argument must be Number or String");
    }
    return super.deleteIf(bool, key);
  }

  // TODO: deleteAll()

  merge(...objects) {
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError("Each argument must be Object");
      }
    }
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      for (let i = 0, { length } = objects; i < length; i += 1) {
        const obj = objects[i];
        const keys = Object.keys(obj);
        for (let j = 0, len = keys.length; j < len; j += 1) {
          const key = keys[j];
          object[key] = obj[key];
        }
      }
      return object;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static merge(objects) {
    const result = {};
    for (let i = 0, { length } = objects; i < length; i += 1) {
      const obj = objects[i];
      const keys = Object.keys(obj);
      for (let j = 0, len = keys.length; j < len; j += 1) {
        const key = keys[j];
        result[key] = obj[key];
      }
    }
    return result;
  }

  mergeIf(bool, ...objects) {
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError("Each argument except 1st one must be Object");
      }
    }
    return bool ? this.merge(...objects) : this;
  }

  // TODO?: mergeBy()

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

  some(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.some(func);
  }

  static some(object, func) {
    const keys = Object.keys(object);
    for (let i = 0, { length } = keys; i < length; i += 1) {
      const key = keys[i];
      if (func(object[key], key)) {
        return true;
      }
    }
    return false;
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
