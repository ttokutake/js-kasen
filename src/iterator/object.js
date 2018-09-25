import { ChainIterator } from ".";

// TODO: Delete below line
// eslint-disable-next-line import/prefer-default-export
export class FilterIterator extends ChainIterator {
  next() {
    let result;
    // eslint-disable-next-line no-cond-assign
    while (!(result = this.parent.next()).done) {
      if (this.func(result.value, result.key)) {
        break;
      }
    }
    return result;
  }
}
