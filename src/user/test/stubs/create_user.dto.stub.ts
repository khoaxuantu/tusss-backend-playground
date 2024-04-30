import { CreateUserDto } from '@/auth/dto/create_user.dto';
import PasswordBuilder from '@/lib/builder/password/password.builder';

export class UserDtoStub extends CreateUserDto {
  constructor() {
    super();
    this.create();
  }

  create(
    props: CreateUserDto = {
      name: 'Tusss',
      email: 'tusss@tusss.com',
      password: 'Uv7`aa%aa9aaaaaaaafdaaasabac&aaa',
    },
  ): UserDtoStub {
    return Object.assign(this, props);
  }

  withAge(age: number = 23): UserDtoStub {
    this.age = age;
    return this;
  }

  withRandomPassword() {
    this.password = new PasswordBuilder().product;
    return this;
  }
}
