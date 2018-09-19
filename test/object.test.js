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

  describe("map()", () => {
    test("ok", () => {
      const ios = [
        [{}, {}],
        [{ a: 1 }, { a: 2 }],
        [{ a: 1, b: 2 }, { a: 2, b: 3 }],
        [{ a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 4 }]
      ];
      ios.forEach(([input, expected]) => {
        const object = Kasen(input);
        const result = object.map(v => v + 1).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
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
        const object = Kasen(input);
        const result = object.filter(v => v % 2 === 0).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
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
        const object = Kasen(input);
        const result = object.pick(["a", "c"]).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
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
        const object = Kasen(input);
        const result = object.set(key, 10).toJs();
        expect(result).toEqual(expected);
      });
      // TODO: static method
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
        const object = Kasen(input);
        const result = object.every(v => v % 2 === 1);
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
        const object = Kasen(input);
        const result = object.find(v => v % 2 === 1);
        expect(result).toBe(expected);
      });
      // TODO: static method
    });
  });
});
