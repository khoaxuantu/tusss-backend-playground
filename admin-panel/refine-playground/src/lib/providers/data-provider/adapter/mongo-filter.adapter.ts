import { ConditionalFilter, CrudFilter, LogicalFilter } from "@refinedev/core";

interface MongoFilterProps {
  or: Record<string, any>;
  filter: Record<string, any>;
}

export class MongoFilterAdapter {
  static parse(filters?: CrudFilter[]): MongoFilterProps {
    if (!filters) return { or: {}, filter: {} };

    const output = {} as MongoFilterProps;

    filters.forEach((filter) => {
      if (filter.operator == "or") {
        ((filter as ConditionalFilter).value as LogicalFilter[]).forEach((expression) => {
          output["or"][expression.field][expression.operator] = expression.value;
        });
      } else {
        output["filter"][(filter as LogicalFilter).field][filter.operator] = filter.value;
      }
    });

    return output;
  }
}
