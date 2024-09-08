import { Role } from '@/auth/constant/role.constant';
import { User } from '@/user/schema/user.schema';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotIn } from 'class-validator';

export class CreateUserResourceDto extends PickType(User, [
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
]) {
  @ApiProperty({ isArray: true, enum: Role })
  @IsNotIn([Role.Admin], { each: true })
  roles: Role[];
}

export class UpdateUserResourceDto extends PartialType(CreateUserResourceDto) {}
