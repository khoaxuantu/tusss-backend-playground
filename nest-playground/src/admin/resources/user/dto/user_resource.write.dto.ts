import { User } from '@/user/schema/user.schema';
import { PickType } from '@nestjs/swagger';

export class WriteUserResourceDto extends PickType(User, [
  'address',
  'age',
  'city',
  'email',
  'firstname',
  'lastname',
  'name',
  'nationality',
  'password',
  'phone_number',
  'roles'
]) {}
