export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_LIFE_TIME: process.env.JWT_LIFE_TIME || 1,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
};
