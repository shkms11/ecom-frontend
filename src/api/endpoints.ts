export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",

    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",

    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",

    ME: "/auth/me",
    PROFILE: "/auth/profile",
  },

  OAUTH: {
    GOOGLE: "/auth/oauth/google",
    GITHUB: "/auth/oauth/github",
    FACEBOOK: "/auth/oauth/facebook",
    CALLBACK: "/auth/oauth/callback",
  },

  USERS: {
    LIST: "/users",
    CREATE: "/users",

    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products",

    GET: (id: string) => `/products/${id}`,
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
  },

  CART: {
    GET: "/cart",
    ADD_ITEM: "/cart/items",
    CLEAR: "/cart",

    UPDATE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
    REMOVE_ITEM: (itemId: string) => `/cart/items/${itemId}`,
  },

  ORDERS: {
    LIST: "/orders",
    CREATE: "/orders",

    GET: (id: string) => `/orders/${id}`,
    UPDATE: (id: string) => `/orders/${id}`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
  },

  WISHLIST: {
    GET: "/wishlist",
    ADD_ITEM: "/wishlist/items",

    REMOVE_ITEM: (itemId: string) => `/wishlist/items/${itemId}`,
  },
} as const;
