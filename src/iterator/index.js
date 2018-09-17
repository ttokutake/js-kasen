class BaseIterator {
  constructor(OriginIter) {
    this.Origin = OriginIter;
  }

  // eslint-disable-next-line class-methods-use-this
  next() {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this
  prev() {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line class-methods-use-this
  reset() {
    throw new Error("not implemented");
  }
}

export class OriginIterator extends BaseIterator {
  constructor(coll, OriginIter) {
    super(OriginIter);
    this.coll = coll;
  }

  static default() {
    throw new Error("not implemented");
  }

  // eslint-disable-next-line no-unused-vars
  static add(_coll, _key, _value) {
    throw new Error("not implemented");
  }

  static curate(iter) {
    const coll = this.default();
    let key;
    let value;
    // eslint-disable-next-line no-cond-assign
    while (!({ key, value } = iter.next()).done) {
      this.add(coll, key, value);
    }
    return coll;
  }
}

export class ChainIterator extends BaseIterator {
  constructor(parentIterator, func) {
    super(parentIterator.Origin);
    this.parent = parentIterator;
    this.func = func;
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

  reset() {
    this.parent.reset();
  }
}

export class Curator extends ChainIterator {
  constructor(parentIterator, curate) {
    super(parentIterator, null);
    this.curate = curate;
    this.rewind();
  }

  rewind() {
    this.iter = null;
    this.isCurated = false;
  }

  base(direction) {
    if (!this.isCurated) {
      const coll = this.curate(this.parent);
      this.iter = new this.Origin(coll);
      this.isCurated = true;
    }
    return this.iter[direction]();
  }

  reset() {
    this.rewind();
    super.reset();
  }
}

export class MapIterator extends ChainIterator {
  base(direction) {
    const result = this.parent[direction]();
    if (!result.done) {
      result.value = this.func(result.value, result.key);
    }
    return result;
  }
}
