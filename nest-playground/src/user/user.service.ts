import { CreateUserDto } from '@/auth/dto/create_user.dto';
import { FindUserOpt } from '@/lib/repository/user/interfaces/find_user.interface';
import { UserRepository } from '@/lib/repository/user/user.repository';
import { User, UserDocument } from '@/user/schema/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update_user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async saveOne(user: CreateUserDto) {
    try {
      await this.userRepository.create(user);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  getOneByUsername(name: string): Promise<UserDocument> {
    return this.userRepository.findOne({ name });
  }

  getOneByEmail(email: string): Promise<UserDocument> {
    return this.userRepository.findOne({ email }, { __v: 0 });
  }

  sendUserInfoToClient(user: UserDocument | FindUserOpt): UserDocument | Promise<UserDocument> {
    if (this.isUserDocument(user)) {
      const { password, ...retUser } = user;
      return retUser as UserDocument;
    }

    return this.userRepository.findOne(user, { _id: 0, _v: 0, password: 0 });
  }

  async updateOne(user: UpdateUserDto): Promise<void> {
    const { _id, ...updateUser } = user;
    if (!_id) throw new BadRequestException();
    await this.userRepository.findOneAndUpdate({ _id: new Types.ObjectId(_id) }, updateUser);
  }

  private isUserDocument(user: UserDocument | FindUserOpt): user is UserDocument {
    return (user as User).updatedAt !== undefined;
  }
}
