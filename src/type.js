export function isNumber(v) {
  return typeof v === "number";
}

export function isArray(v) {
  return Array.isArray(v);
}

export function isObject(v) {
  return typeof v === "object";
}

export function isFunction(v) {
  return typeof v === "function";
}
