import { Role } from '@/auth/constant/role.constant';
import { Roles } from '@/auth/decorator/role.decorator';
import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AbstractResourceReadDto } from '../dto/read.dto';
import { RESOURCE_READ_TYPE } from '../constant/common';
import { GetListDtoAdapter, GetListDtoAdapterResProps, GetManyDtoAdapter } from '../adapters/dto.adapters';
import { InvalidParamsException } from '@/lib/exception/invalid-param.exception';
import { AbstractResourceService } from './service.interface';
import { ObjectId } from "mongodb";

@Roles(Role.Admin)
@ApiBearerAuth()
export abstract class AbstractResourceController<T> {
  constructor(protected service: AbstractResourceService<T>) {}

  async list(payload: AbstractResourceReadDto) {
    console.log('🚀 ~ AbstractResourceController<T> ~ list ~ payload:', payload);
    let query: GetListDtoAdapterResProps | string[];

    switch (payload.read_type) {
      case RESOURCE_READ_TYPE.LIST:
        query = GetListDtoAdapter.parse(payload) as GetListDtoAdapterResProps;
        return this.service.listByFilter(query);

      case RESOURCE_READ_TYPE.MANY:
        query = GetManyDtoAdapter.parse(payload) as string[];
        return this.service.listByManyIds(query);

      default:
        throw new InvalidParamsException({
          params: ['read_type'],
          where: AbstractResourceController.name,
        });
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  async create(@Body() payload: any) {
    return this.service.createOne(payload);
  }

  async update(@Param('id') id: string, @Body() payload: any) {
    return this.service.updateOne(new ObjectId(id), payload);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(new ObjectId(id));
  }
}
