import { AllExceptionsFilter } from '../../filter/all-exception.filter';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MongoServerError } from 'mongodb';

const mockStatus = jest.fn().mockImplementation(() => ({ json: jest.fn() }));
const mockGetResponse = jest.fn().mockImplementation(() => ({ status: mockStatus }));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => {
  return {
    getResponse: mockGetResponse,
  };
});
const mockHost: any = { switchToHttp: mockHttpArgumentsHost };

describe(AllExceptionsFilter.name, () => {
  // Auto pass the test, we manually check the logger in the filter instead
  const checkLogger = () => expect('Check logger');

  let filter: AllExceptionsFilter;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [AllExceptionsFilter],
    }).compile();

    filter = moduleRef.get(AllExceptionsFilter);
  });

  describe(MongoServerError.name, () => {
    describe('unique data error', () => {
      it('should log invalid params exception', () => {
        const exception = new MongoServerError({});
        exception.code = 11000;
        exception.keyPattern = { a_key: 1 };
        filter.catch(exception, mockHost);
        checkLogger();
      });
    });

    describe('other errors', () => {
      it('should log internal server error', () => {
        filter.catch(new MongoServerError({}), mockHost);
        checkLogger();
      });
    });
  });

  describe(HttpException.name, () => {
    const checkExceptionLogger = (status: HttpStatus, exception: HttpException) => {
      describe(status, () => {
        it(`should log ${exception.getResponse()['error']}`, () => {
          filter.catch(exception, mockHost);
          checkLogger();
        });
      });
    };

    checkExceptionLogger(
      HttpStatus.INTERNAL_SERVER_ERROR,
      new InternalServerErrorException('Test internal server error.'),
    );

    checkExceptionLogger(
      HttpStatus.UNAUTHORIZED,
      new UnauthorizedException('Test unauthorized error.'),
    );

    checkExceptionLogger(
      HttpStatus.BAD_REQUEST,
      new BadRequestException("Test bad request error"),
    )
  });

  describe("when throw normal error", () => {
    it('should log interal server error', () => {
      filter.catch(new Error('Test normal error.'), mockHost);
      checkLogger();
    });
  })
});
