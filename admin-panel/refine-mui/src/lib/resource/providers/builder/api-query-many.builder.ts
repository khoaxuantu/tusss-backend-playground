import QueryString from "qs";
import { ApiQueryBuilder, READ_TYPE } from "./abstract/api-query.builder";

export class ApiQueryManyBuilder extends ApiQueryBuilder {
  protected override read_type: READ_TYPE = READ_TYPE.MANY;

  /**
   * @example ```q: [1, 2, 3] => ?q=1&q=2&q=3```
   */
  withIds(ids: string[]) {
    this.url.search += QueryString.stringify(ids, { indices: false })
    return this;
  }
}
