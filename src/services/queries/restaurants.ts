import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { Restaurant, MenuItem } from '@/types';

// Restaurant queries
export function useRestaurantsQuery(params?: { 
  category?: string; 
  search?: string; 
  sort?: string;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: async () => {
      const { data } = await api.get('/api/restaurants', { params });
      return data as Restaurant[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRestaurantQuery(id: string) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/restaurants/${id}`);
      return data as Restaurant;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Menu queries
export function useMenuItemsQuery(restaurantId?: string, params?: { 
  category?: string; 
  search?: string; 
}) {
  return useQuery({
    queryKey: ['menuItems', restaurantId, params],
    queryFn: async () => {
      const endpoint = restaurantId 
        ? `/api/restaurants/${restaurantId}/menu`
        : '/api/menu-items';
      const { data } = await api.get(endpoint, { params });
      return data as MenuItem[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useMenuItemQuery(id: string) {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/menu-items/${id}`);
      return data as MenuItem;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Mutations
export function useCreateRestaurantMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (restaurant: Omit<Restaurant, 'id'>) => {
      const { data } = await api.post('/api/restaurants', restaurant);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
}

export function useUpdateRestaurantMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...restaurant }: Partial<Restaurant> & { id: string }) => {
      const { data } = await api.put(`/api/restaurants/${id}`, restaurant);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      queryClient.invalidateQueries({ queryKey: ['restaurant', variables.id] });
    },
  });
}

export function useDeleteRestaurantMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/restaurants/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
}