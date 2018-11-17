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

  describe("pick.if()", () => {
    test("ok", () => {
      const input = { a: 1, b: 2, c: 3 };
      {
        const result = Kasen(input)
          .pick.if(false, ["a", "c"])
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .pick.if(true, ["a", "c"])
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

  describe("delete.if()", () => {
    test("ok", () => {
      const input = { a: 1 };
      {
        const result = Kasen(input)
          .delete.if(false, "a")
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .delete.if(true, "a")
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

  describe("deleteAll.if()", () => {
    test("ok", () => {
      const input = { a: 1, b: 2 };
      const keys = ["a"];
      {
        const result = Kasen(input)
          .deleteAll.if(false, keys)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .deleteAll.if(true, keys)
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

  describe("clear.if()", () => {
    test("ok()", () => {
      const input = { a: 1 };
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

  describe("merge.if() (assign.if())", () => {
    test("ok()", () => {
      const input = { a: 1 };
      const objects = [{ b: 2 }, { c: 3 }];
      {
        const result = Kasen(input)
          .merge.if(false, ...objects)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .merge.if(true, ...objects)
          .toJs();
        expect(result).toEqual({ a: 1, b: 2, c: 3 });
      }
      {
        const result = Kasen(input)
          .assign.if(false, ...objects)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .assign.if(true, ...objects)
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

  describe("mergeWith.if()", () => {
    test("ok", () => {
      const input = { a: 1, b: 1 };
      {
        const result = Kasen(input)
          .mergeWith.if(
            false,
            (left, right) => left + right,
            { a: 1 },
            { b: 1 }
          )
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .mergeWith.if(true, (left, right) => left + right, { a: 1 }, { b: 1 })
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

  describe("setIn.if()", () => {
    test("ok", () => {
      const input = { a: [{}] };
      {
        const result = Kasen(input)
          .setIn.if(false, ["a", 0, "a"], 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .setIn.if(true, ["a", 0, "a"], 10)
          .toJs();
        expect(result).toEqual({ a: [{ a: 10 }] });
      }
    });
  });

  describe("updateIn()", () => {
    test("ok", () => {
      const ios = [
        [{ a: 1 }, ["a"], { a: 11 }],
        [{ a: [1] }, ["a", 0], { a: [11] }],
        [{ a: [{ a: 1 }] }, ["a", 0, "a"], { a: [{ a: 11 }] }]
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
      const input = { a: [{ a: 1 }] };
      {
        const result = Kasen(input)
          .updateIn.if(false, ["a", 0, "a"], v => v + 10)
          .toJs();
        expect(result).toEqual(input);
      }
      {
        const result = Kasen(input)
          .updateIn.if(true, ["a", 0, "a"], v => v + 10)
          .toJs();
        expect(result).toEqual({ a: [{ a: 11 }] });
      }
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
    test("protection is undefined", () => {
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

    test("protection is specified", () => {
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

  describe("toJs()", () => {
    test("ok", () => {
      const inputs = [{}, { a: 1 }, { a: 1, b: 2 }, { a: 1, b: 2, c: 3 }];
      inputs.forEach(input => {
        const result = Kasen(input).toJs();
        expect(result).toEqual(input);
      });
    });
  });

  describe("toArray()", () => {
    test("ok", () => {
      const inputs = [
        [{}, []],
        [{ a: 1 }, [1]],
        [{ a: 1, b: 2 }, [1, 2]],
        [{ a: 1, b: 2, c: 3 }, [1, 2, 3]]
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

  describe("reduceWhile()", () => {
    test("init is undefined", () => {
      const ios = [
        [{ a: 1 }, 1],
        [{ a: 1, b: 1 }, 2],
        [{ a: 1, b: 1, c: 1 }, 2]
      ];
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
      const ios = [
        [{}, 10],
        [{ a: 1 }, 11],
        [{ a: 1, b: 1 }, 11],
        [{ a: 1, b: 1, c: 1 }, 11]
      ];
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
        const run = () => Kasen({}).reduceWhile((acc, v) => ["halt", acc + v]);
        expect(run).toThrow(TypeError);
      }
      {
        const run = () => Kasen.reduceWhile({}, (acc, v) => ["halt", acc + v]);
        expect(run).toThrow(TypeError);
      }
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
