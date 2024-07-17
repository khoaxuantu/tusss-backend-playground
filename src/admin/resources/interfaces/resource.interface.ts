import { Role } from '@/auth/constant/role.constant';
import { Roles } from '@/auth/decorator/role.decorator';
import { AbstractModelFactory } from '@/lib/factory/interfaces/factory.interface';
import { AbstractModelRepository } from '@/lib/repository/interfaces/repository.interface';
import { Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AbstractResourceReadDto, ResourceReadDto } from '../dto/read.dto';
import { printDeepObject } from '@/lib/helper/print.helper';
import { RESOURCE_READ_TYPE } from '../constant/common';
import { GetListDtoAdapter, GetManyDtoAdapter } from '../adapters/dto.adapters';
import { InvalidParamsException } from '@/lib/exception/invalid-param.exception';

@Roles(Role.Admin)
@ApiBearerAuth()
export abstract class AbstractResourceController<T> {
  constructor(
    protected repository: AbstractModelRepository<T>,
    protected factory: AbstractModelFactory<T>,
  ) {}

  async list(payload: AbstractResourceReadDto) {
    console.log("🚀 ~ AbstractResourceController<T> ~ list ~ payload:", payload);
    let query;
    switch (payload.read_type) {
      case RESOURCE_READ_TYPE.LIST:
        query = GetListDtoAdapter.parse(payload);
        break;
      case RESOURCE_READ_TYPE.MANY:
        query = GetManyDtoAdapter.parse(payload);
        break;
      default:
        throw new InvalidParamsException({
          params: ["read_type"],
          where: AbstractResourceController.name,
        });
    }

    printDeepObject(query);
  }

  @Post()
  async create() {}

  @Patch()
  async update() {}

  @Get(':id')
  async getOne(@Param('id') id: string) {}

  @Delete()
  async deleteOne() {}
}
