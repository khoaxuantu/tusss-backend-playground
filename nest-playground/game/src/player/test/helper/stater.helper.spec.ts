import { StarterHelper } from "../../helper/starter.helper";

describe(StarterHelper.name, () => {
  describe("generateStats", () => {
    test("generate", () => {
      const stats = StarterHelper.generateStats();
      console.log(stats);
      expect(stats).toBeDefined();
    });
  });
});
