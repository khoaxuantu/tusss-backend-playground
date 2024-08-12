import { User, UserDocument } from '@/user/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { AbstractModelRepository } from '../interfaces/repository.interface';

@Injectable()
export class UserRepository extends AbstractModelRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: PaginateModel<User>) {
    super(userModel);
  }
}
