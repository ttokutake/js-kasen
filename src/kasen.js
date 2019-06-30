const { default: KasenArray } = require("./collection/array");
const { default: KasenObject } = require("./collection/object");
const {
  FIRST_ARGUMENT_MUST_BE_ARRAY,
  FIRST_ARGUMENT_MUST_BE_NUMBER,
  FIRST_ARGUMENT_MUST_BE_OBJECT,
  FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT,
  SECOND_ARGUMENT_MUST_BE_ARRAY,
  SECOND_ARGUMENT_MUST_BE_FUNCTION,
  SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED,
  SECOND_ARGUMENT_MUST_BE_NUMBER,
  SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING,
  SECOND_ARGUMENT_MUST_BE_NUMBER_AND_OVER_1,
  SECOND_ARGUMENT_MUST_BE_STRING_OR_UNDEFINED,
  THIRD_ARGUMENT_MUST_BE_FUNCTION,
  THIRD_ARGUMENT_MUST_BE_NUMBER,
  THIRD_ARGUMENT_MUST_BE_NUMBER_OR_UNDEFINED,
  THIRD_ARGUMENT_MUST_BE_NUMBER_EXCLUDING_0_OR_UNDEFINED,
  EACH_ARGUMENT_MUST_BE_ARRAY,
  EACH_ARGUMENT_MUST_BE_OBJECT,
  EACH_ARGUMENT_EXCEPT_SECOND_ONE_MUST_BE_ARRAY,
  EACH_ARGUMENT_EXCEPT_SECOND_ONE_MUST_BE_OBJECT
} = require("./error-message");
const { isNumber, isString, isObject, isArray, isFunction } = require("./type");
const { compare } = require("./util");

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
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return new Coll(coll, null);
}

Kasen.copy = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.copy(coll);
};

Kasen.map = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.map(coll, fun);
};

Kasen.pluck = (coll, key) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isNumber(key) || isString(key))) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
  }
  return Coll.pluck(coll, key);
};

Kasen.filter = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || (v => v);
  return Coll.filter(coll, fn);
};

Kasen.filterNot = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.filterNot(coll, fun);
};

Kasen.reverse = array => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.reverse(array);
};

Kasen.pick = (object, keys) => {
  if (!isObject(object)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenObject.pick(object, keys);
};

Kasen.flip = (object, fun) => {
  if (!isObject(object)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_OBJECT);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || (v => v);
  return KasenObject.flip(object, fn);
};

Kasen.take = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(num)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.take(array, num);
};

Kasen.takeLast = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(num)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.takeLast(array, num);
};

Kasen.takeWhile = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.takeWhile(array, fun);
};

Kasen.takeUntil = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.takeUntil(array, fun);
};

Kasen.skip = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(num)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.skip(array, num);
};

Kasen.skipLast = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(num)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.skipLast(array, num);
};

Kasen.skipWhile = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.skipWhile(array, fun);
};

Kasen.skipUntil = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.skipUntil(array, fun);
};

Kasen.set = (coll, key, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
  }
  return Coll.set(coll, key, value);
};

Kasen.update = (coll, key, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
  }
  if (!isFunction(fun)) {
    throw new TypeError(THIRD_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.update(coll, key, fun);
};

Kasen.delete = (coll, key) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
  }
  return Coll.delete(coll, key);
};

Kasen.deleteAll = (object, keys) => {
  if (!isObject(object)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenObject.deleteAll(object, keys);
};

Kasen.concat = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.concat(array, values);
};

Kasen.merge = (...objects) => {
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError(EACH_ARGUMENT_MUST_BE_OBJECT);
    }
  }
  return KasenObject.merge(objects);
};

Kasen.assign = Kasen.merge;

Kasen.mergeWith = (object, fun, ...objects) => {
  if (!isObject(object)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError(EACH_ARGUMENT_EXCEPT_SECOND_ONE_MUST_BE_OBJECT);
    }
  }
  return KasenObject.mergeWith(object, fun, objects);
};

Kasen.mergeDeep = (...objects) => {
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError(EACH_ARGUMENT_MUST_BE_OBJECT);
    }
  }
  return KasenObject.mergeDeep(objects);
};

Kasen.mergeDeepWith = (object, fun, ...objects) => {
  if (!isObject(object)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  for (let i = 0, { length } = objects; i < length; i += 1) {
    if (!isObject(objects[i])) {
      throw new TypeError(EACH_ARGUMENT_EXCEPT_SECOND_ONE_MUST_BE_OBJECT);
    }
  }
  return KasenObject.mergeDeepWith(object, fun, objects);
};

Kasen.insert = (array, index, value) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(index)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.insert(array, index, value);
};

Kasen.push = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.push(array, values);
};

Kasen.pop = array => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.pop(array);
};

Kasen.unshift = (array, ...values) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.unshift(array, values);
};

Kasen.shift = array => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.shift(array);
};

Kasen.splice = (array, index, num, ...values) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(index)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (!isNumber(num)) {
    throw new TypeError(THIRD_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.splice(array, index, num, values);
};

Kasen.setIn = (coll, keys, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  return Coll.setIn(coll, keys, value);
};

Kasen.updateIn = (coll, keys, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(THIRD_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.updateIn(coll, keys, fun);
};

Kasen.deleteIn = (coll, keys) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  return Coll.deleteIn(coll, keys);
};

Kasen.flatten = array => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.flatten(array);
};

Kasen.flatMap = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.flatMap(array, fun);
};

Kasen.zip = (...arrays) => {
  for (let i = 0, { length } = arrays; i < length; i += 1) {
    if (!isArray(arrays[i])) {
      throw new TypeError(EACH_ARGUMENT_MUST_BE_ARRAY);
    }
  }
  return KasenArray.zip(arrays);
};

Kasen.zipAll = (...arrays) => {
  for (let i = 0, { length } = arrays; i < length; i += 1) {
    if (!isArray(arrays[i])) {
      throw new TypeError(EACH_ARGUMENT_MUST_BE_ARRAY);
    }
  }
  return KasenArray.zipAll(arrays);
};

Kasen.zipWith = (array, fun, ...arrays) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  for (let i = 0, { length } = arrays; i < length; i += 1) {
    if (!isArray(arrays[i])) {
      throw new TypeError(EACH_ARGUMENT_EXCEPT_SECOND_ONE_MUST_BE_ARRAY);
    }
  }
  return KasenArray.zipWith(array, fun, arrays);
};

Kasen.sort = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || compare;
  return KasenArray.sort(array, fn);
};

Kasen.unique = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || (v => v);
  return KasenArray.unique(array, fn);
};

Kasen.chunk = (array, num) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!(isNumber(num) && num >= 1)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_AND_OVER_1);
  }
  return KasenArray.sliding(array, num, num);
};

Kasen.sliding = (array, num, step) => {
  if (!(isNumber(num) && num >= 1)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_AND_OVER_1);
  }
  if (!((isNumber(step) && step >= 1) || step === undefined)) {
    throw new TypeError(THIRD_ARGUMENT_MUST_BE_NUMBER_OR_UNDEFINED);
  }
  const stp = step || 1;
  return KasenArray.sliding(array, num, stp);
};

Kasen.range = (start, end, step) => {
  if (!isNumber(start)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_NUMBER);
  }
  if (!isNumber(end)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (!(isNumber(step) || step === undefined) || step === 0) {
    throw new TypeError(THIRD_ARGUMENT_MUST_BE_NUMBER_EXCLUDING_0_OR_UNDEFINED);
  }
  return KasenArray.range(start, end, step || 1);
};

Kasen.range._ = (start, end, step) => {
  const array = Kasen.range(start, end, step);
  return new KasenArray(array, null);
};

Kasen.repeat = (value, num) => {
  if (!isNumber(num)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.repeat(value, num);
};

Kasen.repeat._ = (value, num) => {
  const array = Kasen.repeat(value, num);
  return new KasenArray(array, null);
};

Kasen.isEmpty = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.isEmpty(coll);
};

Kasen.count = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  return Coll.count(coll, fun);
};

Kasen.get = (coll, key, protection) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
  }
  return Coll.get(coll, key, protection);
};

Kasen.has = (coll, key) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (isArray(coll) && !isNumber(key)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  if (isObject(coll) && !(isNumber(key) || isString(key))) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER_OR_STRING);
  }
  return Coll.has(coll, key);
};

Kasen.includes = (coll, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.includes(coll, value);
};

Kasen.getIn = (coll, keys, protection) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  return Coll.getIn(coll, keys, protection);
};

Kasen.hasIn = (coll, keys) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isArray(keys)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_ARRAY);
  }
  return Coll.hasIn(coll, keys);
};

Kasen.head = array => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.head(array);
};

Kasen.first = Kasen.head;

Kasen.tail = Kasen.shift;

Kasen.init = Kasen.pop;

Kasen.last = array => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.last(array);
};

Kasen.splitAt = (array, index) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isNumber(index)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_NUMBER);
  }
  return KasenArray.splitAt(array, index);
};

Kasen.toArray = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.toArray(coll);
};

Kasen.toObject = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.toObject(coll);
};

Kasen.reduce = (coll, fun, init) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.reduce(coll, fun, init);
};

Kasen.reduceRight = (array, fun, init) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.reduceRight(array, fun, init);
};

Kasen.reduceWhile = (coll, fun, init) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.reduceWhile(coll, fun, init);
};

Kasen.scan = (coll, fun, init) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.scan(coll, fun, init);
};

Kasen.scanRight = (array, fun, init) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.scanRight(array, fun, init);
};

Kasen.partition = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.partition(coll, fun);
};

Kasen.join = (coll, delimiter) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isString(delimiter) || delimiter === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_STRING_OR_UNDEFINED);
  }
  return Coll.join(coll, delimiter);
};

Kasen.groupBy = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.groupBy(coll, fun);
};

Kasen.every = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.every(coll, fun);
};

Kasen.some = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.some(coll, fun);
};

Kasen.find = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.find(coll, fun);
};

Kasen.findLast = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.findLast(array, fun);
};

Kasen.findEntry = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.findEntry(coll, fun);
};

Kasen.findLastEntry = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.findLastEntry(array, fun);
};

Kasen.findKey = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.findKey(coll, fun);
};

Kasen.findLastKey = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.findLastKey(array, fun);
};

Kasen.findIndex = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.findIndex(array, fun);
};

Kasen.findLastIndex = (array, fun) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return KasenArray.findLastIndex(array, fun);
};

Kasen.keyOf = (coll, value) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.keyOf(coll, value);
};

Kasen.lastKeyOf = (array, value) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.lastKeyOf(array, value);
};

Kasen.indexOf = (array, value) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.indexOf(array, value);
};

Kasen.lastIndexOf = (array, value) => {
  if (!isArray(array)) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY);
  }
  return KasenArray.lastIndexOf(array, value);
};

Kasen.sum = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || (v => v);
  return Coll.sum(coll, fn);
};

Kasen.max = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || ((v1, v2) => v1 > v2);
  return Coll.max(coll, fn);
};

Kasen.min = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!(isFunction(fun) || fun === undefined)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION_OR_UNDEFINED);
  }
  const fn = fun || ((v1, v2) => v1 < v2);
  return Coll.max(coll, fn);
};

Kasen.equals = (left, right) => {
  if (left === right) {
    return true;
  }
  const Coll = choose(left);
  if (!Coll) {
    return false;
  }
  return Coll.equals(left, right);
};

Kasen.keys = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.keys(coll);
};

Kasen.values = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.values(coll);
};

Kasen.entries = coll => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  return Coll.entries(coll);
};

Kasen.forEach = (coll, fun) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError(FIRST_ARGUMENT_MUST_BE_ARRAY_OR_OBJECT);
  }
  if (!isFunction(fun)) {
    throw new TypeError(SECOND_ARGUMENT_MUST_BE_FUNCTION);
  }
  return Coll.forEach(coll, fun);
};

module.exports = Kasen;
