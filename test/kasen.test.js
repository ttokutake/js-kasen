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
    test("error", () => {
      expect(() => Kasen([]).getIn()).toThrow(TypeError);
      expect(() => Kasen([]).getIn(null)).toThrow(TypeError);
      expect(() => Kasen({}).getIn()).toThrow(TypeError);
      expect(() => Kasen({}).getIn(null)).toThrow(TypeError);
      expect(() => Kasen.getIn()).toThrow(TypeError);
      expect(() => Kasen.getIn(null)).toThrow(TypeError);
      expect(() => Kasen.getIn([])).toThrow(TypeError);
      expect(() => Kasen.getIn([], null)).toThrow(TypeError);
      expect(() => Kasen.getIn({})).toThrow(TypeError);
      expect(() => Kasen.getIn({}, null)).toThrow(TypeError);
    });
  });

  describe("hasIn()", () => {
    test("error", () => {
      expect(() => Kasen([]).hasIn()).toThrow(TypeError);
      expect(() => Kasen([]).hasIn(null)).toThrow(TypeError);
      expect(() => Kasen({}).hasIn()).toThrow(TypeError);
      expect(() => Kasen({}).hasIn(null)).toThrow(TypeError);
      expect(() => Kasen.hasIn()).toThrow(TypeError);
      expect(() => Kasen.hasIn(null)).toThrow(TypeError);
      expect(() => Kasen.hasIn([])).toThrow(TypeError);
      expect(() => Kasen.hasIn([], null)).toThrow(TypeError);
      expect(() => Kasen.hasIn({})).toThrow(TypeError);
      expect(() => Kasen.hasIn({}, null)).toThrow(TypeError);
    });
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
    test("error", () => {
      expect(() => Kasen([]).reduce()).toThrow(TypeError);
      expect(() => Kasen([]).reduce(null)).toThrow(TypeError);
      expect(() => Kasen([]).reduce((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen({}).reduce()).toThrow(TypeError);
      expect(() => Kasen({}).reduce(null)).toThrow(TypeError);
      expect(() => Kasen({}).reduce((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.reduce()).toThrow(TypeError);
      expect(() => Kasen.reduce(null)).toThrow(TypeError);
      expect(() => Kasen.reduce([])).toThrow(TypeError);
      expect(() => Kasen.reduce([], null)).toThrow(TypeError);
      expect(() => Kasen.reduce([], (acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.reduce({})).toThrow(TypeError);
      expect(() => Kasen.reduce({}, null)).toThrow(TypeError);
      expect(() => Kasen.reduce({}, (acc, v) => acc + v)).toThrow(TypeError);
    });
  });

  describe("reduceWhile()", () => {
    test("error", () => {
      expect(() => Kasen([]).reduceWhile()).toThrow(TypeError);
      expect(() => Kasen([]).reduceWhile(null)).toThrow(TypeError);
      expect(() =>
        Kasen([]).reduceWhile((acc, v) => ["halt", acc + v])
      ).toThrow(TypeError);
      expect(() => Kasen({}).reduceWhile()).toThrow(TypeError);
      expect(() => Kasen({}).reduceWhile(null)).toThrow(TypeError);
      expect(() =>
        Kasen({}).reduceWhile((acc, v) => ["halt", acc + v])
      ).toThrow(TypeError);
      expect(() => Kasen.reduceWhile()).toThrow(TypeError);
      expect(() => Kasen.reduceWhile(null)).toThrow(TypeError);
      expect(() => Kasen.reduceWhile([])).toThrow(TypeError);
      expect(() => Kasen.reduceWhile([], null)).toThrow(TypeError);
      expect(() =>
        Kasen.reduceWhile([], (acc, v) => ["halt", acc + v])
      ).toThrow(TypeError);
      expect(() => Kasen.reduceWhile({})).toThrow(TypeError);
      expect(() => Kasen.reduceWhile({}, null)).toThrow(TypeError);
      expect(() =>
        Kasen.reduceWhile({}, (acc, v) => ["halt", acc + v])
      ).toThrow(TypeError);
    });
  });

  describe("scan()", () => {
    test("error", () => {
      expect(() => Kasen([]).scan()).toThrow(TypeError);
      expect(() => Kasen([]).scan(null)).toThrow(TypeError);
      expect(() => Kasen([]).scan((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen({}).scan()).toThrow(TypeError);
      expect(() => Kasen({}).scan(null)).toThrow(TypeError);
      expect(() => Kasen({}).scan((acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.scan()).toThrow(TypeError);
      expect(() => Kasen.scan(null)).toThrow(TypeError);
      expect(() => Kasen.scan([])).toThrow(TypeError);
      expect(() => Kasen.scan([], null)).toThrow(TypeError);
      expect(() => Kasen.scan([], (acc, v) => acc + v)).toThrow(TypeError);
      expect(() => Kasen.scan({})).toThrow(TypeError);
      expect(() => Kasen.scan({}, null)).toThrow(TypeError);
      expect(() => Kasen.scan({}, (acc, v) => acc + v)).toThrow(TypeError);
    });
  });

  describe("partition()", () => {
    test("error", () => {
      expect(() => Kasen([]).partition()).toThrow(TypeError);
      expect(() => Kasen([]).partition(null)).toThrow(TypeError);
      expect(() => Kasen({}).partition()).toThrow(TypeError);
      expect(() => Kasen({}).partition(null)).toThrow(TypeError);
      expect(() => Kasen.partition()).toThrow(TypeError);
      expect(() => Kasen.partition(null)).toThrow(TypeError);
      expect(() => Kasen.partition([])).toThrow(TypeError);
      expect(() => Kasen.partition([], null)).toThrow(TypeError);
      expect(() => Kasen.partition({})).toThrow(TypeError);
      expect(() => Kasen.partition({}, null)).toThrow(TypeError);
    });
  });

  describe("join()", () => {
    test("error", () => {
      expect(() => Kasen([]).join(null)).toThrow(TypeError);
      expect(() => Kasen({}).join(null)).toThrow(TypeError);
      expect(() => Kasen.join()).toThrow(TypeError);
      expect(() => Kasen.join(null)).toThrow(TypeError);
      expect(() => Kasen.join([], null)).toThrow(TypeError);
      expect(() => Kasen.join({}, null)).toThrow(TypeError);
    });
  });

  describe("groupBy()", () => {
    test("error", () => {
      expect(() => Kasen([]).groupBy()).toThrow(TypeError);
      expect(() => Kasen([]).groupBy(null)).toThrow(TypeError);
      expect(() => Kasen({}).groupBy()).toThrow(TypeError);
      expect(() => Kasen({}).groupBy(null)).toThrow(TypeError);
      expect(() => Kasen.groupBy()).toThrow(TypeError);
      expect(() => Kasen.groupBy(null)).toThrow(TypeError);
      expect(() => Kasen.groupBy([])).toThrow(TypeError);
      expect(() => Kasen.groupBy([], null)).toThrow(TypeError);
      expect(() => Kasen.groupBy({})).toThrow(TypeError);
      expect(() => Kasen.groupBy({}, null)).toThrow(TypeError);
    });
  });

  describe("every()", () => {
    test("error", () => {
      expect(() => Kasen([]).every()).toThrow(TypeError);
      expect(() => Kasen([]).every(null)).toThrow(TypeError);
      expect(() => Kasen({}).every()).toThrow(TypeError);
      expect(() => Kasen({}).every(null)).toThrow(TypeError);
      expect(() => Kasen.every()).toThrow(TypeError);
      expect(() => Kasen.every(null)).toThrow(TypeError);
      expect(() => Kasen.every([])).toThrow(TypeError);
      expect(() => Kasen.every([], null)).toThrow(TypeError);
      expect(() => Kasen.every({})).toThrow(TypeError);
      expect(() => Kasen.every({}, null)).toThrow(TypeError);
    });
  });

  describe("some()", () => {
    test("error", () => {
      expect(() => Kasen([]).some()).toThrow(TypeError);
      expect(() => Kasen([]).some(null)).toThrow(TypeError);
      expect(() => Kasen({}).some()).toThrow(TypeError);
      expect(() => Kasen({}).some(null)).toThrow(TypeError);
      expect(() => Kasen.some()).toThrow(TypeError);
      expect(() => Kasen.some(null)).toThrow(TypeError);
      expect(() => Kasen.some([])).toThrow(TypeError);
      expect(() => Kasen.some([], null)).toThrow(TypeError);
      expect(() => Kasen.some({})).toThrow(TypeError);
      expect(() => Kasen.some({}, null)).toThrow(TypeError);
    });
  });

  describe("find()", () => {
    test("error", () => {
      expect(() => Kasen([]).find()).toThrow(TypeError);
      expect(() => Kasen([]).find(null)).toThrow(TypeError);
      expect(() => Kasen({}).find()).toThrow(TypeError);
      expect(() => Kasen({}).find(null)).toThrow(TypeError);
      expect(() => Kasen.find()).toThrow(TypeError);
      expect(() => Kasen.find(null)).toThrow(TypeError);
      expect(() => Kasen.find([])).toThrow(TypeError);
      expect(() => Kasen.find([], null)).toThrow(TypeError);
      expect(() => Kasen.find({})).toThrow(TypeError);
      expect(() => Kasen.find({}, null)).toThrow(TypeError);
    });
  });

  describe("findEntry()", () => {
    test("error", () => {
      expect(() => Kasen([]).findEntry()).toThrow(TypeError);
      expect(() => Kasen([]).findEntry(null)).toThrow(TypeError);
      expect(() => Kasen({}).findEntry()).toThrow(TypeError);
      expect(() => Kasen({}).findEntry(null)).toThrow(TypeError);
      expect(() => Kasen.findEntry()).toThrow(TypeError);
      expect(() => Kasen.findEntry(null)).toThrow(TypeError);
      expect(() => Kasen.findEntry([])).toThrow(TypeError);
      expect(() => Kasen.findEntry([], null)).toThrow(TypeError);
      expect(() => Kasen.findEntry({})).toThrow(TypeError);
      expect(() => Kasen.findEntry({}, null)).toThrow(TypeError);
    });
  });

  describe("findKey()", () => {
    test("error", () => {
      expect(() => Kasen([]).findKey()).toThrow(TypeError);
      expect(() => Kasen([]).findKey(null)).toThrow(TypeError);
      expect(() => Kasen({}).findKey()).toThrow(TypeError);
      expect(() => Kasen({}).findKey(null)).toThrow(TypeError);
      expect(() => Kasen.findKey()).toThrow(TypeError);
      expect(() => Kasen.findKey(null)).toThrow(TypeError);
      expect(() => Kasen.findKey([])).toThrow(TypeError);
      expect(() => Kasen.findKey([], null)).toThrow(TypeError);
      expect(() => Kasen.findKey({})).toThrow(TypeError);
      expect(() => Kasen.findKey({}, null)).toThrow(TypeError);
    });
  });

  describe("keyOf()", () => {
    test("error", () => {
      expect(() => Kasen.keyOf()).toThrow(TypeError);
      expect(() => Kasen.keyOf(null)).toThrow(TypeError);
    });
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

  describe("forEach()", () => {
    test("error", () => {});
  });
});
