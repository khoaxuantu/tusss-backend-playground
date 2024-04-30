import { CreateUserDto } from '@/user/dto/create_user.dto';

export class UserDtoStub implements CreateUserDto {
  name: string;
  password: string;
  age?: number;
  email: string;

  constructor() {
    this.create();
  }

  create(
    props: CreateUserDto = {
      name: 'Tusss',
      email: 'tusss@tusss.com',
      password: '123',
    },
  ): UserDtoStub {
    return Object.assign(this, props);
  }

  withAge(age: number = 23): UserDtoStub {
    this.age = age;
    return this;
  }
}
