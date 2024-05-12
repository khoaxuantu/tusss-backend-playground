import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@/lib/constant/constants';
import { User } from '@/user/schema/user.schema';
import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends OmitType(User, ['updated_at', 'roles']) {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(PASSWORD_MINLENGTH)
  @MaxLength(PASSWORD_MAXLENGTH)
  @ApiProperty()
  password: string;

  @IsOptional()
  @ApiPropertyOptional()
  age?: number;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  firstname?: string;

  @ApiPropertyOptional()
  lastname?: string;

  @ApiPropertyOptional()
  nationality?: string;

  @IsOptional()
  @ApiPropertyOptional()
  phone_number?: string;
}
