import Collection from "./collection";
import { OriginIterator } from "./iterator";

class ObjectIterator extends OriginIterator {
  constructor(object) {
    super(object, ObjectIterator);
    this.keys = Object.keys(object);
    this.index = null;
    this.reset();
  }

  static default() {
    return {};
  }

  static add(object, key, value) {
    // eslint-disable-next-line no-param-reassign
    object[key] = value;
  }

  base(start, end, step) {
    if (this.index === null) {
      this.index = start;
    }
    if (this.index === end) {
      return { done: true };
    }
    const key = this.keys[this.index];
    this.index += step;
    return { done: false, key, value: this.coll[key] };
  }

  next() {
    return this.base(0, this.keys.length, 1);
  }

  prev() {
    return this.base(this.keys.length - 1, -1, -1);
  }

  reset() {
    this.index = null;
  }
}

export default class KasenObject extends Collection {
  static __iterator(object) {
    return new ObjectIterator(object);
  }
}
