import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ID } from "@/shared/types/common.types";

interface ProductUiState {
  selectedProductId: ID | null;
  isQuickViewOpen: boolean;

  selectedCategory: string | null;
  sortBy: "price_asc" | "price_desc" | "newest" | "popular" | null;

  priceRange: {
    min: number | null;
    max: number | null;
  };
}

const initialState: ProductUiState = {
  selectedProductId: null,
  isQuickViewOpen: false,

  selectedCategory: null,
  sortBy: null,

  priceRange: {
    min: null,
    max: null,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ID | null>) => {
      state.selectedProductId = action.payload;
    },

    openQuickView: (state, action: PayloadAction<ID>) => {
      state.selectedProductId = action.payload;
      state.isQuickViewOpen = true;
    },

    closeQuickView: (state) => {
      state.isQuickViewOpen = false;
      state.selectedProductId = null;
    },

    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },

    setSortBy: (state, action: PayloadAction<ProductUiState["sortBy"]>) => {
      state.sortBy = action.payload;
    },

    setPriceRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>,
    ) => {
      state.priceRange = action.payload;
    },

    resetProductFilters: (state) => {
      state.selectedCategory = null;
      state.sortBy = null;
      state.priceRange = {
        min: null,
        max: null,
      };
    },
  },
});

export const {
  setSelectedProduct,
  openQuickView,
  closeQuickView,
  setCategory,
  setSortBy,
  setPriceRange,
  resetProductFilters,
} = productSlice.actions;

export default productSlice.reducer;
