import { User } from '@/user/schema/user.schema';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(User, ['roles']) {}
