import Kasen from "../dist/kasen";

describe("Array", () => {
  describe("clone()", () => {
    test("ok", () => {
      const array = Kasen([1, 2, 3]).map(v => v + 1);
      const array2 = array.clone().map(v => v + 1);
      expect(array.toJs()).toEqual([2, 3, 4]);
      expect(array2.toJs()).toEqual([3, 4, 5]);
    });
  });

  describe("map()", () => {
    test("ok", () => {
      const ios = [
        [[], []],
        [[1], [2]],
        [[1, 2], [2, 3]],
        [[1, 2, 3], [2, 3, 4]]
      ];
      ios.forEach(([input, expected]) => {
        const array = Kasen(input);
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
        const array = Kasen(input);
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
        const array = Kasen(input);
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
        const array = Kasen(input);
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
        const array = Kasen(input);
        const result = array.set(index, 10).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
    });

    test("error", () => {
      const ios = [
        [[], -1],
        [[], 1],
        [[1], -2],
        [[1], 2],
        [[1, 2], -3],
        [[1, 2], 3]
      ];
      ios.forEach(([input, index]) => {
        const array = Kasen(input);
        const run = () => array.set(index, 10).toJs();
        expect(run).toThrow(RangeError);
      });
      // TODO: static method
    });
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
        const array = Kasen(input);
        const result =
          init === undefined
            ? array.reduce((acc, v) => acc + v)
            : array.reduce((acc, v) => acc + v, init);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, init, expected]) => {
        const result =
          init === undefined
            ? Kasen.reduce(input, (acc, v) => acc + v)
            : Kasen.reduce(input, (acc, v) => acc + v, init);
        expect(result).toEqual(expected);
      });
    });

    // TODO: error
  });

  describe("every()", () => {
    test("ok", () => {
      const ios = [
        [[], true],
        [[1], true],
        [[2], false],
        [[1, 2], false],
        [[1, 2, 3], false],
        [[1, 3, 5], true]
      ];
      ios.forEach(([input, expected]) => {
        const array = Kasen(input);
        const result = array.every(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      // TODO: static method
    });
  });

  describe("find()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined],
        [[1], 1],
        [[2], undefined],
        [[1, 2], 1],
        [[2, 3], 3],
        [[1, 2, 3], 1],
        [[2, 4, 5], 5]
      ];
      ios.forEach(([input, expected]) => {
        const array = Kasen(input);
        const result = array.find(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      // TODO: static method
    });
  });

  describe("findLast()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined],
        [[1], 1],
        [[2], undefined],
        [[1, 2], 1],
        [[2, 3], 3],
        [[1, 2, 3], 3],
        [[1, 2, 4], 1]
      ];
      ios.forEach(([input, expected]) => {
        const array = Kasen(input);
        const result = array.findLast(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      // TODO: static method
    });
  });

  // TODO: combination tests
});
