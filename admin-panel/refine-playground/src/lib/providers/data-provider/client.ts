"use client";

import { CONFIG } from "@lib/constants/config";
import { DataProvider } from "@refinedev/core";
import { create, deleteOne, getList, getMany, getOne, update } from "@lib/actions/data.server";

export const DataProviderClient: DataProvider = {
  getList: async (params) => getList(params),
  getOne: async (params) => getOne(params),
  create: async (params) => create(params),
  deleteOne: async (params) => deleteOne(params),
  getApiUrl: () => CONFIG.BACKEND_URL,
  update: async (params) => update(params),
  getMany: async (params) => getMany!(params),
};
