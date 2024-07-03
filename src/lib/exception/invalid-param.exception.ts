import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidParamsException extends HttpException {
  constructor(props: { params: string[]; message?: string; where: string }) {
    super({
      params: props.params,
      message: props.message ?? "Invalid params",
      where: props.where,
    }, HttpStatus.BAD_REQUEST);
  }
}
