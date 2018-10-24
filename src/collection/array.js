import Collection from ".";
import { OriginIterator, Curator } from "../iterator";
import { FilterIterator, ReverseIterator } from "../iterator/array";
import { isNumber, isString, isArray, isFunction } from "../type";

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

    this.set.if = (bool, index, value) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.set(index, value) : this;
    };

    this.update.if = (bool, index, func) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      if (!isFunction(func)) {
        throw new TypeError("3rd argument must be Function");
      }
      return bool ? this.update(index, func) : this;
    };

    this.delete.if = (bool, index) => {
      if (!isNumber(index)) {
        throw new TypeError("2nd argument must be Number");
      }
      return bool ? this.delete(index) : this;
    };
  }

  static __iterator(array) {
    return new ArrayIterator(array);
  }

  static copy(array) {
    return array.slice();
  }

  tap(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.tap(func);
  }

  map(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.map(func);
  }

  static map(array, func) {
    return array.map(func);
  }

  pluck(key) {
    if (!(isNumber(key) || isString(key))) {
      throw new TypeError("1st argument must be Number or String");
    }
    return super.pluck(key);
  }

  filter(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filter(FilterIterator, func);
  }

  static filter(array, func) {
    return array.filter(func);
  }

  filterNot(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filterNot(func);
  }

  reverse() {
    this.__pile(ReverseIterator, null);
    return this;
  }

  static reverse(array) {
    return array.reverse();
  }

  reverseIf(bool) {
    return bool ? this.reverse() : this;
  }

  take(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const curate = iter => {
      const array = [];
      let count = 0;
      let value;
      while (count < num && !({ value } = iter.next()).done) {
        count += 1;
        array.push(value);
      }
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static take(array, num) {
    return num < 0 ? [] : array.slice(0, num);
  }

  takeIf(bool, num) {
    if (!isNumber(num)) {
      throw new TypeError("2nd argument must be Number");
    }
    return bool ? this.take(num) : this;
  }

  takeLast(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const curate = iter => {
      const array = [];
      let count = 0;
      let value;
      while (count < num && !({ value } = iter.prev()).done) {
        array.unshift(value);
        count += 1;
      }
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static takeLast(array, num) {
    const { length } = array;
    return num < 0 ? [] : array.slice(length - num, length);
  }

  takeLastIf(bool, num) {
    if (!isNumber(num)) {
      throw new TypeError("2nd argument must be Number");
    }
    return bool ? this.takeLast(num) : this;
  }

  takeWhile(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const curate = iter => {
      const array = [];
      let key;
      let value;
      while (!({ key, value } = iter.next()).done && func(value, key)) {
        array.push(value);
      }
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static takeWhile(array, func) {
    const result = [];
    for (let i = 0, { length } = array; i < length; i += 1) {
      const value = array[i];
      if (!func(value, i)) {
        break;
      }
      result.push(value);
    }
    return result;
  }

  takeWhileIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return bool ? this.takeWhile(func) : this;
  }

  takeUntil(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return this.takeWhile((v, i) => !func(v, i));
  }

  static takeUntil(array, func) {
    return this.takeWhile(array, (v, i) => !func(v, i));
  }

  takeUntilIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return bool ? this.takeUntil(func) : this;
  }

  skip(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const curate = iter => {
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
    this.__pile(Curator, curate);
    return this;
  }

  static skip(array, num) {
    return array.slice(num < 0 ? 0 : num);
  }

  skipIf(bool, num) {
    if (!isNumber(num)) {
      throw new TypeError("2nd argument must be Number");
    }
    return bool ? this.skip(num) : this;
  }

  skipLast(num) {
    if (!isNumber(num)) {
      throw new TypeError("1st argument must be Number");
    }
    const curate = iter => {
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
    this.__pile(Curator, curate);
    return this;
  }

  static skipLast(array, num) {
    const { length } = array;
    return num >= length ? [] : array.slice(0, array.length - num);
  }

  skipLastIf(bool, num) {
    if (!isNumber(num)) {
      throw new TypeError("2nd argument must be Number");
    }
    return bool ? this.skipLast(num) : this;
  }

  skipWhile(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const curate = iter => {
      const array = [];
      let key;
      let value;
      let skipped = true;
      while (!({ key, value } = iter.next()).done) {
        if (skipped && !func(value, key)) {
          skipped = false;
        }
        if (!skipped) {
          array.push(value);
        }
      }
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static skipWhile(array, func) {
    const result = [];
    let skipped = true;
    array.forEach((value, i) => {
      if (skipped && !func(value, i)) {
        skipped = false;
      }
      if (!skipped) {
        result.push(value);
      }
    });
    return result;
  }

  skipWhileIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return bool ? this.skipWhile(func) : this;
  }

  skipUntil(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return this.skipWhile((v, i) => !func(v, i));
  }

  static skipUntil(array, func) {
    return this.skipWhile(array, (v, i) => !func(v, i));
  }

  skipUntilIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return bool ? this.skipUntil(func) : this;
  }

  set(index, value) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    return super.set(index, value);
  }

  update(index, func) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      const { length } = array;
      if (-length <= index && index < length) {
        const key = correctIndex(index, length);
        array[key] = func(array[key]);
      }
      return array;
    };
    return super.update(Curator, curate);
  }

  static update(array, index, func) {
    const result = this.copy(array);
    const { length } = result;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      result[key] = func(array[key]);
    }
    return result;
  }

  delete(index) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      const { length } = array;
      if (-length <= index && index < length) {
        const key = correctIndex(index, length);
        array.splice(key, 1);
        return array;
      }
      return array;
    };
    return super.delete(Curator, curate);
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
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      return array.concat(...values);
    };
    this.__pile(Curator, curate);
    return this;
  }

  static concat(array, values) {
    return array.concat(...values);
  }

  concatIf(bool, ...values) {
    return bool ? this.concat(...values) : this;
  }

  insert(index, value) {
    if (!isNumber(index)) {
      throw new TypeError("1st argument must be Number");
    }
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      const { length } = array;
      if (-length <= index && index <= length) {
        const key = correctIndex(index, length);
        array.splice(key, 0, value);
      }
      return array;
    };
    this.__pile(Curator, curate);
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

  insertIf(bool, index, value) {
    if (!isNumber(index)) {
      throw new TypeError("2nd argument must be Number");
    }
    return bool ? this.insert(index, value) : this;
  }

  push(value) {
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      array.push(value);
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static push(array, value) {
    const result = this.copy(array);
    result.push(value);
    return result;
  }

  pushIf(bool, value) {
    return bool ? this.push(value) : this;
  }

  pop() {
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      array.pop();
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static pop(array) {
    const result = this.copy(array);
    result.pop();
    return result;
  }

  popIf(bool) {
    return bool ? this.pop() : this;
  }

  unshift(value) {
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      array.unshift(value);
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static unshift(array, value) {
    const result = this.copy(array);
    result.unshift(value);
    return result;
  }

  unshiftIf(bool, value) {
    return bool ? this.unshift(value) : this;
  }

  shift() {
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      array.shift();
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static shift(array) {
    const result = this.copy(array);
    result.shift();
    return result;
  }

  shiftIf(bool) {
    return bool ? this.shift() : this;
  }

  setIn(keys, value) {
    if (!isArray(keys)) {
      throw new TypeError("1st argument must be Array");
    }
    return super.setIn(keys, value);
  }

  setInIf(bool, keys, value) {
    if (!isArray(keys)) {
      throw new TypeError("2nd argument must be Array");
    }
    return super.setInIf(bool, keys, value);
  }

  flatten() {
    const curate = iter => {
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
    this.__pile(Curator, curate);
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

  flattenIf(bool) {
    return bool ? this.flatten() : this;
  }

  flatMap(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const curate = iter => {
      let array = [];
      let key;
      let value;
      while (!({ key, value } = iter.next()).done) {
        const val = func(value, key);
        if (isArray(val)) {
          array = array.concat(val);
        } else {
          array.push(val);
        }
      }
      return array;
    };
    this.__pile(Curator, curate);
    return this;
  }

  static flatMap(array, func) {
    let result = [];
    array.forEach((v, i) => {
      const value = func(v, i);
      if (isArray(value)) {
        result = result.concat(value);
      } else {
        result.push(value);
      }
    });
    return result;
  }

  flatMapIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return bool ? this.flatMap(func) : this;
  }

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

  // TODO: chunk() (paging method)

  // TODO: sliding() from Scala

  // TODO: static range()

  /* consumer */

  // TODO: first() / head()

  // TODO: tail() === shift() from Scala

  // TODO: init() === pop() from Scala

  // TODO: last()

  reduce(func, init) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.reduce(func, init);
  }

  static reduce(array, func, init) {
    return init === undefined ? array.reduce(func) : array.reduce(func, init);
  }

  // TODO: reduceRight()
  // TODO: scan() from Scala
  // TODO: scanRight() from Scala

  // TODO: splitAt() from Scala

  every(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.every(func);
  }

  static every(array, func) {
    return array.every(func);
  }

  some(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.some(func);
  }

  static some(array, func) {
    return array.some(func);
  }

  find(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.find(func);
  }

  static find(array, func) {
    for (let i = 0, { length } = array; i < length; i += 1) {
      const value = array[i];
      if (func(value, i)) {
        return value;
      }
    }
    return undefined;
  }

  findLast(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    const finalize = iter => {
      let key;
      let value;
      while (!({ key, value } = iter.prev()).done) {
        if (func(value, key)) {
          return value;
        }
      }
      return undefined;
    };
    return this.__consume(finalize);
  }

  static findLast(array, func) {
    for (let i = array.length - 1; i > -1; i -= 1) {
      const value = array[i];
      if (func(value, i)) {
        return value;
      }
    }
    return undefined;
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

  forEach(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.forEach(func);
  }

  static forEach(array, func) {
    return array.forEach(func);
  }
}
