import { GetListDtoAdapter } from '../adapters/dto.adapters';
import { resourceListDtoStub } from './stub/read.dto.stub';

describe('GetListDtoAdapter', () => {
  const dtoParams = {
    car_gt: 100,
    car_lt: 10.20,
    car_gte: 10000,
    car_lte: 100000,
    student_in: [1, 2, 3, 4, 5],
    student_nin: [6, 7, 8, 9, 10],
    age_ne: 18,
    or: '',
  };
  const expectResult = {
    $and: [
      { car: { $gt: 100 } },
      { car: { $lt: 10.20 } },
      { car: { $gte: 10000 } },
      { car: { $lte: 100000 } },
      { student: { $in: [1, 2, 3, 4, 5] } },
      { student: { $nin: [6, 7, 8, 9, 10] } },
      { age: { $ne: 18 } },
    ],
  };

  describe('When there are sort fields', () => {
    test('sort but no order', () => {
      const subject = GetListDtoAdapter.parse(resourceListDtoStub({ _sort: 'a' }));
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

  describe('When one _', () => {
    it("should return correct query params", () => {
      const subject = GetListDtoAdapter.parse(resourceListDtoStub(dtoParams));
      expect(subject.filterParams).toEqual(expectResult);
    });
  });

  describe('When more than one _', () => {
    it("should return correct query params", () => {
      const testParam = "a_b_c_gt";
      dtoParams[testParam] = 10;
      const expectParam = { a_b_c: { $gt: 10 } };

      const subject = GetListDtoAdapter.parse(resourceListDtoStub(dtoParams));
      expect(subject.filterParams.$and).toContainEqual(expectParam);
    });
  });

  describe('When or', () => {
    const subject = (dtoParams: any) => GetListDtoAdapter.parse(resourceListDtoStub(dtoParams));

    describe('When 2 fields filter', () => {
      it("should contain $or and correct filter param", () => {
        dtoParams.or = "a_b_c_eq=22;b_c_d_lt=22";
        const expectParams = [
          { a_b_c: { $eq: 22 } },
          { b_c_d: { $lt: 22 } }
        ];

        expect(subject(dtoParams).filterParams.$or).toEqual(expectParams);
      });
    });

    describe('When there is in or nin', () => {
      it("should contain array param", () => {
        dtoParams.or = "a_b_c_in=[1,2,3];b_c_d_nin=[4,5,6]";
        const expectParams = [
          { a_b_c: { $in: [1, 2, 3] } },
          { b_c_d: { $nin: [4, 5, 6] } },
        ];

        expect(subject(dtoParams).filterParams.$or).toEqual(expectParams);
      });
    });
  });
});
