"use client";

import { CONFIG } from "@lib/constants/config";
import { dataProviderTusss } from "./data.provider";

export const DataProviderClient = dataProviderTusss(CONFIG.BACKEND_URL);
