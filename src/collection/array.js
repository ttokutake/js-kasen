import Collection from ".";
import { OriginIterator, Curator } from "../iterator";
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
  static __iterator(array) {
    return new ArrayIterator(array);
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

  mapIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return super.mapIf(bool, func);
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

  filterIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("2nd argument must be Function");
    }
    return super.filterIf(bool, func);
  }

  filterNot(func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filterNot(func);
  }

  filterNotIf(bool, func) {
    if (!isFunction(func)) {
      throw new TypeError("1st argument must be Function");
    }
    return super.filterNotIf(bool, func);
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
    for (let i = 0, { length } = array; i < length; i += 1) {
      const value = array[i];
      if (skipped && !func(value, i)) {
        skipped = false;
      }
      if (!skipped) {
        result.push(value);
      }
    }
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
    return this.update(index, () => value);
  }

  static set(array, index, value) {
    return this.update(array, index, () => value);
  }

  setIf(bool, index, value) {
    if (!isNumber(index)) {
      throw new TypeError("2nd argument must be Number");
    }
    return super.setIf(bool, index, value);
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
    const result = array.slice();
    const { length } = result;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      result[key] = func(array[key]);
    }
    return result;
  }

  updateIf(bool, index, func) {
    if (!isNumber(index)) {
      throw new TypeError("2nd argument must be Number");
    }
    if (!isFunction(func)) {
      throw new TypeError("3rd argument must be Function");
    }
    return super.updateIf(bool, index, func);
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
    const result = array.slice();
    const { length } = result;
    if (-length <= index && index < length) {
      const key = correctIndex(index, length);
      result.splice(key, 1);
    }
    return result;
  }

  deleteIf(bool, index) {
    if (!isNumber(index)) {
      throw new TypeError("2nd argument must be Number");
    }
    return super.deleteIf(bool, index);
  }

  concat(...arrays) {
    for (let i = 0, { length } = arrays; i < length; i += 1) {
      if (!isArray(arrays[i])) {
        throw new TypeError("Each argument must be Array");
      }
    }
    const curate = iter => {
      const array = ArrayIterator.curate(iter);
      return array.concat(...arrays);
    };
    this.__pile(Curator, curate);
    return this;
  }

  static concat(arrays) {
    return [].concat(...arrays);
  }

  concatIf(bool, ...arrays) {
    for (let i = 0, { length } = arrays; i < length; i += 1) {
      if (!isArray(arrays[i])) {
        throw new TypeError("Each argument except 1st one must be Array");
      }
    }
    return bool ? this.concat(...arrays) : this;
  }

  // TODO: insert()

  // TODO: push()

  // TODO: pop()

  // TODO: unshift()

  // TODO: shift()

  // TODO: flatten()

  // TODO: flatMap()

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

  // TODO: sliding() from Scala

  // TODO: splitAt() from Scala

  // TODO: chunk() (paging method)

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

  // TODO: range()

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
