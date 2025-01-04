import { NextActionResponse } from "@lib/types/api.type";
import { BaseRecord, GetListResponse, GetOneResponse, HttpError } from "@refinedev/core";

export class DataProviderException implements HttpError, NextActionResponse {
  message: string;
  statusCode: number;
  ok: boolean = false;

  constructor(res: Response, message?: string) {
    this.message = message || res.statusText;
    this.statusCode = res.status;
  }

  toPlainObject(): DataProviderException {
    return { ...this };
  }

  static async create(res: Response): Promise<DataProviderException> {
    const body = await res.json();
    const msg = typeof body == "string" ? body : body?.message;
    return new DataProviderException(res, msg);
  }
}

export class ManyDataException extends DataProviderException implements GetListResponse {
  data: any[] = [];
  total: number = 0;

  override toPlainObject(): ManyDataException {
    return { ...this };
  }

  static async create(res: Response): Promise<ManyDataException> {
    const exception = await DataProviderException.create(res);
    return new ManyDataException(res, exception.message);
  }
}

export class OneDataException extends DataProviderException implements GetOneResponse {
  data: BaseRecord = {};

  override toPlainObject(): OneDataException {
    return { ...this };
  }

  static async create(res: Response): Promise<OneDataException> {
    const exception = await DataProviderException.create(res);
    return new OneDataException(res, exception.message);
  }
}
