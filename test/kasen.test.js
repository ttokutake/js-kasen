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
});
