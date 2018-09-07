class KasenIterator {
  constructor(iter, func) {
    this.iter = iter;
    this.func = func;
  }

  // next() {
  //   throw new Error("not implemented");
  // }

  // prev() {
  //   throw new Error("not implemented");
  // }
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

export class ReverseIterator extends KasenIterator {
  next() {
    return this.iter.prev();
  }

  prev() {
    return this.iter.next();
  }
}
