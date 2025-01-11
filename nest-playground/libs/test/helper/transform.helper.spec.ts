import { InvalidParamsException } from "../../exception/invalid-param.exception";
import { ClassTransformerHelper } from "../../helper/transform.helper";

class MockClass {
  a: string;

  constructor(a: string) {
    this.a = a;
  }
}

describe("ClassTransformerHelper", () => {
  describe("transformArrParams", () => {
    test("not typeof string", () => {
      expect(ClassTransformerHelper.transformArrParams({ cls: String, value: 123 })).toEqual([
        "123",
      ]);
    });

    test("String", () => {
      expect(ClassTransformerHelper.transformArrParams({ cls: String, value: "abc,bcd" })).toEqual([
        "abc",
        "bcd",
      ]);
      expect(ClassTransformerHelper.transformArrParams({ cls: Array, value: "abc,bcd" })).toEqual([
        ["abc"],
        ["bcd"],
      ]);
    });

    test("Number", () => {
      expect(ClassTransformerHelper.transformArrParams({ cls: Number, value: "1,2,3" })).toEqual([
        1, 2, 3,
      ]);
    });

    test("Array", () => {
      expect(
        ClassTransformerHelper.transformArrParams({ cls: Number, value: ["123", "234"] })
      ).toEqual([123, 234]);
      expect(
        ClassTransformerHelper.transformArrParams({ cls: Array, value: ["123", "234"] })
      ).toEqual([["123"], ["234"]]);
      expect(() => ClassTransformerHelper.transformArrParams({ cls: String, value: [] })).toThrow(
        InvalidParamsException
      );
    });

    test("MockClass", () => {
      const expectObj = new MockClass("abc");
      expect(
        ClassTransformerHelper.transformArrParams({ cls: MockClass, value: { a: "abc" } })
      ).toEqual([expectObj]);
      expect(
        ClassTransformerHelper.transformArrParams({ cls: MockClass, value: [{ a: "abc" }] })
      ).toEqual([expectObj]);
      expect(ClassTransformerHelper.transformArrParams({ cls: MockClass, value: "abc" })).toEqual([
        "abc",
      ]);
    });
  });
});
