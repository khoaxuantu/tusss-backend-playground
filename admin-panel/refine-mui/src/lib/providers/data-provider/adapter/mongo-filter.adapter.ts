import { ConditionalFilter, CrudFilter, CrudOperators, LogicalFilter } from "@refinedev/core";

interface MongoFilterProps {
  filter: {
    $or?: Record<string, any>[];
    $and?: Record<string, any>[];
  };
}

const MONGO_OPERATOR_MAPPER: Record<string, string> = {
  eq: "$eq",
  and: "$and",
  contains: "$regex",
  in: "$in",
  gt: "$gt",
  gte: "$gte",
  lt: "$lt",
  lte: "$lte",
  ne: "$ne",
  nin: "$nin",
  or: "$or",
};

export class MongoFilterAdapter {
  static parse(filters?: CrudFilter[]): MongoFilterProps {
    const output = { filter: {} } as MongoFilterProps;

    if (!filters) return output;

    output.filter.$and = [];
    console.log(filters);

    filters.forEach((filter) => {
      if (filter.operator == "or") {
        output.filter.$or = ((filter as ConditionalFilter).value as LogicalFilter[]).map(
          (expression) => {
            const val =
              typeof expression.value == "string" ? expression.value.trim() : expression.value;
            return {
              [expression.field]: {
                [this.mapMongoOperator(expression.operator)]: val,
              },
            };
          },
        );
      } else {
        if (typeof filter.value == "string") filter.value = filter.value.trim();
        output.filter.$and?.push({
          [(filter as LogicalFilter).field]: {
            [this.mapMongoOperator(filter.operator)]: filter.value,
          },
        });
        console.log(output["filter"]);
      }
    });

    return output;
  }

  static mapMongoOperator(operator: CrudOperators) {
    if (!MONGO_OPERATOR_MAPPER[operator])
      throw new Error(`Crud operator "${operator}" is not supported.`);
    return MONGO_OPERATOR_MAPPER[operator];
  }
}
