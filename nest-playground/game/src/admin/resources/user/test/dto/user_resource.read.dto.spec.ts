import { testMongoFilterDto } from '@/admin/resources/test/shared/shared-examples/mongo.dto';
import { testResourceReadDto } from '@/admin/resources/test/shared/shared-examples/read.dto';
import { Types } from 'mongoose';
import { ListUserResourceDto, UserResourceDto } from '../../dto/user_resource.read.dto';

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

  testMongoFilterDto({
    dtoClass: UserResourceDto,
    testField: '_id',
    testValue: testObjectId.toString(),
    expectValue: testObjectId,
  });

  testMongoFilterDto({
    dtoClass: UserResourceDto,
    testField: 'age',
    testValue: ['1', '2', '3'],
    expectValue: [1, 2, 3],
  });

  testMongoFilterDto({
    dtoClass: UserResourceDto,
    testField: 'updatedAt',
    testValue: testDate.toISOString(),
    expectValue: testDate,
  });

  testMongoFilterDto({
    dtoClass: UserResourceDto,
    testField: 'createdAt',
    testValue: testDate.toISOString(),
    expectValue: testDate,
  });

  stringFields.forEach((field) => {
    testMongoFilterDto({
      dtoClass: UserResourceDto,
      testField: field,
      testValue: 'abc0123',
      expectValue: 'abc0123',
    });
  });
});

testResourceReadDto({
  dtoClass: ListUserResourceDto,
  filterDtoClass: UserResourceDto,
});
