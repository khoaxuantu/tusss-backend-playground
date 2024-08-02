import { ApiQueryBuilder, READ_TYPE } from "./abstract/api-query.builder";

export class ApiQueryParamBuilder extends ApiQueryBuilder {
  protected override read_type: READ_TYPE = READ_TYPE.PARAM;

  withParam(id: string) {
    this.url.pathname += "/" + id;
    return this;
  }
}
