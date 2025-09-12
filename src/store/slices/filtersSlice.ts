import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '@/types';

const initialState: FilterState = {
  category: 'all',
  sortBy: 'rating',
  sortOrder: 'desc',
  searchQuery: '',
  priceRange: [0, 100],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },

    setSortBy: (state, action: PayloadAction<FilterState['sortBy']>) => {
      state.sortBy = action.payload;
    },

    setSortOrder: (state, action: PayloadAction<FilterState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },

    resetFilters: (state) => {
      Object.assign(state, initialState);
    },

    updateFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const {
  setCategory,
  setSortBy,
  setSortOrder,
  setSearchQuery,
  setPriceRange,
  resetFilters,
  updateFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;