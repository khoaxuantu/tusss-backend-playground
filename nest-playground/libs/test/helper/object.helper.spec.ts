import { ObjectHelper } from "../../helper/object.helper";

describe(ObjectHelper.name, () => {
  describe("sanitize", () => {
    it("should remove all undefined & function properties", () => {
      const plain = {
        name: 'John Doe',
        age: 30,
        address: {
          street: '123 Main St',
          city: undefined,
          zip: 90210
        },
        regex: /test/g,
        func: () => {console.log('test')},
        arr: [1, undefined, {a: undefined, b: 2}, []],
        blankArr: [],
        undef: undefined,
        nul: null,
      };

      const obj = ObjectHelper.sanitize(plain);

      expect(obj).not.toHaveProperty("undef");
      expect(obj).not.toHaveProperty("func");
      expect(obj.address).not.toHaveProperty("city");
      expect(obj.arr).toHaveLength(3);
      expect(obj.arr[1]).not.toHaveProperty("a");
      expect(obj.regex).toBeDefined();
      expect(obj.blankArr).toHaveLength(0);
    });
  })
})
