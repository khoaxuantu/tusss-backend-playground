import { CreateUserDto } from '@/auth/dto/create_user.dto';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userFactory: CommonUserFactory) {}

  async saveOne(user: CreateUserDto) {
    const newUser = this.userFactory.create(user);
    return await newUser.save();
  }
}
