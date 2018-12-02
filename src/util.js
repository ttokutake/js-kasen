// eslint-disable-next-line import/prefer-default-export
export function compare(v1, v2) {
  if (v1 > v2) {
    return 1;
  }
  if (v1 < v2) {
    return -1;
  }
  return 0;
}
