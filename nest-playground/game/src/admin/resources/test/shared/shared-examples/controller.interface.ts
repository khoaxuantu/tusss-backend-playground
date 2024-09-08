import { InvalidParamsException } from '@/lib/exception/invalid-param.exception';
import { Types } from 'mongoose';
import { RESOURCE_READ_TYPE } from '../../../constant/common';
import { AbstractResourceController } from '../../../interfaces/controller.interface';
import { AbstractResourceService } from '../../../interfaces/service.interface';
import { ServiceListResponseStub } from '../../stub/service.out.stub';

interface ItBehavesLikeProps {
  name: string;
  testingModuleCallback: () => Promise<{
    controller: AbstractResourceController<any>;
    service: AbstractResourceService<any>;
  }>;
}

export function itBehavesLike({ name, testingModuleCallback }: ItBehavesLikeProps) {
  describe(name, () => {
    let controller: AbstractResourceController<any>;
    let service: AbstractResourceService<any>;

    beforeEach(async () => {
      const module = await testingModuleCallback();
      controller = module.controller;
      service = module.service;
    });

    describe('list', () => {
      test(`read type: ${RESOURCE_READ_TYPE.LIST}`, async () => {
        const mockListFilter = jest
          .spyOn(service, 'listByFilter')
          .mockResolvedValue(ServiceListResponseStub);
        await controller.list({ read_type: RESOURCE_READ_TYPE.LIST });
        expect(mockListFilter).toHaveBeenCalledTimes(1);
      });

      test(`read type: ${RESOURCE_READ_TYPE.MANY}`, async () => {
        const mockListMany = jest
          .spyOn(service, 'listByManyIds')
          .mockResolvedValue(ServiceListResponseStub);
        await controller.list({ read_type: RESOURCE_READ_TYPE.MANY });
        expect(mockListMany).toHaveBeenCalledTimes(1);
      });

      test('invalid type', async () => {
        await expect(controller.list({ read_type: 'invalid_type' as any })).rejects.toThrow(
          InvalidParamsException,
        );
      });
    });

    test('getOne', async () => {
      const mockFindById = jest.spyOn(service, 'findById');
      await controller.getOne('123');
      expect(mockFindById).toHaveBeenCalledTimes(1);
    });

    test('create', async () => {
      const mockCreate = jest.spyOn(service, 'createOne');
      await controller.create({});
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    describe('update', () => {
      test('invalid params', async () => {
        await expect(controller.update('123', {})).rejects.toThrow(InvalidParamsException);
      });

      test('success', async () => {
        const mockUpdateOne = jest.spyOn(service, 'updateOne');
        await controller.update(new Types.ObjectId().toString(), { abc: "xyz" });
        expect(mockUpdateOne).toHaveBeenCalledTimes(1);
      });
    });

    test("deleteOne", async () => {
      const mockDeleteOne = jest.spyOn(service, "deleteOne");
      await controller.deleteOne(new Types.ObjectId().toString());
      expect(mockDeleteOne).toHaveBeenCalledTimes(1);
    });
  });
}
