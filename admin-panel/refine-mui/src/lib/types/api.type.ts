import { ManyDataException, OneDataException } from "@lib/errors/data-provider.exception";
import {
    BaseRecord,
    CreateResponse,
    DeleteOneResponse,
    GetListResponse,
    GetManyResponse,
    GetOneResponse,
    UpdateResponse,
} from "@refinedev/core";

export interface NextActionResponse {
  ok: boolean;
}

export interface ResourceResponse<TData extends BaseRecord> {
  getList: GetListResponse<TData> & NextActionResponse;
  getOne: GetOneResponse<TData> & NextActionResponse;
  getMany: GetManyResponse<TData> & NextActionResponse;
  create: CreateResponse<TData> & NextActionResponse;
  update: UpdateResponse<TData> & NextActionResponse;
  deleteOne: DeleteOneResponse<TData> & NextActionResponse;
}

export interface DataProviderServerResponse<TData extends BaseRecord = BaseRecord> {
  getList: ResourceResponse<TData>["getList"] | ManyDataException;
  getOne: ResourceResponse<TData>["getOne"] | OneDataException;
  getMany: ResourceResponse<TData>["getMany"] | ManyDataException;
  create: ResourceResponse<TData>["create"] | OneDataException;
  update: ResourceResponse<TData>["update"] | OneDataException;
  deleteOne: ResourceResponse<TData>["deleteOne"] | OneDataException;
}

export interface ResourcePaginate {
  docs: any[];
  totalDocs: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  offset: number;
  pagingCounter: number;
}
