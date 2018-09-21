import Collection from "./collection";
import { OriginIterator, Curator } from "./iterator/index";
import { FilterIterator, ReverseIterator } from "./iterator/array";

class ArrayIterator extends OriginIterator {
  constructor(array) {
    super(array, ArrayIterator);
    this.reset();
  }

  static default() {
    return [];
  }

  static add(array, _key, value) {
    array.push(value);
  }

  base(start, end, step) {
    if (this.index === null) {
      this.index = start;
    }
    if (this.index === end) {
      return { done: true };
    }
    const key = this.index;
    this.index += step;
    return { done: false, key, value: this.coll[key] };
  }

  next() {
    return this.base(0, this.coll.length, 1);
  }

  prev() {
    return this.base(this.coll.length - 1, -1, -1);
  }

  reset() {
    this.index = null;
  }
}

export default class KasenArray extends Collection {
  static __iterator(array) {
    return new ArrayIterator(array);
  }

  static map(array, func) {
    const len = array.length;
    const result = new Array(len);
    for (let i = 0; i < len; i += 1) {
      result[i] = func(array[i], i);
    }
    return result;
  }

  // TODO: flatten()

  // TODO: flatMap()

  filter(func) {
    return super.filter(FilterIterator, func);
  }

  reverse() {
    this.__pile(ReverseIterator, null);
    return this;
  }

  take(num) {
    const curate = iter => {
      const array = ArrayIterator.default();
      let count = 0;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (count < num && !({ value } = iter.next()).done) {
        count += 1;
        ArrayIterator.add(array, null, value);
      }
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  // TODO: takeLast()

  // TODO: takeWhile()

  // TODO: takeUntil()

  // TODO: skip()

  // TODO: skipLast()

  // TODO: skipWhile()

  // TODO: skipUntil()

  set(index, value) {
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      const { length } = array;
      if (index < -length || length < index) {
        throw new RangeError(
          `Must satisfy ${-length} <= "index" <= ${length} to use set()`
        );
      }
      const key = index < 0 ? length + ((index + 1) % length) - 1 : index;
      array[key] = value;
      return array;
    };
    return super.set(Curator, curate);
  }

  // TODO: insert()

  // TODO: push()

  // TODO: pop()

  // TODO: unshift()

  // TODO: shift()

  // TODO: concat()

  // TODO: zip()

  // TODO: zipAll()

  // TODO: zipWith()

  // TODO: unzip()

  // TODO: unzipAll()

  // TODO: sort()

  // TODO: sortBy()

  // TODO: interpose()

  // TODO: interleave()

  // TODO: splice()

  // TODO: distinct() / unique() from Scala

  /* consumer */

  // TODO: first() / head()

  // TODO: tail() === shift() from Scala

  // TODO: init() === pop() from Scala

  // TODO: last()

  static reduce(array, func, init) {
    return init === undefined ? array.reduce(func) : array.reduce(func, init);
  }

  // TODO: reduceRight()
  // TODO: scanRight() from Scala

  // TODO: splitAt() from Scala

  findLast(func) {
    const finalize = iter => {
      let key;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (!({ key, value } = iter.prev()).done) {
        if (func(value, key)) {
          return value;
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  // TODO: findLastEntry()
  // TODO: findLastKey()
  // TODO: lastKeyOf()

  // TODO: indexOf()
  // TODO: lastIndexOf()

  // TODO: findIndexOf()
  // TODO: findLastIndexOf()

  // TODO?: startsWith()

  // TODO?: endsWith()

  // TODO: range()
}
