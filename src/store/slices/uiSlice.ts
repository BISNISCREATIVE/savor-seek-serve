import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isCartOpen: boolean;
  isMenuOpen: boolean;
  isCheckoutOpen: boolean;
  activeModal: string | null;
  loading: {
    restaurants: boolean;
    menu: boolean;
    orders: boolean;
  };
  error: string | null;
}

const initialState: UiState = {
  isCartOpen: false,
  isMenuOpen: false,
  isCheckoutOpen: false,
  activeModal: null,
  loading: {
    restaurants: false,
    menu: false,
    orders: false,
  },
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },

    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },

    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },

    setCheckoutOpen: (state, action: PayloadAction<boolean>) => {
      state.isCheckoutOpen = action.payload;
    },

    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },

    setLoading: (state, action: PayloadAction<{ key: keyof UiState['loading']; value: boolean }>) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  toggleCart,
  setCartOpen,
  toggleMenu,
  setMenuOpen,
  setCheckoutOpen,
  setActiveModal,
  setLoading,
  setError,
  clearError,
} = uiSlice.actions;

export default uiSlice.reducer;