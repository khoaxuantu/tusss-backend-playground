import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import { MESSAGE } from '../constant/constants';
import { InvalidParamsException } from '../exception/invalid-param.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    // handle update data unique already existed
    if (exception instanceof MongoServerError) {
      switch (exception.code) {
        case 11000:
          const keysDup = Object.keys(exception.keyPattern || {});
          exception = new InvalidParamsException({
            params: keysDup,
            message: MESSAGE.ERROR.DUPLICATE_KEYS(keysDup),
            where: MongoServerError.name,
          });
          break;

        default:
          break;
      }
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const resData =
      exception instanceof HttpException ? exception.getResponse() : 'Something Wrong';

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`exception: ${exception}`);
    } else {
      this.logger.error(
        `with status: ${status}, response: ${JSON.stringify(resData)}`,
      );
    }

    response.status(status).json(resData);
  }
}
