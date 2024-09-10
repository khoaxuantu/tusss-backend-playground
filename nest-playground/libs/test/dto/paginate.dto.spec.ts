import { PaginateResult } from "mongoose";
import { PaginateResponseDto } from "../../dto/out/paginate.dto";

class MockDtoClass {
  a: string;
  b: number;

  constructor({ a, b }: MockDtoClass) {
    this.a = a;
    this.b = b;
  }
}

describe(PaginateResponseDto.name, () => {
  const testObj = { a: "a", b: 1 } as MockDtoClass;
  const inputStub = { docs: [{ ...testObj }] } as PaginateResult<MockDtoClass>;

  test("no dto class transform", () => {
    expect(new PaginateResponseDto(inputStub).docs[0]).toMatchObject(testObj);
  });

  test("with dto class transform", () => {
    expect(
      new PaginateResponseDto(inputStub, MockDtoClass).docs[0] instanceof MockDtoClass
    ).toBeTruthy();
  });
});
