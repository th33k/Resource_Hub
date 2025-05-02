import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useUserDashboardData() {
  return useQuery({
    queryKey: ['userDashboardData'],
    queryFn: async () => {
      const userId=localStorage.getItem('Userid');
      const [statsResponse, activitiesResponse] = await Promise.all([
        axios.get(`https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-user-033/v1.0/stats/${userId}`),
        axios.get(`https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-user-033/v1.0/activities/${userId}`)
      ]);
      return {
        stats: Array.isArray(statsResponse.data) ? statsResponse.data : [
          {
            title: 'My Meals Today',
            value: statsResponse.data.mealsToday,
            icon: 'Utensils',
            monthlyData: statsResponse.data.mealsMonthlyData || [],
          },
          {
            title: 'My Assets',
            value: statsResponse.data.assets,
            icon: 'Box',
            monthlyData: statsResponse.data.assetsMonthlyData || [],
          },
          {
            title: 'My Maintenance Requests',
            value: statsResponse.data.maintenanceRequests,
            icon: 'Wrench',
            monthlyData: statsResponse.data.maintenanceMonthlyData || [],
          },
        ],
        recentActivities: activitiesResponse.data,
      };
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
}
