const _ = require("../src/array");

describe("Array", () => {
  describe("map()", () => {
    test("ok", () => {
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
      // TODO: static method
    });
  });

  describe("filter()", () => {
    test("ok", () => {
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
      // TODO: static method
    });
  });

  describe("take()", () => {
    test("ok", () => {
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
      ios.forEach(([input, num, expected]) => {
        const array = new _(input);
        const result = array.take(num).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
    });
  });

  describe("reverse()", () => {
    test("ok", () => {
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
      // TODO: static method
    });
  });

  describe("set()", () => {
    test("ok", () => {
      const ios = [
        [[], 0, [10]],
        [[1], -1, [10]],
        [[1], 0, [10]],
        [[1], 1, [1, 10]],
        [[1, 2], -2, [10, 2]],
        [[1, 2], -1, [1, 10]],
        [[1, 2], 0, [10, 2]],
        [[1, 2], 1, [1, 10]],
        [[1, 2], 2, [1, 2, 10]]
      ];
      ios.forEach(([input, index, expected]) => {
        const array = new _(input);
        const result = array.set(index, 10).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
    });

    // TODO: error
  });

  describe("reduce()", () => {
    test("ok", () => {
      const ios = [
        [[], 0, 0],
        [[1], undefined, 1],
        [[1], 10, 11],
        [[1, 2], undefined, 3],
        [[1, 2], 10, 13],
        [[1, 2, 3], undefined, 6],
        [[1, 2, 3], 10, 16]
      ];
      ios.forEach(([input, init, expected]) => {
        const array = new _(input);
        const result =
          init === undefined
            ? array.reduce((acc, v) => acc + v)
            : array.reduce((acc, v) => acc + v, init);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, init, expected]) => {
        const result =
          init === undefined
            ? _.reduce(input, (acc, v) => acc + v)
            : _.reduce(input, (acc, v) => acc + v, init);
        expect(result).toEqual(expected);
      });
    });

    // TODO: error
  });

  // TODO: every()
  // TODO: find()
  // TODO: findLast()
  // TODO: combination tests (Some, None, Next, Gone)
});
