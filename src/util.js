import { isArray, isObject } from "./type";

export function compare(v1, v2) {
  if (v1 > v2) {
    return 1;
  }
  if (v1 < v2) {
    return -1;
  }
  return 0;
}

export function copy(coll) {
  if (isArray(coll)) {
    return coll.slice();
  }
  if (isObject(coll)) {
    const object = {};
    Object.keys(coll).forEach(key => {
      object[key] = coll[key];
    });
    return object;
  }
  return coll;
}
