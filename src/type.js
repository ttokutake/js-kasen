export function isNumber(v) {
  return typeof v === "number";
}

export function isString(v) {
  return typeof v === "string";
}

export function isArray(v) {
  return Array.isArray(v);
}

export function isFunction(v) {
  return typeof v === "function";
}

export function isObject(v) {
  return typeof v === "object" && v !== null && !isArray(v);
}
