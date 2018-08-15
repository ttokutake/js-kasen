const clone = require('clone');

class Iterator {
  constructor(array, isReverse) {
    this.array = array;
    this.i = isReverse ? array.length - 1 : 0;
    this.end = isReverse ? -1 : array.length;
    this.step = isReverse ? -1 : 1;
  }

  next() {
    if (this.i === this.end) {
      return {done: true};
    }
    const key = this.i;
    const value = this.array[key];
    this.i += this.step;
    return {key, value, done: false};
  }
}

class KasenArray {
  __reset(array, doClone) {
    this.__array = doClone ? clone(array) : array;
    this.__methods = [];
    this.__isReverse = false;
  }

  constructor(array) {
    this.__reset(array, true);
  }

  map(func) {
    this.__methods.push(['map', [func]]);
    return this;
  }

  reverse() {
    this.__isReverse = !this.__isReverse;
    return this;
  }

  __consume() {
    const coll = [];
    const iter = new Iterator(this.__array, this.__isReverse);
    let key, value;
    while (!({key, value} = iter.next()).done) {
      let final = value;
      this.__methods.forEach(([method, args]) => {
        switch (method) {
          case 'map':
            const [func] = args;
            final = func(final, key);
            break;
          default:
            throw new Error('method not found');
        }
      });
      coll.push(final);
    }
    return coll;
  }

  set(index, value) {
    if (index > this.__array.length) {
      throw new Error('cannot set');
    }
    const coll = this.__consume();
    const key = index < 0 ? this.__array.length + ((index + 1) % this.__array.length) - 1 : index;
    coll[key] = value;
    this.__reset(coll, false);
    return this;
  }

  toJs() {
    const coll = this.__consume();
    this.__reset(coll, true);
    return coll;
  }

  reduce(func, init) {
    const coll = this.toJs();
    this.__reset(coll, false);
    let acc = init;
    let tail = coll;
    if (acc === undefined) {
      if (tail.length === 0) {
        throw new Error('cannot reduce');
      }
      [acc, ...tail] = coll;
    }
    tail.forEach((value, index) => {
      acc = func(acc, value, index);
    });
    return acc;
  }
}

module.exports = KasenArray;
