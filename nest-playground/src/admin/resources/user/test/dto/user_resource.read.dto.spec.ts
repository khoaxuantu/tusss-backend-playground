import { testMongoFilterDto } from '@/admin/resources/test/shared/shared-examples/mongo.dto';
import { UserResourceDto } from '../../dto/user_resource.read.dto';
import { Types } from 'mongoose';

describe('UserResourceDto', () => {
  const testDate = new Date();
  const testObjectId = new Types.ObjectId();
  const stringFields: (keyof UserResourceDto)[] = [
    'address',
    'city',
    'email',
    'firstname',
    'lastname',
    'phone_number',
    'name',
  ];

  describe('_id', () => {
    testMongoFilterDto({
      dtoClass: UserResourceDto,
      testField: '_id',
      testValue: testObjectId.toString(),
      expectValue: testObjectId,
    });
  });

  describe('age', () => {
    testMongoFilterDto({
      dtoClass: UserResourceDto,
      testField: 'age',
      testValue: ['1', '2', '3'],
      expectValue: [1, 2, 3],
    });
  });

  describe('updatedAt', () => {
    testMongoFilterDto({
      dtoClass: UserResourceDto,
      testField: 'updatedAt',
      testValue: testDate.toISOString(),
      expectValue: testDate,
    });
  });

  describe('createdAt', () => {
    testMongoFilterDto({
      dtoClass: UserResourceDto,
      testField: 'createdAt',
      testValue: testDate.toISOString(),
      expectValue: testDate,
    });
  });

  stringFields.forEach((field) => {
    describe(field, () => {
      testMongoFilterDto({
        dtoClass: UserResourceDto,
        testField: field,
        testValue: 'abc0123',
        expectValue: 'abc0123',
      });
    });
  });
});
