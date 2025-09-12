import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import { Order } from '@/types';

export function useOrdersQuery(userId?: string) {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      const endpoint = userId ? `/api/orders?userId=${userId}` : '/api/orders';
      const { data } = await api.get(endpoint);
      return data as Order[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useOrderQuery(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await api.get(`/api/orders/${id}`);
      return data as Order;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
      const { data } = await api.post('/api/orders', {
        ...order,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Order['status'] }) => {
      const { data } = await api.patch(`/api/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
    },
  });
}