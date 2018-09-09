class KasenIterator {
  constructor(iter, func) {
    this.iter = iter;
    this.func = func;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  __base(_direction) {
    throw new Error("not implemented");
  }

  next() {
    return this.__base("next");
  }

  prev() {
    return this.__base("prev");
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
}

// TODO: Used by Object
export class FilterIterator extends KasenIterator {
  __base(direction) {
    let result;
    // eslint-disable-next-line no-cond-assign
    while (!(result = this.iter[direction]()).done) {
      if (this.func(result.value, result.key)) {
        break;
      }
    }
    return result;
  }
}

export class FilterIteratorForArray extends KasenIterator {
  constructor(iter, func) {
    super(iter, func);
    this.index = 0;
  }

  __base(direction) {
    let result;
    // eslint-disable-next-line no-cond-assign
    while (!(result = this.iter[direction]()).done) {
      if (this.func(result.value, result.key)) {
        result.key = this.index;
        this.index += 1;
        break;
      }
    }
    return result;
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
