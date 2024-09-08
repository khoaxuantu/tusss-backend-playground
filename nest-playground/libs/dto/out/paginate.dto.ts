import { ApiProperty } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { } from "mongoose-paginate-v2";

export class PaginateResponseDto<T, TDocDto extends T>
  implements
    Pick<
      PaginateResult<T>,
      | 'docs'
      | 'totalDocs'
      | 'limit'
      | 'hasPrevPage'
      | 'hasNextPage'
      | 'totalPages'
      | 'offset'
      | 'pagingCounter'
    >
{
  @ApiProperty()
  docs: T[] | TDocDto[];

  @ApiProperty()
  totalDocs: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  hasPrevPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  pagingCounter: number;

  constructor(paginateResult: PaginateResult<T>, dtoClass?: new (x: T) => TDocDto) {
    this.docs = dtoClass
      ? paginateResult.docs.map((data) => new dtoClass(data))
      : paginateResult.docs as T[];
    this.totalDocs = paginateResult.totalDocs;
    this.limit = paginateResult.limit;
    this.hasPrevPage = paginateResult.hasPrevPage;
    this.hasNextPage = paginateResult.hasNextPage;
    this.totalPages = paginateResult.totalPages;
    this.offset = paginateResult.offset;
    this.pagingCounter = paginateResult.pagingCounter;
  }
}
