import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(private userFactory: CommonUserFactory) {}

  async saveOne(user: CreateUserDto) {
    const newUser = this.userFactory.create(user);
    return await newUser.save();
  }
}
