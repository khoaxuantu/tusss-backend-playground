import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@/lib/constant/constants';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(PASSWORD_MINLENGTH)
  @MaxLength(PASSWORD_MAXLENGTH)
  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  age?: number;
}
