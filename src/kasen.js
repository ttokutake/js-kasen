const { default: KasenArray } = require("./array");
const { default: KasenObject } = require("./object");
const { isNumber, isArray, isObject, isFunction } = require("./type");

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
  return new Coll(coll);
}

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

Kasen.filter = (coll, func) => {
  const Coll = choose(coll);
  if (!Coll) {
    throw new TypeError("1st argument must be Array or Object");
  }
  if (!isFunction(func)) {
    throw new TypeError("2nd argument must be Function");
  }
  return Coll.filter(coll, func);
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
