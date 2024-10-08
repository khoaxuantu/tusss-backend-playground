import { UserDocument } from '@/user/schema/user.schema';
import { AbstractModelRepository } from '@libs/interfaces/repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { SCHEMA_NAME } from '../constant/schema.constant';

@Injectable()
export class UserRepository extends AbstractModelRepository<UserDocument> {
  constructor(@InjectModel(SCHEMA_NAME.USER) userModel: PaginateModel<UserDocument>) {
    super(userModel);
  }
}
