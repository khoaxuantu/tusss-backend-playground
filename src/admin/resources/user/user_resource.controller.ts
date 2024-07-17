import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { AbstractResourceController } from '../interfaces/resource.interface';
import { UserRepository } from '@/lib/repository/user/user.repository';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListUserResourceDto, UserResourceDto } from './dto/user_resource.dto';
import { UserDocument } from '@/user/schema/user.schema';
import { Public } from '@/auth/decorator/auth.decorator';
import { ApiFilterQuery } from '@/lib/decorator/api-filter-query.decorator';

@Controller('admin/user')
@ApiTags('Admin Resource - User')
export class AdminUserResourceController extends AbstractResourceController<UserDocument> {
  constructor(repository: UserRepository, factory: CommonUserFactory) {
    super(repository, factory);
  }

  @Public()
  @Get()
  @ApiFilterQuery(UserResourceDto)
  @ApiFilterQuery(UserResourceDto, { name: "$or" })
  override async list(@Query() query: ListUserResourceDto): Promise<void> {
    super.list(query);
  }
}
