import { CONFIG } from "@lib/config";
import { ErrorResponse } from "@lib/errors/response";
import { RESOURCE_IDENTIFIER } from "@lib/resource/constants";
import {
  CreateParams,
  DeleteOneParams,
  GetListParams,
  GetManyParams,
  GetOneParams,
  MetaQuery,
  UpdateParams,
} from "@refinedev/core";
import { MongoFilterAdapter } from "./adapter/mongo-filter.adapter";
import { ApiQueryListBuilder } from "./builder/api-query-list.builder";
import { ApiQueryManyBuilder } from "./builder/api-query-many.builder";
import { ApiQueryParamBuilder } from "./builder/api-query-param.builder";

export class DataProviderServer {
  private static url: string = CONFIG.BACKEND_URL;

  static async getList({
    resource,
    filters,
    pagination,
    sorters,
    meta,
  }: GetListParams): Promise<Response> {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryListBuilder(this.url).withResource(resource as RESOURCE_IDENTIFIER);

    if (pagination) query.withPagination(pagination);
    if (sorters) sorters.forEach((sorter) => query.withSort(sorter));
    if (filters?.length) {
      try {
        const adaptedFilter = MongoFilterAdapter.parse(filters);
        query.withFilter(adaptedFilter.filter);
      } catch (error) {
        return ErrorResponse.internalServer((error as Error)?.message);
      }
    }

    const endpoint = query.endpoint;
    console.log("🚀 ~ DataProviderServer ~ endpoint:", endpoint);

    return fetch(endpoint, { headers });
  }

  static async getOne({ resource, id, meta }: GetOneParams) {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withParam(id.toString());
    const endpoint = query.endpoint;

    return fetch(endpoint, { headers });
  }

  static async getMany({ resource, ids, meta }: GetManyParams) {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryManyBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withIds(ids.map((id) => id.toString()));
    const endpoint = query.endpoint;

    return fetch(endpoint, { headers });
  }

  static async create({ resource, variables, meta }: CreateParams) {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url).withResource(resource as RESOURCE_IDENTIFIER);
    const endpoint = query.endpoint;

    return fetch(endpoint, {
      headers,
      method: "POST",
      body: JSON.stringify(variables),
    });
  }

  static async update({ resource, id, variables, meta }: UpdateParams) {
    console.log("🚀 ~ DataProviderServer ~ update:DataProvider['update']= ~ variables:", variables);
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withParam(id.toString());
    const endpoint = query.endpoint;

    return fetch(endpoint, {
      headers,
      method: "PATCH",
      body: JSON.stringify(variables),
    });
  }

  static async deleteOne({ id, resource, meta }: DeleteOneParams) {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withParam(id.toString());
    const endpoint = query.endpoint;

    return fetch(endpoint, {
      headers,
      method: "DELETE",
    });
  }
}
