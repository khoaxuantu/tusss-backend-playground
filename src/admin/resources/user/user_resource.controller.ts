import { Controller, Get, Query } from '@nestjs/common';
import { AbstractResourceController } from '../interfaces/resource.interface';
import { UserRepository } from '@/lib/repository/user/user.repository';
import { CommonUserFactory } from '@/lib/factory/user/common_user';
import { ApiExtraModels, ApiQuery, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ListUserResourceDto, UserResourceDto } from './dto/user_resource.dto';
import { UserDocument } from '@/user/schema/user.schema';
import { Public } from '@/auth/decorator/auth.decorator';
import { ParseListQueryPipe } from '../pipes/query-param.pipe';
import { ApiFilterQuery } from '@/lib/decorator/api-filter-query.decorator';

@Controller('admin/user')
@ApiTags('Admin Resource')
export class AdminUserResourceController extends AbstractResourceController<UserDocument> {
  constructor(repository: UserRepository, factory: CommonUserFactory) {
    super(repository, factory);
  }

  @Public()
  @Get()
  @ApiFilterQuery(UserResourceDto)
  override async list(
    @Query('', new ParseListQueryPipe()) query: ListUserResourceDto,
  ): Promise<void> {
    super.list(query);
  }
}
