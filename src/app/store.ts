import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "@/features/auth/slices/authSlice";

import { authApi } from "@/features/auth/api/authApi";
import { productsApi } from "@/features/products/api/productsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // RTK Query reducers
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/login/pending", "auth/register/pending"],
      },
    }).concat(authApi.middleware, productsApi.middleware),

  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
