import { UserRepository } from '@/lib/repository/user/user.repository';
import { Test } from '@nestjs/testing';
import { ResourceServiceInheritanceProps, testResourceServiceInheritance } from '../../test/shared/shared-examples/service.interface';
import { UserResourceService } from '../user_resource.service';

jest.mock('../../../../lib/repository/user/user.repository');

describe(UserResourceService.name, () => {
  const testingModuleCallback: ResourceServiceInheritanceProps['testingModuleCallback'] =
    async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [UserRepository, UserResourceService],
      }).compile();

      return {
        repository: moduleRef.get(UserRepository),
        service: moduleRef.get(UserResourceService),
      };
    };

  testResourceServiceInheritance({ testingModuleCallback });
});
