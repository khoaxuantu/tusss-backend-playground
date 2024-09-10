import { printDeepObject } from "../../helper/print.helper";

describe("PrintHelper", () => {
  describe('printDeepObject', () => {
    const deepObj = { a: { a1: { a2: [1, 2, 3], a3: { a4: "4", a5: 5 } } } };

    test('with prefix', () => {
      printDeepObject(deepObj, "Prefix Test");
    })

    test('no prefix', () => {
      printDeepObject(deepObj);
    })
  })
});
