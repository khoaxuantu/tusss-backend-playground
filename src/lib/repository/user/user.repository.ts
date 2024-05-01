import { User, UserDocument } from '@/models/mongodb/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, Types } from 'mongoose';
import { FindUserOpt } from './interface/find_user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(
    query: FindUserOpt,
    projection: ProjectionType<User> = { _id: 0, __v: 0 },
  ): Promise<UserDocument> {
    return this.userModel.findOne(query, projection).exec();
  }

  async findById(id: string | Types.ObjectId, projection = {}): Promise<UserDocument | User> {
    return this.userModel.findById(id, projection).exec();
  }
}
