import { UserOutDto } from '@/user/dto/user.out.dto';
import { UserDocument } from '@/user/schema/user.schema';
import { ApiFilterQuery } from '@libs/decorator/swagger/api-filter-query.decorator';
import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AbstractResourceController } from '../interfaces/controller.interface';
import { ListUserResourceDto, UserResourceDto } from './dto/user_resource.read.dto';
import { CreateUserResourceDto, UpdateUserResourceDto } from './dto/user_resource.write.dto';
import { UserResourceService } from './user_resource.service';

@Controller('admin/users')
@ApiTags('Admin Resource - User')
export class AdminUserResourceController extends AbstractResourceController<UserDocument> {
  constructor(service: UserResourceService) {
    super(service, UserOutDto);
  }

  @Get()
  @ApiFilterQuery(UserResourceDto)
  override async list(query: ListUserResourceDto) {
    return super.list(query);
  }

  @Post()
  override async create(@Body() payload: CreateUserResourceDto) {
    return super.create(payload);
  }

  @Patch(':id')
  override async update(id: string, payload: UpdateUserResourceDto) {
    return super.update(id, payload);
  }
}
