import { NextActionResponse } from "@lib/resource/types/api.type";
import { BaseRecord, GetListResponse, GetOneResponse, HttpError } from "@refinedev/core";

export class DataProviderException implements HttpError, NextActionResponse {
  message: string;
  statusCode: number;
  ok: boolean = false;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }

  toPlainObject(): DataProviderException {
    return { ...this };
  }

  static create(res: Response): DataProviderException {
    return new DataProviderException(res.status, res.statusText);
  }
}

export class ManyDataException extends DataProviderException implements GetListResponse {
  data: any[] = [];
  total: number = 0;

  override toPlainObject(): ManyDataException {
    return { ...this };
  }

  static create(res: Response): ManyDataException {
    return new ManyDataException(res.status, res.statusText);
  }
}

export class OneDataException extends DataProviderException implements GetOneResponse {
  data: BaseRecord = {};

  override toPlainObject(): OneDataException {
    return { ...this };
  }

  static create(res: Response): OneDataException {
    return new OneDataException(res.status, res.statusText);
  }
}
