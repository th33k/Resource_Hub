import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_ENDPOINTS } from '../services/api/config';

export function useAdminDashboardData() {
  return useQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async () => {
      const [statsRes, resourcesRes, mealRes, resourceAllocRes] = await Promise.all([
        axios.get(API_ENDPOINTS.ADMIN_DASHBOARD_STATS),
        axios.get(API_ENDPOINTS.ADMIN_DASHBOARD_RESOURCES),
        axios.get(API_ENDPOINTS.ADMIN_DASHBOARD_MEAL_DISTRIBUTION),
        axios.get(API_ENDPOINTS.ADMIN_DASHBOARD_RESOURCE_ALLOCATION)
      ]);
      return {
        stats: statsRes.data,
        resources: resourcesRes.data,
        mealData: mealRes.data,
        resourceData: resourceAllocRes.data,
      };
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}
