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
