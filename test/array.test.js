const _ = require("../src/array");

describe("Array", () => {
  describe("map()", () => {
    test("method", () => {
      const ios = [
        [[], []],
        [[1], [2]],
        [[1, 2], [2, 3]],
        [[1, 2, 3], [2, 3, 4]]
      ];
      ios.forEach(([input, expected]) => {
        const array = new _(input);
        const result = array.map(v => v + 1).toJs();
        expect(result).toEqual(expected);
      });
    });
  });

  describe("filter()", () => {
    test("method", () => {
      const ios = [
        [[], []],
        [[1], []],
        [[2], [2]],
        [[1, 2], [2]],
        [[1, 2, 3], [2]]
      ];
      ios.forEach(([input, expected]) => {
        const array = new _(input);
        const result = array.filter(v => v % 2 === 0).toJs();
        expect(result).toEqual(expected);
      });
    });
  });

  describe("take()", () => {
    test("method", () => {
      const ios = [
        [[], 0, []],
        [[1], 0, []],
        [[1, 2], 0, []],
        [[1, 2, 3], 0, []],
        [[], 1, []],
        [[1], 1, [1]],
        [[1, 2], 1, [1]],
        [[1, 2, 3], 1, [1]],
        [[], 2, []],
        [[1], 2, [1]],
        [[1, 2], 2, [1, 2]],
        [[1, 2, 3], 2, [1, 2]]
      ];
      ios.forEach(([input, arg, expected]) => {
        const array = new _(input);
        const result = array.take(arg).toJs();
        expect(result).toEqual(expected);
      });
    });
  });

  describe("reverse()", () => {
    test("method", () => {
      const ios = [
        [[], []],
        [[1], [1]],
        [[1, 2], [2, 1]],
        [[1, 2, 3], [3, 2, 1]]
      ];
      ios.forEach(([input, expected]) => {
        const array = new _(input);
        const result = array.reverse().toJs();
        expect(result).toEqual(expected);
      });
    });
  });
});
