"use client";

import { create, deleteOne, getList, getMany, getOne, update } from "@lib/actions/data.server";
import { CONFIG } from "@lib/constants/config";
import { sanitizeParams } from "@lib/helpers/params.helper";
import { DataProvider } from "@refinedev/core";

export const DataProviderClient: DataProvider = {
  getList: async (params) => getList(sanitizeParams(params)),
  getOne: async (params) => getOne(sanitizeParams(params)),
  create: async (params) => create(sanitizeParams(params)),
  deleteOne: async (params) => deleteOne(sanitizeParams(params)),
  getApiUrl: () => CONFIG.BACKEND_URL,
  update: async (params) => update(sanitizeParams(params)),
  getMany: async (params) => getMany!(sanitizeParams(params)),
};
