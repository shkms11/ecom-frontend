import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "@/features/auth/slices/authSlice";
import cartUiReducer from "@/features/cart/slices/cartUiSlice";

import { baseApi } from "@/api/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cartUi: cartUiReducer,

    // RTK Query (single API system)
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/login/pending", "auth/register/pending"],
      },
    }).concat(baseApi.middleware),

  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
