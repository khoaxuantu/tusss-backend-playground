import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AbstractResourceController } from '../interfaces/controller.interface';
import { ApiTags } from '@nestjs/swagger';
import { ListUserResourceDto, UserResourceDto } from './dto/user_resource.read.dto';
import { User, UserDocument } from '@/user/schema/user.schema';
import { Public } from '@/auth/decorator/auth.decorator';
import { ApiFilterQuery } from '@/lib/decorator/api-filter-query.decorator';
import { UserResourceService } from './user_resource.service';
import { Document, Types } from 'mongoose';
import { WriteUserResourceDto } from './dto/user_resource.write.dto';

@Controller('admin/users')
@ApiTags('Admin Resource - User')
export class AdminUserResourceController extends AbstractResourceController<UserDocument> {
  constructor(service: UserResourceService) {
    super(service);
  }

  @Public()
  @Get()
  @ApiFilterQuery(UserResourceDto)
  @ApiFilterQuery(UserResourceDto, { name: "$or" })
  override async list(@Query() query: ListUserResourceDto) {
    return super.list(query);
  }

  @Public()
  @Post()
  override async create(@Body() payload: WriteUserResourceDto) {
    return super.create(payload);
  }

  @Public()
  @Patch(':id')
  override async update(id: string, payload: WriteUserResourceDto) {
    return super.update(id, payload);
  }
}
