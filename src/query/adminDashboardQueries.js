import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useAdminDashboardData() {
  return useQuery({
    queryKey: ['adminDashboardData'],
    queryFn: async () => {
      const [statsRes, resourcesRes, mealRes, resourceAllocRes] = await Promise.all([
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/stats"),
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/resources"),
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/mealdistribution"),
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/resourceallocation")
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
