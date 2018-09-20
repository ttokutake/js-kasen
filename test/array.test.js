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

  describe("tap()", () => {
    test("ok", () => {
      const inputs = [[], [1], [1, 2], [1, 2, 3]];
      inputs.forEach(input => {
        const result = Kasen(input)
          .tap(v => v + 1)
          .toJs();
        expect(result).toEqual(input);
      });
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
        const result = Kasen(input)
          .map(v => v + 1)
          .toJs();
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
        const result = Kasen(input)
          .filter(v => v % 2 === 0)
          .toJs();
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
        const result = Kasen(input)
          .reverse()
          .toJs();
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
        const result = Kasen(input)
          .take(num)
          .toJs();
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
        const result = Kasen(input)
          .set(index, 10)
          .toJs();
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
        const run = () =>
          Kasen(input)
            .set(index, 10)
            .toJs();
        expect(run).toThrow(RangeError);
      });
      // TODO: static method
    });
  });

  describe("toJs()", () => {
    test("ok", () => {
      const inputs = [[], [1], [1, 2], [1, 2, 3]];
      inputs.forEach(input => {
        const result = Kasen(input).toJs();
        expect(result).toEqual(input);
      });
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
        const result =
          init === undefined
            ? Kasen(input).reduce((acc, v) => acc + v)
            : Kasen(input).reduce((acc, v) => acc + v, init);
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

    test("error", () => {
      {
        const run = () => Kasen([]).reduce((acc, v) => acc + v);
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.reduce([], (acc, v) => acc + v);
        expect(run).toThrow(TypeError);
      }
    });
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
        const result = Kasen(input).every(v => v % 2 === 1);
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
        const result = Kasen(input).find(v => v % 2 === 1);
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
        const result = Kasen(input).findLast(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      // TODO: static method
    });
  });

  describe("forEach()", () => {
    test("ok", () => {
      const inputs = [[], [1], [1, 2], [1, 2, 3]];
      inputs.forEach(input => {
        const result = Kasen(input).forEach(v => v + 1);
        expect(result).toBeUndefined();
      });
      // TODO: static method
    });
  });

  describe("combination", () => {
    test("each key after filter()", () => {
      // TODO: implement
    });

    test("key after reverse()", () => {
      // TODO: implement
    });

    test("double reverse()", () => {
      // TODO: implement
    });
  });
});
