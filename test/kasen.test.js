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

  describe("skip()", () => {
    test("error", () => {});
  });

  describe("skipLast()", () => {
    test("error", () => {});
  });

  describe("skipWhile()", () => {
    test("error", () => {});
  });

  describe("skipUntil()", () => {
    test("error", () => {});
  });

  describe("set()", () => {
    test("error", () => {});
  });

  describe("update()", () => {
    test("error", () => {});
  });

  describe("delete()", () => {
    test("error", () => {});
  });

  describe("deleteAll()", () => {
    test("error", () => {});
  });

  describe("concat()", () => {
    test("error", () => {});
  });

  describe("merge() / assign()", () => {
    test("error", () => {});
  });

  describe("mergeWith()", () => {
    test("error", () => {});
  });

  describe("mergeDeep()", () => {
    test("error", () => {});
  });

  describe("mergeDeepWith()", () => {
    test("error", () => {});
  });

  describe("insert()", () => {
    test("error", () => {});
  });

  describe("push()", () => {
    test("error", () => {});
  });

  describe("pop()", () => {
    test("error", () => {});
  });

  describe("unshift()", () => {
    test("error", () => {});
  });

  describe("shift()", () => {
    test("error", () => {});
  });

  describe("splice()", () => {
    test("error", () => {});
  });

  describe("setIn()", () => {
    test("error", () => {});
  });

  describe("updateIn()", () => {
    test("error", () => {});
  });

  describe("deleteIn()", () => {
    test("error", () => {});
  });

  describe("flatten()", () => {
    test("error", () => {});
  });

  describe("flatMap()", () => {
    test("error", () => {});
  });

  describe("zip()", () => {
    test("error", () => {});
  });

  describe("zipAll()", () => {
    test("error", () => {});
  });

  describe("zipWith()", () => {
    test("error", () => {});
  });

  describe("sort()", () => {
    test("error", () => {});
  });

  describe("unique()", () => {
    test("error", () => {});
  });

  describe("chunk()", () => {
    test("error", () => {});
  });

  describe("sliding()", () => {
    test("error", () => {});
  });

  describe("range()", () => {
    test("error", () => {});
  });

  describe("repeat()", () => {
    test("error", () => {});
  });

  describe("repeat()", () => {
    test("error", () => {});
  });

  describe("isEmpty()", () => {
    test("error", () => {
      expect(() => Kasen.isEmpty()).toThrow(TypeError);
      expect(() => Kasen.isEmpty(null)).toThrow(TypeError);
    });
  });

  describe("count()", () => {
    test("error", () => {});
  });

  describe("get()", () => {
    test("error", () => {});
  });

  describe("has()", () => {
    test("error", () => {});
  });

  describe("includes()", () => {
    test("error", () => {});
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
