import {
  FilterQuery,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose';

export type SortProps = Record<string, 1 | -1>;

export interface FilterProps<T> {
  sort?: SortProps;
  limit?: number;
  match: FilterQuery<T>;
  page?: number;
  paginateOptions?: PaginateOptions;
}

export abstract class AbstractModelRepository<T extends any> {
  constructor(protected model: PaginateModel<any>) {}

  findOneAndUpdate(
    filter: FilterQuery<T> = {},
    values: UpdateQuery<T> = {},
    options: QueryOptions<T> = { returnDocument: 'after' },
  ): Promise<T> {
    return this.model.findOneAndUpdate(filter, values, options).exec();
  }

  findOne(
    filter: FilterQuery<T> = {},
    projection: ProjectionType<T> = { __v: 0, password: 0 },
    options: QueryOptions<T> = {},
  ): Promise<T> {
    return this.model.findOne(filter, projection, options).exec();
  }

  deleteOne(
    filter: FilterQuery<T>,
    options: QueryOptions<T> = { returnDocument: 'after' },
  ): Promise<T> {
    return this.model.findOneAndDelete(filter, options);
  }

  list(props: FilterProps<T>): Promise<PaginateResult<T>> {
    return this.model.paginate(props.match, {
      limit: props.limit,
      page: props.page,
      sort: props.sort,
      ...props.paginateOptions,
    });
  }

  findById(
    id: string,
    projection: ProjectionType<T> = { __v: 0, password: 0 },
    options: QueryOptions<T> = {},
  ): Promise<T> {
    return this.model.findById(id, projection, options).exec();
  }
}
