import { CONFIG } from "@lib/constants/config";
import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { ResourcePaginate } from "@lib/types/api.type";
import { DataProvider, MetaQuery } from "@refinedev/core";
import { ApiError } from "next/dist/server/api-utils";
import { MongoFilterAdapter } from "./adapter/mongo-filter.adapter";
import { ApiQueryListBuilder } from "./builder/api-query-list.builder";
import { ApiQueryManyBuilder } from "./builder/api-query-many.builder";
import { ApiQueryParamBuilder } from "./builder/api-query-param.builder";
import { mockUsersData } from "./data.mock";

export class DataProviderServer {
  private static url: string = CONFIG.BACKEND_URL;

  static getList: DataProvider["getList"] = async ({
    resource,
    filters,
    pagination,
    sorters,
    meta,
  }) => {
    // const { headers } = meta as MetaQuery;
    // const query = new ApiQueryListBuilder(this.url).withResource(resource as RESOURCE_IDENTIFIER);

    // if (pagination) query.withPagination(pagination);
    // if (sorters) sorters.forEach((sorter) => query.withSort(sorter));
    // if (filters?.length) {
    //   const adaptedFilter = MongoFilterAdapter.parse(filters);
    //   query.withOrFilter(adaptedFilter.or);
    //   query.withFilter(adaptedFilter.filter);
    // }

    // const endpoint = query.endpoint;

    // const res = await fetch(endpoint, { headers });

    // if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

    // const data = await res.json() as ResourcePaginate;

    const data = {
      docs: mockUsersData as any,
      totalDocs: mockUsersData.length,
    };

    return {
      data: data.docs,
      total: data.totalDocs,
    };
  };

  static getOne: DataProvider["getOne"] = async ({ resource, id, meta }) => {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withParam(id.toString());
    const endpoint = query.endpoint;

    const res = await fetch(endpoint, { headers });

    if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

    const data = await res.json();

    return { data };
  };

  static getMany: DataProvider["getMany"] = async ({ resource, ids, meta }) => {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryManyBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withIds(ids.map((id) => id.toString()));
    const endpoint = query.endpoint;

    const res = await fetch(endpoint, { headers });

    if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

    const data = (await res.json()) as ResourcePaginate;

    return { data: data.docs };
  };

  static create: DataProvider["create"] = async ({ resource, variables, meta }) => {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url).withResource(resource as RESOURCE_IDENTIFIER);
    const endpoint = query.endpoint;

    const res = await fetch(endpoint, {
      headers,
      method: "POST",
      body: JSON.stringify(variables),
    });

    if (!res.ok) throw new ApiError(res.status, `${res.statusText}: ${await res.text()}`);

    return { data: await res.json() };
  };

  static update: DataProvider["update"] = async ({ resource, id, variables, meta }) => {
    console.log("🚀 ~ DataProviderServer ~ update:DataProvider['update']= ~ variables:", variables);
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withParam(id.toString());
    const endpoint = query.endpoint;

    const res = await fetch(endpoint, {
      headers,
      method: "PATCH",
      body: JSON.stringify(variables),
    });

    if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

    return { data: await res.json() };
  };

  static deleteOne: DataProvider["deleteOne"] = async ({ id, resource, meta }) => {
    const { headers } = meta as MetaQuery;
    const query = new ApiQueryParamBuilder(this.url)
      .withResource(resource as RESOURCE_IDENTIFIER)
      .withParam(id.toString());
    const endpoint = query.endpoint;

    const res = await fetch(endpoint, {
      headers,
      method: "DELETE",
    });

    if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

    return res.json();
  };

  static getApiUrl = () => this.url;
}
