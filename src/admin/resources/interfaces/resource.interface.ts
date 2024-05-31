import { Role } from "@/auth/constant/role.constant";
import { Roles } from "@/auth/decorator/role.decorator";
import { AbstractModelFactory } from "@/lib/factory/interfaces/factory.interface";
import { AbstractModelRepository } from "@/lib/repository/interfaces/repository.interface";
import { Delete, Get, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

export abstract class AbstractResourceController {
  constructor(
    protected repository: AbstractModelRepository<any>,
    protected factory: AbstractModelFactory<any>,
  ) {}

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async getList() {}

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async getMany() {}

  @Post()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async create() {}

  @Patch()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async update() {}

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async getOne() {}

  @Delete()
  @Roles(Role.Admin)
  @ApiBearerAuth()
  async deleteOne() {}
}
