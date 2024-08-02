import { CONFIG } from "@lib/constants/config";
import { dataProviderTusss } from "./data.provider";

export const DataProviderServer = dataProviderTusss(CONFIG.BACKEND_URL);
