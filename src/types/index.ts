export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  location: string;
  distance: string;
  imageUrl?: string;
  categoryId?: string;
  isOpen?: boolean;
  deliveryTime?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  categoryId: string;
  restaurantId: string;
  rating?: number;
  isAvailable?: boolean;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  restaurantId: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
  deliveryTime?: string;
}

export interface FilterState {
  category: string;
  sortBy: 'name' | 'rating' | 'price' | 'distance';
  sortOrder: 'asc' | 'desc';
  searchQuery: string;
  priceRange: [number, number];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}