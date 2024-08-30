import { Constructor } from "@/lib/types/common";
import { plainToInstance } from "class-transformer";

interface TestResourceReadDtoProps<T> {
  dtoClass: Constructor<T>;
}

export function testResourceReadDto<T>({ dtoClass }: TestResourceReadDtoProps<T>) {
  describe("ResourcePaginateDto attributes", () => {
    describe("page & limit", () => {
      it("should transform to number", () => {
        const plainObj = { page: "1", limit: "10" };
        const obj = plainToInstance(dtoClass, plainObj);
        expect(obj).toMatchObject({ page: 1, limit: 10 });
      });
    });

    describe("sort & order", () => {
      const expectedObj = { sort: ["abc"], order: ["asc"] };

      describe("when string", () => {
        it("should transform to array", () => {
          const plainObj = { sort: "abc", order: "asc" };
          const obj = plainToInstance(dtoClass, plainObj);
          expect(obj).toMatchObject(expectedObj);
        });
      });

      describe("when string array", () => {
        it("should be array", () => {
          const plainObj = { ...expectedObj };
          const obj = plainToInstance(dtoClass, plainObj);
          expect(obj).toMatchObject(expectedObj);
        });
      });
    });
  });

  describe("ResourceReadDto attributes", () => {
    describe("ids", () => {
      describe("when string", () => {
        it("should transform to array", () => {
          const plainObj = { ids: 'abc' };
          const obj = plainToInstance(dtoClass, plainObj);
          expect(obj).toMatchObject({ ids: ['abc']});
        });
      });

      describe("when string array", () => {
        it("should be array", () => {
          const plainObj = { ids: ['abc', 'bcd'] };
          const obj = plainToInstance(dtoClass, plainObj);
          expect(obj).toMatchObject({ ids: ['abc', 'bcd'] });
        });
      });
    });

    
  });
}
