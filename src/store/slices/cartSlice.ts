import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total, itemCount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
      const { quantity = 1, ...item } = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...item, quantity });
      }
      
      const { total, itemCount } = calculateTotals(state.items);
      state.total = total;
      state.itemCount = itemCount;
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        } else {
          item.quantity = quantity;
        }
        
        const { total, itemCount } = calculateTotals(state.items);
        state.total = total;
        state.itemCount = itemCount;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      const { total, itemCount } = calculateTotals(state.items);
      state.total = total;
      state.itemCount = itemCount;
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },

    updateItemNotes: (state, action: PayloadAction<{ id: string; notes: string }>) => {
      const { id, notes } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.notes = notes;
      }
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  updateItemNotes,
} = cartSlice.actions;

export default cartSlice.reducer;