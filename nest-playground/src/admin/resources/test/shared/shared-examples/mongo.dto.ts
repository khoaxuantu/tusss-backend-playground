import { Constructor } from '@/lib/types/common';
import { plainToInstance } from 'class-transformer';

interface TestMongoFilterDtoProps<T> {
  dtoClass: Constructor<T>;
  testValue: any;
  testField: keyof T;
  expectValue: any;
}

export function testMongoFilterDto<T>({
  dtoClass,
  testValue,
  testField,
  expectValue,
}: TestMongoFilterDtoProps<T>) {
  describe(testField.toString(), () => {
    const operators = ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte'];
    const operatorsArr = ['$in', '$nin'];

    it('should match with the MongoFilterDto', () => {
      const plainDtoIn = { [testField]: {} };
      operators.forEach((operator) => (plainDtoIn[testField as string][operator] = testValue));
      operatorsArr.forEach((operator) => (plainDtoIn[testField as string][operator] = [testValue]));

      const dtoIn = plainToInstance(dtoClass, plainDtoIn);

      operators.forEach((operator) => expect(dtoIn[testField][operator]).toEqual(expectValue));
      operatorsArr.forEach((operator) => expect(dtoIn[testField][operator]).toEqual([expectValue]));
    });
  })
}
