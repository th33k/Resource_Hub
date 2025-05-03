import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// Updated to accept dynamic data as props
export const MealDistributionChart = ({ data }) => {
  // Use dynamic labels from data.labels, fallback to empty array
  const chartData = {
    labels: Array.isArray(data.labels) ? data.labels : [],
    datasets:
      Array.isArray(data.datasets) && data.datasets.length > 0
        ? data.datasets
        : [],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-gray-700 text-xl font-semibold mb-2">
        Meal Distribution
      </h2>
      <p className="text-gray-600 text-sm mb-6">Weekly meal service trends</p>
      <Line options={options} data={chartData} />
    </div>
  );
};
