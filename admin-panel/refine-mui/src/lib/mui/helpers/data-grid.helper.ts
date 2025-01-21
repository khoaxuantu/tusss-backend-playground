import {
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
} from "@mui/x-data-grid";
import { CrudOperators } from "@refinedev/core";

/**
 * I would not recommend create methods based on type properties, i.e date(), number().
 * Because it may cause too many spread operations.
 */
export class ColumnDefHelper {
  static common(props: GridColDef): GridColDef {
    return {
      minWidth: 250,
      ...props,
    };
  }

  static id(props?: Partial<GridColDef>): GridColDef {
    return ColumnDefHelper.common({
      ...props,
      field: "_id",
      headerName: "Id",
    });
  }

  static createdAt(props?: Partial<GridColDef>): GridColDef {
    return ColumnDefHelper.common({
      filterOperators: FilterOperatorMapper.getGridDateOperators(),
      ...props,
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      valueGetter: (value: any) => value && new Date(value),
    });
  }
}

export class FilterOperatorMapper {
  static string: Record<string, CrudOperators> = {
    contains: "contains",
    equals: "eq",
    isAnyOf: "in",
  };

  static numeric: Record<string, CrudOperators> = {
    "=": "eq",
    "!=": "ne",
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte",
    isAnyOf: "in",
  };

  static date: Record<string, CrudOperators> = {
    is: "eq",
    not: "ne",
    after: "gt",
    onOrAfter: "gte",
    before: "lt",
    onOrBefore: "lte",
    isAnyOf: "in",
  };

  static getGridStringOperators() {
    return getGridStringOperators().filter((operator) => {
      return !!FilterOperatorMapper.string[operator.value];
    });
  }

  static getGridNumericOperators() {
    return getGridNumericOperators().filter((operator) => {
      return !!FilterOperatorMapper.numeric[operator.value];
    });
  }

  static getGridDateOperators() {
    return getGridDateOperators().filter((operator) => {
      return !!FilterOperatorMapper.date[operator.value];
    });
  }
}
