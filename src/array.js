const Collection = require("./collection");
const { Next, Gone } = require("./state");

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

class KasenArray extends Collection {
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

  set(index, value) {
    const func = array => {
      if (index < -array.length || array.length < index) {
        throw new Error("cannot set");
      }
      const key =
        index < 0 ? array.length + ((index + 1) % array.length) - 1 : index;
      array[key] = value; // eslint-disable-line no-param-reassign
      return array;
    };
    return super.set(func);
  }

  static reduce(array, func, init) {
    return init === undefined ? array.reduce(func) : array.reduce(func, init);
  }
}

module.exports = KasenArray;
