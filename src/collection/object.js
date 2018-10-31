import Collection from ".";
import { OriginIterator, Curator } from "../iterator";
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
  constructor(object, iter) {
    super(object, iter);

    this.pick.if = (bool, keys) => {
      if (!isArray(keys)) {
        throw new TypeError("2nd argument must be Array");
      }
      return bool ? this.pick(keys) : this;
    };

    this.set.if = (bool, key, value) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      return bool ? this.set(key, value) : this;
    };

    this.update.if = (bool, key, func) => {
      if (!(isNumber(key) || isString(key))) {
        throw new TypeError("2nd argument must be Number or String");
      }
      if (!isFunction(func)) {
        throw new TypeError("3rd argument must be Function");
      }
      return bool ? this.update(key, func) : this;
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

    this.mergeWith.if = (bool, func, ...objects) => {
      if (!isFunction(func)) {
        throw new TypeError("2nd argument must be Function");
      }
      for (let i = 0, { length } = objects; i < length; i += 1) {
        if (!isObject(objects[i])) {
          throw new TypeError(
            "Each argument except 1st & 2nd one must be Object"
          );
        }
      }
      return bool ? this.mergeWith(func, ...objects) : this;
    };
  }

  static __iterator(object) {
    return new ObjectIterator(object);
  }

  static copy(object) {
    const result = {};
    Object.keys(object).forEach(key => {
      result[key] = object[key];
    });
    return result;
  }

  static map(object, func) {
    const result = {};
    Object.keys(object).forEach(key => {
      result[key] = func(object[key], key);
    });
    return result;
  }

  filter(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    this.__pile(FilterIterator, func);
    return this;
  }

  static filter(object, func) {
    const result = {};
    Object.keys(object).forEach(key => {
      const value = object[key];
      if (func(value, key)) {
        result[key] = value;
      }
    });
    return result;
  }

  pick(keys) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    const func = (_value, key) => keys.some(k => k === key);
    return this.filter(func);
  }

  static pick(object, keys) {
    const func = (_value, key) => keys.some(k => k === key);
    return this.filter(object, func);
  }

  set(key, value) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    return super.set(key, value);
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
    this.__pile(Curator, curate);
    return this;
  }

  static update(object, key, func) {
    const result = this.copy(object);
    result[key] = func(object[key]);
    return result;
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
    this.__pile(Curator, curate);
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
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      keys.forEach(key => {
        delete object[key];
      });
      return object;
    };
    this.__pile(Curator, curate);
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
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      objects.forEach(obj => {
        Object.keys(obj).forEach(key => {
          object[key] = obj[key];
        });
      });
      return object;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static merge(objects) {
    const result = {};
    objects.forEach(object => {
      Object.keys(object).forEach(key => {
        result[key] = object[key];
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

  mergeWith(func, ...objects) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    for (let i = 0, { length } = objects; i < length; i += 1) {
      if (!isObject(objects[i])) {
        throw new TypeError("Each argument except 1st one must be Object");
      }
    }
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      objects.forEach(obj => {
        Object.keys(obj).forEach(key => {
          object[key] = Object.prototype.hasOwnProperty.call(object, key)
            ? func(object[key], obj[key], key)
            : obj[key];
        });
      });
      return object;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static mergeWith(object, func, objects) {
    const result = this.copy(object);
    objects.forEach(obj => {
      Object.keys(obj).forEach(key => {
        result[key] = Object.prototype.hasOwnProperty.call(result, key)
          ? func(result[key], obj[key], key)
          : obj[key];
      });
    });
    return result;
  }

  // TODO: mergeDeep()
  // TODO: mergeDeepWith()

  // TODO: flip()
  // TODO: flipWith()

  static reduce(object, func, init) {
    const keys = Object.keys(object);
    let acc = init;
    if (init === undefined) {
      if (!keys.length) {
        throw new TypeError("Reduce of empty object with no initial value");
      }
      acc = object[keys.pop()];
    }
    keys.forEach(key => {
      acc = func(acc, object[key], key);
    });
    return acc;
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

  static some(object, func) {
    return !this.every(object, (v, k) => !func(v, k));
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

  static forEach(object, func) {
    Object.keys(object).forEach(key => {
      func(object[key], key);
    });
    return undefined;
  }
}
