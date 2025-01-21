"use client";

import { CONFIG } from "@lib/config";
import { create, deleteOne, getList, getMany, getOne, update } from "@lib/resource/actions";
import { sanitizeObject } from "@lib/shared/helpers/params.helper";
import { DataProvider } from "@refinedev/core";

async function extractOk(cb: () => Promise<any>) {
  const { ok, ...res } = await cb();
  if (!ok) throw res;
  return res;
}

export const DataProviderClient: DataProvider = {
  getList: async (params) => extractOk(() => getList(sanitizeObject(params))),
  getOne: async (params) => extractOk(() => getOne(sanitizeObject(params))),
  create: async (params) => extractOk(() => create(sanitizeObject(params))),
  deleteOne: async (params) => extractOk(() => deleteOne(sanitizeObject(params))),
  getApiUrl: () => CONFIG.BACKEND_URL,
  update: async (params) => extractOk(() => update(sanitizeObject(params))),
  getMany: async (params) => extractOk(() => getMany(sanitizeObject(params))),
};
