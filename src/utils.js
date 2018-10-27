export function copyArray(array) {
  return array.slice();
}

export function copyObject(object) {
  const result = {};
  Object.keys(object).forEach(key => {
    result[key] = object[key];
  });
  return result;
}
