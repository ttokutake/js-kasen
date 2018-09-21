const { default: KasenArray } = require("./array");
const { default: KasenObject } = require("./object");
const { isArray, isObject, isFunction } = require("./type");

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

module.exports = Kasen;
