import { CreateUserDto } from '@/auth/dto/create_user.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../schema/user.schema';

export class UpdateUserDto extends PartialType(OmitType(User, ["password"])) {
  @ApiProperty()
  @IsNotEmpty()
  _id?: string;
}
