import Kasen from "../src/kasen";
import KasenArray from "../src/collection/array";
import KasenObject from "../src/collection/object";

describe("Kasen", () => {
  test("ok", () => {
    expect(Kasen([])).toBeInstanceOf(KasenArray);
    expect(Kasen({})).toBeInstanceOf(KasenObject);
  });

  test("error", () => {
    expect(() => Kasen()).toThrow(TypeError);
    expect(() => Kasen(null)).toThrow(TypeError);
  });

  describe("copy()", () => {
    test("error", () => {
      expect(() => Kasen.copy()).toThrow(TypeError);
      expect(() => Kasen.copy(null)).toThrow(TypeError);
    });
  });

  describe("map()", () => {
    test("error", () => {
      expect(() => Kasen([]).map()).toThrow(TypeError);
      expect(() => Kasen([]).map(null)).toThrow(TypeError);
      expect(() => Kasen({}).map()).toThrow(TypeError);
      expect(() => Kasen({}).map(null)).toThrow(TypeError);
      expect(() => Kasen.map()).toThrow(TypeError);
      expect(() => Kasen.map(null)).toThrow(TypeError);
      expect(() => Kasen.map([])).toThrow(TypeError);
      expect(() => Kasen.map([], null)).toThrow(TypeError);
      expect(() => Kasen.map({})).toThrow(TypeError);
      expect(() => Kasen.map({}, null)).toThrow(TypeError);
    });
  });

  describe("pluck()", () => {
    test("error", () => {
      expect(() => Kasen([]).pluck()).toThrow(TypeError);
      expect(() => Kasen([]).pluck(null)).toThrow(TypeError);
      expect(() => Kasen({}).pluck()).toThrow(TypeError);
      expect(() => Kasen({}).pluck(null)).toThrow(TypeError);
      expect(() => Kasen.pluck()).toThrow(TypeError);
      expect(() => Kasen.pluck(null)).toThrow(TypeError);
      expect(() => Kasen.pluck([])).toThrow(TypeError);
      expect(() => Kasen.pluck([], null)).toThrow(TypeError);
      expect(() => Kasen.pluck({})).toThrow(TypeError);
      expect(() => Kasen.pluck({}, null)).toThrow(TypeError);
    });
  });

  describe("filter()", () => {
    test("error", () => {
      expect(() => Kasen([]).filter(null)).toThrow(TypeError);
      expect(() => Kasen({}).filter(null)).toThrow(TypeError);
      expect(() => Kasen.filter()).toThrow(TypeError);
      expect(() => Kasen.filter(null)).toThrow(TypeError);
      expect(() => Kasen.filter([], null)).toThrow(TypeError);
      expect(() => Kasen.filter({}, null)).toThrow(TypeError);
    });
  });

  describe("filterNot()", () => {
    test("error", () => {
      expect(() => Kasen([]).filterNot()).toThrow(TypeError);
      expect(() => Kasen([]).filterNot(null)).toThrow(TypeError);
      expect(() => Kasen({}).filterNot()).toThrow(TypeError);
      expect(() => Kasen({}).filterNot(null)).toThrow(TypeError);
      expect(() => Kasen.filterNot()).toThrow(TypeError);
      expect(() => Kasen.filterNot(null)).toThrow(TypeError);
      expect(() => Kasen.filterNot([])).toThrow(TypeError);
      expect(() => Kasen.filterNot([], null)).toThrow(TypeError);
      expect(() => Kasen.filterNot({})).toThrow(TypeError);
      expect(() => Kasen.filterNot({}, null)).toThrow(TypeError);
    });
  });

  describe("set()", () => {
    test("error", () => {
      expect(() => Kasen([]).set()).toThrow(TypeError);
      expect(() => Kasen([]).set(null)).toThrow(TypeError);
      expect(() => Kasen([]).set("a")).toThrow(TypeError);
      expect(() => Kasen({}).set()).toThrow(TypeError);
      expect(() => Kasen({}).set(null)).toThrow(TypeError);
      expect(() => Kasen.set()).toThrow(TypeError);
      expect(() => Kasen.set(null)).toThrow(TypeError);
      expect(() => Kasen.set([])).toThrow(TypeError);
      expect(() => Kasen.set([], null)).toThrow(TypeError);
      expect(() => Kasen.set([], "a")).toThrow(TypeError);
      expect(() => Kasen.set({})).toThrow(TypeError);
      expect(() => Kasen.set({}, null)).toThrow(TypeError);
    });
  });

  describe("update()", () => {
    test("error", () => {
      expect(() => Kasen([]).update()).toThrow(TypeError);
      expect(() => Kasen([]).update(null)).toThrow(TypeError);
      expect(() => Kasen([]).update("a")).toThrow(TypeError);
      expect(() => Kasen([]).update(0)).toThrow(TypeError);
      expect(() => Kasen([]).update(0, null)).toThrow(TypeError);
      expect(() => Kasen({}).update()).toThrow(TypeError);
      expect(() => Kasen({}).update(null)).toThrow(TypeError);
      expect(() => Kasen({}).update("a")).toThrow(TypeError);
      expect(() => Kasen({}).update("a", null)).toThrow(TypeError);
      expect(() => Kasen.update()).toThrow(TypeError);
      expect(() => Kasen.update(null)).toThrow(TypeError);
      expect(() => Kasen.update([])).toThrow(TypeError);
      expect(() => Kasen.update([], null)).toThrow(TypeError);
      expect(() => Kasen.update([], "a")).toThrow(TypeError);
      expect(() => Kasen.update([], 0)).toThrow(TypeError);
      expect(() => Kasen.update([], 0, null)).toThrow(TypeError);
      expect(() => Kasen.update({})).toThrow(TypeError);
      expect(() => Kasen.update({}, null)).toThrow(TypeError);
      expect(() => Kasen.update({}, "a")).toThrow(TypeError);
      expect(() => Kasen.update({}, "a", null)).toThrow(TypeError);
    });
  });

  describe("delete()", () => {
    test("error", () => {
      expect(() => Kasen([]).delete()).toThrow(TypeError);
      expect(() => Kasen([]).delete(null)).toThrow(TypeError);
      expect(() => Kasen([]).delete("a")).toThrow(TypeError);
      expect(() => Kasen({}).delete()).toThrow(TypeError);
      expect(() => Kasen({}).delete(null)).toThrow(TypeError);
      expect(() => Kasen.delete()).toThrow(TypeError);
      expect(() => Kasen.delete(null)).toThrow(TypeError);
      expect(() => Kasen.delete([])).toThrow(TypeError);
      expect(() => Kasen.delete([], null)).toThrow(TypeError);
      expect(() => Kasen.delete([], "a")).toThrow(TypeError);
      expect(() => Kasen.delete({})).toThrow(TypeError);
      expect(() => Kasen.delete({}, null)).toThrow(TypeError);
    });
  });

  describe("setIn()", () => {
    test("error", () => {
      expect(() => Kasen([]).setIn()).toThrow(TypeError);
      expect(() => Kasen([]).setIn(null)).toThrow(TypeError);
      expect(() => Kasen({}).setIn()).toThrow(TypeError);
      expect(() => Kasen({}).setIn(null)).toThrow(TypeError);
      expect(() => Kasen.setIn()).toThrow(TypeError);
      expect(() => Kasen.setIn(null)).toThrow(TypeError);
      expect(() => Kasen.setIn([])).toThrow(TypeError);
      expect(() => Kasen.setIn([], null)).toThrow(TypeError);
      expect(() => Kasen.setIn({})).toThrow(TypeError);
      expect(() => Kasen.setIn({}, null)).toThrow(TypeError);
    });
  });

  describe("updateIn()", () => {
    test("error", () => {
      expect(() => Kasen([]).updateIn()).toThrow(TypeError);
      expect(() => Kasen([]).updateIn(null)).toThrow(TypeError);
      expect(() => Kasen([]).updateIn([])).toThrow(TypeError);
      expect(() => Kasen([]).updateIn([], null)).toThrow(TypeError);
      expect(() => Kasen({}).updateIn()).toThrow(TypeError);
      expect(() => Kasen({}).updateIn(null)).toThrow(TypeError);
      expect(() => Kasen({}).updateIn([])).toThrow(TypeError);
      expect(() => Kasen({}).updateIn([], null)).toThrow(TypeError);
      expect(() => Kasen.updateIn()).toThrow(TypeError);
      expect(() => Kasen.updateIn(null)).toThrow(TypeError);
      expect(() => Kasen.updateIn([])).toThrow(TypeError);
      expect(() => Kasen.updateIn([], null)).toThrow(TypeError);
      expect(() => Kasen.updateIn([], [])).toThrow(TypeError);
      expect(() => Kasen.updateIn([], [], null)).toThrow(TypeError);
      expect(() => Kasen.updateIn({})).toThrow(TypeError);
      expect(() => Kasen.updateIn({}, null)).toThrow(TypeError);
      expect(() => Kasen.updateIn({}, [])).toThrow(TypeError);
      expect(() => Kasen.updateIn({}, [], null)).toThrow(TypeError);
    });
  });

  describe("deleteIn()", () => {
    test("error", () => {
      expect(() => Kasen([]).deleteIn()).toThrow(TypeError);
      expect(() => Kasen([]).deleteIn(null)).toThrow(TypeError);
      expect(() => Kasen({}).deleteIn()).toThrow(TypeError);
      expect(() => Kasen({}).deleteIn(null)).toThrow(TypeError);
      expect(() => Kasen.deleteIn()).toThrow(TypeError);
      expect(() => Kasen.deleteIn(null)).toThrow(TypeError);
      expect(() => Kasen.deleteIn([])).toThrow(TypeError);
      expect(() => Kasen.deleteIn([], null)).toThrow(TypeError);
      expect(() => Kasen.deleteIn({})).toThrow(TypeError);
      expect(() => Kasen.deleteIn({}, null)).toThrow(TypeError);
    });
  });

  describe("isEmpty()", () => {
    test("error", () => {
      expect(() => Kasen.isEmpty()).toThrow(TypeError);
      expect(() => Kasen.isEmpty(null)).toThrow(TypeError);
    });
  });

  describe("count()", () => {
    test("error", () => {
      expect(() => Kasen([]).count(null)).toThrow(TypeError);
      expect(() => Kasen({}).count(null)).toThrow(TypeError);
      expect(() => Kasen.count()).toThrow(TypeError);
      expect(() => Kasen.count(null)).toThrow(TypeError);
      expect(() => Kasen.count([], null)).toThrow(TypeError);
      expect(() => Kasen.count({}, null)).toThrow(TypeError);
    });
  });

  describe("get()", () => {
    test("error", () => {
      expect(() => Kasen([]).get()).toThrow(TypeError);
      expect(() => Kasen([]).get(null)).toThrow(TypeError);
      expect(() => Kasen([]).get("a")).toThrow(TypeError);
      expect(() => Kasen({}).get()).toThrow(TypeError);
      expect(() => Kasen({}).get(null)).toThrow(TypeError);
      expect(() => Kasen.get()).toThrow(TypeError);
      expect(() => Kasen.get(null)).toThrow(TypeError);
      expect(() => Kasen.get([])).toThrow(TypeError);
      expect(() => Kasen.get([], null)).toThrow(TypeError);
      expect(() => Kasen.get([], "a")).toThrow(TypeError);
      expect(() => Kasen.get({})).toThrow(TypeError);
      expect(() => Kasen.get({}, null)).toThrow(TypeError);
    });
  });

  describe("has()", () => {
    test("error", () => {
      expect(() => Kasen([]).has()).toThrow(TypeError);
      expect(() => Kasen([]).has(null)).toThrow(TypeError);
      expect(() => Kasen([]).has("a")).toThrow(TypeError);
      expect(() => Kasen({}).has()).toThrow(TypeError);
      expect(() => Kasen({}).has(null)).toThrow(TypeError);
      expect(() => Kasen.has()).toThrow(TypeError);
      expect(() => Kasen.has(null)).toThrow(TypeError);
      expect(() => Kasen.has([])).toThrow(TypeError);
      expect(() => Kasen.has([], null)).toThrow(TypeError);
      expect(() => Kasen.has([], "a")).toThrow(TypeError);
      expect(() => Kasen.has({})).toThrow(TypeError);
      expect(() => Kasen.has({}, null)).toThrow(TypeError);
    });
  });

  describe("includes()", () => {
    test("error", () => {
      expect(() => Kasen.includes()).toThrow(TypeError);
      expect(() => Kasen.includes(null)).toThrow(TypeError);
    });
  });

  describe("getIn()", () => {
    test("error", () => {});
  });

  describe("hasIn()", () => {
    test("error", () => {});
  });

  describe("head() / first()", () => {
    test("error", () => {});
  });

  describe("tail()", () => {
    test("error", () => {});
  });

  describe("init()", () => {
    test("error", () => {});
  });

  describe("last()", () => {
    test("error", () => {});
  });

  describe("splitAt()", () => {
    test("error", () => {});
  });

  describe("toArray()", () => {
    test("error", () => {
      expect(() => Kasen.toArray()).toThrow(TypeError);
      expect(() => Kasen.toArray(null)).toThrow(TypeError);
    });
  });

  describe("toObject()", () => {
    test("error", () => {
      expect(() => Kasen.toObject()).toThrow(TypeError);
      expect(() => Kasen.toObject(null)).toThrow(TypeError);
    });
  });

  describe("reduce()", () => {
    test("error", () => {});
  });

  describe("reduceRight()", () => {
    test("error", () => {});
  });

  describe("reduceWhile()", () => {
    test("error", () => {});
  });

  describe("scan()", () => {
    test("error", () => {});
  });

  describe("scanRight()", () => {
    test("error", () => {});
  });

  describe("partition()", () => {
    test("error", () => {});
  });

  describe("join()", () => {
    test("error", () => {});
  });

  describe("groupBy()", () => {
    test("error", () => {});
  });

  describe("every()", () => {
    test("error", () => {});
  });

  describe("some()", () => {
    test("error", () => {});
  });

  describe("find()", () => {
    test("error", () => {});
  });

  describe("findLast()", () => {
    test("error", () => {});
  });

  describe("findEntry()", () => {
    test("error", () => {});
  });

  describe("findLastEntry()", () => {
    test("error", () => {});
  });

  describe("findKey()", () => {
    test("error", () => {});
  });

  describe("findLastKey()", () => {
    test("error", () => {});
  });

  describe("findIndex()", () => {
    test("error", () => {});
  });

  describe("findLastIndex()", () => {
    test("error", () => {});
  });

  describe("keyOf()", () => {
    test("error", () => {});
  });

  describe("lastKeyOf()", () => {
    test("error", () => {});
  });

  describe("indexOf()", () => {
    test("error", () => {});
  });

  describe("lastIndexOf()", () => {
    test("error", () => {});
  });

  describe("sum()", () => {
    test("error", () => {});
  });

  describe("max()", () => {
    test("error", () => {});
  });

  describe("min()", () => {
    test("error", () => {});
  });

  describe("equals()", () => {
    test("error", () => {});
  });

  describe("keys()", () => {
    test("error", () => {
      expect(() => Kasen.keys()).toThrow(TypeError);
      expect(() => Kasen.keys(null)).toThrow(TypeError);
    });
  });

  describe("values()", () => {
    test("error", () => {
      expect(() => Kasen.values()).toThrow(TypeError);
      expect(() => Kasen.values(null)).toThrow(TypeError);
    });
  });

  describe("entries()", () => {
    test("error", () => {
      expect(() => Kasen.entries()).toThrow(TypeError);
      expect(() => Kasen.entries(null)).toThrow(TypeError);
    });
  });

  describe("korEach()", () => {
    test("error", () => {});
  });
});
