import { PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '@/lib/constant/constants';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(PASSWORD_MINLENGTH)
  @MaxLength(PASSWORD_MAXLENGTH)
  password: string;

  age?: number;
}
