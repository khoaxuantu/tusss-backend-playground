import { PaginateResult } from "mongoose";

export const ServiceListResponseStub: PaginateResult<any> = {
  hasNextPage: true,
  hasPrevPage: true,
  docs: [undefined],
  totalDocs: 1,
  limit: 10,
  totalPages: 1,
  offset: 0,
  pagingCounter: 1,
};
