export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://berestaurantappformentee-production.up.railway.app';

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  RESTAURANT: '/restaurant/:id',
} as const;

export const CATEGORIES = [
  { id: 'all', name: 'All Restaurant', icon: '🍽️' },
  { id: 'nearby', name: 'Nearby', icon: '📍' },
  { id: 'discount', name: 'Discount', icon: '🏷️' },
  { id: 'bestseller', name: 'Best Seller', icon: '🏆' },
  { id: 'delivery', name: 'Delivery', icon: '🚚' },
  { id: 'lunch', name: 'Lunch', icon: '🍽️' },
] as const;

export const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'distance', label: 'Nearest' },
  { value: 'name', label: 'Alphabetical' },
  { value: 'price', label: 'Price' },
] as const;