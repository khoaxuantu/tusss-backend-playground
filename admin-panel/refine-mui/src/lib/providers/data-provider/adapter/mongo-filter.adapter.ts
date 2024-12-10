import { ConditionalFilter, CrudFilter, CrudOperators, LogicalFilter } from "@refinedev/core";

interface MongoFilterProps {
  or: Record<string, any>;
  filter: Record<string, any>;
}

const MONGO_OPERATOR_MAPPING: Record<string, string> = {
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
    const output = { or: [], filter: {} } as MongoFilterProps;

    if (!filters) return output;

    filters.forEach((filter) => {
      if (filter.operator == "or") {
        output["or"] = ((filter as ConditionalFilter).value as LogicalFilter[]).map(
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
        console.log(output["filter"]);
        output["filter"][(filter as LogicalFilter).field] = {
          [this.mapMongoOperator(filter.operator)]: filter.value,
        };
      }
    });

    return output;
  }

  static mapMongoOperator(operator: CrudOperators) {
    if (!MONGO_OPERATOR_MAPPING[operator])
      throw new Error("Crud operator is not support for Mongo");
    return MONGO_OPERATOR_MAPPING[operator];
  }
}
