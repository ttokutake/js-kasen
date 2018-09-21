import Kasen from "../dist/kasen";

describe("Object", () => {
  describe("clone()", () => {
    test("ok", () => {
      const object = Kasen({ a: 1, b: 2, c: 3 }).map(v => v + 1);
      const object2 = object.clone().map(v => v + 1);
      expect(object.toJs()).toEqual({ a: 2, b: 3, c: 4 });
      expect(object2.toJs()).toEqual({ a: 3, b: 4, c: 5 });
    });
  });

  describe("tap()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
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
        [{}, {}],
        [{ a: 1 }, { a: 2 }],
        [{ a: 1, b: 2 }, { a: 2, b: 3 }],
        [{ a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 4 }]
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

  describe("filter()", () => {
    test("ok", () => {
      const ios = [
        [{}, {}],
        [{ a: 1 }, {}],
        [{ b: 2 }, { b: 2 }],
        [{ a: 1, b: 2 }, { b: 2 }],
        [{ a: 1, b: 2, c: 3 }, { b: 2 }]
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

  describe("pick()", () => {
    test("ok", () => {
      const ios = [
        [{}, {}],
        [{ a: 1 }, { a: 1 }],
        [{ b: 2 }, {}],
        [{ a: 1, b: 2 }, { a: 1 }],
        [{ a: 1, b: 2, c: 3 }, { a: 1, c: 3 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .pick(["a", "c"])
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.pick(input, ["a", "c"]);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("set()", () => {
    test("ok", () => {
      const ios = [
        [{}, "a", { a: 10 }],
        [{ a: 1 }, "a", { a: 10 }],
        [{ a: 1 }, "b", { a: 1, b: 10 }]
      ];
      ios.forEach(([input, key, expected]) => {
        const result = Kasen(input)
          .set(key, 10)
          .toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
    });
  });

  describe("toJs()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
      inputs.forEach(input => {
        const result = Kasen(input).toJs();
        expect(result).toEqual(input);
      });
    });
  });

  describe("reduce()", () => {
    test("ok", () => {
      const ios = [
        [{}, 0, 0],
        [{ a: 1 }, undefined, 1],
        [{ a: 1 }, 10, 11],
        [{ a: 1, b: 2 }, undefined, 3],
        [{ a: 1, b: 2 }, 10, 13],
        [{ a: 1, b: 2, c: 3 }, undefined, 6],
        [{ a: 1, b: 2, c: 3 }, 10, 16]
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
        const run = () => Kasen({}).reduce((acc, v) => acc + v);
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.reduce({}, (acc, v) => acc + v);
        expect(run).toThrow(TypeError);
      }
    });
  });

  describe("every()", () => {
    test("ok", () => {
      const ios = [
        [{}, true],
        [{ a: 1 }, true],
        [{ b: 2 }, false],
        [{ a: 1, b: 2 }, false],
        [{ a: 1, b: 2, c: 3 }, false],
        [{ a: 1, b: 3, c: 5 }, true]
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
        [{}, undefined],
        [{ a: 1 }, 1],
        [{ b: 2 }, undefined],
        [{ a: 1, b: 2 }, 1],
        [{ b: 2, c: 3 }, 3],
        [{ a: 1, b: 2, c: 3 }, 1],
        [{ b: 2, d: 4, e: 5 }, 5]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).find(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      // TODO: static method
    });
  });

  describe("forEach()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
      inputs.forEach(input => {
        const result = Kasen(input).forEach(v => v + 1);
        expect(result).toBeUndefined();
      });
      // TODO: static method
    });
  });
});
