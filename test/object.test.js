import Kasen from "../src/kasen";

describe("Object", () => {
  describe("copy()", () => {
    test("ok", () => {
      {
        const object = Kasen({ a: 1, b: 2, c: 3 })
          .map(v => v + 1)
          .set("a", 10);
        const object2 = object.copy().map(v => v + 1);
        expect(object.toJS()).toEqual({ a: 10, b: 3, c: 4 });
        expect(object2.toJS()).toEqual({ a: 11, b: 4, c: 5 });
      }
      {
        const object = Kasen({ a: 1, b: 2, c: 3 });
        const object2 = object.copy();
        object.map(v => v + 1);
        expect(object.toJS()).toEqual({ a: 2, b: 3, c: 4 });
        expect(object2.toJS()).toEqual({ a: 1, b: 2, c: 3 });
      }
      {
        const object = { a: 1, b: 2, c: 3 };
        const object2 = Kasen(object);
        const object3 = object2.copy();
        object.a = 10;
        expect(object2.toJS()).toEqual({ a: 10, b: 2, c: 3 });
        expect(object3.toJS()).toEqual({ a: 1, b: 2, c: 3 });
      }
      {
        const origin = { a: 1, b: 2, c: 3 };
        const object = Kasen.copy(origin);
        origin.a = 10;
        expect(origin).toEqual({ a: 10, b: 2, c: 3 });
        expect(object).toEqual({ a: 1, b: 2, c: 3 });
      }
    });
  });

  describe("memoize()", () => {
    test("ok", () => {
      {
        const origin = { a: null, b: null, c: null };
        const object = Kasen(origin).memoize();
        origin.a = 1;
        expect(origin).toEqual({ a: 1, b: null, c: null });
        expect(object.toJS()).toEqual({ a: null, b: null, c: null });
      }
      {
        const object = Kasen({ a: null, b: null, c: null })
          .map(() => Math.random())
          .memoize();
        expect(object.toJS()).toEqual(object.toJS());
      }
      {
        const object = Kasen({ a: null, b: null, c: null })
          .map(() => Math.random())
          .set("a", 1)
          .memoize();
        expect(object.toJS()).toEqual(object.toJS());
      }
    });
  });

  describe("tapEach()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
      inputs.forEach(input => {
        const result = Kasen(input)
          .tapEach(v => v + 1)
          .toJS();
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
          .toJS();
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
      const ios = [
        [{}, {}],
        [{ a: { a: 1 } }, { a: 1 }],
        [{ a: { a: 1 }, b: { a: 1 } }, { a: 1, b: 1 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .pluck("a")
          .toJS();
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
      const ios = [
        [{}, {}],
        [{ a: 1 }, { a: 1 }],
        [{ a: null }, {}],
        [{ a: 1, b: null }, { a: 1 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .filter()
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.filter(input);
        expect(result).toEqual(expected);
      });
    });

    test("fun is specified", () => {
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
          .toJS();
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
        [{}, {}],
        [{ a: 1 }, {}],
        [{ b: 2 }, { b: 2 }],
        [{ a: 1, b: 2 }, { b: 2 }],
        [{ a: 1, b: 2, c: 3 }, { b: 2 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .filterNot(v => v % 2 === 1)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.filterNot(input, v => v % 2 === 1);
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
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.pick(input, ["a", "c"]);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen({}).pick()).toThrow(TypeError);
      expect(() => Kasen({}).pick(null)).toThrow(TypeError);
      expect(() => Kasen.pick()).toThrow(TypeError);
      expect(() => Kasen.pick(null)).toThrow(TypeError);
      expect(() => Kasen.pick([])).toThrow(TypeError);
      expect(() => Kasen.pick({})).toThrow(TypeError);
      expect(() => Kasen.pick({}, null)).toThrow(TypeError);
    });
  });

  describe("flip()", () => {
    test("fun is undefined", () => {
      const ios = [
        [{}, {}],
        [{ a: 1 }, { 1: "a" }],
        [{ a: 1, b: 2 }, { 1: "a", 2: "b" }],
        [{ a: 1, b: 1 }, { 1: "b" }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .flip()
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.flip(input);
        expect(result).toEqual(expected);
      });
    });

    test("fun is specified", () => {
      const ios = [
        [{}, {}],
        [{ a: { aa: 1 } }, { 1: "a" }],
        [{ a: { aa: 1 }, b: { aa: 2 } }, { 1: "a", 2: "b" }],
        [{ a: { aa: 1 }, b: { aa: 1 } }, { 1: "b" }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input)
          .flip(v => v.aa)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.flip(input, v => v.aa);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen({}).flip(null)).toThrow(TypeError);
      expect(() => Kasen.flip()).toThrow(TypeError);
      expect(() => Kasen.flip(null)).toThrow(TypeError);
      expect(() => Kasen.flip([])).toThrow(TypeError);
      expect(() => Kasen.flip({}, null)).toThrow(TypeError);
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
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, key, expected]) => {
        const result = Kasen.set(input, key, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("update()", () => {
    test("ok", () => {
      const ios = [
        [{}, "a", { a: 10 }],
        [{ a: 1 }, "a", { a: 11 }],
        [{ a: 1 }, "b", { a: 1, b: 10 }]
      ];
      ios.forEach(([input, key, expected]) => {
        const result = Kasen(input)
          .update(key, v => (v || 0) + 10)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, key, expected]) => {
        const result = Kasen.update(input, key, v => (v || 0) + 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("delete()", () => {
    test("ok", () => {
      const ios = [
        [{}, "a", {}],
        [{ a: 1 }, "a", {}],
        [{ a: 1 }, "b", { a: 1 }]
      ];
      ios.forEach(([input, key, expected]) => {
        const result = Kasen(input)
          .delete(key)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, key, expected]) => {
        const result = Kasen.delete(input, key);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("deleteAll()", () => {
    test("ok", () => {
      const ios = [
        [{}, [], {}],
        [{}, ["a"], {}],
        [{ a: 1 }, [], { a: 1 }],
        [{ a: 1 }, ["a"], {}],
        [{ a: 1 }, ["b"], { a: 1 }],
        [{ a: 1, b: 2 }, [], { a: 1, b: 2 }],
        [{ a: 1, b: 2 }, ["a"], { b: 2 }],
        [{ a: 1, b: 2 }, ["a", "b"], {}]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .deleteAll(keys)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.deleteAll(input, keys);
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen({}).deleteAll()).toThrow(TypeError);
      expect(() => Kasen({}).deleteAll(null)).toThrow(TypeError);
      expect(() => Kasen.deleteAll()).toThrow(TypeError);
      expect(() => Kasen.deleteAll(null)).toThrow(TypeError);
      expect(() => Kasen.deleteAll([])).toThrow(TypeError);
      expect(() => Kasen.deleteAll({})).toThrow(TypeError);
      expect(() => Kasen.deleteAll({}, null)).toThrow(TypeError);
    });
  });

  describe("clear()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }];
      inputs.forEach(input => {
        const result = Kasen(input)
          .clear()
          .toJS();
        expect(result).toEqual({});
      });
    });
  });

  describe("merge() / assign()", () => {
    test("ok()", () => {
      const ios = [
        [{}, [{}], {}],
        [{}, [{ a: 1 }], { a: 1 }],
        [{}, [{ a: 1 }, { b: 2 }], { a: 1, b: 2 }],
        [{ a: 1 }, [{}], { a: 1 }],
        [{ a: 1 }, [{ b: 2 }], { a: 1, b: 2 }],
        [{ a: 1 }, [{ b: 2 }, { c: 3 }], { a: 1, b: 2, c: 3 }],
        [{ a: 1 }, [{ a: 2 }], { a: 2 }],
        [{ a: 1 }, [{ a: 2 }, { a: 3 }], { a: 3 }]
      ];
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen(input)
          .merge(...objects)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.merge(input, ...objects);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen(input)
          .assign(...objects)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.assign(input, ...objects);
        expect(result).toEqual(expected);
      });
    });

    test("ok (static only)", () => {
      {
        const result = Kasen.merge();
        expect(result).toEqual({});
      }
      {
        const result = Kasen.assign();
        expect(result).toEqual({});
      }
    });

    test("error", () => {
      expect(() => Kasen({}).merge(null)).toThrow(TypeError);
      expect(() => Kasen.merge(null)).toThrow(TypeError);
      expect(() => Kasen.merge([])).toThrow(TypeError);
      expect(() => Kasen.merge({}, null)).toThrow(TypeError);
      expect(() => Kasen({}).assign(null)).toThrow(TypeError);
      expect(() => Kasen.assign(null)).toThrow(TypeError);
      expect(() => Kasen.assign([])).toThrow(TypeError);
      expect(() => Kasen.assign({}, null)).toThrow(TypeError);
    });
  });

  describe("mergeWith()", () => {
    test("ok", () => {
      const ios = [
        [{}, [], {}],
        [{}, [{}], {}],
        [{}, [{}, {}], {}],
        [{ a: 1 }, [], { a: 1 }],
        [{ a: 1 }, [{}], { a: 1 }],
        [{ a: 1 }, [{}, {}], { a: 1 }],
        [{ a: 1, b: 1 }, [], { a: 1, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 1 }], { a: 2, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 1 }, { a: 1 }], { a: 3, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 1 }, { b: 1 }], { a: 2, b: 2 }]
      ];
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen(input)
          .mergeWith((left, right) => left + right, ...objects)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.mergeWith(
          input,
          (left, right) => left + right,
          ...objects
        );
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen({}).mergeWith()).toThrow(TypeError);
      expect(() => Kasen({}).mergeWith(null)).toThrow(TypeError);
      expect(() => Kasen({}).mergeWith(() => null, null)).toThrow(TypeError);
      expect(() => Kasen.mergeWith()).toThrow(TypeError);
      expect(() => Kasen.mergeWith(null)).toThrow(TypeError);
      expect(() => Kasen.mergeWith([])).toThrow(TypeError);
      expect(() => Kasen.mergeWith({}, null)).toThrow(TypeError);
      expect(() => Kasen.mergeWith({}, () => null, null)).toThrow(TypeError);
    });
  });

  describe("mergeDeep()", () => {
    test("ok", () => {
      const ios = [
        [{}, [], {}],
        [{}, [{}], {}],
        [{}, [{}, {}], {}],
        [{ a: 1 }, [], { a: 1 }],
        [{ a: 1 }, [{}], { a: 1 }],
        [{ a: 1 }, [{}, {}], { a: 1 }],
        [{ a: 1, b: 1 }, [{ a: 10 }], { a: 10, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 10 }, { a: 11 }], { a: 11, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 10 }, { b: 20 }], { a: 10, b: 20 }],
        [
          { a: { aa: 1, bb: 2 }, b: { aa: 1, bb: 2 } },
          [{ a: { aa: 10, cc: 30 } }, { b: { aa: 11, dd: 40 } }],
          { a: { aa: 10, bb: 2, cc: 30 }, b: { aa: 11, bb: 2, dd: 40 } }
        ]
      ];
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen(input)
          .mergeDeep(...objects)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.mergeDeep(input, ...objects);
        expect(result).toEqual(expected);
      });
    });

    test("ok (static only)", () => {
      const result = Kasen.mergeDeep();
      expect(result).toEqual({});
    });

    test("error", () => {
      expect(() => Kasen({}).mergeDeep(null)).toThrow(TypeError);
      expect(() => Kasen.mergeDeep(null)).toThrow(TypeError);
      expect(() => Kasen.mergeDeep([])).toThrow(TypeError);
      expect(() => Kasen.mergeDeep({}, null)).toThrow(TypeError);
    });
  });

  describe("mergeDeepWith()", () => {
    test("ok", () => {
      const ios = [
        [{}, [], {}],
        [{}, [{}], {}],
        [{}, [{}, {}], {}],
        [{ a: 1 }, [], { a: 1 }],
        [{ a: 1 }, [{}], { a: 1 }],
        [{ a: 1 }, [{}, {}], { a: 1 }],
        [{ a: 1, b: 1 }, [{ a: 10 }], { a: 11, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 10 }, { a: 11 }], { a: 22, b: 1 }],
        [{ a: 1, b: 1 }, [{ a: 10 }, { b: 20 }], { a: 11, b: 21 }],
        [
          { a: { aa: 1, bb: 2 }, b: { aa: 1, bb: 2 } },
          [{ a: { aa: 10, cc: 30 } }, { b: { aa: 11, dd: 40 } }],
          { a: { aa: 11, bb: 2, cc: 30 }, b: { aa: 12, bb: 2, dd: 40 } }
        ]
      ];
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen(input)
          .mergeDeepWith((v1, v2) => v1 + v2, ...objects)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.mergeDeepWith(
          input,
          (v1, v2) => v1 + v2,
          ...objects
        );
        expect(result).toEqual(expected);
      });
    });

    test("error", () => {
      expect(() => Kasen({}).mergeDeepWith()).toThrow(TypeError);
      expect(() => Kasen({}).mergeDeepWith(null)).toThrow(TypeError);
      expect(() => Kasen({}).mergeDeepWith(() => null, null)).toThrow(
        TypeError
      );
      expect(() => Kasen.mergeDeepWith()).toThrow(TypeError);
      expect(() => Kasen.mergeDeepWith(null)).toThrow(TypeError);
      expect(() => Kasen.mergeDeepWith([])).toThrow(TypeError);
      expect(() => Kasen.mergeDeepWith({}, null)).toThrow(TypeError);
      expect(() => Kasen.mergeDeepWith({}, () => null, null)).toThrow(
        TypeError
      );
    });
  });

  describe("setIn()", () => {
    test("initializer is undefined", () => {
      const ios = [
        [{}, [], {}],
        [{}, ["a"], { a: 10 }],
        [{ a: [] }, [], { a: [] }],
        [{ a: [] }, ["a", 0], { a: [10] }],
        [{ a: [{}] }, ["a", 0, "a"], { a: [{ a: 10 }] }]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .setIn(keys, 10)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.setIn(input, keys, 10);
        expect(result).toEqual(expected);
      });
    });

    test("initializer is specified", () => {
      const ios = [
        [{ a: [{}] }, ["a", 0, "a"], { a: [{ a: 10 }] }],
        [{}, [["a", []], [0, {}], "a"], { a: [{ a: 10 }] }]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .setIn(keys, 10)
          .toJS();
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
        [{}, [], {}],
        [{ a: 1 }, [], { a: 1 }],
        [{ a: 1 }, ["a"], { a: 11 }],
        [{ a: [1] }, ["a", 0], { a: [11] }],
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], { a: [{ a: 11 }] }]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .updateIn(keys, v => v + 10)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.updateIn(input, keys, v => v + 10);
        expect(result).toEqual(expected);
      });
    });

    test("initializer is specified", () => {
      const ios = [
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], { a: [{ a: 11 }] }],
        [{}, [["a", []], [0, {}], ["a", 100]], { a: [{ a: 110 }] }]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .updateIn(keys, v => v + 10)
          .toJS();
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
        [{}, ["a"], {}],
        [{ a: 1 }, ["a"], {}],
        [{ a: 1 }, ["a", 0], { a: 1 }],
        [{ a: [1] }, ["a", 0], { a: [] }],
        [{ a: [1] }, ["a", 0, "a"], { a: [1] }],
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], { a: [{}] }]
      ];
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen(input)
          .deleteIn(keys)
          .toJS();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.deleteIn(input, keys);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("isEmpty()", () => {
    test("ok", () => {
      const inputs = [[{}, true], [{ a: 1 }, false], [{ a: 1, b: 2 }, false]];
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
      const inputs = [
        [{}, 0],
        [{ a: 1 }, 1],
        [{ a: 1, b: 2 }, 2],
        [{ a: 1, b: 2, c: 3 }, 3]
      ];
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
      const inputs = [
        [{}, 0],
        [{ a: 1 }, 1],
        [{ a: 1, b: 2 }, 1],
        [{ a: 1, b: 2, c: 3 }, 2]
      ];
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
    test("defaultValue is undefined", () => {
      const inputs = [
        [{}, "a", undefined],
        [{ a: 1 }, "a", 1],
        [{ a: 1 }, "b", undefined],
        [{ a: 1, b: 2 }, "a", 1],
        [{ a: 1, b: 2 }, "b", 2],
        [{ a: 1, b: 2 }, "c", undefined]
      ];
      inputs.forEach(([input, key, expected]) => {
        const result = Kasen(input).get(key);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, key, expected]) => {
        const result = Kasen.get(input, key);
        expect(result).toBe(expected);
      });
    });

    test("defaultValue is specified", () => {
      const inputs = [
        [{}, "a", 10],
        [{ a: 1 }, "a", 1],
        [{ a: 1 }, "b", 10],
        [{ a: 1, b: 2 }, "a", 1],
        [{ a: 1, b: 2 }, "b", 2],
        [{ a: 1, b: 2 }, "c", 10]
      ];
      inputs.forEach(([input, key, expected]) => {
        const result = Kasen(input).get(key, 10);
        expect(result).toBe(expected);
      });
      inputs.forEach(([input, key, expected]) => {
        const result = Kasen.get(input, key, 10);
        expect(result).toBe(expected);
      });
    });
  });

  describe("has()", () => {
    test("ok", () => {
      const inputs = [
        [{}, "a", false],
        [{ a: 1 }, "a", true],
        [{ a: 1 }, "b", false],
        [{ a: 1, b: 2 }, "a", true],
        [{ a: 1, b: 2 }, "b", true],
        [{ a: 1, b: 2 }, "c", false]
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
        [{}, 0, false],
        [{ a: 1 }, 0, false],
        [{ a: 1 }, 1, true],
        [{ a: 1, b: 2 }, 0, false],
        [{ a: 1, b: 2 }, 1, true],
        [{ a: 1, b: 2 }, 2, true]
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
    test("defaultValue is undefined", () => {
      const ios = [
        [{}, [], undefined],
        [{}, ["a"], undefined],
        [{ a: 1 }, ["a"], 1],
        [{ a: 1 }, ["a", 0], undefined],
        [{ a: [1] }, ["a", 0], 1],
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], 1]
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

    test("defaultValue is specified", () => {
      const ios = [
        [{}, [], 10],
        [{}, ["a"], 10],
        [{ a: 1 }, ["a"], 1],
        [{ a: 1 }, ["a", 0], 10],
        [{ a: [1] }, ["a", 0], 1],
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], 1]
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
        [{}, [], true],
        [{}, ["a"], false],
        [{ a: 1 }, ["a"], true],
        [{ a: 1 }, ["a", 0], false],
        [{ a: [1] }, ["a"], true],
        [{ a: [1] }, ["a", 0], true],
        [{ a: [1] }, ["a", 1], false],
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], true]
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

  describe("toJS()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
      inputs.forEach(input => {
        const result = Kasen(input).toJS();
        expect(result).toEqual(input);
      });
    });
  });

  describe("toArray()", () => {
    test("ok", () => {
      const inputs = [
        [{}, []],
        [{ a: 1 }, [["a", 1]]],
        [{ a: 1, b: 2 }, [["a", 1], ["b", 2]]],
        [{ a: 1, b: 2, c: 3 }, [["a", 1], ["b", 2], ["c", 3]]]
      ];
      inputs.forEach(([input, expected]) => {
        const result = Kasen(input).toArray();
        expect(result).toEqual(expected);
      });
      inputs.forEach(([input, expected]) => {
        const result = Kasen.toArray(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("toObject()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
      inputs.forEach(input => {
        const result = Kasen(input).toObject();
        expect(result).toEqual(input);
      });
      inputs.forEach(input => {
        const result = Kasen.toObject(input);
        expect(result).toEqual(input);
      });
    });
  });

  describe("reduce()", () => {
    test("init is undefined", () => {
      const ios = [
        [{ a: 1 }, 1],
        [{ a: 1, b: 2 }, 3],
        [{ a: 1, b: 2, c: 3 }, 6]
      ];
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
        [{}, 10],
        [{ a: 1 }, 11],
        [{ a: 1, b: 2 }, 13],
        [{ a: 1, b: 2, c: 3 }, 16]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduce((acc, v) => acc + v, 10);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduce(input, (acc, v) => acc + v, 10);
        expect(result).toBe(expected);
      });
    });
  });

  describe("reduceWhile()", () => {
    test("ok", () => {
      const ios = [
        [{}, 10],
        [{ a: 1 }, 11],
        [{ a: 1, b: 2 }, 2],
        [{ a: 1, b: 2, c: 3 }, 2]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).reduceWhile(
          (acc, v) => (v % 2 === 0 ? ["halt", v] : ["cont", acc + v]),
          10
        );
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.reduceWhile(
          input,
          (acc, v) => (v % 2 === 0 ? ["halt", v] : ["cont", acc + v]),
          10
        );
        expect(result).toBe(expected);
      });
    });
  });

  describe("scan()", () => {
    test("init is undefined", () => {
      const ios = [
        [{ a: 1 }, [1]],
        [{ a: 1, b: 1 }, [1, 2]],
        [{ a: 1, b: 1, c: 1 }, [1, 2, 3]]
      ];
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
        [{ a: 1 }, [10, 11]],
        [{ a: 1, b: 1 }, [10, 11, 12]],
        [{ a: 1, b: 1, c: 1 }, [10, 11, 12, 13]]
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
  });

  describe("partition()", () => {
    test("ok", () => {
      const inputs = [
        [{}, [{}, {}]],
        [{ a: 1 }, [{ a: 1 }, {}]],
        [{ a: 1, b: 2 }, [{ a: 1 }, { b: 2 }]],
        [{ a: 1, b: 2, c: 3 }, [{ a: 1, c: 3 }, { b: 2 }]]
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
        [{}, ""],
        [{ a: 1 }, "1"],
        [{ a: 1, b: 2 }, "1,2"],
        [{ a: 1, b: 2, c: 3 }, "1,2,3"]
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
        [{}, ""],
        [{ a: 1 }, "1"],
        [{ a: 1, b: 2 }, "1|2"],
        [{ a: 1, b: 2, c: 3 }, "1|2|3"]
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
      [{}, {}],
      [{ a: 1 }, { 1: [1] }],
      [{ a: 1, b: 2 }, { 1: [1], 2: [2] }],
      [{ a: 1, b: 2, c: 1 }, { 1: [1, 1], 2: [2] }]
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.every(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("some()", () => {
    test("ok", () => {
      const ios = [
        [{}, false],
        [{ a: 1 }, true],
        [{ b: 2 }, false],
        [{ a: 1, b: 2 }, true],
        [{ b: 2, d: 4 }, false],
        [{ b: 2, c: 3, d: 4 }, true],
        [{ b: 2, d: 4, f: 6 }, false]
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
      ios.forEach(([input, expected]) => {
        const result = Kasen.find(input, v => v % 2 === 1);
        expect(result).toBe(expected);
      });
    });
  });

  describe("findEntry()", () => {
    test("ok", () => {
      const ios = [
        [{}, undefined],
        [{ a: 1 }, ["a", 1]],
        [{ b: 2 }, undefined],
        [{ a: 1, b: 2 }, ["a", 1]],
        [{ b: 2, c: 3 }, ["c", 3]],
        [{ a: 1, b: 2, c: 3 }, ["a", 1]],
        [{ b: 2, d: 4, e: 5 }, ["e", 5]]
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

  describe("findKey()", () => {
    test("ok", () => {
      const ios = [
        [{}, undefined],
        [{ a: 1 }, "a"],
        [{ b: 2 }, undefined],
        [{ a: 1, b: 2 }, "a"],
        [{ b: 2, c: 3 }, "c"],
        [{ a: 1, b: 2, c: 3 }, "a"],
        [{ b: 2, d: 4, e: 5 }, "e"]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).findKey(v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.findKey(input, v => v % 2 === 1);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("keyOf()", () => {
    test("ok", () => {
      const ios = [
        [{}, 1, undefined],
        [{ a: 1 }, 1, "a"],
        [{ a: 1 }, 2, undefined],
        [{ a: 1, b: 2 }, 1, "a"],
        [{ a: 1, b: 2 }, 2, "b"],
        [{ a: 1, b: 2 }, 3, undefined]
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

  describe("sum()", () => {
    test("fun is undefined", () => {
      const ios = [
        [{}, 0],
        [{ a: 1 }, 1],
        [{ a: 1, b: 2 }, 3],
        [{ a: 1, b: 2, c: 3 }, 6]
      ];
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
        [{}, 0],
        [{ a: { aa: 1 } }, 1],
        [{ a: { aa: 1 }, b: { aa: 2 } }, 3],
        [{ a: { aa: 1 }, b: { aa: 2 }, c: { aa: 3 } }, 6]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).sum(v => v.aa);
        expect(result).toBe(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.sum(input, v => v.aa);
        expect(result).toBe(expected);
      });
    });
  });

  describe("max()", () => {
    test("fun is undefined", () => {
      const ios = [
        [{}, undefined],
        [{ a: 1 }, 1],
        [{ a: 1, b: 2 }, 2],
        [{ a: 1, b: 2, c: 3 }, 3]
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
        [{}, undefined],
        [{ a: { aa: 1 } }, { aa: 1 }],
        [{ a: { aa: 1 }, b: { aa: 2 } }, { aa: 2 }],
        [{ a: { aa: 1 }, b: { aa: 2 }, c: { aa: 3 } }, { aa: 3 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).max((v1, v2) => v1.aa > v2.aa);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.max(input, (v1, v2) => v1.aa > v2.aa);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("min()", () => {
    test("fun is undefined", () => {
      const ios = [
        [{}, undefined],
        [{ a: 1 }, 1],
        [{ a: 1, b: 2 }, 1],
        [{ a: 1, b: 2, c: 3 }, 1]
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
        [{}, undefined],
        [{ a: { aa: 1 } }, { aa: 1 }],
        [{ a: { aa: 1 }, b: { aa: 2 } }, { aa: 1 }],
        [{ a: { aa: 1 }, b: { aa: 2 }, c: { aa: 3 } }, { aa: 1 }]
      ];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).min((v1, v2) => v1.aa < v2.aa);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.min(input, (v1, v2) => v1.aa < v2.aa);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("equals()", () => {
    test("ok", () => {
      const ios = [
        [{}, undefined, false],
        [{}, null, false],
        [{}, true, false],
        [{}, 1, false],
        [{}, "a", false],
        [{}, [], false],
        [{}, () => undefined, false],
        [{}, {}, true],
        [{}, { a: 1 }, false],
        [{ a: undefined }, { b: undefined }, false],
        [{ a: 1 }, {}, false],
        [{ a: 1 }, { a: 1 }, true],
        [{ a: 1 }, { a: 2 }, false],
        [{ a: 1 }, { b: 2 }, false],
        [{ a: 1 }, { a: 1, b: 2 }, false],
        [{ a: 1, b: 2 }, { a: 1, b: 2 }, true]
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
      const ios = [[{}, []], [{ a: 1 }, ["a"]], [{ a: 1, b: 2 }, ["a", "b"]]];
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
      const ios = [[{}, []], [{ a: 1 }, [1]], [{ a: 1, b: 2 }, [1, 2]]];
      ios.forEach(([input, expected]) => {
        const result = Kasen(input).values();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, expected]) => {
        const result = Kasen.values(input);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("entries()", () => {
    test("ok", () => {
      const ios = [
        [{}, []],
        [{ a: 1 }, [["a", 1]]],
        [{ a: 1, b: 2 }, [["a", 1], ["b", 2]]]
      ];
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
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
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
});
