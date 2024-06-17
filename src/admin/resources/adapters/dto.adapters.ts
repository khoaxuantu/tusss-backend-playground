import { FilterProps } from '@/lib/repository/interfaces/repository.interface';
import { ResourcePaginateDto, ResourceReadDto } from '../dto/read.dto';
import { AdminResourceDtoAdapter } from '../interfaces/adapter.interface';
import { FilterQuery } from 'mongoose';

type ParsePaginateProps = Omit<FilterProps<any>, 'match'>;
type ParseFilterProps = Record<string, any>;

export class GetListDtoAdapter extends AdminResourceDtoAdapter {
  static override parse(query: Record<string, any>): {
    paginateParams: ParsePaginateProps;
    filterParams: ParseFilterProps;
  } {
    const { read_type, _start, _end, _sort, _order, ...filterParams } = query as ResourceReadDto;
    return {
      paginateParams: this.parsePaginate({ _start, _end, _sort, _order }),
      filterParams: this.parseFilter(filterParams),
    };
  }

  private static parsePaginate(props: ResourcePaginateDto): ParsePaginateProps {
    const sortArr = props._sort.split(',');
    const orderArr = props._order.split(',') as ('asc' | 'desc')[];
    const result: ParsePaginateProps = {
      sort: {},
      skip: props._start ? props._start - 1 : 0,
      limit: props._start >= 0 && props._end > props._start ? props._end - props._start + 1 : 10,
    };

    sortArr.forEach((prop, index) => {
      result.sort[prop] = orderArr[index] == 'desc' ? -1 : 1;
    });

    return result;
  }

  /**
   * Parse filter from admin fetching list action
   *
   * @param filter An object of URL query parameters for filtering
   * @example
   * ```ts
   * {
   *    "field_gt": value,
   *    "field_gte": value,
   *    "field_le": value,
   *    "field_lte": value,
   *    "field_in": values[],
   *    "field_nin": values[],
   *    "field_ne": value,
   *    "or": "field_gt=value;field_lt=value",
   * }
   * ```
   */
  private static parseFilter(filter: Record<string, any> & { or?: string }): FilterQuery<any> {
    const filterQuery: FilterQuery<any> = {};

    if (filter['or'] && filter['or'] != '') {
      const orExpressions = filter['or'].split(';');
      filterQuery.$or = orExpressions.map((expression) => {
        const [fieldAndOperator, value] = expression.split('=');
        return this.parseExpression(fieldAndOperator, value);
      });
      delete filter['or'];
    }

    filterQuery.$and = Object.entries(filter)
      .filter((expression) => expression[0] != 'or')
      .map((expresion) => this.parseExpression(...expresion));

    return filterQuery;
  }

  /**
   *
   * @param fieldAndOperator "field_operator"
   * @param value 123 | "a value" | arr[]
   * @returns {Object} ```ts
   *                   { field: { operator: value } }
   *                   ```
   */
  private static parseExpression(fieldAndOperator: string, value: string) {
    const arr = fieldAndOperator.split('_');
    const operator = arr[arr.length - 1];
    const field = arr.slice(0, -1).join('_');
    const tmp = {};
    tmp[field] = {};
    tmp[field]['$' + operator] = this.parseValue(value);
    return tmp;
  }

  private static parseValue(value: string) {
    try {
      return JSON.parse(value)
    } catch (error) {
      return value;
    }
  }
}

export class GetManyDtoAdapter extends AdminResourceDtoAdapter {
  static override parse(query: Record<string, any>): { id: string[] } {
    return query['id'];
  }
}
