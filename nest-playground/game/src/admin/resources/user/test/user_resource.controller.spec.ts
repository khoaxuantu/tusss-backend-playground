import { Test } from '@nestjs/testing';
import { itBehavesLike } from '../../test/shared/shared-examples/controller.interface';
import { AdminUserResourceController } from '../user_resource.controller';
import { UserResourceService } from '../user_resource.service';

jest.mock('../user_resource.service');

describe('AdminUserResourceController', () => {
  const createTestingModule = async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AdminUserResourceController],
      providers: [UserResourceService],
    }).compile();

    return {
      controller: moduleRef.get(AdminUserResourceController),
      service: moduleRef.get(UserResourceService),
    };
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
