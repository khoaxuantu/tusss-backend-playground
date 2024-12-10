import { PlayerOutDto } from '@/player/dto/player.out.dto';
import { PlayerDocument } from '@/player/schema/player.schema';
import { ApiFilterQuery } from '@libs/decorator/swagger/api-filter-query.decorator';
import { Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { AbstractResourceController } from '../interfaces/controller.interface';
import { ListPlayerResourceDto, PlayerResourceReadDto } from './dto/player-resource.read.dto';
import { CreatePlayerResourceDto, UpdatePlayerResourceDto } from './dto/player-resource.write.dto';
import { PlayerResourceService } from './player-resource.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/players')
@ApiTags('Admin Resource - Player')
export class PlayerResourceController extends AbstractResourceController<PlayerDocument> {
  constructor(service: PlayerResourceService) {
    super(service, PlayerOutDto);
  }

  @Get()
  @ApiFilterQuery(PlayerResourceReadDto)
  @ApiFilterQuery(PlayerResourceReadDto, { name: "$or" })
  override async list(query: ListPlayerResourceDto) {
    return super.list(query);
  }

  @Post()
  override async create(payload: CreatePlayerResourceDto) {
    return super.create(payload);
  }

  @Patch(':id')
  override async update(id: string, payload: UpdatePlayerResourceDto): Promise<any> {
    return super.update(id, payload);
  }
}
