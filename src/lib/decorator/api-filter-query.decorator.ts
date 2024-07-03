import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiQueryOptions, getSchemaPath } from '@nestjs/swagger';

export function ApiFilterQuery(filterQuery: new () => object, options?: ApiQueryOptions) {
  return applyDecorators(
    ApiExtraModels(filterQuery),
    ApiQuery({
      name: 'filter',
      style: 'deepObject',
      description:
        "Can be used for the resource's properties, with MongoDB-like filtering operator: $eq, $ne, $in, $nin, $lt, $lte, $gt, $gte",
      required: false,
      schema: {
        $ref: getSchemaPath(filterQuery),
      },
      ...options,
    }),
  );
}
