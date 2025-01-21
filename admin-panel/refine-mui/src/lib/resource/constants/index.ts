import { capitalize } from "@lib/shared/helpers/string.helper";

export enum RESOURCE_IDENTIFIER {
  USER = "users",
}

export const RESOURCE_MESSAGE = {
  ERROR: {
    REQUIRED_FIELD: (field: string) => `${capitalize(field)} is required.`,
  },
};
