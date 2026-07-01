import { baseApi } from "@/api/baseApi";
import { API_ENDPOINTS } from "@/api/endpoints";
import { API_TAGS } from "@/api/constants";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => API_ENDPOINTS.CART.GET,
      providesTags: [API_TAGS.CART],
    }),

    addToCart: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.CART.ADD_ITEM,
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAGS.CART],
    }),

    updateCartItem: builder.mutation({
      query: ({ itemId, ...body }) => ({
        url: API_ENDPOINTS.CART.UPDATE_ITEM(itemId),
        method: "PATCH",
        body,
      }),
      invalidatesTags: [API_TAGS.CART],
    }),

    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: API_ENDPOINTS.CART.REMOVE_ITEM(itemId),
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.CART],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.CART.CLEAR,
        method: "DELETE",
      }),
      invalidatesTags: [API_TAGS.CART],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
