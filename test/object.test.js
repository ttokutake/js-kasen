import Kasen from "../dist/kasen";

describe("Object", () => {
  describe("copy()", () => {
    test("ok", () => {
      {
        const object = Kasen({ a: 1, b: 2, c: 3 }).map(v => v + 1);
        const object2 = object.copy().map(v => v + 1);
        expect(object.toJs()).toEqual({ a: 2, b: 3, c: 4 });
        expect(object2.toJs()).toEqual({ a: 3, b: 4, c: 5 });
      }
      {
        const object = { a: 1, b: 2, c: 3 };
        const object2 = Kasen.copy(object);
        object.a = 10;
        expect(object).toEqual({ a: 10, b: 2, c: 3 });
        expect(object2).toEqual({ a: 1, b: 2, c: 3 });
      }
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

  describe("map.if()", () => {
    test("ok", () => {
      const input = { a: 1, b: 2, c: 3 };
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
        expect(result).toEqual({ a: 2, b: 3, c: 4 });
      }
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
      const input = { a: { a: 1 }, b: { a: 1 } };
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
        expect(result).toEqual({ a: 1, b: 1 });
      }
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

  describe("filter.if()", () => {
    test("ok", () => {
      const input = { a: 1, b: 2, c: 3 };
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
        expect(result).toEqual({ b: 2 });
      }
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
      const input = { a: 1, b: 2, c: 3 };
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
        expect(result).toEqual({ b: 2 });
      }
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

  describe("pickIf()", () => {
    test("ok", () => {
      const input = { a: 1, b: 2, c: 3 };
      {
        const result = Kasen(input)
          .pickIf(false, ["a", "c"])
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .pickIf(true, ["a", "c"])
          .toJs();
        expect(result).toEqual({ a: 1, c: 3 });
      }
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
      ios.forEach(([input, key, expected]) => {
        const result = Kasen.set(input, key, 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("set.if()", () => {
    test("ok", () => {
      const input = { a: 1 };
      {
        const result = Kasen(input)
          .set.if(false, "a", 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .set.if(true, "a", 10)
          .toJs();
        expect(result).toEqual({ a: 10 });
      }
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
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, key, expected]) => {
        const result = Kasen.update(input, key, v => (v || 0) + 10);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("update.if()", () => {
    test("ok", () => {
      const input = { a: 1 };
      {
        const result = Kasen(input)
          .update.if(false, "a", v => v + 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .update.if(true, "a", v => v + 10)
          .toJs();
        expect(result).toEqual({ a: 11 });
      }
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
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, key, expected]) => {
        const result = Kasen.delete(input, key);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("deleteIf()", () => {
    test("ok", () => {
      const input = { a: 1 };
      {
        const result = Kasen(input)
          .deleteIf(false, "a")
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .deleteIf(true, "a")
          .toJs();
        expect(result).toEqual({});
      }
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
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, keys, expected]) => {
        const result = Kasen.deleteAll(input, keys);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("deleteAll()", () => {
    test("ok", () => {
      const input = { a: 1, b: 2 };
      const keys = ["a"];
      {
        const result = Kasen(input)
          .deleteAllIf(false, keys)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .deleteAllIf(true, keys)
          .toJs();
        expect(result).toEqual({ b: 2 });
      }
    });
  });

  describe("clear()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }];
      inputs.forEach(input => {
        const result = Kasen(input)
          .clear()
          .toJs();
        expect(result).toEqual({});
      });
    });
  });

  describe("clearIf()", () => {
    test("ok()", () => {
      const input = { a: 1 };
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
        expect(result).toEqual({});
      }
    });
  });

  describe("merge() (assign())", () => {
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
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.merge(input, ...objects);
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen(input)
          .assign(...objects)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, objects, expected]) => {
        const result = Kasen.assign(input, ...objects);
        expect(result).toEqual(expected);
      });
    });
  });

  describe("mergeIf() (assignIf())", () => {
    test("ok()", () => {
      const input = { a: 1 };
      const objects = [{ b: 2 }, { c: 3 }];
      {
        const result = Kasen(input)
          .mergeIf(false, ...objects)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .mergeIf(true, ...objects)
          .toJs();
        expect(result).toEqual({ a: 1, b: 2, c: 3 });
      }
      {
        const result = Kasen(input)
          .assignIf(false, ...objects)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .assignIf(true, ...objects)
          .toJs();
        expect(result).toEqual({ a: 1, b: 2, c: 3 });
      }
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
      ios.forEach(([input, args, expected]) => {
        const result = Kasen(input)
          .mergeWith((left, right) => left + right, ...args)
          .toJs();
        expect(result).toEqual(expected);
      });
      ios.forEach(([input, args, expected]) => {
        const result = Kasen.mergeWith(
          input,
          (left, right) => left + right,
          ...args
        );
        expect(result).toEqual(expected);
      });
    });
  });

  describe("mergeWithIf()", () => {
    test("ok", () => {
      const input = { a: 1, b: 1 };
      {
        const result = Kasen(input)
          .mergeWithIf(false, (left, right) => left + right, { a: 1 }, { b: 1 })
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .mergeWithIf(true, (left, right) => left + right, { a: 1 }, { b: 1 })
          .toJs();
        expect(result).toEqual({ a: 2, b: 2 });
      }
    });
  });

  describe("setIn()", () => {
    test("ok", () => {
      const ios = [
        [{}, ["a"], { a: 10 }],
        [{ a: [] }, ["a", 0], { a: [10] }],
        [{ a: [{}] }, ["a", 0, "a"], { a: [{ a: 10 }] }]
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

  describe("setInIf()", () => {
    test("ok", () => {
      const input = { a: [{}] };
      {
        const result = Kasen(input)
          .setInIf(false, ["a", 0, "a"], 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .setInIf(true, ["a", 0, "a"], 10)
          .toJs();
        expect(result).toEqual({ a: [{ a: 10 }] });
      }
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
