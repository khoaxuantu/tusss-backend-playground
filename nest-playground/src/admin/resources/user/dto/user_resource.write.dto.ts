import { Role } from '@/auth/constant/role.constant';
import { User } from '@/user/schema/user.schema';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotIn, ValidateNested } from 'class-validator';

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
]) {
  @ApiProperty({ isArray: true, enum: Role })
  @IsNotIn([Role.Admin], { each: true })
  roles: Role[];
}
