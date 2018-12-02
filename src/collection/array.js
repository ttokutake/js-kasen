import Collection from ".";
import { OriginIterator, Collector } from "../iterator";
import { FilterIterator, ReverseIterator } from "../iterator/array";
import { isNumber, isArray, isFunction } from "../type";

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

function correctIndex(index, length) {
  return index < 0 ? length + ((index + 1) % length) - 1 : index;
}

export default class KasenArray extends Collection {
  constructor(array, iter) {
    super(array, iter);

    this.reverse.if = bool => (bool ? this.reverse() : this);

    this.take.if = (bool, num) => {
      if (!isNumber(num)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.take(num) : this;
    };

    this.takeLast.if = (bool, num) => {
      if (!isNumber(num)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.takeLast(num) : this;
    };

    this.takeWhile.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.takeWhile(fun) : this;
    };

    this.takeUntil.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.takeUntil(fun) : this;
    };

    this.skip.if = (bool, num) => {
      if (!isNumber(num)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.skip(num) : this;
    };

    this.skipLast.if = (bool, num) => {
      if (!isNumber(num)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.skipLast(num) : this;
    };

    this.skipWhile.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.skipWhile(fun) : this;
    };

    this.skipUntil.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.skipUntil(fun) : this;
    };

    this.set.if = (bool, index, value) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.set(index, value) : this;
    };

    this.update.if = (bool, index, fun) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      if (!isFunction(fun)) {
        throw new TypeError("3rd argument must be Function");
      }
      return bool ? this.update(index, fun) : this;
    };

    this.delete.if = (bool, index) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.delete(index) : this;
    };

    this.concat.if = (bool, ...values) =>
      bool ? this.concat(...values) : this;

    this.insert.if = (bool, index, value) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.insert(index, value) : this;
    };

    this.push.if = (bool, ...values) => (bool ? this.push(...values) : this);

    this.pop.if = bool => (bool ? this.pop() : this);

    this.unshift.if = (bool, ...values) =>
      bool ? this.unshift(...values) : this;

    this.shift.if = bool => (bool ? this.shift() : this);

    this.splice.if = (bool, index, num, ...values) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      if (!isNumber(num)) {
        throw new TypeError("3rd argument must be Number");
      }
      return bool ? this.splice(index, num, ...values) : this;
    };

    this.flatten.if = bool => (bool ? this.flatten() : this);

    this.flatMap.if = (bool, fun) => {
      if (!isFunction(fun)) {
        throw new TypeError("2nd argument must be Function");
      }
      return bool ? this.flatMap(fun) : this;
    };

    this.sort.if = (bool, fun) => {
      if (!(isFunction(fun) || fun === undefined)) {
        throw new TypeError("2nd argument must be Function or Undefined");
      }
      return bool ? this.sort(fun) : this;
    };

    this.chunk.if = (bool, num) => {
      if (!(isNumber(num) && num >= 1)) {
        throw new TypeError("2nd argument must be Number >= 1");
      }
      return bool ? this.chunk(num) : this;
    };

    this.sliding.if = (bool, num, step) => {
      if (!(isNumber(num) && num >= 1)) {
        throw new TypeError("2nd argument must be Number >= 1");
      }
      if (!((isNumber(step) && step >= 1) || step === undefined)) {
        throw new TypeError("3rd argument must be Number or Undefined");
      }
      return bool ? this.sliding(num, step) : this;
    };
  }

  static __iterator(array) {
    return new ArrayIterator(array);
  }

  static copy(array) {
    return array.slice();
  }

  static map(array, fun) {
    return array.map(fun);
  }

  filter(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || (v => v);
    this.__pile(FilterIterator, fn);
    return this;
  }

  static filter(array, fun) {
    return array.filter(fun);
  }

  reverse() {
    this.__pile(ReverseIterator, null);
    return this;
  }

  static reverse(array) {
    return array.reverse();
  }

  take(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const collect = iter => {
      const array = [];
      let count = 0;
      let value;
      while (count < num && !({ value } = iter.next()).done) {
        count += 1;
        array.push(value);
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static take(array, num) {
    return num < 0 ? [] : array.slice(0, num);
  }

  takeLast(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const collect = iter => {
      const array = [];
      let count = 0;
      let value;
      while (count < num && !({ value } = iter.prev()).done) {
        array.unshift(value);
        count += 1;
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static takeLast(array, num) {
    const { length } = array;
    return num < 0 ? [] : array.slice(length - num, length);
  }

  takeWhile(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const collect = iter => {
      const array = [];
      let key;
      let value;
      while (!({ key, value } = iter.next()).done && fun(value, key)) {
        array.push(value);
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static takeWhile(array, fun) {
    const result = [];
    for (let i = 0, { length } = array; i < length; i += 1) {
      const value = array[i];
      if (!fun(value, i)) {
        break;
      }
      result.push(value);
    }
    return result;
  }

  takeUntil(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    return this.takeWhile((v, i) => !fun(v, i));
  }

  static takeUntil(array, fun) {
    return this.takeWhile(array, (v, i) => !fun(v, i));
  }

  skip(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const collect = iter => {
      const array = [];
      let count = 0;
      let value;
      while (!({ value } = iter.next()).done) {
        if (count >= num) {
          array.push(value);
        }
        count += 1;
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static skip(array, num) {
    return array.slice(num < 0 ? 0 : num);
  }

  skipLast(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const collect = iter => {
      const array = [];
      let count = 0;
      let value;
      while (!({ value } = iter.prev()).done) {
        if (count >= num) {
          array.unshift(value);
        }
        count += 1;
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static skipLast(array, num) {
    const { length } = array;
    return num >= length ? [] : array.slice(0, array.length - num);
  }

  skipWhile(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const collect = iter => {
      const array = [];
      let key;
      let value;
      let skipped = true;
      while (!({ key, value } = iter.next()).done) {
        if (skipped && !fun(value, key)) {
          skipped = false;
        }
        if (!skipped) {
          array.push(value);
        }
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static skipWhile(array, fun) {
    const result = [];
    let skipped = true;
    array.forEach((value, i) => {
      if (skipped && !fun(value, i)) {
        skipped = false;
      }
      if (!skipped) {
        result.push(value);
      }
    });
    return result;
  }

  skipUntil(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    return this.skipWhile((v, i) => !fun(v, i));
  }

  static skipUntil(array, fun) {
    return this.skipWhile(array, (v, i) => !fun(v, i));
  }

  set(index, value) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    return super.set(index, value);
  }

  update(index, fun) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    if (!isFunction(fun)) {
      throw new TypeError("2nd argument must be Function");
    }
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      const { length } = array;
      if (-length <= index && index < length) {
        const key = correctIndex(index, length);
        array[key] = fun(array[key]);
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static update(array, index, fun) {
    const result = this.copy(array);
    const { length } = result;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      result[key] = fun(array[key]);
    }
    return result;
  }

  delete(index) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      const { length } = array;
      if (-length <= index && index < length) {
        const key = correctIndex(index, length);
        array.splice(key, 1);
        return array;
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static delete(array, index) {
    const result = this.copy(array);
    const { length } = result;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      result.splice(key, 1);
    }
    return result;
  }

  concat(...values) {
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      return array.concat(...values);
    };
    this.__pile(Collector, collect);
    return this;
  }

  static concat(array, values) {
    return array.concat(...values);
  }

  insert(index, value) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      const { length } = array;
      if (-length <= index && index <= length) {
        const key = correctIndex(index, length);
        array.splice(key, 0, value);
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static insert(array, index, value) {
    const result = this.copy(array);
    const { length } = result;
    if (-length <= index && index <= length) {
      const key = correctIndex(index, length);
      result.splice(key, 0, value);
    }
    return result;
  }

  push(...values) {
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      return array.concat(values);
    };
    this.__pile(Collector, collect);
    return this;
  }

  static push(array, values) {
    return array.concat(values);
  }

  pop() {
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      array.pop();
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static pop(array) {
    return array.slice(0, -1);
  }

  unshift(...values) {
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      return values.concat(array);
    };
    this.__pile(Collector, collect);
    return this;
  }

  static unshift(array, values) {
    return values.concat(array);
  }

  shift() {
    const collect = iter => {
      const array = ArrayIterator.collect(iter);
      array.shift();
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static shift(array) {
    return array.slice(1);
  }

  splice(index, num, ...values) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    if (!isNumber(num)) {
      throw new TypeError("2nd argument must be Number");
    }
    const collect = iter => {
      const array = iter.Origin.collect(iter);
      array.splice(index, num, ...values);
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static splice(array, index, num, values) {
    const result = this.copy(array);
    result.splice(index, num, ...values);
    return result;
  }

  flatten() {
    const collect = iter => {
      let array = [];
      let value;
      while (!({ value } = iter.next()).done) {
        if (isArray(value)) {
          array = array.concat(value);
        } else {
          array.push(value);
        }
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static flatten(array) {
    let result = [];
    array.forEach(value => {
      if (isArray(value)) {
        result = result.concat(value);
      } else {
        result.push(value);
      }
    });
    return result;
  }

  flatMap(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const collect = iter => {
      let array = [];
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        const val = fun(value, key);
        if (isArray(val)) {
          array = array.concat(val);
        } else {
          array.push(val);
        }
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static flatMap(array, fun) {
    let result = [];
    array.forEach((v, i) => {
      const value = fun(v, i);
      if (isArray(value)) {
        result = result.concat(value);
      } else {
        result.push(value);
      }
    });
    return result;
  }

  // TODO?: interpose()
  // TODO?: interleave()

  // TODO: zip()
  // TODO: zipAll()
  // TODO: zipWith()

  sort(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn =
      fun ||
      ((v1, v2) => {
        if (v1 > v2) {
          return 1;
        }
        if (v1 < v2) {
          return -1;
        }
        return 0;
      });
    const collect = iter => {
      const array = iter.Origin.collect(iter);
      array.sort(fn);
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static sort(array, fun) {
    const result = this.copy(array);
    result.sort(fun);
    return result;
  }

  // TODO?: sortBy()

  unique(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError("1st argument must be Function or Undefined");
    }
    const fn = fun || (v => v);
    const collect = iter => {
      const array = iter.Origin.collect(iter);
      // TODO: sortBy() should be used
      array.sort((v1, v2) => {
        const r1 = fn(v1);
        const r2 = fn(v2);
        if (r1 > r2) {
          return 1;
        }
        if (r1 < r2) {
          return -1;
        }
        return 0;
      });
      const result = [];
      let left;
      for (let i = 0, { length } = array; i < length; i += 1) {
        const value = array[i];
        const right = fn(value, i);
        if (i === 0 || left !== right) {
          left = right;
          result.push(value);
        }
      }
      return result;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static unique(array, fun) {
    const arr = this.copy(array);
    arr.sort((v1, v2) => {
      const r1 = fun(v1);
      const r2 = fun(v2);
      if (r1 > r2) {
        return 1;
      }
      if (r1 < r2) {
        return -1;
      }
      return 0;
    });
    const result = [];
    let left;
    for (let i = 0, { length } = arr; i < length; i += 1) {
      const value = arr[i];
      const right = fun(value, i);
      if (i === 0 || left !== right) {
        left = right;
        result.push(value);
      }
    }
    return result;
  }

  chunk(num) {
    if (!(isNumber(num) && num >= 1)) {
      throw new TypeError("1st argument must be Number >= 1");
    }
    return this.sliding(num, num);
  }

  sliding(num, step) {
    if (!(isNumber(num) && num >= 1)) {
      throw new TypeError("1st argument must be Number >= 1");
    }
    if (!((isNumber(step) && step >= 1) || step === undefined)) {
      throw new TypeError("2nd argument must be Number or Undefined");
    }
    const stp = step || 1;
    const collect = iter => {
      const array = [];
      let value;
      let count = 0;
      const chunk = [];
      while (!({ value } = iter.next()).done) {
        if (count >= num) {
          array.push(this.constructor.copy(chunk));
          count -= stp;
          chunk.splice(0, stp);
        }
        chunk.push(value);
        if (chunk.length > num) {
          chunk.shift();
        }
        count += 1;
      }
      if (chunk.length) {
        array.push(chunk);
      }
      return array;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static sliding(array, num, step) {
    const result = [];
    let count = 0;
    const chunk = [];
    array.forEach(value => {
      if (count >= num) {
        result.push(this.copy(chunk));
        count -= step;
        chunk.splice(0, step);
      }
      chunk.push(value);
      if (chunk.length > num) {
        chunk.shift();
      }
      count += 1;
    });
    if (chunk.length) {
      result.push(chunk);
    }
    return result;
  }

  static range(start, end, step) {
    const array = [];
    for (let i = start; i < end; i += step) {
      array.push(i);
    }
    return array;
  }

  static repeat(value, num) {
    return new Array(num > 0 ? num : 0).fill(value);
  }

  /* consumer */

  static isEmpty(array) {
    return !array.length;
  }

  // TODO?: startsWith() from Scala
  // TODO?: endsWith() from Scala

  static count(array, fun) {
    if (fun === undefined) {
      return array.length;
    }
    return super.count(array, fun);
  }

  get(index, protection) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    const array = this.__consume(null);
    return this.constructor.get(array, index, protection);
  }

  static get(array, index, protection) {
    const { length } = array;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      return array[key];
    }
    return protection;
  }

  has(index) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    return super.has(index);
  }

  static has(array, index) {
    return index >= 0 && index < array.length;
  }

  static includes(array, value) {
    for (let i = 0, { length } = array; i < length; i += 1) {
      if (array[i] === value) {
        return true;
      }
    }
    return false;
  }

  head() {
    const finalize = iter => iter.next().value;
    return this.__consume(finalize);
  }

  static head(array) {
    return array[0];
  }

  first() {
    return this.head();
  }

  tail() {
    return this.skip(1).toArray();
  }

  init() {
    const finalize = iter => {
      const array = [];
      let value;
      let prevValue;
      let isFirst = true;
      while (!({ value } = iter.next()).done) {
        if (isFirst) {
          isFirst = false;
          prevValue = value;
        } else {
          array.push(prevValue);
          prevValue = value;
        }
      }
      return array;
    };
    return this.__consume(finalize);
  }

  last() {
    const finalize = iter => iter.prev().value;
    return this.__consume(finalize);
  }

  static last(array) {
    return array[array.length - 1];
  }

  splitAt(index) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    const finalize = iter => {
      const array = iter.Origin.collect(iter);
      return this.constructor.splitAt(array, index);
    };
    return this.__consume(finalize);
  }

  static splitAt(array, index) {
    return [array.slice(0, index), array.slice(index)];
  }

  static toArray(array) {
    return this.copy(array);
  }

  static reduce(array, fun, init) {
    return init === undefined ? array.reduce(fun) : array.reduce(fun, init);
  }

  reduceRight(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let acc = init;
      let key;
      let value;
      let isFirst = true;
      while (!({ key, value } = iter.prev()).done) {
        if (isFirst) {
          isFirst = false;
          if (init === undefined) {
            acc = value;
          } else {
            acc = fun(init, value, key);
          }
        } else {
          acc = fun(acc, value, key);
        }
      }
      if (isFirst && init === undefined) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      return acc;
    };
    return this.__consume(finalize);
  }

  static reduceRight(array, fun, init) {
    const { length } = array;
    let startIndex = length - 1;
    let acc = init;
    if (init === undefined) {
      if (!length) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      acc = array[startIndex];
      startIndex -= 1;
    }
    for (let i = startIndex; i > -1; i -= 1) {
      acc = fun(acc, array[i], i);
    }
    return acc;
  }

  static reduceWhile(array, fun, init) {
    const { length } = array;
    let startIndex = 0;
    let acc = init;
    if (init === undefined) {
      if (!length) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
      acc = array[startIndex];
      startIndex += 1;
    }
    for (let i = startIndex; i < length; i += 1) {
      const [state, result] = fun(acc, array[i], i);
      if (state === "halt") {
        return result;
      }
      acc = result;
    }
    return acc;
  }

  // TODO: scan() from Scala
  // TODO: scanRight() from Scala

  static partition(array, fun) {
    const result = [[], []];
    array.forEach((value, key) => {
      const index = fun(value, key) ? 0 : 1;
      result[index].push(value);
    });
    return result;
  }

  static join(array, delimiter) {
    return array.join(delimiter);
  }

  // TODO?: unzip() from Scala
  // TODO?: unzipAll() from Scala?

  static every(array, fun) {
    return array.every(fun);
  }

  static some(array, fun) {
    return array.some(fun);
  }

  findLast(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const result = this.findLastEntry(fun);
    return result ? result[1] : result;
  }

  static findLast(array, fun) {
    const result = this.findLastEntry(array, fun);
    return result ? result[1] : result;
  }

  static findEntry(array, fun) {
    for (let i = 0, { length } = array; i < length; i += 1) {
      const value = array[i];
      if (fun(value, i)) {
        return [i, value];
      }
    }
    return undefined;
  }

  findLastEntry(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
      while (!({ key, value } = iter.prev()).done) {
        if (fun(value, key)) {
          return [key, value];
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  static findLastEntry(array, fun) {
    for (let i = array.length - 1; i > -1; i -= 1) {
      const value = array[i];
      if (fun(value, i)) {
        return [i, value];
      }
    }
    return undefined;
  }

  findLastKey(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const result = this.findLastEntry(fun);
    return result ? result[0] : result;
  }

  static findLastKey(array, fun) {
    const result = this.findLastEntry(array, fun);
    return result ? result[0] : result;
  }

  findIndex(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const result = this.findKey(fun);
    return result === undefined ? -1 : result;
  }

  static findIndex(array, fun) {
    const result = this.findKey(array, fun);
    return result === undefined ? -1 : result;
  }

  findLastIndex(fun) {
    if (!isFunction(fun)) {
      throw new TypeError("1st argument must be Function");
    }
    const result = this.findLastKey(fun);
    return result === undefined ? -1 : result;
  }

  static findLastIndex(array, fun) {
    const result = this.findLastKey(array, fun);
    return result === undefined ? -1 : result;
  }

  static keyOf(array, value) {
    for (let i = 0, { length } = array; i < length; i += 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return undefined;
  }

  lastKeyOf(value) {
    const finalize = iter => {
      let key;
      let v;
      while (!({ key, value: v } = iter.prev()).done) {
        if (v === value) {
          return key;
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  static lastKeyOf(array, value) {
    for (let i = array.length - 1; i > -1; i -= 1) {
      if (array[i] === value) {
        return i;
      }
    }
    return undefined;
  }

  indexOf(value) {
    const result = this.keyOf(value);
    return result === undefined ? -1 : result;
  }

  static indexOf(array, value) {
    const result = this.keyOf(array, value);
    return result === undefined ? -1 : result;
  }

  lastIndexOf(value) {
    const result = this.lastKeyOf(value);
    return result === undefined ? -1 : result;
  }

  static lastIndexOf(array, value) {
    const result = this.lastKeyOf(array, value);
    return result === undefined ? -1 : result;
  }

  static max(array, fun) {
    if (!array.length) {
      return undefined;
    }
    let result = array.pop();
    array.forEach(value => {
      if (fun(value, result)) {
        result = value;
      }
    });
    return result;
  }

  static keys(array) {
    return array.map((_value, index) => index);
  }

  static values(array) {
    return this.copy(array);
  }

  static entries(array) {
    return array.map((value, index) => [index, value]);
  }

  static forEach(array, fun) {
    return array.forEach(fun);
  }
}
