class KasenIterator {
  constructor(iter, func) {
    this.iter = iter;
    this.func = func;
    this.OriginIterator = iter.OriginIterator;
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  base(_direction) {
    throw new Error("not implemented");
  }

  next() {
    return this.base("next");
  }

  prev() {
    return this.base("prev");
  }
}

class Curator extends KasenIterator {
  constructor(iter, curate) {
    super(iter, null);
    this.curate = curate;
    this.isCurated = false;
  }

  base(direction) {
    if (!this.isCurated) {
      const coll = this.curate(this.iter);
      this.iter = new this.OriginIterator(coll);
      this.isCurated = true;
    }
    return this.iter[direction]();
  }
}

export class MapIterator extends KasenIterator {
  base(direction) {
    const result = this.iter[direction]();
    if (!result.done) {
      result.value = this.func(result.value, result.key);
    }
    return result;
  }
}

// TODO: Used by Object
export class FilterIterator extends KasenIterator {
  base(direction) {
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

  base(direction) {
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

export class ReverseIteratorForArray extends KasenIterator {
  constructor(iter, func) {
    super(iter, func);
    this.index = 0;
  }

  next() {
    const result = this.iter.prev();
    result.key = this.index;
    this.index += 1;
    return result;
  }

  prev() {
    return this.iter.next();
  }
}

export class TakeCuratorForArray extends Curator {}

export class SetCuratorForArray extends Curator {}
