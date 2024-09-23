import { Test, TestingModule } from '@nestjs/testing';
import { itBehavesLike } from '../../test/shared/shared-examples/controller.interface';
import { PlayerResourceController } from '../player-resource.controller';
import { PlayerResourceService } from '../player-resource.service';

jest.mock("../player-resource.service");

describe('PlayerResourceController', () => {
  const createTestingModule = async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerResourceController],
      providers: [PlayerResourceService],
    }).compile();

    return {
      controller: module.get<PlayerResourceController>(PlayerResourceController),
      service: module.get(PlayerResourceService),
    }
  };

  it('should be defined', async () => {
    const { controller } = await createTestingModule();
    expect(controller).toBeDefined();
  });

  itBehavesLike({
    name: "perform enough resource controller's methods",
    testingModuleCallback: createTestingModule,
  });
});
