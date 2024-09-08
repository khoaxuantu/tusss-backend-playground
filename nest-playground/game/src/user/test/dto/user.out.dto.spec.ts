import { UserOutDto } from "@/user/dto/user.out.dto";
import { createUserDocument } from "../stubs/user.stub";

describe(UserOutDto.name, () => {
  const userDocument = createUserDocument();

  test('falsy input', () => {
    expect(new UserOutDto(undefined)).toBeDefined();
    expect(new UserOutDto(null)).toBeDefined();
    expect(new UserOutDto({} as any)).toBeDefined();
  })

  test('input', () => {
    const dto = new UserOutDto(userDocument);
    expect(dto["password"]).toBeUndefined();
  });
});
