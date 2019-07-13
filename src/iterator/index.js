class BaseIterator {
  constructor(OriginIter) {
    this.Origin = OriginIter;
    this.parent = null;
  }

  // abstract next() { }

  // abstract prev() { }

  // abstract reset() { }
}

export class OriginIterator extends BaseIterator {
  constructor(coll, OriginIter) {
    super(OriginIter);
    this.coll = coll;
  }

  // abstract static default() { }

  // abstract static add(coll, key, value) { }

  static collect(iter) {
    const coll = this.default();
    let key;
    let value;
    while (!({ key, value } = iter.next()).done) {
      this.add(coll, key, value);
    }
    return coll;
  }
}

export class ChainIterator extends BaseIterator {
  constructor(parentIterator, fun) {
    super(parentIterator.Origin);
    this.parent = parentIterator;
    this.fun = fun;
  }

  // abstract base(direction) { }

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

export class Collector extends ChainIterator {
  constructor(parentIterator, collect) {
    super(parentIterator, null);
    this.collect = collect;
    this.iter = null;
  }

  base(direction) {
    if (!this.iter) {
      const coll = this.collect(this.parent);
      this.iter = new this.Origin(coll);
    }
    return this.iter[direction]();
  }

  reset() {
    super.reset();
    this.iter = null;
  }
}

export class TapIterator extends ChainIterator {
  base(direction) {
    const result = this.parent[direction]();
    if (!result.done) {
      this.fun(result.value, result.key);
    }
    return result;
  }
}

export class MapIterator extends ChainIterator {
  base(direction) {
    const result = this.parent[direction]();
    if (!result.done) {
      result.value = this.fun(result.value, result.key);
    }
    return result;
  }
}

export class ClearCollector extends Collector {
  base(direction) {
    if (!this.iter) {
      const coll = this.Origin.default();
      this.iter = new this.Origin(coll);
    }
    return this.iter[direction]();
  }
}
