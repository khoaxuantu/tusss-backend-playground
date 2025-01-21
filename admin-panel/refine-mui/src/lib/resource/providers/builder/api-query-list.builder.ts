import { CrudSort, Pagination } from "@refinedev/core";
import qs from 'qs';
import { ApiQueryBuilder, QUERY_PARAM, READ_TYPE } from "./abstract/api-query.builder";

export class ApiQueryListBuilder extends ApiQueryBuilder {
  protected read_type: READ_TYPE = READ_TYPE.LIST;

  /**
   * @example
   * ```
   * { field: "a", order: "asc" }
   * => '?sort=a&order=asc'
   * ```
   */
  withSort(sort: CrudSort) {
    this.url.searchParams.append(QUERY_PARAM.SORT_FIELD, sort.field);
    this.url.searchParams.append(QUERY_PARAM.ORDER, sort.order);
    return this;
  }

  /**
   * @example
   * { age: { $in: [1, 2] }, name: "Tusss" }
   * => '?name=Tusss&age[$in]=1&age[$in]=2'
   */
  withFilter(filter: Record<string, any>) {
    this.url.search += "&" + qs.stringify({ [QUERY_PARAM.FILTER]: filter });
    return this;
  }

  /**
   * @example
   * { or: { age: { $in: [1, 2] }, name: "Tusss" } }
   * => '?$or[age][$in]=1&$or[age][$in]=2&$or[name]=Tusss'
   */
  withOrFilter(filter: Record<string, any>) {
    this.url.search += "&" + qs.stringify({ [QUERY_PARAM.OR]: filter });
    return this;
  }

  /**
   * @example
   * { current: 2, pageSize: 20 }
   * => '?page=2&limit=20'
   */
  withPagination(pagination: Pagination) {
    this.url.searchParams.set(QUERY_PARAM.PAGE, (pagination.current || 1).toString());
    this.url.searchParams.set(QUERY_PARAM.PER_PAGE, (pagination.pageSize || 10).toString());
    return this;
  }
}
