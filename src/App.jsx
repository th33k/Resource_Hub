import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";

// layout  Pages
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import UserLayout from "./Layout/UserLayout/UserLayout";

// Dashboard Pages
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import DashboardUser from "./pages/User/DashboardUser";

// Admin Pages
import AddMealTime from "./pages/Admin/Meal_Function/AddMealTime";
import AddMealType from "./pages/Admin/Meal_Function/AddMealType";
import { Users } from "./pages/Admin/Users";
import AssetAdmin from "./pages/Admin/AssetAdmin";
import AssetMonitoringAdmin from "./pages/Admin/AssetMonitoringAdmin";
import MealReport from "./pages/Admin/MealReport";
import {Settings} from "./pages/Settings";
import ReportHome from "./pages/Admin/ReportHome"
import AssetReport from "./pages/Admin/AssetReport"
import AssetHome from "./pages/Admin/AssetHome";
import MaintenanceHome from "./pages/Admin/MaintenanceHome";
import MaintenanceDetails from "./pages/Admin/MaintenanceDetails";
import DueAssetAdmin from "./pages/Admin/DueAssset"

// User Pages
import MealCalander from "./pages/User/MealCalander";
import AssetRequestUsers from "./pages/User/AssetRequestUsers";



// ✅ Private Route Logic
const PrivateRoute = ({ element, allowedRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (allowedRole && userRole !== allowedRole) {
    const fallback = userRole === "admin" ? "/admin-DashboardAdmin" : "/user-DashboardUser";
    return <Navigate to={fallback} />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/"
          element={<PrivateRoute element={<AdminLayout />} allowedRole="admin" />}
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="admin-DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="admin-addmealtime" element={<AddMealTime />} />
          <Route path="admin-addmealtype" element={<AddMealType />} />
          <Route path="admin-users" element={<Users />} />
          <Route path="admin-asset" element={<AssetAdmin />} />
          <Route path="admin-AssetHome" element={<AssetHome />} />
          <Route path="admin-AssetMonitoring" element={<AssetMonitoringAdmin />} />
          <Route path="admin-AssetMonitoring/:category" element={<AssetMonitoringAdmin />} />
          <Route path="Admin-maintenanceHome" element={<MaintenanceHome />} />
          <Route path="Admin-maintenanceDetails" element={<MaintenanceDetails />} />
          <Route path="MealReport" element={<MealReport />} />
          <Route path="AssetReport" element={<AssetReport />} />
          <Route path="Admin-ReportHome" element={<ReportHome/>}></Route>
        </Route>

        {/* User Routes */}
        <Route path="/" element={<PrivateRoute element={<UserLayout />} allowedRoles={["user", "admin"]} />}>
          <Route index element={<DashboardUser />} />
          <Route path="user-DashboardUser" element={<DashboardUser />} />
          <Route path="user-mealcalander" element={<MealCalander />} />
          <Route path="user-assetrequest" element={<AssetRequestUsers />} />
          <Route path="settings/*" element={<Settings />} />          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
