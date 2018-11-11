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

Kasen.map = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.map(coll, func);
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

Kasen.filter = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(func) || func === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  const fn = func || (v => v);
  return Coll.filter(coll, fn);
};

Kasen.filterNot = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.filterNot(coll, func);
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

Kasen.takeWhile = (array, func) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.takeWhile(array, func);
};

Kasen.takeUntil = (array, func) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.takeUntil(array, func);
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

Kasen.skipWhile = (array, func) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.skipWhile(array, func);
};

Kasen.skipUntil = (array, func) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.skipUntil(array, func);
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

Kasen.update = (coll, key, func) => {
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
  if (!isFunction(func)) {
    throw new TypeError("3rd argument must be Function");
  }
  return Coll.update(coll, key, func);
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

Kasen.mergeWith = (object, func, ...objects) => {
  if (!isObject(object)) {
    throw new TypeError("1st argument must be Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError("Each argument except 2nd one must be Object");
    }
  }
  return KasenObject.mergeWith(object, func, objects);
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

Kasen.updateIn = (coll, keys, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isArray(keys)) {
    throw new TypeError("2nd argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("3rd argument must be Function");
  }
  return Coll.updateIn(coll, keys, func);
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

Kasen.flatMap = (array, func) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.flatMap(array, func);
};

Kasen.isEmpty = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  return Coll.isEmpty(coll);
};

Kasen.count = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!(isFunction(func) || func === undefined)) {
    throw new TypeError("2nd argument must be Function or Undefined");
  }
  return Coll.count(coll, func);
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

Kasen.reduce = (coll, func, init) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.reduce(coll, func, init);
};

Kasen.every = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.every(coll, func);
};

Kasen.some = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.some(coll, func);
};

Kasen.find = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.find(coll, func);
};

Kasen.findLast = (array, func) => {
  if (!isArray(array)) {
    throw new TypeError("1st argument must be Array");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return KasenArray.findLast(array, func);
};

Kasen.forEach = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.forEach(coll, func);
};

module.exports = Kasen;
