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

  describe("isEmpty()", () => {
    test("error", () => {
      expect(() => Kasen.isEmpty()).toThrow(TypeError);
      expect(() => Kasen.isEmpty(null)).toThrow(TypeError);
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
});
