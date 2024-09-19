import { Test, TestingModule } from '@nestjs/testing';
import { PlayerResourceController } from '../player-resource.controller';

describe('PlayerResourceController', () => {
  let controller: PlayerResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerResourceController],
    }).compile();

    controller = module.get<PlayerResourceController>(PlayerResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
