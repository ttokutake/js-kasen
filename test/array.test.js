import Kasen from "../dist/kasen";

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
        const array = [1, 2, 3];
        const array2 = Kasen.copy(array);
        array[0] = 10;
        expect(array).toEqual([10, 2, 3]);
        expect(array2).toEqual([1, 2, 3]);
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

  describe("map.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .map.if(false, v => v + 1)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .map.if(true, v => v + 1)
          .toJs();
        expect(result).toEqual([2, 3, 4]);
      }
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

  describe("pluck.if()", () => {
    test("ok", () => {
      const input = [{ a: 1 }, { a: 2 }];
      {
        const result = Kasen(input)
          .pluck.if(false, "a")
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .pluck.if(true, "a")
          .toJs();
        expect(result).toEqual([1, 2]);
      }
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

  describe("filter.if()", () => {
    test("fun is undefined", () => {
      const input = [1, null];
      {
        const result = Kasen(input)
          .filter.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .filter.if(true)
          .toJs();
        expect(result).toEqual([1]);
      }
    });

    test("fun is specified", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .filter.if(false, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .filter.if(true, v => v % 2 === 0)
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

  describe("filterNot.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .filterNot.if(false, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .filterNot.if(true, v => v % 2 === 1)
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

  describe("reverse.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .reverse.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .reverse.if(true)
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

  describe("take.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .take.if(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .take.if(true, 2)
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

  describe("takeLast.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .takeLast.if(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .takeLast.if(true, 2)
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.takeWhile(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("takeWhile.if()", () => {
    test("ok", () => {
      const input = [1, 3, 4];
      {
        const result = Kasen(input)
          .takeWhile.if(false, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .takeWhile.if(true, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual([1, 3]);
      }
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
  });

  describe("takeUntil.if()", () => {
    test("ok", () => {
      const input = [1, 3, 4];
      {
        const result = Kasen(input)
          .takeUntil.if(false, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .takeUntil.if(true, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual([1, 3]);
      }
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
  });

  describe("skip.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .skip.if(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .skip.if(true, 2)
          .toJs();
        expect(result).toEqual([3]);
      }
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
  });

  describe("skipLast.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .skipLast.if(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .skipLast.if(true, 2)
          .toJs();
        expect(result).toEqual([1]);
      }
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
  });

  describe("skipWhile.if()", () => {
    test("ok", () => {
      const input = [1, 3, 4];
      {
        const result = Kasen(input)
          .skipWhile.if(false, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .skipWhile.if(true, v => v % 2 === 1)
          .toJs();
        expect(result).toEqual([4]);
      }
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
  });

  describe("skipUntil.if()", () => {
    test("ok", () => {
      const input = [1, 3, 4];
      {
        const result = Kasen(input)
          .skipUntil.if(false, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .skipUntil.if(true, v => v % 2 === 0)
          .toJs();
        expect(result).toEqual([4]);
      }
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

  describe("set.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .set.if(false, 0, 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .set.if(true, 0, 10)
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

  describe("update.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .update.if(false, 0, v => v + 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .update.if(true, 0, v => v + 10)
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

  describe("delete.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .delete.if(false, 0)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .delete.if(true, 0)
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

  describe("clear.if()", () => {
    test("ok()", () => {
      const input = [1];
      {
        const result = Kasen(input)
          .clear.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .clear.if(true)
          .toJs();
        expect(result).toEqual([]);
      }
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

  describe("concat.if()", () => {
    test("ok()", () => {
      const input = [1];
      const arrays = [[2], [3]];
      {
        const result = Kasen(input)
          .concat.if(false, ...arrays)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .concat.if(true, ...arrays)
          .toJs();
        expect(result).toEqual([1, 2, 3]);
      }
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

  describe("insert.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .insert.if(false, 1, 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .insert.if(true, 1, 10)
          .toJs();
        expect(result).toEqual([1, 10, 2]);
      }
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
      ios.forEach(([input, args, expected]) => {
        const result = Kasen(input)
          .push(...args)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, args, expected]) => {
        const result = Kasen.push(input, ...args);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("push.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .push.if(false, 10, 11)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .push.if(true, 10, 11)
          .toJs();
        expect(result).toEqual([1, 2, 10, 11]);
      }
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

  describe("pop.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .pop.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .pop.if(true)
          .toJs();
        expect(result).toEqual([1]);
      }
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
      ios.forEach(([input, args, expected]) => {
        const result = Kasen(input)
          .unshift(...args)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, args, expected]) => {
        const result = Kasen.unshift(input, ...args);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("unshift.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .unshift.if(false, 10, 11)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .unshift.if(true, 10, 11)
          .toJs();
        expect(result).toEqual([10, 11, 1, 2]);
      }
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

  describe("shift.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .shift.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .shift.if(true)
          .toJs();
        expect(result).toEqual([2]);
      }
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

  describe("splice.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      const index = 1;
      const num = 0;
      const values = [10, 20];
      {
        const result = Kasen(input)
          .splice.if(false, index, num, ...values)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .splice.if(true, index, num, ...values)
          .toJs();
        expect(result).toEqual([1, 10, 20, 2]);
      }
    });
  });

  describe("setIn()", () => {
    test("ok", () => {
      const ios = [
        [[], [0], [10]],
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
  });

  describe("setIn.if()", () => {
    test("ok", () => {
      const input = [{ a: [] }];
      {
        const result = Kasen(input)
          .setIn.if(false, [0, "a", 0], 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .setIn.if(true, [0, "a", 0], 10)
          .toJs();
        expect(result).toEqual([{ a: [10] }]);
      }
    });
  });

  describe("updateIn()", () => {
    test("ok", () => {
      const ios = [
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
  });

  describe("updateIn.if()", () => {
    test("ok", () => {
      const input = [{ a: [1] }];
      {
        const result = Kasen(input)
          .updateIn.if(false, [0, "a", 0], v => v + 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .updateIn.if(true, [0, "a", 0], v => v + 10)
          .toJs();
        expect(result).toEqual([{ a: [11] }]);
      }
    });
  });

  describe("deleteIn()", () => {
    test("ok", () => {
      const ios = [
        [[1], [0], []],
        [[{ a: 1 }], [0, "a"], [{}]],
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

  describe("deleteIn.if()", () => {
    test("ok", () => {
      const input = [{ a: [1] }];
      {
        const result = Kasen(input)
          .deleteIn.if(false, [0, "a", 0])
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .deleteIn.if(true, [0, "a", 0])
          .toJs();
        expect(result).toEqual([{ a: [] }]);
      }
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

  describe("flatten.if()", () => {
    test("ok", () => {
      const input = [[1], 2, [3]];
      {
        const result = Kasen(input)
          .flatten.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .flatten.if(true)
          .toJs();
        expect(result).toEqual([1, 2, 3]);
      }
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

  describe("flatMap.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .flatMap.if(false, v => Array(v).fill(1))
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .flatMap.if(true, v => Array(v).fill(1))
          .toJs();
        expect(result).toEqual([1, 1, 1, 1, 1, 1]);
      }
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

  describe("sort.if()", () => {
    test("ok", () => {
      const input = [3, 2, 1];
      {
        const result = Kasen(input)
          .sort.if(false)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .sort.if(true)
          .toJs();
        expect(result).toEqual([1, 2, 3]);
      }
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
      {
        const run = () =>
          Kasen([])
            .chunk(0)
            .toJs();
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.chunk([], 0);
        expect(run).toThrow(TypeError);
      }
    });
  });

  describe("chunk.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .chunk.if(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .chunk.if(true, 2)
          .toJs();
        expect(result).toEqual([[1, 2], [3]]);
      }
    });

    test("error", () => {
      const run = () =>
        Kasen([])
          .chunk.if(false, 0)
          .toJs();
      expect(run).toThrow(TypeError);
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
      {
        const run = () =>
          Kasen([])
            .sliding(0)
            .toJs();
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.sliding([], 0);
        expect(run).toThrow(TypeError);
      }
      {
        const run = () =>
          Kasen([])
            .sliding(1, 0)
            .toJs();
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.sliding([], 1, 0);
        expect(run).toThrow(TypeError);
      }
    });
  });

  describe("sliding.if()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .sliding.if(false, 2)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .sliding.if(true, 2)
          .toJs();
        expect(result).toEqual([[1, 2], [2, 3]]);
      }
    });

    test("error", () => {
      const run = () =>
        Kasen([])
          .sliding.if(false, 0)
          .toJs();
      expect(run).toThrow(TypeError);
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
      {
        const run = () => Kasen.range._(0, 0, 0).toJs();
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.range(0, 0, 0);
        expect(run).toThrow(TypeError);
      }
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
      {
        const run = () => Kasen([]).reduceRight((acc, v) => acc + v);
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.reduceRight([], (acc, v) => acc + v);
        expect(run).toThrow(TypeError);
      }
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
      {
        const run = () => Kasen([]).reduceWhile((acc, v) => ["halt", acc + v]);
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.reduceWhile([], (acc, v) => ["halt", acc + v]);
        expect(run).toThrow(TypeError);
      }
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

  describe("hashCode()", () => {
    test("ok", () => {
      Kasen([1, 2, 3]).hashCode();
      Kasen.hashCode([1, 2, 3]);
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
