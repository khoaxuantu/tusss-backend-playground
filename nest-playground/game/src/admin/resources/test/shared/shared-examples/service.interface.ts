import { AbstractResourceService } from '@/admin/resources/interfaces/service.interface';
import { AbstractModelRepository } from '@libs/interfaces/repository.interface';
import { Types } from 'mongoose';

export interface ResourceServiceInheritanceProps {
  testingModuleCallback: () => Promise<{
    service: AbstractResourceService<any>;
    repository: AbstractModelRepository<any>;
  }>;
}

export function testResourceServiceInheritance({
  testingModuleCallback,
}: ResourceServiceInheritanceProps) {
  describe("resource service inheritance", () => {
    let service: AbstractResourceService<any>;
    let repository: AbstractModelRepository<any>;
    let mockMethod: jest.SpyInstance;

    beforeEach(async () => {
      const module = await testingModuleCallback();

      service = module.service;
      repository = module.repository;
    });

    afterEach(() => {
      if (mockMethod) mockMethod.mockRestore();
    })

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    test('findById', async () => {
      mockMethod = jest.spyOn(repository, 'findById');
      await service.findById("123");
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });

    test('listByFilter', async () => {
      mockMethod = jest.spyOn(repository, 'list');
      await service.listByFilter({
        filterParams: {},
        paginateParams: {},
      });
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });

    test('listByManyIds', async () => {
      mockMethod = jest.spyOn(repository, "list");
      await service.listByManyIds({} as any);
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });

    test('createOne', async () => {
      mockMethod = jest.spyOn(repository, 'create');
      await service.createOne({});
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });

    test('updateOne', async () => {
      mockMethod = jest.spyOn(repository, 'findOneAndUpdate');
      await service.updateOne(new Types.ObjectId(), {});
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });

    test('deleteOne', async () => {
      mockMethod = jest.spyOn(repository, 'deleteOne');
      await service.deleteOne(new Types.ObjectId());
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });
  })
}
