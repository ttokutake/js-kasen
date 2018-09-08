class KasenIterator {
  constructor(iter, func) {
    this.iter = iter;
    this.func = func;
  }

  // eslint-disable-next-line class-methods-use-this
  next() {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this
  prev() {
    throw new Error("not implemented");
  }
}

export class MapIterator extends KasenIterator {
  __base(direction) {
    const result = this.iter[direction]();
    if (!result.done) {
      result.value = this.func(result.value, result.key);
    }
    return result;
  }

  next() {
    return this.__base("next");
  }

  prev() {
    return this.__base("prev");
  }
}

export class FilterIterator extends KasenIterator {
  __base(direction) {
    let result;
    // eslint-disable-next-line no-cond-assign
    while (!(result = this.iter[direction]()).done) {
      if (this.func(result.value, result.key)) {
        // TODO: Shrink "key" if Array
        break;
      }
    }
    return result;
  }

  next() {
    return this.__base("next");
  }

  prev() {
    return this.__base("prev");
  }
}

export class ReverseIterator extends KasenIterator {
  next() {
    return this.iter.prev();
  }

  prev() {
    return this.iter.next();
  }
}
