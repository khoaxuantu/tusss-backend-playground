import { Role } from '@/auth/constant/role.constant';
import { Roles } from '@/auth/decorator/role.decorator';
import { AbstractModelFactory } from '@/lib/factory/interfaces/factory.interface';
import { AbstractModelRepository } from '@/lib/repository/interfaces/repository.interface';
import { Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResourceReadDto } from '../dto/read.dto';
import { printDeepObject } from '@/lib/helper/print.helper';
import { ParseListQueryPipe } from '../pipes/query-param.pipe';

@Roles(Role.Admin)
@ApiBearerAuth()
export abstract class AbstractResourceController<T> {
  constructor(
    protected repository: AbstractModelRepository<T>,
    protected factory: AbstractModelFactory<T>,
  ) {}

  async list(query: ResourceReadDto) {
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
