import { NumberHelper } from "../../helper/number.helper";

describe(NumberHelper.name, () => {
  describe("randomInt", () => {
    it("should not exceed min or max", () => {
      for (let i = 0; i < 1000; i++) {
        const x = NumberHelper.randomInt(1, 3);
        expect(x).toBeGreaterThanOrEqual(1);
        expect(x).toBeLessThanOrEqual(3)
      }
    });
  });

  describe("randomArbitrary", () => {
    it("should not exceed min or max", () => {
      for (let i = 0; i < 1000; i++) {
        const x = NumberHelper.randomArbitrary(1, 3);
        expect(x).toBeGreaterThanOrEqual(1);
        expect(x).toBeLessThanOrEqual(3)
      }
    });

    it("should not be integer", () => {
      const x = NumberHelper.randomArbitrary(1, 3);
      expect(x % 1).not.toEqual(0);
    })
  });
})
