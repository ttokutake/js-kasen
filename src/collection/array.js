import Collection from ".";
import {
  EACH_ARGUMENT_EXCEPT_FIRST_ONE_MUST_BE_ARRAY,
  EACH_ARGUMENT_MUST_BE_ARRAY,
  FIRST_ARGUMENT_MUST_BE_NUMBER,
  FIRST_ARGUMENT_MUST_BE_NUMBER_AND_OVER_1,
  FIRST_ARGUMENT_MUST_BE_FUNCTION,
  FIRST_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED,
  REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE,
  SCAN_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE,
  SECOND_ARGUMENT_MUST_BE_FUNCTION,
  SECOND_ARGUMENT_MUST_BE_NUMBER,
  SECOND_ARGUMENT_MUST_BE_NUMBER_OR_UNDEFINED
} from "../error-message";
import { OriginIterator, Collector } from "../iterator";
import { FilterIterator, ReverseIterator } from "../iterator/array";
import { isNumber, isArray, isFunction } from "../type";
import { compare } from "../util";

class ArrayIterator extends OriginIterator {
  constructor(array) {
    super(array, ArrayIterator);
    this.index = null;
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
    }
    return this.takeWhile((v, i) => !fun(v, i));
  }

  static takeUntil(array, fun) {
    return this.takeWhile(array, (v, i) => !fun(v, i));
  }

  skip(num) {
    if (!isNumber(num)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
    }
    return this.skipWhile((v, i) => !fun(v, i));
  }

  static skipUntil(array, fun) {
    return this.skipWhile(array, (v, i) => !fun(v, i));
  }

  set(index, value) {
    if (!isNumber(index)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
    }
    return super.set(index, value);
  }

  update(index, fun) {
    if (!isNumber(index)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
    }
    if (!isFunction(fun)) {
      throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
    }
    if (!isNumber(num)) {
      throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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

  zip(...arrays) {
    const { length } = arrays;
    for (let i = 0; i < length; i += 1) {
      if (!isArray(arrays[i])) {
        throw new TypeError(EACH_ARGUMENT_MUST_BE_ARRAY);
      }
    }
    const collect = iter => {
      const minArray = this.constructor.max(
        arrays,
        (v1, v2) => v1.length < v2.length
      );
      const minLength = minArray ? minArray.length : null;
      const result = [];
      let index = 0;
      let value;
      while (
        !({ value } = iter.next()).done &&
        (minLength === null || index < minLength)
      ) {
        const combination = [value];
        for (let i = 0; i < length; i += 1) {
          const array = arrays[i];
          combination.push(array[index]);
        }
        result.push(combination);
        index += 1;
      }
      return result;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static zip(arrays) {
    const { length } = arrays;
    const minArray = this.max(arrays, (v1, v2) => v1.length < v2.length);
    const minLength = minArray ? minArray.length : 0;
    const result = [];
    for (let index = 0; index < minLength; index += 1) {
      const combination = [];
      for (let i = 0; i < length; i += 1) {
        const array = arrays[i];
        combination.push(array[index]);
      }
      result.push(combination);
    }
    return result;
  }

  zipAll(...arrays) {
    const { length } = arrays;
    for (let i = 0; i < length; i += 1) {
      if (!isArray(arrays[i])) {
        throw new TypeError(EACH_ARGUMENT_MUST_BE_ARRAY);
      }
    }
    const collect = iter => {
      const maxArray = this.constructor.max(
        arrays,
        (v1, v2) => v1.length > v2.length
      );
      const maxLength = maxArray ? maxArray.length : 0;
      const result = [];
      let index = 0;
      let value;
      while (!({ value } = iter.next()).done || index < maxLength) {
        const combination = [value];
        for (let i = 0; i < length; i += 1) {
          const array = arrays[i];
          combination.push(array[index]);
        }
        result.push(combination);
        index += 1;
      }
      return result;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static zipAll(arrays) {
    const { length } = arrays;
    const maxArray = this.max(arrays, (v1, v2) => v1.length > v2.length);
    const maxLength = maxArray ? maxArray.length : 0;
    const result = [];
    for (let index = 0; index < maxLength; index += 1) {
      const combination = [];
      for (let i = 0; i < length; i += 1) {
        const array = arrays[i];
        combination.push(array[index]);
      }
      result.push(combination);
    }
    return result;
  }

  zipWith(fun, ...arrays) {
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
    }
    const { length } = arrays;
    for (let i = 0; i < length; i += 1) {
      if (!isArray(arrays[i])) {
        throw new TypeError(EACH_ARGUMENT_EXCEPT_FIRST_ONE_MUST_BE_ARRAY);
      }
    }
    const collect = iter => {
      const minArray = this.constructor.max(
        arrays,
        (v1, v2) => v1.length < v2.length
      );
      const minLength = minArray ? minArray.length : null;
      const result = [];
      let index = 0;
      let value;
      while (
        !({ value } = iter.next()).done &&
        (minLength === null || index < minLength)
      ) {
        const combination = [value];
        for (let i = 0; i < length; i += 1) {
          const array = arrays[i];
          combination.push(array[index]);
        }
        result.push(fun(...combination));
        index += 1;
      }
      return result;
    };
    this.__pile(Collector, collect);
    return this;
  }

  static zipWith(array, fun, arrays) {
    arrays.unshift(array);
    const { length } = arrays;
    const minArray = this.max(arrays, (v1, v2) => v1.length < v2.length);
    const minLength = minArray ? minArray.length : 0;
    const result = [];
    for (let index = 0; index < minLength; index += 1) {
      const combination = [];
      for (let i = 0; i < length; i += 1) {
        const arr = arrays[i];
        combination.push(arr[index]);
      }
      result.push(fun(...combination));
    }
    return result;
  }

  sort(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
    }
    const fn = fun || compare;
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

  unique(fun) {
    if (!(isFunction(fun) || fun === undefined)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
    }
    const fn = fun || (v => v);
    const collect = iter => {
      const array = iter.Origin.collect(iter);
      // TODO: sortBy() should be used
      array.sort((v1, v2) => compare(fn(v1), fn(v2)));
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
    // TODO: sortBy() should be used
    arr.sort((v1, v2) => compare(fun(v1), fun(v2)));
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_AND_OVER_1);
    }
    return this.sliding(num, num);
  }

  sliding(num, step) {
    if (!(isNumber(num) && num >= 1)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER_AND_OVER_1);
    }
    if (!((isNumber(step) && step >= 1) || step === undefined)) {
      throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_UNDEFINED);
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

  static count(array, fun) {
    if (fun === undefined) {
      return array.length;
    }
    return super.count(array, fun);
  }

  get(index, defaultValue) {
    if (!isNumber(index)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
    }
    const array = this.__consume(null);
    return this.constructor.get(array, index, defaultValue);
  }

  static get(array, index, defaultValue) {
    const { length } = array;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      return array[key];
    }
    return defaultValue;
  }

  has(index) {
    if (!isNumber(index)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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
    return this.skipLast(1).toArray();
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
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

  toArray() {
    const finalize = iter => {
      const array = [];
      let value;
      while (!({ value } = iter.next()).done) {
        array.push(value);
      }
      return array;
    };
    return this.__consume(finalize);
  }

  static toArray(array) {
    return this.copy(array);
  }

  static reduce(array, fun, init) {
    return init === undefined ? array.reduce(fun) : array.reduce(fun, init);
  }

  reduceRight(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
        throw new TypeError(REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
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
        throw new TypeError(REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
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
    let state;
    let acc = init;
    for (let i = 0, { length } = array; i < length; i += 1) {
      [state, acc] = fun(acc, array[i], i);
      if (state === "halt") {
        break;
      }
    }
    return acc;
  }

  static scan(array, fun, init) {
    const { length } = array;
    let startIndex = 0;
    let acc = init;
    if (init === undefined) {
      if (!length) {
        throw new TypeError(SCAN_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
      }
      acc = array[startIndex];
      startIndex += 1;
    }
    const result = [acc];
    for (let i = startIndex; i < length; i += 1) {
      acc = fun(acc, array[i], i);
      result.push(acc);
    }
    return result;
  }

  scanRight(fun, init) {
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
    }
    const finalize = iter => {
      const result = init === undefined ? [] : [init];
      let acc;
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
        result.push(acc);
      }
      if (isFirst && init === undefined) {
        throw new TypeError(SCAN_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
      }
      return result;
    };
    return this.__consume(finalize);
  }

  static scanRight(array, fun, init) {
    const { length } = array;
    let startIndex = length - 1;
    let acc = init;
    if (init === undefined) {
      if (!length) {
        throw new TypeError(SCAN_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
      }
      acc = array[startIndex];
      startIndex -= 1;
    }
    const result = [acc];
    for (let i = startIndex; i > -1; i -= 1) {
      acc = fun(acc, array[i], i);
      result.push(acc);
    }
    return result;
  }

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

  static every(array, fun) {
    return array.every(fun);
  }

  static some(array, fun) {
    return array.some(fun);
  }

  findLast(fun) {
    if (!isFunction(fun)) {
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
      throw new TypeError(FIRST_ARGUMENT_MUST_BE_FUNCTION);
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
    let result = array[0];
    for (let i = 1, { length } = array; i < length; i += 1) {
      const value = array[i];
      if (fun(value, result)) {
        result = value;
      }
    }
    return result;
  }

  equals(array) {
    if (!isArray(array)) {
      return false;
    }
    const finalize = iter => {
      let index;
      let value;
      let count = 0;
      while (!({ key: index, value } = iter.next()).done) {
        if (value !== array[index]) {
          return false;
        }
        count += 1;
      }
      return count === array.length;
    };
    return this.__consume(finalize);
  }

  static equals(array, value) {
    if (!isArray(value)) {
      return false;
    }
    const { length } = array;
    if (length !== value.length) {
      return false;
    }
    for (let i = 0; i < length; i += 1) {
      if (array[i] !== value[i]) {
        return false;
      }
    }
    return true;
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
