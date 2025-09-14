import api from './api/axios';
import { Restaurant } from '@/types';

export interface RestaurantFilters {
  search?: string;
  category?: string;
  sortBy?: string;
  limit?: number;
  offset?: number;
}

export const restaurantService = {
  async getRestaurants(filters?: RestaurantFilters): Promise<{ restaurants: Restaurant[]; total: number }> {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const response = await api.get(`/api/resto?${params.toString()}`);
    return response.data;
  },

  async getRecommendedRestaurants(): Promise<Restaurant[]> {
    const response = await api.get('/api/resto/recommended');
    return response.data;
  },

  async getRestaurantById(id: string): Promise<Restaurant> {
    const response = await api.get(`/api/resto/${id}`);
    return response.data;
  }
};