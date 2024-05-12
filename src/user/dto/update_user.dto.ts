import { CreateUserDto } from '@/auth/dto/create_user.dto';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ["password"])) {
  @ApiProperty()
  @IsNotEmpty()
  _id?: string;
}
