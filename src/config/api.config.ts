export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const API_VERSION = "v1";

export const API_URL = `${API_BASE_URL}/${API_VERSION}`;

export const API_TIMEOUT = 30000;

export const IS_PRODUCTION = import.meta.env.MODE === "production";
export const IS_DEVELOPMENT = import.meta.env.MODE === "development";
