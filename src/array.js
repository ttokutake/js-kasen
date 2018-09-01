import Collection from "./collection";
import { Next, Gone } from "./state";

class Iterator {
  constructor(array, isReverse) {
    this.array = array;
    this.i = isReverse ? array.length - 1 : 0;
    this.end = isReverse ? -1 : array.length;
    this.step = isReverse ? -1 : 1;
  }

  next() {
    if (this.i === this.end) {
      return { done: true };
    }
    const key = this.i;
    const value = this.array[key];
    this.i += this.step;
    return { key, value, done: false };
  }
}

export default class KasenArray extends Collection {
  constructor(array) {
    super(KasenArray, array);
  }

  static __genIterator(array, isReverse) {
    return new Iterator(array, isReverse);
  }

  static __default() {
    return [];
  }

  static __add(array, _key, value) {
    array.push(value);
  }

  take(num) {
    let count = 0;
    // eslint-disable-next-line no-unused-vars
    const func = (some, _key) => {
      count += 1;
      if (count > num) {
        return new Gone();
      }
      if (count === num) {
        return new Next(some.value);
      }
      return some;
    };
    return super.take(func);
  }

  // TODO: takeLast()

  // TODO: takeWhile()

  // TODO: takeUntil()

  // TODO: skip()

  // TODO: skipLast()

  // TODO: skipWhile()

  // TODO: skipUntil()

  set(index, value) {
    const func = array => {
      const { length } = array;
      if (index < -length || length < index) {
        throw new RangeError(`Must satisfy ${-length} <= "index" <= ${length}`);
      }
      const key = index < 0 ? length + ((index + 1) % length) - 1 : index;
      array[key] = value; // eslint-disable-line no-param-reassign
      return array;
    };
    return super.set(func);
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
