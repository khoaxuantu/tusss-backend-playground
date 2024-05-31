import {
  FilterQuery,
  HydratedDocument,
  Model,
  PipelineStage,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

interface FilterProps<T> {
  sort?: Record<string, 1 | -1>;
  limit?: number;
  match: FilterQuery<T>;
  skip?: number;
}

export abstract class AbstractRepository<T extends HydratedDocument<any>> {
  constructor(protected model: Model<any>) {}

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

  deleteOne(filter: FilterQuery<T>, options: QueryOptions<T>): Promise<T> {
    return this.model.findOneAndDelete(filter, options);
  }

  list(props: FilterProps<T>): Promise<T[]> {
    const aggregatePipeline: PipelineStage[] = [{ $match: props.match }];
    if (props.sort) aggregatePipeline.push({ $sort: props.sort });
    if (props.skip) aggregatePipeline.push({ $skip: props.skip });
    if (props.limit) aggregatePipeline.push({ $limit: props.limit });

    return this.model.aggregate(aggregatePipeline).exec();
  }
}
