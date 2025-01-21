import { RESOURCE_IDENTIFIER } from "@lib/resource/constants";

export enum READ_TYPE {
  LIST = "list",
  MANY = "many",
  PARAM = "param",
}

export enum QUERY_PARAM {
  SORT_FIELD = "sort",
  ORDER = "order",
  FILTER = "filter",
  READ_TYPE = "read_type",
  PAGE = "page",
  PER_PAGE = "limit",
  IDS = "ids",
  OR = "$or",
}

export abstract class ApiQueryBuilder {
  protected url: URL;
  protected abstract read_type: READ_TYPE;

  constructor(url: string) {
    this.url = new URL("/admin", url);
  }

  get endpoint() {
    this.setReadType();
    return this.url.toString();
  }

  withResource(resource: RESOURCE_IDENTIFIER) {
    this.url.pathname += "/" + resource;
    return this;
  }

  private setReadType() {
    if (this.read_type) this.url.searchParams.set(QUERY_PARAM.READ_TYPE, this.read_type);
  }
}
