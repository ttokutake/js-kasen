import Kasen from "../src/kasen";

describe("Array", () => {
  describe("copy()", () => {
    test("ok", () => {
      {
        const array = Kasen([1, 2, 3]).map(v => v + 1);
        const array2 = array.copy().map(v => v + 1);
        expect(array.toJs()).toEqual([2, 3, 4]);
        expect(array2.toJs()).toEqual([3, 4, 5]);
      }
      {
        const array = Kasen([1, 2, 3]);
        const array2 = array.copy();
        array.take(2);
        expect(array.toJs()).toEqual([1, 2]);
        expect(array2.toJs()).toEqual([1, 2, 3]);
      }
      {
        const array = [1, 2, 3];
        const array2 = Kasen(array);
        const array3 = array2.copy();
        array[0] = 10;
        expect(array2.toJs()).toEqual([10, 2, 3]);
        expect(array3.toJs()).toEqual([1, 2, 3]);
      }
      {
        const origin = [1, 2, 3];
        const array = Kasen.copy(origin);
        origin[0] = 10;
        expect(origin).toEqual([10, 2, 3]);
        expect(array).toEqual([1, 2, 3]);
      }
    });
  });

  describe("memoize()", () => {
    test("ok", () => {
      {
        const origin = [null, null, null];
        const array = Kasen([null, null, null]).memoize();
        origin[0] = 1;
        expect(origin).toEqual([1, null, null]);
        expect(array.toJs()).toEqual([null, null, null]);
      }
      {
        const array = Kasen([null, null, null])
          .map(() => Math.random())
          .memoize();
        expect(array.toJs()).toEqual(array.toJs());
      }
      {
        const array = Kasen([null, null, null])
          .map(() => Math.random())
          .take(2)
          .memoize();
        expect(array.toJs()).toEqual(array.toJs());
      }
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

  describe("pluck()", () => {
    test("ok", () => {
      const ios = [[[], []], [[{ a: 1 }], [1]], [[{ a: 1 }, { a: 2 }], [1, 2]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .pluck("a")
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.pluck(input, "a");
        expect(result).toEqual(expected);
      });
    });
  });

  describe("filter()", () => {
    test("fun is undefined", () => {
      const ios = [[[], []], [[1], [1]], [[null], []], [[1, null], [1]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .filter()
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.filter(input);
        expect(result).toEqual(expected);
      });
    });

    test("fun is specified", () => {
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

    test("error", () => {
      expect(() => Kasen.reverse()).toThrow(TypeError);
      expect(() => Kasen.reverse(null)).toThrow(TypeError);
      expect(() => Kasen.reverse({})).toThrow(TypeError);
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

    test("error", () => {
      expect(() => Kasen([]).take()).toThrow(TypeError);
      expect(() => Kasen([]).take(null)).toThrow(TypeError);
      expect(() => Kasen.take()).toThrow(TypeError);
      expect(() => Kasen.take(null)).toThrow(TypeError);
      expect(() => Kasen.take({})).toThrow(TypeError);
      expect(() => Kasen.take([])).toThrow(TypeError);
      expect(() => Kasen.take([], null)).toThrow(TypeError);
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

    test("error", () => {
      expect(() => Kasen([]).takeLast()).toThrow(TypeError);
      expect(() => Kasen([]).takeLast(null)).toThrow(TypeError);
      expect(() => Kasen.takeLast()).toThrow(TypeError);
      expect(() => Kasen.takeLast(null)).toThrow(TypeError);
      expect(() => Kasen.takeLast({})).toThrow(TypeError);
      expect(() => Kasen.takeLast([])).toThrow(TypeError);
      expect(() => Kasen.takeLast([], null)).toThrow(TypeError);
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.takeWhile(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).takeWhile()).toThrow(TypeError);
      expect(() => Kasen([]).takeWhile(null)).toThrow(TypeError);
      expect(() => Kasen.takeWhile()).toThrow(TypeError);
      expect(() => Kasen.takeWhile(null)).toThrow(TypeError);
      expect(() => Kasen.takeWhile({})).toThrow(TypeError);
      expect(() => Kasen.takeWhile([])).toThrow(TypeError);
      expect(() => Kasen.takeWhile([], null)).toThrow(TypeError);
    });
  });

  describe("takeUntil()", () => {
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
          .takeUntil(v => v % 2 === 0)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.takeUntil(input, v => v % 2 === 0);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).takeUntil()).toThrow(TypeError);
      expect(() => Kasen([]).takeUntil(null)).toThrow(TypeError);
      expect(() => Kasen.takeUntil()).toThrow(TypeError);
      expect(() => Kasen.takeUntil(null)).toThrow(TypeError);
      expect(() => Kasen.takeUntil({})).toThrow(TypeError);
      expect(() => Kasen.takeUntil([])).toThrow(TypeError);
      expect(() => Kasen.takeUntil([], null)).toThrow(TypeError);
    });
  });

  describe("skip()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[1], -1, [1]],
        [[1, 2], -1, [1, 2]],
        [[1, 2, 3], -1, [1, 2, 3]],
        [[], 0, []],
        [[1], 0, [1]],
        [[1, 2], 0, [1, 2]],
        [[1, 2, 3], 0, [1, 2, 3]],
        [[], 1, []],
        [[1], 1, []],
        [[1, 2], 1, [2]],
        [[1, 2, 3], 1, [2, 3]],
        [[], 2, []],
        [[1], 2, []],
        [[1, 2], 2, []],
        [[1, 2, 3], 2, [3]]
      ];
      ios.forEach(([input, num, expected]) => {
        const result = Kasen(input)
          .skip(num)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, num, expected]) => {
        const result = Kasen.skip(input, num);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).skip()).toThrow(TypeError);
      expect(() => Kasen([]).skip(null)).toThrow(TypeError);
      expect(() => Kasen.skip()).toThrow(TypeError);
      expect(() => Kasen.skip(null)).toThrow(TypeError);
      expect(() => Kasen.skip({})).toThrow(TypeError);
      expect(() => Kasen.skip([])).toThrow(TypeError);
      expect(() => Kasen.skip([], null)).toThrow(TypeError);
    });
  });

  describe("skipLast()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[1], -1, [1]],
        [[1, 2], -1, [1, 2]],
        [[1, 2, 3], -1, [1, 2, 3]],
        [[], 0, []],
        [[1], 0, [1]],
        [[1, 2], 0, [1, 2]],
        [[1, 2, 3], 0, [1, 2, 3]],
        [[], 1, []],
        [[1], 1, []],
        [[1, 2], 1, [1]],
        [[1, 2, 3], 1, [1, 2]],
        [[], 2, []],
        [[1], 2, []],
        [[1, 2], 2, []],
        [[1, 2, 3], 2, [1]]
      ];
      ios.forEach(([input, num, expected]) => {
        const result = Kasen(input)
          .skipLast(num)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, num, expected]) => {
        const result = Kasen.skipLast(input, num);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).skipLast()).toThrow(TypeError);
      expect(() => Kasen([]).skipLast(null)).toThrow(TypeError);
      expect(() => Kasen.skipLast()).toThrow(TypeError);
      expect(() => Kasen.skipLast(null)).toThrow(TypeError);
      expect(() => Kasen.skipLast({})).toThrow(TypeError);
      expect(() => Kasen.skipLast([])).toThrow(TypeError);
      expect(() => Kasen.skipLast([], null)).toThrow(TypeError);
    });
  });

  describe("skipWhile()", () => {
    test("ok", () => {
      const ios = [
        [[], []],
        [[1], []],
        [[2], [2]],
        [[1, 2], [2]],
        [[1, 3], []],
        [[2, 3], [2, 3]],
        [[1, 2, 3], [2, 3]],
        [[1, 3, 4], [4]],
        [[1, 3, 5], []]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .skipWhile(v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.skipWhile(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).skipWhile()).toThrow(TypeError);
      expect(() => Kasen([]).skipWhile(null)).toThrow(TypeError);
      expect(() => Kasen.skipWhile()).toThrow(TypeError);
      expect(() => Kasen.skipWhile(null)).toThrow(TypeError);
      expect(() => Kasen.skipWhile({})).toThrow(TypeError);
      expect(() => Kasen.skipWhile([])).toThrow(TypeError);
      expect(() => Kasen.skipWhile([], null)).toThrow(TypeError);
    });
  });

  describe("skipUntil()", () => {
    test("ok", () => {
      const ios = [
        [[], []],
        [[1], []],
        [[2], [2]],
        [[1, 2], [2]],
        [[1, 3], []],
        [[2, 3], [2, 3]],
        [[1, 2, 3], [2, 3]],
        [[1, 3, 4], [4]],
        [[1, 3, 5], []]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .skipUntil(v => v % 2 === 0)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.skipUntil(input, v => v % 2 === 0);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).skipUntil()).toThrow(TypeError);
      expect(() => Kasen([]).skipUntil(null)).toThrow(TypeError);
      expect(() => Kasen.skipUntil()).toThrow(TypeError);
      expect(() => Kasen.skipUntil(null)).toThrow(TypeError);
      expect(() => Kasen.skipUntil({})).toThrow(TypeError);
      expect(() => Kasen.skipUntil([])).toThrow(TypeError);
      expect(() => Kasen.skipUntil([], null)).toThrow(TypeError);
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

  describe("concat()", () => {
    test("ok()", () => {
      const ios = [
        [[], [], []],
        [[], [[]], []],
        [[], [1], [1]],
        [[], [[1]], [1]],
        [[], [1, [2]], [1, 2]],
        [[], [[1], 2], [1, 2]],
        [[], [[1], [2]], [1, 2]],
        [[1], [], [1]],
        [[1], [[]], [1]],
        [[1], [2], [1, 2]],
        [[1], [[2]], [1, 2]],
        [[1], [2, [3]], [1, 2, 3]],
        [[1], [[2], 3], [1, 2, 3]],
        [[1], [[2], [3]], [1, 2, 3]]
      ];
      ios.forEach(([input, values, expected]) => {
        const result = Kasen(input)
          .concat(...values)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen.concat(input, ...arrays);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("insert()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, []],
        [[], 0, [10]],
        [[], 1, []],
        [[1], -2, [1]],
        [[1], -1, [10, 1]],
        [[1], 0, [10, 1]],
        [[1], 1, [1, 10]],
        [[1, 2], -3, [1, 2]],
        [[1, 2], -2, [10, 1, 2]],
        [[1, 2], -1, [1, 10, 2]],
        [[1, 2], 0, [10, 1, 2]],
        [[1, 2], 1, [1, 10, 2]],
        [[1, 2], 2, [1, 2, 10]]
      ];
      ios.forEach(([input, index, expected]) => {
        const result = Kasen(input)
          .insert(index, 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, index, expected]) => {
        const result = Kasen.insert(input, index, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("push()", () => {
    test("ok", () => {
      const ios = [
        [[], [10], [10]],
        [[], [10, 11], [10, 11]],
        [[1], [10], [1, 10]],
        [[1], [10, 11], [1, 10, 11]],
        [[1, 2], [10], [1, 2, 10]],
        [[1, 2], [10, 11], [1, 2, 10, 11]]
      ];
      ios.forEach(([input, values, expected]) => {
        const result = Kasen(input)
          .push(...values)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, values, expected]) => {
        const result = Kasen.push(input, ...values);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("pop()", () => {
    test("ok", () => {
      const ios = [[[], []], [[1], []], [[1, 2], [1]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .pop()
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.pop(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("unshift()", () => {
    test("ok", () => {
      const ios = [
        [[], [10], [10]],
        [[], [10, 11], [10, 11]],
        [[1], [10], [10, 1]],
        [[1], [10, 11], [10, 11, 1]],
        [[1, 2], [10], [10, 1, 2]],
        [[1, 2], [10, 11], [10, 11, 1, 2]]
      ];
      ios.forEach(([input, values, expected]) => {
        const result = Kasen(input)
          .unshift(...values)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, values, expected]) => {
        const result = Kasen.unshift(input, ...values);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("shift()", () => {
    test("ok", () => {
      const ios = [[[], []], [[1], []], [[1, 2], [2]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .shift()
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.shift(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("splice()", () => {
    test("ok", () => {
      const ios = [
        [[], 0, 0, [], []],
        [[], -1, 1, [], []],
        [[], 0, 1, [], []],
        [[], 0, 0, [10], [10]],
        [[], 0, 0, [10, 20], [10, 20]],
        [[1], 0, 0, [], [1]],
        [[1], -1, 1, [], []],
        [[1], 0, 1, [], []],
        [[1], 0, 0, [10], [10, 1]],
        [[1], 1, 0, [10], [1, 10]],
        [[1, 2], 0, 0, [], [1, 2]],
        [[1, 2], -2, 1, [], [2]],
        [[1, 2], -1, 1, [], [1]],
        [[1, 2], 0, 1, [], [2]],
        [[1, 2], 1, 1, [], [1]],
        [[1, 2], 1, 0, [10, 20], [1, 10, 20, 2]],
        [[1, 2], 0, 1, [10, 20], [10, 20, 2]],
        [[1, 2], 1, 1, [10, 20], [1, 10, 20]]
      ];
      ios.forEach(([input, index, num, values, expected]) => {
        const result = Kasen(input)
          .splice(index, num, ...values)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, index, num, values, expected]) => {
        const result = Kasen.splice(input, index, num, ...values);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("setIn()", () => {
    test("initializer is undefined", () => {
      const ios = [
        [[], [], []],
        [[], [0], [10]],
        [[{}], [], [{}]],
        [[{}], [0, "a"], [{ a: 10 }]],
        [[{ a: [] }], [0, "a", 0], [{ a: [10] }]]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .setIn(keys, 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.setIn(input, keys, 10);
        expect(result).toEqual(expected);
      });
    });

    test("initializer is specified", () => {
      const ios = [
        [[{ a: [] }], [0, "a", 0], [{ a: [10] }]],
        [[], [[0, {}], ["a", []], 0], [{ a: [10] }]]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .setIn(keys, 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.setIn(input, keys, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("updateIn()", () => {
    test("initializer is undefined", () => {
      const ios = [
        [[], [], []],
        [[1], [], [1]],
        [[1], [0], [11]],
        [[{ a: 1 }], [0, "a"], [{ a: 11 }]],
        [[{ a: [1] }], [0, "a", 0], [{ a: [11] }]]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .updateIn(keys, v => v + 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.updateIn(input, keys, v => v + 10);
        expect(result).toEqual(expected);
      });
    });

    test("initializer is specified", () => {
      const ios = [
        [[{ a: [1] }], [0, "a", 0], [{ a: [11] }]],
        [[], [[0, {}], ["a", []], [0, 100]], [{ a: [110] }]]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .updateIn(keys, v => v + 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.updateIn(input, keys, v => v + 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("deleteIn()", () => {
    test("ok", () => {
      const ios = [
        [[], [0], []],
        [[1], [0], []],
        [[1], [0, "a"], [1]],
        [[{ a: 1 }], [0, "a"], [{}]],
        [[{ a: 1 }], [0, "a", 0], [{ a: 1 }]],
        [[{ a: [1] }], [0, "a", 0], [{ a: [] }]]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .deleteIn(keys)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.deleteIn(input, keys);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("flatten()", () => {
    test("ok", () => {
      const ios = [
        [[], []],
        [[[]], []],
        [[[], []], []],
        [[1, []], [1]],
        [[[], 1], [1]],
        [[[1], []], [1]],
        [[[], [1]], [1]],
        [[1, 2], [1, 2]],
        [[[1], 2], [1, 2]],
        [[1, [2]], [1, 2]],
        [[[1], [2]], [1, 2]],
        [[[1, 2]], [1, 2]],
        [[[1, 2], 3], [1, 2, 3]],
        [[[1], 2, [3]], [1, 2, 3]],
        [[1, [2, 3]], [1, 2, 3]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .flatten()
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.flatten(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("flatMap()", () => {
    test("ok", () => {
      const ios = [
        [[], []],
        [[1], [1]],
        [[1, 2], [1, 1, 1]],
        [[1, 2, 3], [1, 1, 1, 1, 1, 1]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .flatMap(v => Array(v).fill(1))
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.flatMap(input, v => Array(v).fill(1));
        expect(result).toEqual(expected);
      });
    });
  });

  describe("zip()", () => {
    test("ok", () => {
      const ios = [
        [[], [], []],
        [[], [[1]], []],
        [[1], [], [[1]]],
        [[1], [[]], []],
        [[1], [[10]], [[1, 10]]],
        [[1], [[10, 11]], [[1, 10]]],
        [[1, 2], [[10]], [[1, 10]]],
        [[1, 2], [[10, 11]], [[1, 10], [2, 11]]],
        [[1, 2], [[10, 11], [20]], [[1, 10, 20]]],
        [[1, 2], [[10, 11], [20, 21]], [[1, 10, 20], [2, 11, 21]]]
      ];
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen(input)
          .zip(...arrays)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen.zip(input, ...arrays);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("zipAll()", () => {
    test("ok", () => {
      const ios = [
        [[], [], []],
        [[], [[1]], [[undefined, 1]]],
        [[1], [], [[1]]],
        [[1], [[]], [[1, undefined]]],
        [[1], [[10]], [[1, 10]]],
        [[1], [[10, 11]], [[1, 10], [undefined, 11]]],
        [[1, 2], [[10]], [[1, 10], [2, undefined]]],
        [[1, 2], [[10, 11]], [[1, 10], [2, 11]]],
        [[1, 2], [[10, 11], [20]], [[1, 10, 20], [2, 11, undefined]]],
        [[1, 2], [[10, 11], [20, 21]], [[1, 10, 20], [2, 11, 21]]]
      ];
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen(input)
          .zipAll(...arrays)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen.zipAll(input, ...arrays);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("zipWith()", () => {
    test("ok", () => {
      const ios = [
        [[], [], []],
        [[], [[1]], []],
        [[1], [], [1]],
        [[1], [[]], []],
        [[1], [[10]], [11]],
        [[1], [[10, 11]], [11]],
        [[1, 2], [[10]], [11]],
        [[1, 2], [[10, 11]], [11, 13]],
        [[1, 2], [[10, 11], [20]], [31]],
        [[1, 2], [[10, 11], [20, 21]], [31, 34]]
      ];
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen(input)
          .zipWith((...values) => values.reduce((acc, v) => acc + v), ...arrays)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, arrays, expected]) => {
        const result = Kasen.zipWith(
          input,
          (...values) => values.reduce((acc, v) => acc + v),
          ...arrays
        );
        expect(result).toEqual(expected);
      });
    });
  });

  describe("sort()", () => {
    test("fun is undefined", () => {
      const ios = [
        [[], []],
        [[1], [1]],
        [[1, 2], [1, 2]],
        [[2, 1], [1, 2]],
        [[1, 2, 3], [1, 2, 3]],
        [[1, 3, 2], [1, 2, 3]],
        [[2, 1, 3], [1, 2, 3]],
        [[2, 3, 1], [1, 2, 3]],
        [[3, 1, 2], [1, 2, 3]],
        [[3, 2, 1], [1, 2, 3]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .sort()
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.sort(input);
        expect(result).toEqual(expected);
      });
    });

    test("fun is specified", () => {
      const ios = [
        [[{ a: 1 }, { a: 2 }], [{ a: 1 }, { a: 2 }]],
        [[{ a: 2 }, { a: 1 }], [{ a: 1 }, { a: 2 }]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .sort(({ a: v1 }, { a: v2 }) => v1 - v2)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.sort(input, ({ a: v1 }, { a: v2 }) => v1 - v2);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("unique()", () => {
    test("fun is undefined", () => {
      const ios = [
        [[], []],
        [[1], [1]],
        [[1, 2], [1, 2]],
        [[1, 1], [1]],
        [[1, 2, 1], [1, 2]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .unique()
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.unique(input);
        expect(result).toEqual(expected);
      });
    });

    test("fun is specified", () => {
      const ios = [
        [[], []],
        [[{ a: 1 }], [{ a: 1 }]],
        [[{ a: 1 }, { a: 2 }], [{ a: 1 }, { a: 2 }]],
        [[{ a: 1 }, { a: 1 }], [{ a: 1 }]],
        [[{ a: 1 }, { a: 2 }, { a: 1 }], [{ a: 1 }, { a: 2 }]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .unique(v => v.a)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.unique(input, v => v.a);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("chunk()", () => {
    test("ok", () => {
      const ios = [
        [[], 1, []],
        [[], 2, []],
        [[1], 1, [[1]]],
        [[1], 2, [[1]]],
        [[1, 2], 1, [[1], [2]]],
        [[1, 2], 2, [[1, 2]]],
        [[1, 2, 3], 1, [[1], [2], [3]]],
        [[1, 2, 3], 2, [[1, 2], [3]]],
        [[1, 2, 3], 3, [[1, 2, 3]]]
      ];
      ios.forEach(([input, num, expected]) => {
        const result = Kasen(input)
          .chunk(num)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, num, expected]) => {
        const result = Kasen.chunk(input, num);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).chunk(0)).toThrow(TypeError);
      expect(() => Kasen.chunk([], 0)).toThrow(TypeError);
    });
  });

  describe("sliding()", () => {
    test("step is undefined", () => {
      const ios = [
        [[], 1, []],
        [[1], 1, [[1]]],
        [[1], 2, [[1]]],
        [[1, 2], 1, [[1], [2]]],
        [[1, 2], 2, [[1, 2]]],
        [[1, 2, 3], 1, [[1], [2], [3]]],
        [[1, 2, 3], 2, [[1, 2], [2, 3]]],
        [[1, 2, 3], 3, [[1, 2, 3]]]
      ];
      ios.forEach(([input, num, expected]) => {
        const result = Kasen(input)
          .sliding(num)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, num, expected]) => {
        const result = Kasen.sliding(input, num);
        expect(result).toEqual(expected);
      });
    });

    test("step is specified", () => {
      const ios = [
        [[], 1, 1, []],
        [[1], 1, 1, [[1]]],
        [[1, 2], 1, 1, [[1], [2]]],
        [[1, 2], 1, 2, [[1], [2]]],
        [[1, 2, 3], 1, 1, [[1], [2], [3]]],
        [[1, 2, 3], 1, 2, [[1], [3]]],
        [[1, 2, 3], 2, 1, [[1, 2], [2, 3]]],
        [[1, 2, 3], 2, 2, [[1, 2], [3]]]
      ];
      ios.forEach(([input, num, step, expected]) => {
        const result = Kasen(input)
          .sliding(num, step)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, num, step, expected]) => {
        const result = Kasen.sliding(input, num, step);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).sliding(0)).toThrow(TypeError);
      expect(() => Kasen.sliding([], 0)).toThrow(TypeError);
      expect(() => Kasen([]).sliding(1, 0)).toThrow(TypeError);
      expect(() => Kasen.sliding([], 1, 0)).toThrow(TypeError);
    });
  });

  describe("range()", () => {
    test("step is undefined", () => {
      const ios = [
        [0, -1, []],
        [0, 0, []],
        [0, 1, [0]],
        [0, 2, [0, 1]],
        [1, 4, [1, 2, 3]]
      ];
      ios.forEach(([start, end, expected]) => {
        const result = Kasen.range._(start, end).toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([start, end, expected]) => {
        const result = Kasen.range(start, end);
        expect(result).toEqual(expected);
      });
    });

    test("step is specified", () => {
      const ios = [[0, 3, 1, [0, 1, 2]], [0, 3, 2, [0, 2]], [0, 3, 3, [0]]];
      ios.forEach(([start, end, step, expected]) => {
        const result = Kasen.range._(start, end, step).toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([start, end, step, expected]) => {
        const result = Kasen.range(start, end, step);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen.range._(0, 0, 0)).toThrow(TypeError);
      expect(() => Kasen.range(0, 0, 0)).toThrow(TypeError);
    });
  });

  describe("repeat()", () => {
    test("ok", () => {
      const ios = [[-1, []], [0, []], [1, [null]], [2, [null, null]]];
      ios.forEach(([num, expected]) => {
        const result = Kasen.repeat._(null, num).toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([num, expected]) => {
        const result = Kasen.repeat(null, num);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("isEmpty()", () => {
    test("ok", () => {
      const inputs = [[[], true], [[1], false], [[1, 2], false]];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).isEmpty();
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.isEmpty(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("count()", () => {
    test("fun is undefined", () => {
      const inputs = [[[], 0], [[1], 1], [[1, 2], 2], [[1, 2, 3], 3]];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).count();
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.count(input);
        expect(result).toBe(expected);
      });
    });

    test("fun is specified", () => {
      const inputs = [[[], 0], [[1], 1], [[1, 2], 1], [[1, 2, 3], 2]];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).count(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.count(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("get()", () => {
    test("protection is undefined", () => {
      const inputs = [
        [[], -1, undefined],
        [[], 0, undefined],
        [[1], -2, undefined],
        [[1], -1, 1],
        [[1], 0, 1],
        [[1], 1, undefined],
        [[1, 2], -3, undefined],
        [[1, 2], -2, 1],
        [[1, 2], -1, 2],
        [[1, 2], 0, 1],
        [[1, 2], 1, 2],
        [[1, 2], 2, undefined]
      ];
      inputs.forEach(([input, index, expected]) => {
        const result = Kasen(input).get(index);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, index, expected]) => {
        const result = Kasen.get(input, index);
        expect(result).toBe(expected);
      });
    });

    test("protection is specified", () => {
      const inputs = [
        [[], -1, 10],
        [[], 0, 10],
        [[1], -2, 10],
        [[1], -1, 1],
        [[1], 0, 1],
        [[1], 1, 10],
        [[1, 2], -3, 10],
        [[1, 2], -2, 1],
        [[1, 2], -1, 2],
        [[1, 2], 0, 1],
        [[1, 2], 1, 2],
        [[1, 2], 2, 10]
      ];
      inputs.forEach(([input, index, expected]) => {
        const result = Kasen(input).get(index, 10);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, index, expected]) => {
        const result = Kasen.get(input, index, 10);
        expect(result).toBe(expected);
      });
    });
  });

  describe("has()", () => {
    test("ok", () => {
      const inputs = [
        [[], -1, false],
        [[], 0, false],
        [[1], -1, false],
        [[1], 0, true],
        [[1], 1, false],
        [[1, 2], -1, false],
        [[1, 2], 0, true],
        [[1, 2], 1, true],
        [[1, 2], 2, false]
      ];
      inputs.forEach(([input, index, expected]) => {
        const result = Kasen(input).has(index);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, index, expected]) => {
        const result = Kasen.has(input, index);
        expect(result).toBe(expected);
      });
    });
  });

  describe("includes()", () => {
    test("ok", () => {
      const inputs = [
        [[], 0, false],
        [[1], 0, false],
        [[1], 1, true],
        [[1, 2], 0, false],
        [[1, 2], 1, true],
        [[1, 2], 2, true]
      ];
      inputs.forEach(([input, value, expected]) => {
        const result = Kasen(input).includes(value);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, value, expected]) => {
        const result = Kasen.includes(input, value);
        expect(result).toBe(expected);
      });
    });
  });

  describe("getIn()", () => {
    test("protection is undefined", () => {
      const ios = [
        [[], [], undefined],
        [[], [0], undefined],
        [[1], [0], 1],
        [[1], [0, "a"], undefined],
        [[{ a: 1 }], [0, "a"], 1],
        [[{ a: [1] }], [0, "a", 0], 1]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input).getIn(keys);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.getIn(input, keys);
        expect(result).toBe(expected);
      });
    });

    test("protection is specified", () => {
      const ios = [
        [[], [], 10],
        [[], [0], 10],
        [[1], [0], 1],
        [[1], [0, "a"], 10],
        [[{ a: 1 }], [0, "a"], 1],
        [[{ a: [1] }], [0, "a", 0], 1]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input).getIn(keys, 10);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.getIn(input, keys, 10);
        expect(result).toBe(expected);
      });
    });
  });

  describe("hasIn()", () => {
    test("ok", () => {
      const ios = [
        [[], [], true],
        [[], [0], false],
        [[1], [0], true],
        [[1], [0, "a"], false],
        [[{ a: 1 }], [0], true],
        [[{ a: 1 }], [0, "a"], true],
        [[{ a: 1 }], [0, "b"], false],
        [[{ a: [1] }], [0, "a", 0], true]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input).hasIn(keys);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.hasIn(input, keys);
        expect(result).toBe(expected);
      });
    });
  });

  describe("head() / first()", () => {
    test("ok", () => {
      const ios = [[[], undefined], [[1], 1], [[1, 2], 1]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).head();
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.head(input);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).first();
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.first(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("tail()", () => {
    test("ok", () => {
      const ios = [[[], []], [[1], []], [[1, 2], [2]], [[1, 2, 3], [2, 3]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).tail();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.tail(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("init()", () => {
    test("ok", () => {
      const ios = [[[], []], [[1], []], [[1, 2], [1]], [[1, 2, 3], [1, 2]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).init();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.init(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("last()", () => {
    test("ok", () => {
      const ios = [[[], undefined], [[1], 1], [[1, 2], 2]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).last();
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.last(input);
        expect(result).toBe(expected);
      });
    });
  });

  describe("splitAt()", () => {
    test("ok", () => {
      const ios = [
        [[], -1, [[], []]],
        [[], 0, [[], []]],
        [[1], -1, [[], [1]]],
        [[1], 0, [[], [1]]],
        [[1], 1, [[1], []]],
        [[1, 2], -2, [[], [1, 2]]],
        [[1, 2], -1, [[1], [2]]],
        [[1, 2], 0, [[], [1, 2]]],
        [[1, 2], 1, [[1], [2]]],
        [[1, 2], 2, [[1, 2], []]]
      ];
      ios.forEach(([input, index, expected]) => {
        const result = Kasen(input).splitAt(index);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, index, expected]) => {
        const result = Kasen.splitAt(input, index);
        expect(result).toEqual(expected);
      });
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

  describe("toArray", () => {
    test("ok", () => {
      const inputs = [[], [1], [1, 2], [1, 2, 3]];
      inputs.forEach(input => {
        const result = Kasen(input).toArray();
        expect(result).toEqual(input);
      });
      inputs.forEach(input => {
        const result = Kasen.toArray(input);
        expect(result).toEqual(input);
      });
    });
  });

  describe("toObject", () => {
    test("ok", () => {
      const inputs = [
        [[], {}],
        [[1], { 0: 1 }],
        [[1, 2], { 0: 1, 1: 2 }],
        [[1, 2, 3], { 0: 1, 1: 2, 2: 3 }]
      ];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).toObject();
        expect(result).toEqual(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.toObject(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("reduce()", () => {
    test("init is undefined", () => {
      const ios = [[["1"], "1"], [["1", "2"], "12"], [["1", "2", "3"], "123"]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduce((acc, v) => acc + v);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduce(input, (acc, v) => acc + v);
        expect(result).toBe(expected);
      });
    });

    test("init is specified", () => {
      const ios = [
        [[], "10"],
        [["1"], "101"],
        [["1", "2"], "1012"],
        [["1", "2", "3"], "10123"]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduce((acc, v) => acc + v, "10");
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduce(input, (acc, v) => acc + v, "10");
        expect(result).toBe(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).reduce((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.reduce([], (acc, v) => acc + v)).toThrow(TypeError);
    });
  });

  describe("reduceRight()", () => {
    test("init is undefined", () => {
      const ios = [[["1"], "1"], [["1", "2"], "21"], [["1", "2", "3"], "321"]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduceRight((acc, v) => acc + v);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduceRight(input, (acc, v) => acc + v);
        expect(result).toBe(expected);
      });
    });

    test("init is specified", () => {
      const ios = [
        [[], "10"],
        [["1"], "101"],
        [["1", "2"], "1021"],
        [["1", "2", "3"], "10321"]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduceRight((acc, v) => acc + v, "10");
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduceRight(input, (acc, v) => acc + v, "10");
        expect(result).toBe(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).reduceRight((acc, v) => acc + v)).toThrow(
        TypeError
      );
      expect(() => Kasen.reduceRight([], (acc, v) => acc + v)).toThrow(
        TypeError
      );
    });
  });

  describe("reduceWhile()", () => {
    test("init is undefined", () => {
      const ios = [[[1], 1], [[1, 2], 3], [[1, 2, 3], 3]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduceWhile((acc, v) => ["halt", acc + v]);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduceWhile(input, (acc, v) => ["halt", acc + v]);
        expect(result).toBe(expected);
      });
    });

    test("init is specified", () => {
      const ios = [[[], 10], [[1], 11], [[1, 2], 11], [[1, 2, 3], 11]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduceWhile(
          (acc, v) => ["halt", acc + v],
          10
        );
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduceWhile(
          input,
          (acc, v) => ["halt", acc + v],
          10
        );
        expect(result).toBe(expected);
      });
    });

    test("error", () => {
      expect(() =>
        Kasen([]).reduceWhile((acc, v) => ["halt", acc + v])
      ).toThrow(TypeError);
      expect(() =>
        Kasen.reduceWhile([], (acc, v) => ["halt", acc + v])
      ).toThrow(TypeError);
    });
  });

  describe("scan()", () => {
    test("init is undefined", () => {
      const ios = [[[1], [1]], [[1, 2], [1, 3]], [[1, 2, 3], [1, 3, 6]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).scan((acc, v) => acc + v);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.scan(input, (acc, v) => acc + v);
        expect(result).toEqual(expected);
      });
    });

    test("init is specified", () => {
      const ios = [
        [[], [10]],
        [[1], [10, 11]],
        [[1, 2], [10, 11, 13]],
        [[1, 2, 3], [10, 11, 13, 16]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).scan((acc, v) => acc + v, 10);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.scan(input, (acc, v) => acc + v, 10);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).scan((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.scan([], (acc, v) => acc + v)).toThrow(TypeError);
    });
  });

  describe("scanRight()", () => {
    test("init is undefined", () => {
      const ios = [[[1], [1]], [[1, 2], [2, 3]], [[1, 2, 3], [3, 5, 6]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).scanRight((acc, v) => acc + v);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.scanRight(input, (acc, v) => acc + v);
        expect(result).toEqual(expected);
      });
    });

    test("init is specified", () => {
      const ios = [
        [[], [10]],
        [[1], [10, 11]],
        [[1, 2], [10, 12, 13]],
        [[1, 2, 3], [10, 13, 15, 16]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).scanRight((acc, v) => acc + v, 10);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.scanRight(input, (acc, v) => acc + v, 10);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen([]).scanRight((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.scanRight([], (acc, v) => acc + v)).toThrow(TypeError);
    });
  });

  describe("partition()", () => {
    test("ok", () => {
      const inputs = [
        [[], [[], []]],
        [[1], [[1], []]],
        [[1, 2], [[1], [2]]],
        [[1, 2, 3], [[1, 3], [2]]]
      ];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).partition(v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.partition(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("join()", () => {
    test("delimiter is undefined", () => {
      const inputs = [
        [[], ""],
        [[1], "1"],
        [[1, 2], "1,2"],
        [[1, 2, 3], "1,2,3"]
      ];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).join();
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.join(input);
        expect(result).toBe(expected);
      });
    });

    test("delimiter is specified", () => {
      const inputs = [
        [[], ""],
        [[1], "1"],
        [[1, 2], "1|2"],
        [[1, 2, 3], "1|2|3"]
      ];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).join("|");
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.join(input, "|");
        expect(result).toBe(expected);
      });
    });
  });

  describe("groupBy()", () => {
    const inputs = [
      [[], {}],
      [[1], { 1: [1] }],
      [[1, 2], { 1: [1], 2: [2] }],
      [[1, 2, 1], { 1: [1, 1], 2: [2] }]
    ];
    inputs.forEach(([input, expected]) => {
      const result = Kasen(input).groupBy(v => v);
      expect(result).toEqual(expected);
    });
    inputs.forEach(([input, expected]) => {
      const result = Kasen.groupBy(input, v => v);
      expect(result).toEqual(expected);
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

  describe("findEntry()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined],
        [[1], [0, 1]],
        [[2], undefined],
        [[1, 2], [0, 1]],
        [[2, 3], [1, 3]],
        [[1, 2, 3], [0, 1]],
        [[2, 4, 5], [2, 5]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findEntry(v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findEntry(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("findLastEntry()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined],
        [[1], [0, 1]],
        [[2], undefined],
        [[1, 2], [0, 1]],
        [[2, 3], [1, 3]],
        [[1, 2, 3], [2, 3]],
        [[1, 2, 4], [0, 1]]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findLastEntry(v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findLastEntry(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("findKey()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined],
        [[1], 0],
        [[2], undefined],
        [[1, 2], 0],
        [[2, 3], 1],
        [[1, 2, 3], 0],
        [[2, 4, 5], 2]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findKey(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findKey(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("findLastKey()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined],
        [[1], 0],
        [[2], undefined],
        [[1, 2], 0],
        [[2, 3], 1],
        [[1, 2, 3], 2],
        [[1, 2, 4], 0]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findLastKey(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findLastKey(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("findIndex()", () => {
    test("ok", () => {
      const ios = [
        [[], -1],
        [[1], 0],
        [[2], -1],
        [[1, 2], 0],
        [[2, 3], 1],
        [[1, 2, 3], 0],
        [[2, 4, 5], 2]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findIndex(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findIndex(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("findLastIndex()", () => {
    test("ok", () => {
      const ios = [
        [[], -1],
        [[1], 0],
        [[2], -1],
        [[1, 2], 0],
        [[2, 3], 1],
        [[1, 2, 3], 2],
        [[1, 2, 4], 0]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findLastIndex(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findLastIndex(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("keyOf()", () => {
    test("ok", () => {
      const ios = [
        [[], 1, undefined],
        [[1], 1, 0],
        [[1], 2, undefined],
        [[1, 2], 1, 0],
        [[1, 2], 2, 1],
        [[1, 2], 3, undefined],
        [[1, 1], 1, 0]
      ];
      ios.forEach(([input, value, expected]) => {
        const result = Kasen(input).keyOf(value);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, value, expected]) => {
        const result = Kasen.keyOf(input, value);
        expect(result).toBe(expected);
      });
    });
  });

  describe("lastKeyOf()", () => {
    test("ok", () => {
      const ios = [
        [[], 1, undefined],
        [[1], 1, 0],
        [[1], 2, undefined],
        [[1, 2], 1, 0],
        [[1, 2], 2, 1],
        [[1, 2], 3, undefined],
        [[1, 1], 1, 1]
      ];
      ios.forEach(([input, value, expected]) => {
        const result = Kasen(input).lastKeyOf(value);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, value, expected]) => {
        const result = Kasen.lastKeyOf(input, value);
        expect(result).toBe(expected);
      });
    });
  });

  describe("indexOf()", () => {
    test("ok", () => {
      const ios = [
        [[], 1, -1],
        [[1], 1, 0],
        [[1], 2, -1],
        [[1, 2], 1, 0],
        [[1, 2], 2, 1],
        [[1, 2], 3, -1],
        [[1, 1], 1, 0]
      ];
      ios.forEach(([input, value, expected]) => {
        const result = Kasen(input).indexOf(value);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, value, expected]) => {
        const result = Kasen.indexOf(input, value);
        expect(result).toBe(expected);
      });
    });
  });

  describe("lastIndexOf()", () => {
    test("ok", () => {
      const ios = [
        [[], 1, -1],
        [[1], 1, 0],
        [[1], 2, -1],
        [[1, 2], 1, 0],
        [[1, 2], 2, 1],
        [[1, 2], 3, -1],
        [[1, 1], 1, 1]
      ];
      ios.forEach(([input, value, expected]) => {
        const result = Kasen(input).lastIndexOf(value);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, value, expected]) => {
        const result = Kasen.lastIndexOf(input, value);
        expect(result).toBe(expected);
      });
    });
  });

  describe("sum()", () => {
    test("fun is undefined", () => {
      const ios = [[[], 0], [[1], 1], [[1, 2], 3], [[1, 2, 3], 6]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).sum();
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.sum(input);
        expect(result).toBe(expected);
      });
    });

    test("fun is specified", () => {
      const ios = [
        [[], 0],
        [[{ a: 1 }], 1],
        [[{ a: 1 }, { a: 2 }], 3],
        [[{ a: 1 }, { a: 2 }, { a: 3 }], 6]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).sum(v => v.a);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.sum(input, v => v.a);
        expect(result).toBe(expected);
      });
    });
  });

  describe("max()", () => {
    test("fun is undefined", () => {
      const ios = [
        [[], undefined],
        [[1], 1],
        [[1, 2], 2],
        [[2, 1], 2],
        [[1, 2, 3], 3],
        [[1, 3, 2], 3]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).max();
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.max(input);
        expect(result).toBe(expected);
      });
    });

    test("fun is specified", () => {
      const ios = [
        [[], undefined],
        [[{ a: 1 }], { a: 1 }],
        [[{ a: 1 }, { a: 2 }], { a: 2 }],
        [[{ a: 2 }, { a: 1 }], { a: 2 }],
        [[{ a: 1 }, { a: 2 }, { a: 3 }], { a: 3 }],
        [[{ a: 1 }, { a: 3 }, { a: 2 }], { a: 3 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).max((v1, v2) => v1.a > v2.a);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.max(input, (v1, v2) => v1.a > v2.a);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("min()", () => {
    test("fun is undefined", () => {
      const ios = [
        [[], undefined],
        [[1], 1],
        [[1, 2], 1],
        [[2, 1], 1],
        [[1, 2, 3], 1],
        [[2, 1, 3], 1]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).min();
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.min(input);
        expect(result).toBe(expected);
      });
    });

    test("fun is specified", () => {
      const ios = [
        [[], undefined],
        [[{ a: 1 }], { a: 1 }],
        [[{ a: 1 }, { a: 2 }], { a: 1 }],
        [[{ a: 2 }, { a: 1 }], { a: 1 }],
        [[{ a: 1 }, { a: 2 }, { a: 3 }], { a: 1 }],
        [[{ a: 2 }, { a: 1 }, { a: 3 }], { a: 1 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).min((v1, v2) => v1.a < v2.a);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.min(input, (v1, v2) => v1.a < v2.a);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("equals()", () => {
    test("ok", () => {
      const ios = [
        [[], undefined, false],
        [[], null, false],
        [[], true, false],
        [[], 1, false],
        [[], "a", false],
        [[], {}, false],
        [[], () => undefined, false],
        [[], [], true],
        [[], [1], false],
        [[1], [], false],
        [[1], [1], true],
        [[1], [2], false],
        [[1], [1, 2], false],
        [[1, 2], [1, 2], true]
      ];
      ios.forEach(([input, value, expected]) => {
        const result = Kasen(input).equals(value);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, value, expected]) => {
        const result = Kasen.equals(input, value);
        expect(result).toBe(expected);
      });
    });
  });

  describe("keys()", () => {
    test("ok", () => {
      const ios = [[[], []], [[1], [0]], [[1, 2], [0, 1]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).keys();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.keys(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("values()", () => {
    test("ok", () => {
      const inputs = [[], [1], [1, 2]];
      inputs.forEach(input => {
        const result = Kasen(input).values();
        expect(result).toEqual(input);
      });
      inputs.forEach(input => {
        const result = Kasen.values(input);
        expect(result).toEqual(input);
      });
    });
  });

  describe("entries()", () => {
    test("ok", () => {
      const ios = [[[], []], [[1], [[0, 1]]], [[1, 2], [[0, 1], [1, 2]]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).entries();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.entries(input);
        expect(result).toEqual(expected);
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
