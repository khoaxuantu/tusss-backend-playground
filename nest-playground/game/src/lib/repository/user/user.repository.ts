import { User, UserDocument } from '@/user/schema/user.schema';
import { AbstractModelRepository } from '@libs/interfaces/repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractModelRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: PaginateModel<UserDocument>) {
    super(userModel);
  }
}
