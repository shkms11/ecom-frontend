import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQuery";
import { API_TAGS } from "./constants";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,

  tagTypes: Object.values(API_TAGS),

  endpoints: () => ({}),
});
