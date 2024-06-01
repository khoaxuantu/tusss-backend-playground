import { Role } from '@/auth/constant/role.constant';
import { Roles } from '@/auth/decorator/role.decorator';
import { AbstractModelFactory } from '@/lib/factory/interfaces/factory.interface';
import { AbstractModelRepository } from '@/lib/repository/interfaces/repository.interface';
import { Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ResourceReadDto } from '../dto/read.dto';
import { GetListDtoAdapter, GetManyDtoAdapter } from '../adapters/dto.adapters';

@Roles(Role.Admin)
@ApiBearerAuth()
export abstract class AbstractResourceController {
  constructor(
    protected repository: AbstractModelRepository<any>,
    protected factory: AbstractModelFactory<any>,
  ) {}

  @Get()
  @ApiQuery({ name: 'filter', required: false })
  @ApiQuery({ name: 'id', required: false, isArray: true })
  @ApiQuery({ type: ResourceReadDto })
  async list(@Query() query: Record<string, any>) {
    switch (query.read_type) {
      case 'list':
        const { paginateParams, filterParams } = GetListDtoAdapter.parse(query);
        console.log(
          '🚀 ~ AbstractResourceController ~ list ~ filterParams:',
          JSON.stringify(filterParams),
        );
        console.log('🚀 ~ AbstractResourceController ~ list ~ paginateParams:', paginateParams);
        break;

      case 'many':
        const ids = GetManyDtoAdapter.parse(query);
        console.log('🚀 ~ AbstractResourceController ~ list ~ ids:', ids);
        break;

      default:
        break;
    }
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
