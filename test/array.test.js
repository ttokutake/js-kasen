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

  describe("filter.if()", () => {
    test("ok", () => {
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
      const ios = [[[], [10]], [[1], [1, 10]], [[1, 2], [1, 2, 10]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .push(10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.push(input, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("push.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .push.if(false, 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .push.if(true, 10)
          .toJs();
        expect(result).toEqual([1, 2, 10]);
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
      const ios = [[[], [10]], [[1], [10, 1]], [[1, 2], [10, 1, 2]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .unshift(10)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.unshift(input, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("unshift.if()", () => {
    test("ok", () => {
      const input = [1, 2];
      {
        const result = Kasen(input)
          .unshift.if(false, 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .unshift.if(true, 10)
          .toJs();
        expect(result).toEqual([10, 1, 2]);
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

  describe("flatMap()", () => {
    test("ok", () => {
      const input = [1, 2, 3];
      {
        const result = Kasen(input)
          .flatMapIf(false, v => Array(v).fill(1))
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .flatMapIf(true, v => Array(v).fill(1))
          .toJs();
        expect(result).toEqual([1, 1, 1, 1, 1, 1]);
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
