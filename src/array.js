import Collection from "./collection";
import { ReverseIterator } from "./iterator";

class ArrayIterator {
  constructor(array) {
    this.array = array;
    this.index = null;
  }

  __base(start, end, step) {
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
    return this.__base(0, this.array.length, 1);
  }

  prev() {
    return this.__base(this.array.length - 1, -1, -1);
  }
}

export default class KasenArray extends Collection {
  constructor(array) {
    super(KasenArray, array);
  }

  static __genIterator(array) {
    return new ArrayIterator(array);
  }

  static __default() {
    return [];
  }

  static __add(array, _key, value) {
    array.push(value);
  }

  reverse() {
    this.__pile([ReverseIterator, null]);
    return this;
  }

  take(num) {
    const curate = iter => {
      const coll = this.Self.__default();
      let count = 0;
      let value;
      // eslint-disable-next-line no-cond-assign
      while (count < num && !({ value } = iter.next()).done) {
        count += 1;
        this.Self.__add(coll, null, value);
      }
      return coll;
    };
    this.__collect(curate);
    return this;
  }

  // TODO: takeLast()

  // TODO: takeWhile()

  // TODO: takeUntil()

  // TODO: skip()

  // TODO: skipLast()

  // TODO: skipWhile()

  // TODO: skipUntil()

  // set(index, value) {
  //   const func = array => {
  //     const { length } = array;
  //     if (index < -length || length < index) {
  //       throw new RangeError(`Must satisfy ${-length} <= "index" <= ${length}`);
  //     }
  //     const key = index < 0 ? length + ((index + 1) % length) - 1 : index;
  //     array[key] = value; // eslint-disable-line no-param-reassign
  //     return array;
  //   };
  //   return super.set(func);
  // }

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

  // TODO: first() / head()

  // TODO: tail() === shift() from Scala

  // TODO: init() === pop() from Scala

  // TODO: last()

  // TODO: distinct() / unique() from Scala

  static reduce(array, func, init) {
    return init === undefined ? array.reduce(func) : array.reduce(func, init);
  }

  // TODO: reduceRight()

  // TODO: reduceWhile() from Elixir

  // TODO: scan() from Scala

  // TODO: scanRight() from Scala

  // TODO: sliding() from Scala

  // TODO: splitAt() from Scala

  // TODO: join()

  // TODO: indexOf()

  // TODO: lastIndexOf()

  // TODO: findIndexOf()

  // TODO: findLastIndexOf()

  // TODO?: startsWith()

  // TODO?: endsWith()

  // TODO: range()
}
