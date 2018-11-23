const hash = require("hash-sum");

const { default: KasenArray } = require("./collection/array");
const { default: KasenObject } = require("./collection/object");
const { isNumber, isString, isObject, isArray, isFunction } = require("./type");

function choose(coll) {
  if (isArray(coll)) {
    return KasenArray;
  }
  if (isObject(coll)) {
    return KasenObject;
  }
  return null;
}

function Kasen(coll) {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return new Coll(coll, null);
}

Kasen.copy = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.copy(coll);
};

Kasen.map = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.map(coll, fun);
};

Kasen.pluck = (coll, key) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isNumber(key) || isString(key))) {
    throw new TypeError("2nd argument must be Number or String");
  }
  return Coll.pluck(coll, key);
};

Kasen.filter = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  const fn = fun || (v => v);
  return Coll.filter(coll, fn);
};

Kasen.filterNot = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.filterNot(coll, fun);
};

Kasen.reverse = array => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.reverse(array);
};

Kasen.pick = (object, keys) => {
  if (!isObject(object)) {
    throw new TypeError("1st argument must be Object");
  }
  if (!isArray(keys)) {
    throw new TypeError("2nd argument must be Array");
  }
  return KasenObject.pick(object, keys);
};

Kasen.flip = (object, fun) => {
  if (!isObject(object)) {
    throw new TypeError("1st argument must be Object");
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  const fn = fun || (v => v);
  return KasenObject.flip(object, fn);
};

Kasen.take = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isNumber(num)) {
    throw new TypeError("2nd argument must be Number");
  }
  return KasenArray.take(array, num);
};

Kasen.takeLast = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isNumber(num)) {
    throw new TypeError("2nd argument must be Number");
  }
  return KasenArray.takeLast(array, num);
};

Kasen.takeWhile = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.takeWhile(array, fun);
};

Kasen.takeUntil = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.takeUntil(array, fun);
};

Kasen.skip = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isNumber(num)) {
    throw new TypeError("2nd argument must be Number");
  }
  return KasenArray.skip(array, num);
};

Kasen.skipLast = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isNumber(num)) {
    throw new TypeError("2nd argument must be Number");
  }
  return KasenArray.skipLast(array, num);
};

Kasen.skipWhile = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.skipWhile(array, fun);
};

Kasen.skipUntil = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.skipUntil(array, fun);
};

Kasen.set = (coll, key, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError("2nd argument must be Number");
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError("2nd argument must be Number or String");
  }
  return Coll.set(coll, key, value);
};

Kasen.update = (coll, key, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError("2nd argument must be Number");
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError("2nd argument must be Number or String");
  }
  if (!isFunction(fun)) {
    throw new TypeError("3rd argument must be Function");
  }
  return Coll.update(coll, key, fun);
};

Kasen.delete = (coll, key) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError("2nd argument must be Number");
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError("2nd argument must be Number or String");
  }
  return Coll.delete(coll, key);
};

Kasen.deleteAll = (object, keys) => {
  if (!isObject(object)) {
    throw new TypeError("1st argument must be Object");
  }
  if (!isArray(keys)) {
    throw new TypeError("2nd argument must be Array");
  }
  return KasenObject.deleteAll(object, keys);
};

Kasen.concat = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.concat(array, values);
};

Kasen.merge = (...objects) => {
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError("Each argument must be Object");
    }
  }
  return KasenObject.merge(objects);
};

Kasen.assign = (...objects) => {
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError("Each argument must be Object");
    }
  }
  return KasenObject.merge(objects);
};

Kasen.mergeWith = (object, fun, ...objects) => {
  if (!isObject(object)) {
    throw new TypeError("1st argument must be Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError("Each argument except 2nd one must be Object");
    }
  }
  return KasenObject.mergeWith(object, fun, objects);
};

Kasen.insert = (array, index, value) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isNumber(index)) {
    throw new TypeError("2nd argument must be Number");
  }
  return KasenArray.insert(array, index, value);
};

Kasen.push = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.push(array, values);
};

Kasen.pop = array => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.pop(array);
};

Kasen.unshift = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.unshift(array, values);
};

Kasen.shift = array => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.shift(array);
};

Kasen.setIn = (coll, keys, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isArray(keys)) {
    throw new TypeError("2nd argument must be Array");
  }
  return Coll.setIn(coll, keys, value);
};

Kasen.updateIn = (coll, keys, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isArray(keys)) {
    throw new TypeError("2nd argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("3rd argument must be Function");
  }
  return Coll.updateIn(coll, keys, fun);
};

Kasen.deleteIn = (coll, keys) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isArray(keys)) {
    throw new TypeError("2nd argument must be Array");
  }
  return Coll.deleteIn(coll, keys);
};

Kasen.flatten = array => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.flatten(array);
};

Kasen.flatMap = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.flatMap(array, fun);
};

Kasen.isEmpty = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.isEmpty(coll);
};

Kasen.count = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  return Coll.count(coll, fun);
};

Kasen.get = (coll, key, protection) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError("2nd argument must be Number");
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError("2nd argument must be Number or String");
  }
  return Coll.get(coll, key, protection);
};

Kasen.has = (coll, key) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError("2nd argument must be Number");
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError("2nd argument must be Number or String");
  }
  return Coll.has(coll, key);
};

Kasen.includes = (coll, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.includes(coll, value);
};

Kasen.head = array => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.head(array);
};

Kasen.first = Kasen.head;

Kasen.tail = Kasen.shift;

Kasen.init = Kasen.pop;

Kasen.last = array => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.last(array);
};

Kasen.splitAt = (array, index) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isNumber(index)) {
    throw new TypeError("2nd argument must be Number");
  }
  return KasenArray.splitAt(array, index);
};

Kasen.toArray = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.toArray(coll);
};

Kasen.toObject = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.toObject(coll);
};

Kasen.reduce = (coll, fun, init) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.reduce(coll, fun, init);
};

Kasen.reduceWhile = (coll, fun, init) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.reduceWhile(coll, fun, init);
};

Kasen.partition = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.partition(coll, fun);
};

Kasen.join = (coll, delimiter) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isString(delimiter) || delimiter === undefined)) {
    throw new TypeError("2nd argument must be String or Undefined");
  }
  return Coll.join(coll, delimiter);
};

Kasen.groupBy = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.groupBy(coll, fun);
};

Kasen.every = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.every(coll, fun);
};

Kasen.some = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.some(coll, fun);
};

Kasen.find = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.find(coll, fun);
};

Kasen.findLast = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.findLast(array, fun);
};

Kasen.findEntry = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.findEntry(coll, fun);
};

Kasen.findLastEntry = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.findLastEntry(array, fun);
};

Kasen.findKey = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.findKey(coll, fun);
};

Kasen.findLastKey = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.findLastKey(array, fun);
};

Kasen.findIndex = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.findIndex(array, fun);
};

Kasen.keyOf = (coll, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.keyOf(coll, value);
};

Kasen.lastKeyOf = (array, value) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.lastKeyOf(array, value);
};

Kasen.indexOf = (array, value) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.indexOf(array, value);
};

Kasen.lastIndexOf = (array, value) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  return KasenArray.lastIndexOf(array, value);
};

Kasen.sum = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  const fn = fun || (v => v);
  return Coll.sum(coll, fn);
};

Kasen.max = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  const fn = fun || ((v1, v2) => v1 > v2);
  return Coll.max(coll, fn);
};

Kasen.min = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  const fn = fun || ((v1, v2) => v1 < v2);
  return Coll.max(coll, fn);
};

Kasen.hashCode = hash;

Kasen.keys = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.keys(coll);
};

Kasen.values = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.values(coll);
};

Kasen.entries = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.entries(coll);
};

Kasen.forEach = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(fun)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.forEach(coll, fun);
};

module.exports = Kasen;
