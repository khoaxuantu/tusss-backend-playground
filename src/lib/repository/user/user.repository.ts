import { User, UserDocument } from '@/user/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AbstractRepository } from '../interfaces/repository.interface';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }

  findById(id: string | Types.ObjectId, projection = {}): Promise<UserDocument> {
    return this.model.findById(id, projection).exec();
  }
}
