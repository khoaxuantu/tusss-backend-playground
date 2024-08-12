import { Role } from '@/auth/constant/role.constant';
import { Roles } from '@/auth/decorator/role.decorator';
import { InvalidParamsException } from '@/lib/exception/invalid-param.exception';
import { Body, Delete, Get, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import {
  GetListDtoAdapter,
  GetListDtoAdapterResProps,
  GetManyDtoAdapter,
} from '../adapters/dto.adapters';
import { RESOURCE_READ_TYPE } from '../constant/common';
import { AbstractResourceReadDto } from '../dto/read.dto';
import { AbstractResourceService } from './service.interface';
import { PaginateResult } from 'mongoose';
import { PaginateResponseDto } from '@/lib/dto/out/paginate.dto';

type OutDtoClass = new (data: any) => any;

@Roles(Role.Admin)
@ApiBearerAuth()
export abstract class AbstractResourceController<T> {
  constructor(
    protected service: AbstractResourceService<T>,
    protected outDtoClass: OutDtoClass,
  ) {}

  async list(payload: AbstractResourceReadDto) {
    console.log('🚀 ~ AbstractResourceController<T> ~ list ~ payload:', payload);
    let query: GetListDtoAdapterResProps | string[];
    let res: PaginateResult<T>;

    switch (payload.read_type) {
      case RESOURCE_READ_TYPE.LIST:
        query = GetListDtoAdapter.parse(payload) as GetListDtoAdapterResProps;
        res = await this.service.listByFilter(query) as PaginateResult<T>;
        break;

      case RESOURCE_READ_TYPE.MANY:
        query = GetManyDtoAdapter.parse(payload) as string[];
        res = await this.service.listByManyIds(query);
        break;

      default:
        throw new InvalidParamsException({
          params: ['read_type'],
          where: AbstractResourceController.name,
        });
    }

    return new PaginateResponseDto(res, this.outDtoClass);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return new this.outDtoClass(await this.service.findById(id));
  }

  async create(@Body() payload: any) {
    return this.service.createOne(payload);
  }

  async update(@Param('id') id: string, @Body() payload: any) {
    if (!payload || !Object.keys(payload).length)
      throw new InvalidParamsException({
        params: ['update.payload'],
        message: 'Nothing to update',
        where: 'ResourceController.update',
      });
    return new this.outDtoClass(await this.service.updateOne(new ObjectId(id), payload));
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    return new this.outDtoClass(await this.service.deleteOne(new ObjectId(id)));
  }
}
