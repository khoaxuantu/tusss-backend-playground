"use server";

import { HeadersAdapter } from "@lib/providers/data-provider/adapter/headers.adapter";
import { DataProviderServer } from "@lib/providers/data-provider/server";
import { DataProvider } from "@refinedev/core";

export const getList: DataProvider["getList"] = async ({
  resource,
  filters,
  pagination,
  sorters,
  meta,
}) => {
  if (!meta) meta = { headers: await new HeadersAdapter().transform() };
  else meta.headers = await new HeadersAdapter(meta).transform();

  return DataProviderServer.getList({ resource, filters, pagination, sorters, meta });
};

export const getOne: DataProvider["getOne"] = async ({ resource, id, meta }) => {
  if (!meta) meta = { headers: await new HeadersAdapter().transform() };
  else meta.headers = await new HeadersAdapter(meta).transform();

  return DataProviderServer.getOne({ resource, id, meta });
};

export const getMany: DataProvider["getMany"] = async ({ resource, ids, meta }) => {
  if (!meta) meta = { headers: new HeadersAdapter().transform() };
  else meta.headers = await new HeadersAdapter(meta).transform();

  return DataProviderServer.getMany!({ resource, ids, meta });
};

export const create: DataProvider["create"] = async ({ resource, variables, meta }) => {
  if (!meta) meta = { headers: new HeadersAdapter().transform() };
  else meta.headers = await new HeadersAdapter(meta).transform();

  return DataProviderServer.create({ resource, variables, meta });
};

export const update: DataProvider["update"] = async ({ resource, id, variables, meta }) => {
  if (!meta) meta = { headers: new HeadersAdapter().transform() };
  else meta.headers = await new HeadersAdapter(meta).transform();

  return DataProviderServer.update({ resource, id, variables, meta });
};

export const deleteOne: DataProvider["deleteOne"] = async ({ id, resource, meta }) => {
  if (!meta) meta = { headers: new HeadersAdapter().transform() };
  else meta.headers = await new HeadersAdapter(meta).transform();

  return DataProviderServer.deleteOne({ id, resource, meta });
}
