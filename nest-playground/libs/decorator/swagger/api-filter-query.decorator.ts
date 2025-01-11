import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiQuery, ApiQueryOptions, getSchemaPath } from "@nestjs/swagger";
import { Constructor } from "../../types/common";

export function ApiFilterQuery(filterQuery: Constructor, options?: ApiQueryOptions) {
  return applyDecorators(
    ApiExtraModels(filterQuery),
    ApiQuery({
      name: "filter",
      style: "deepObject",
      explode: false,
      description:
      "Can be used for the resource's properties, with MongoDB-like filtering operator: $eq, $ne, $in, $nin, $lt, $lte, $gt, $gte",
      required: false,
      schema: {
        type: "object",
        properties: {
          $and: { type: "array", items: { $ref: getSchemaPath(filterQuery) } },
          $or: { type: "array", items: { $ref: getSchemaPath(filterQuery) } },
        },
      },
      allowReserved: true,
      ...options,
    })
  );
}
