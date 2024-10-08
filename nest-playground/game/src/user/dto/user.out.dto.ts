import { MongoHelper } from '@libs/helper/mongo.helper';
import { IntersectionType, PickType } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';

export class UserOutDto extends PickType(IntersectionType(User, Document), [
  '_id',
  'name',
  'firstname',
  'lastname',
  'address',
  'phone_number',
  'city',
  'age',
  'nationality',
  'roles',
  'updatedAt',
  'createdAt',
  'email'
]) {
  constructor(data?: Types.ObjectId | UserDocument) {
    super()

    if (!data || !Object.keys(data).length) return;

    this._id = MongoHelper.getObjectIdAsString(data);

    if (data instanceof Types.ObjectId) return;

    this.name = data.name;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.address = data.address;
    this.phone_number = data.phone_number;
    this.city = data.city;
    this.age = data.age;
    this.nationality = data.nationality;
    this.roles = data.roles;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
    this.email = data.email;
  }
}
