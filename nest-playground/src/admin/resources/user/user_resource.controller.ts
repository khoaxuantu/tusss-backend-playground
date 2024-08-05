import { ApiFilterQuery } from '@/lib/decorator/api-filter-query.decorator';
import { UserDocument } from '@/user/schema/user.schema';
import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractResourceController } from '../interfaces/controller.interface';
import { ListUserResourceDto, UserResourceDto } from './dto/user_resource.read.dto';
import { WriteUserResourceDto } from './dto/user_resource.write.dto';
import { UserResourceService } from './user_resource.service';

@Controller('admin/users')
@ApiTags('Admin Resource - User')
export class AdminUserResourceController extends AbstractResourceController<UserDocument> {
  constructor(service: UserResourceService) {
    super(service);
  }

  @Get()
  @ApiFilterQuery(UserResourceDto)
  @ApiFilterQuery(UserResourceDto, { name: "$or" })
  override async list(@Query() query: ListUserResourceDto) {
    return super.list(query);
  }

  @Post()
  override async create(@Body() payload: WriteUserResourceDto) {
    return super.create(payload);
  }

  @Patch(':id')
  override async update(id: string, payload: WriteUserResourceDto) {
    return super.update(id, payload);
  }
}
