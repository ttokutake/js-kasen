import Collection from "./collection";
import {
  FilterIteratorForArray,
  ReverseIteratorForArray,
  SetCuratorForArray,
  TakeCuratorForArray
} from "./iterator";

class ArrayIterator {
  constructor(array) {
    this.array = array;
    this.index = null;
    this.Origin = ArrayIterator;
  }

  static default() {
    return [];
  }

  static add(array, _key, value) {
    array.push(value);
  }

  static curate(iter) {
    const coll = iter.Origin.default();
    let key;
    let value;
    // eslint-disable-next-line no-cond-assign
    while (!({ key, value } = iter.next()).done) {
      iter.Origin.add(coll, key, value);
    }
    return coll;
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
    return { done: false, key, value: this.array[key] };
  }

  next() {
    return this.base(0, this.array.length, 1);
  }

  prev() {
    return this.base(this.array.length - 1, -1, -1);
  }
}

export default class KasenArray extends Collection {
  constructor(array) {
    super(KasenArray, array);
  }

  static __iterator(array) {
    return new ArrayIterator(array);
  }

  // TODO: flatten()

  // TODO: flatMap()

  filter(func) {
    return super.filter(FilterIteratorForArray, func);
  }

  reverse() {
    this.__pile(ReverseIteratorForArray, null);
    return this;
  }

  take(num) {
    const curate = iter => {
      const array = iter.Origin.default();
      let count = 0;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (count < num && !({ value } = iter.next()).done) {
        count += 1;
        iter.Origin.add(array, null, value);
      }
      return array;
    };
    return super.take(TakeCuratorForArray, curate);
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
      const array = iter.Origin.curate(iter);
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
    return super.set(SetCuratorForArray, curate);
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
