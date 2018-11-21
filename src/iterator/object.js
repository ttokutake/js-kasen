import { ChainIterator } from ".";

export class FilterIterator extends ChainIterator {
  next() {
    let result;
    while (!(result = this.parent.next()).done) {
      if (this.fun(result.value, result.key)) {
        break;
      }
    }
    return result;
  }
}

export class FlipIterator extends ChainIterator {
  next() {
    const result = this.parent.next();
    if (!result.done) {
      const { key, value } = result;
      result.key = this.fun(value, key);
      result.value = key;
    }
    return result;
  }
}
