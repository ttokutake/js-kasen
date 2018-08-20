const _ = require("../src/array");

describe("Array", () => {
  describe("map()", () => {
    test("should return mapped array", () => {
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
});
