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
      ios.forEach(([input, expected]) => {
        const result = Kasen.map(input, v => v + 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("mapIf()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .mapIf(false, v => v + 1)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .mapIf(true, v => v + 1)
          .toJs();
        expect(result).toEqual([2, 3, 4]);
      }
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.filter(input, v => v % 2 === 0);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("filterIf()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .filterIf(false, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .filterIf(true, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual([2]);
      }
    });
  });

  describe("filterNot()", () => {
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
          .filterNot(v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.filterNot(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("filterNotIf()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .filterNotIf(false, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .filterNotIf(true, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual([2]);
      }
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.reverse(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("reverseIf()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .reverseIf(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .reverseIf(true)
          .toJs();
        expect(result).toEqual([3, 2, 1]);
      }
    });
  });

  describe("take()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[1], -1, []],
        [[1, 2], -1, []],
        [[1, 2, 3], -1, []],
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
      ios.forEach(([input, num, expected]) => {
        const result = Kasen.take(input, num);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("takeIf()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .takeIf(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .takeIf(true, 2)
          .toJs();
        expect(result).toEqual([1, 2]);
      }
    });
  });

  describe("takeLast()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[1], -1, []],
        [[1, 2], -1, []],
        [[1, 2, 3], -1, []],
        [[], 0, []],
        [[1], 0, []],
        [[1, 2], 0, []],
        [[1, 2, 3], 0, []],
        [[], 1, []],
        [[1], 1, [1]],
        [[1, 2], 1, [2]],
        [[1, 2, 3], 1, [3]],
        [[], 2, []],
        [[1], 2, [1]],
        [[1, 2], 2, [1, 2]],
        [[1, 2, 3], 2, [2, 3]]
      ];
      ios.forEach(([input, num, expected]) => {
        const result = Kasen(input)
          .takeLast(num)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, num, expected]) => {
        const result = Kasen.takeLast(input, num);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("takeLastIf()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .takeLastIf(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .takeLastIf(true, 2)
          .toJs();
        expect(result).toEqual([2, 3]);
      }
    });
  });

  describe("takeWhile()", () => {
    test("ok", () => {
      const ios = [
        [[], []],
        [[1], [1]],
        [[2], []],
        [[1, 2], [1]],
        [[1, 3], [1, 3]],
        [[2, 3], []],
        [[1, 2, 3], [1]],
        [[1, 3, 4], [1, 3]],
        [[1, 3, 5], [1, 3, 5]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .takeWhile(v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(expected);
      });
    });
  });

  describe("set()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[], 0, []],
        [[1], -2, [1]],
        [[1], -1, [10]],
        [[1], 0, [10]],
        [[1], 1, [1]],
        [[1, 2], -3, [1, 2]],
        [[1, 2], -2, [10, 2]],
        [[1, 2], -1, [1, 10]],
        [[1, 2], 0, [10, 2]],
        [[1, 2], 1, [1, 10]],
        [[1, 2], 2, [1, 2]]
      ];
      ios.forEach(([input, index, expected]) => {
        const result = Kasen(input)
          .set(index, 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, index, expected]) => {
        const result = Kasen.set(input, index, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("setIf()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .setIf(false, 0, 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .setIf(true, 0, 10)
          .toJs();
        expect(result).toEqual([10, 2]);
      }
    });
  });

  describe("update()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[], 0, []],
        [[1], -2, [1]],
        [[1], -1, [11]],
        [[1], 0, [11]],
        [[1], 1, [1]],
        [[1, 2], -3, [1, 2]],
        [[1, 2], -2, [11, 2]],
        [[1, 2], -1, [1, 12]],
        [[1, 2], 0, [11, 2]],
        [[1, 2], 1, [1, 12]],
        [[1, 2], 2, [1, 2]]
      ];
      ios.forEach(([input, index, expected]) => {
        const result = Kasen(input)
          .update(index, v => v + 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, index, expected]) => {
        const result = Kasen.update(input, index, v => v + 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("updateIf()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .updateIf(false, 0, v => v + 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .updateIf(true, 0, v => v + 10)
          .toJs();
        expect(result).toEqual([11, 2]);
      }
    });
  });

  describe("delete()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[], 0, []],
        [[1], -2, [1]],
        [[1], -1, []],
        [[1], 0, []],
        [[1], 1, [1]],
        [[1, 2], -3, [1, 2]],
        [[1, 2], -2, [2]],
        [[1, 2], -1, [1]],
        [[1, 2], 0, [2]],
        [[1, 2], 1, [1]],
        [[1, 2], 2, [1, 2]]
      ];
      ios.forEach(([input, index, expected]) => {
        const result = Kasen(input)
          .delete(index)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, index, expected]) => {
        const result = Kasen.delete(input, index);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("deleteIf()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .deleteIf(false, 0)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .deleteIf(true, 0)
          .toJs();
        expect(result).toEqual([2]);
      }
    });
  });

  describe("clear()", () => {
    test("ok()", () => {
      const inputs = [[], [1]];
      inputs.forEach(input => {
        const result = Kasen(input)
          .clear()
          .toJs();
        expect(result).toEqual([]);
      });
    });
  });

  describe("clearIf()", () => {
    test("ok()", () => {
      const input = [1];
      {
        const result = Kasen(input)
          .clearIf(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .clearIf(true)
          .toJs();
        expect(result).toEqual([]);
      }
    });
  });

  describe("concat()", () => {
    test("ok()", () => {
      const ios = [
        [[], [[]], []],
        [[], [[1]], [1]],
        [[], [[1], [2]], [1, 2]],
        [[1], [[]], [1]],
        [[1], [[2]], [1, 2]],
        [[1], [[2], [3]], [1, 2, 3]]
      ];
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen(input)
          .concat(...arrays)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen.concat(input, ...arrays);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("concatIf()", () => {
    test("ok()", () => {
      const input = [1];
      const arrays = [[2], [3]];
      {
        const result = Kasen(input)
          .concatIf(false, ...arrays)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .concatIf(true, ...arrays)
          .toJs();
        expect(result).toEqual([1, 2, 3]);
      }
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.every(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("some()", () => {
    test("ok", () => {
      const ios = [
        [[], false],
        [[1], true],
        [[2], false],
        [[1, 2], true],
        [[2, 4], false],
        [[2, 3, 4], true],
        [[2, 4, 6], false]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).some(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.some(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.find(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.findLast(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("forEach()", () => {
    test("ok", () => {
      const inputs = [[], [1], [1, 2], [1, 2, 3]];
      inputs.forEach(input => {
        const result = Kasen(input).forEach(v => v + 1);
        expect(result).toBeUndefined();
      });
      inputs.forEach(input => {
        const result = Kasen.forEach(input, v => v + 1);
        expect(result).toBeUndefined();
      });
    });
  });

  describe("combination", () => {
    test("keys after filter()", () => {
      const keys = Kasen([1, 2, 3])
        .filter(v => v % 2 === 1)
        .map((_v, k) => k)
        .toJs();
      expect(keys).toEqual([0, 1]);
    });

    test("keys after reverse()", () => {
      const keys = Kasen([1, 2, 3])
        .reverse()
        .map((_v, k) => k)
        .toJs();
      expect(keys).toEqual([0, 1, 2]);
    });

    test("double reverse().take()", () => {
      const result = Kasen([1, 2, 3, 4, 5])
        .reverse()
        .take(4)
        .reverse()
        .take(3)
        .toJs();
      expect(result).toEqual([2, 3, 4]);
    });
  });
});
