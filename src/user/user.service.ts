import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { User } from '@/models/mongodb/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userFactory: CommonUserFactory) {}

  async saveOne(user: User) {
    const newUser = this.userFactory.create(user);
    return newUser.save();
  }
}
