const { default: KasenArray } = require("./array");
const { default: KasenObject } = require("./object");

function Kasen(coll) {
  if (Array.isArray(coll)) {
    return new KasenArray(coll);
  }
  if (typeof coll === "object") {
    return new KasenObject(coll);
  }
  throw new TypeError('"coll" must be Array or Object');
}

Kasen.map = (coll, func) => {
  if (Array.isArray(coll)) {
    return KasenArray.map(coll, func);
  }
  if (typeof coll === "object") {
    return KasenObject.map(coll, func);
  }
  throw new TypeError('"coll" must be Array or Object');
};

Kasen.reduce = (coll, func, init) => {
  if (Array.isArray(coll)) {
    return KasenArray.reduce(coll, func, init);
  }
  if (typeof coll === "object") {
    return KasenObject.reduce(coll, func, init);
  }
  throw new TypeError('"coll" must be Array or Object');
};

module.exports = Kasen;
