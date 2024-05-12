import { CreateUserDto } from '@/auth/dto/create_user.dto';
import PasswordBuilder from '@/lib/builder/password/password.builder';
import { User } from '@/user/schema/user.schema';
import { userStub } from '@test/stubs/users.stub';

export class UserDtoStub extends CreateUserDto {
  static info: User = userStub();

  constructor() {
    super();
    this.create();
  }

  create(
    props: CreateUserDto = {
      name: UserDtoStub.info.name,
      email: UserDtoStub.info.email,
      password: UserDtoStub.info.password,
    },
  ) {
    Object.assign(this, props);
  }

  withAge(age: number = UserDtoStub.info.age): UserDtoStub {
    this.age = age;
    return this;
  }

  withRandomPassword() {
    this.password = new PasswordBuilder().product;
    return this;
  }

  withFullName({ firstname, lastname } = UserDtoStub.info) {
    this.firstname = firstname;
    this.lastname = lastname;
    return this;
  }

  withAll() {
    Object.assign(this, UserDtoStub.info);
    return this;
  }
}
