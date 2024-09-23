import { Test, TestingModule } from '@nestjs/testing';
import { PlayerResourceService } from '../player-resource.service';
import { PlayerRepository } from '@/lib/repository/player/player.repository';
import { mockRepository } from '@libs/test/mocks/repository';

describe('PlayerResourceService', () => {
  let service: PlayerResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerResourceService, { provide: PlayerRepository, useValue: mockRepository() }],
    }).compile();

    service = module.get<PlayerResourceService>(PlayerResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
