import { testArrParamsTransform } from '@/lib/test/shared-examples/transform.helper';
import { Constructor } from '@/lib/types/common';
import { plainToInstance } from 'class-transformer';

interface TestResourceReadDtoProps<TClassMain, TClassFilter> {
  dtoClass: Constructor<TClassMain>;
  filterDtoClass: Constructor<TClassFilter>;
  testOr: () => any;
}

export function testResourceReadDto<T, V>({
  dtoClass,
  filterDtoClass,
  testOr,
}: TestResourceReadDtoProps<T, V>) {
  describe(dtoClass.name, () => {
    describe('ResourcePaginateDto attributes', () => {
      describe('page & limit', () => {
        it('should transform to number', () => {
          const plainObj = { page: '1', limit: '10' };
          const obj = plainToInstance(dtoClass, plainObj);
          expect(obj).toMatchObject({ page: 1, limit: 10 });
        });
      });

      describe('sort & order', () => {
        const expectedObj = { sort: ['abc'], order: ['asc'] };

        testArrParamsTransform({
          cls: dtoClass,
          singleObj: { sort: 'abc', order: 'asc' },
          expectedSingleObj: expectedObj,
          arrObj: { ...expectedObj },
          expectedArrObj: expectedObj,
        });
      });
    });

    describe('ResourceReadDto attributes', () => {
      describe('ids', () => {
        testArrParamsTransform({
          cls: dtoClass,
          singleObj: { ids: 'abc' },
          expectedSingleObj: { ids: ['abc'] },
          arrObj: { ids: ['abc', 'bcd'] },
          expectedArrObj: { ids: ['abc', 'bcd'] },
        });
      });

      describe('$or', () => {
        testOr();
      });

      describe('filter', () => {
        it('should transfom to correct instance', () => {
          const obj = plainToInstance(dtoClass, { filter: {} });
          expect(obj["filter"] instanceof filterDtoClass).toBeTruthy();
        });
      });
    });
  });
}
