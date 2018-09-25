import { ChainIterator } from ".";

export class FilterIterator extends ChainIterator {
  constructor(parentIterator, func) {
    super(parentIterator, func);
    this.index = 0;
  }

  base(direction) {
    let result;
    while (!(result = this.parent[direction]()).done) {
      if (this.func(result.value, result.key)) {
        result.key = this.index;
        this.index += 1;
        break;
      }
    }
    return result;
  }
}

export class ReverseIterator extends ChainIterator {
  constructor(parentIterator, func) {
    super(parentIterator, func);
    this.index = 0;
  }

  next() {
    const result = this.parent.prev();
    result.key = this.index;
    this.index += 1;
    return result;
  }

  prev() {
    return this.parent.next();
  }
}
