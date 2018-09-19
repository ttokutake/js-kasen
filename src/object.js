import Collection from "./collection";
import { OriginIterator, Curator } from "./iterator/index";
import { FilterIterator } from "./iterator/object";

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

  filter(func) {
    return super.filter(FilterIterator, func);
  }

  pick(keys) {
    const func = (_value, key) => keys.some(k => k === key);
    return super.filter(FilterIterator, func);
  }

  set(key, value) {
    const curate = iter => {
      const object = ObjectIterator.curate(iter);
      ObjectIterator.add(object, key, value);
      return object;
    };
    return super.set(Curator, curate);
  }

  // TODO?: flip()

  static reduce(object, func, init) {
    const keys = Object.keys(object);
    let acc = init;
    if (init === undefined) {
      if (!keys.length) {
        throw new TypeError("Reduce of empty object with no initial value");
      }
      acc = object[keys.pop()];
    }
    for (let i = 0, len = keys.length; i < len; i += 1) {
      const key = keys[i];
      acc = func(acc, object[key], key);
    }
    return acc;
  }
}
