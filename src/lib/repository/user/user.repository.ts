import { User, UserDocument } from '@/user/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, Types } from 'mongoose';
import { FindUserOpt } from './interface/find_user.interface';
import { UpdateUserDto } from '@/user/dto/update_user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findOne(
    filter: FindUserOpt,
    projection: ProjectionType<User> = { _id: 0, __v: 0 },
  ): Promise<UserDocument> {
    return this.userModel.findOne(filter, projection).exec();
  }

  findById(id: string | Types.ObjectId, projection = {}): Promise<UserDocument> {
    return this.userModel.findById(id, projection).exec();
  }

  findOneAndUpdate(filter: FindUserOpt, update: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(filter, { $set: update }, {
      projection: { __v: 0, password: 0 },
      returnDocument: "after",
    }).exec();
  }
}
