import { Users, Utensils, Box, Wrench } from "lucide-react";
import { StatCard } from "../../components/Dashboard/Admin/StatCard";
import { ResourceCard } from "../../components/Dashboard/Admin/ResourceCard";
import { MealDistributionChart } from "../../components/Dashboard/Admin/MealDistributionChart";
import { ResourceAllocation } from "../../components/Dashboard/Admin/ResourceAllocation";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getMonthLabels } from "../../utils/dateUtils"; // Import the utility function

// Map icon names (strings) to actual icon components
const iconMap = {
  Users: <Users className="text-blue-500" />,
  Utensils: <Utensils className="text-green-500" />,
  Box: <Box className="text-yellow-500" />,
  Wrench: <Wrench className="text-red-500" />,
};

// Updated to fetch and pass meal distribution and resource allocation data dynamically
function Dashboard() {
  const [stats, setStats] = useState([]);
  const [resources, setResources] = useState([]);
  const [mealData, setMealData] = useState([]); // State for meal distribution data
  const [resourceData, setResourceData] = useState([]); // State for resource allocation data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const monthLabels = getMonthLabels();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsRes, resourcesRes, mealRes, resourceAllocRes] = await Promise.all([
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/stats"),
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/resources"),
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/mealdistribution"),
        axios.get("https://4f2de039-e4b3-45c1-93e2-4873c5ea1a8e-dev.e1-us-east-azure.choreoapis.dev/resource-hub/ballerina/dashboard-admin-b74/v1.0/resourceallocation")
      ]);

      setStats(statsRes.data);
      setResources(resourcesRes.data);
      setMealData(mealRes.data);
      setResourceData(resourceAllocRes.data);
    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen space-y-6 p-6">
      {/* Heading */}
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={iconMap[stat.icon] || <Box />} // Use the icon component from the map, provide a default
            chartData={{
              labels: monthLabels,
              data: stat.monthlyData,
            }}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MealDistributionChart data={mealData} />
        </div>
        <div className="lg:col-span-1">
          <ResourceAllocation data={resourceData} />
        </div>
      </div>

      {/* Resource Cards */}
      <h2 className="text-xl font-semibold pt-4">Resource Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            total={resource.total}
            highPriority={resource.highPriority}
            progress={resource.progress}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
