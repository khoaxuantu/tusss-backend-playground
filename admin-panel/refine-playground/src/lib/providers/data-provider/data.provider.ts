import { DataProvider, MetaQuery } from "@refinedev/core";
import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { ApiQueryListBuilder } from "./builder/api-query-list.builder";
import { MongoFilterAdapter } from "./adapter/mongo-filter.adapter";
import { ApiQueryParamBuilder } from "./builder/api-query-param.builder";
import { ApiQueryManyBuilder } from "./builder/api-query-many.builder";
import { ApiError } from "next/dist/server/api-utils";
import Cookies from "js-cookie";

export function dataProviderTusss(url: string): DataProvider {
  return {
    getList: async ({ resource, filters, pagination, sorters, meta }) => {
      const { headers } = meta as MetaQuery;
      const query = new ApiQueryListBuilder(url).withResource(resource as RESOURCE_IDENTIFIER);

      if (pagination) query.withPagination(pagination);
      if (sorters) sorters.forEach((sorter) => query.withSort(sorter));
      if (filters?.length) {
        const adaptedFilter = MongoFilterAdapter.parse(filters);
        query.withOrFilter(adaptedFilter.or);
        query.withFilter(adaptedFilter.filter);
      }

      const endpoint = query.endpoint;

      try {
        const res = await fetch(endpoint, { headers: prepareHeader(headers) });

        if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

        const data = await res.json();

        return {
          data: data.data,
          total: data.total,
        };
      } catch (error) {
        return {
          data: [],
          total: 0,
          error,
        };
      }
    },

    getOne: async ({ resource, id, meta }) => {
      const { headers } = meta as MetaQuery;
      const query = new ApiQueryParamBuilder(url)
        .withResource(resource as RESOURCE_IDENTIFIER)
        .withParam(id.toString());
      const endpoint = query.endpoint;

      try {
        const res = await fetch(endpoint, { headers: prepareHeader(headers) });

        if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

        const data = await res.json();

        return { data };
      } catch (error) {
        return { data: { error } };
      }
    },

    getMany: async ({ resource, ids, meta }) => {
      const { headers } = meta as MetaQuery;
      const query = new ApiQueryManyBuilder(url)
        .withResource(resource as RESOURCE_IDENTIFIER)
        .withIds(ids.map((id) => id.toString()));
      const endpoint = query.endpoint;

      try {
        const res = await fetch(endpoint, { headers: prepareHeader(headers) });

        if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

        const data = await res.json();

        return { data };
      } catch (error) {
        return { data: { error } };
      }
    },

    create: async ({ resource, variables, meta }) => {
      const { headers } = meta as MetaQuery;
      const query = new ApiQueryParamBuilder(url).withResource(resource as RESOURCE_IDENTIFIER);
      const endpoint = query.endpoint;

      try {
        const res = await fetch(endpoint, {
          headers: prepareHeader(headers),
          method: "POST",
          body: JSON.stringify(variables),
        });

        if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

        return { data: await res.json() };
      } catch (error) {
        return { data: { error } };
      }
    },

    update: async ({ resource, id, variables, meta }) => {
      const { headers } = meta as MetaQuery;
      const query = new ApiQueryParamBuilder(url)
        .withResource(resource as RESOURCE_IDENTIFIER)
        .withParam(id.toString());
      const endpoint = query.endpoint;

      try {
        const res = await fetch(endpoint, {
          headers: prepareHeader(headers),
          method: "PATCH",
          body: JSON.stringify(variables),
        });

        if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

        return { data: await res.json() };
      } catch (error) {
        return { data: { error } };
      }
    },

    deleteOne: async ({ id, resource, meta }) => {
      const { headers } = meta as MetaQuery;
      const query = new ApiQueryParamBuilder(url)
        .withResource(resource as RESOURCE_IDENTIFIER)
        .withParam(id.toString());
      const endpoint = query.endpoint;

      try {
        const res = await fetch(endpoint, {
          headers: prepareHeader(headers),
          method: "DELETE",
        });

        if (!res.ok) throw new ApiError(res.status, `${res.statusText}\n${await res.text()}`);

        return res.json();
      } catch (error) {
        return { data: { error } };
      }
    },

    getApiUrl: () => url,
  };
}

function prepareHeader(opts: Record<string, any>): Headers {
  const headers = new Headers();
  const accessToken = getAccessToken();
  headers.append("Authorization", `Bearer ${accessToken}`);
  Object.entries(opts).forEach((entry) => {
    headers.append(entry[0], entry[1]);
  });
  return headers;
}

function getAccessToken(): string {
  const authCookie = Cookies.get("auth");
  if (!authCookie) return "";
  return JSON.parse(authCookie).accessToken;
}
