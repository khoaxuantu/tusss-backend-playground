import { testArrParamsTransform } from '@libs/test/shared-examples/transform.helper';
import { Constructor } from '@libs/types/common';
import { plainToInstance } from 'class-transformer';

interface TestResourceReadDtoProps<TClassMain, TClassFilter> {
  dtoClass: Constructor<TClassMain>;
  filterDtoClass: Constructor<TClassFilter>;
}

export function testResourceReadDto<T, V>({
  dtoClass,
  filterDtoClass,
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

      describe('filter', () => {
        it('should transfom to correct instance', () => {
          const obj = plainToInstance(dtoClass, {
            filter: { $and: [{ a: { $eq: 0 } }], $or: [{ a: { $eq: 0 } }] },
          });
          expect(obj['filter']['$and'][0] instanceof filterDtoClass).toBeTruthy();
          expect(obj['filter']['$or'][0] instanceof filterDtoClass).toBeTruthy();
        });
      });
    });
  });
}
