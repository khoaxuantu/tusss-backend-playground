import { SuccessApiResponseMessage } from "../../dto/out/response.dto";
import { plainToInstance } from "class-transformer";

describe(SuccessApiResponseMessage.name, () => {
  test("constructor", () => {
    const testObj = { a: "a", b: "b" };
    expect(
      plainToInstance(SuccessApiResponseMessage, {
        data: { ...testObj },
        status: "success",
        message: "Test"
      } as SuccessApiResponseMessage<object>).data
    ).toMatchObject(testObj);
  });
});
