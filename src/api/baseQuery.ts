import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/config/api.config";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    // attach token
    return headers;
  },
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
  // refresh token logic here
  return rawBaseQuery(args, api, extraOptions);
};
