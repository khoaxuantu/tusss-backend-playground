import { GetListDtoAdapter } from '../adapters/dto.adapters';
import { ResourceReadDto } from '../dto/read.dto';
import { resourceListDtoStub } from './stub/read.dto.stub';

describe('GetListDtoAdapter', () => {
  describe('When there are sort fields', () => {
    test('sort but no order', () => {
      const subject = GetListDtoAdapter.parse(
        resourceListDtoStub({ _sort: 'a' }) as ResourceReadDto,
      );
      expect(subject.paginateParams.sort.a).toEqual(1);
    });

    test('sort and order', () => {
      const subject = GetListDtoAdapter.parse(resourceListDtoStub({ _sort: 'a', _order: 'desc' }));
      expect(subject.paginateParams.sort.a).toEqual(-1);
    });
  });

  describe('When there are pagination fields', () => {
    describe('When no start or no end', () => {
      it('should return default limit (10)', () => {
        const subject = GetListDtoAdapter.parse(resourceListDtoStub({ _start: undefined }));
        expect(subject.paginateParams.limit).toEqual(10);
        expect(subject.paginateParams.skip).toEqual(0);
      });
    });

    describe('When start 0 and end 15', () => {
      it('should return 16', () => {
        const start = 0;
        const end = 15;
        const expectLimit = 16;
        const subject = GetListDtoAdapter.parse(resourceListDtoStub({ _start: start, _end: end }));

        expect(subject.paginateParams.limit).toEqual(expectLimit);
      });
    });
  });

  describe('When there are input query params', () => {
    const dtoParams = {
      car: { $gt: 100 },
      car1: { $lt: 10.2 },
      car2: { $gte: 10000 },
      car3: { $lte: 100000 },
      student: { $in: ['1', '2', '3', '4', '5'] },
      student1: { $nin: [6, 7, 8, 9, 10] },
      age: { $ne: 18 },
      or: {},
    };
    const expectResult = dtoParams;
   
    it('should return correct query params', () => {
      const subject = GetListDtoAdapter.parse(resourceListDtoStub({ filter: dtoParams }));
      expect(subject.filterParams).toEqual(expectResult);
    });
  });
});
