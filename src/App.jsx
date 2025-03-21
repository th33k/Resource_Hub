import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import UserLayout from "./Layout/UserLayout/UserLayout";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import DashboardUser from "./pages/User/DashboardUser";
import MealCalander from "./pages/User/MealCalander";
import AddMealTime from "./pages/Admin/AddMealTime";
import AddMealType from "./pages/Admin/AddMealType";
import { Users } from "./pages/Admin/Users";
import AssetAdmin from "./pages/Admin/AssetAdmin";
import MaintenanceDetails from "./pages/Admin/MaintenanceDetails";
import MaintenanceHome from "./pages/Admin/MaintenanceHome";
import MaintenanceNotification from "./pages/Admin/MaintenanceNotification";
import MaintenanceDetailsUser  from "./pages/Admin/MaintenanceDetailsUser";
import AssetMonitoringAdmin from "./pages/Admin/AssetMonitoringAdmin";
import AssetRequestUsers from "./pages/User/AssetRequestUsers"; 
import {Settings} from "./pages/Settings";

const PrivateRoute = ({ element, allowedRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && userRole !== allowedRole) {
    return <Navigate to={`/${userRole}-Dashboard${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`} />;
  }

  return element;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute element={<AdminLayout />} allowedRole="admin" />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="admin-DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="admin-DashboardUser" element={<DashboardUser />} />
          <Route path="admin-mealcalander" element={<MealCalander />} />
          <Route path="admin-addmealtime" element={<AddMealTime />} />
          <Route path="admin-addmealtype" element={<AddMealType />} />
          <Route path="admin-users" element={<Users />} />
          <Route path="admin-asset" element={<AssetAdmin />} />
          <Route path="Admin-AssetMonitoring" element={<AssetMonitoringAdmin/>} />
          <Route path="Admin-maintenanceHome" element={<MaintenanceHome />} />
          <Route path="Admin-maintenanceDetails" element={<MaintenanceDetails />} />
          <Route path="maintenanceHome" element={<MaintenanceHome />} />
          <Route path="admin-maintenanceNotification" element={<MaintenanceNotification />} />


        </Route>

        <Route path="/" element={<PrivateRoute element={<UserLayout />} allowedRoles={["user", "admin"]} />}>
          <Route index element={<DashboardUser />} />
          <Route path="user-DashboardUser" element={<DashboardUser />} />
          <Route path="user-mealcalander" element={<MealCalander />} />
          <Route path="user-assetrequest" element={<AssetRequestUsers />} />
          <Route path="settings/*" element={<Settings />} />          
          {/* <Route path="user-asset" element={<AssetUser />} /> */}
          <Route path="user-maintenanceDetails" element={<MaintenanceDetailsUser />} />
          <Route path="user-MaintenanceHome" element={<MaintenanceHome />} />

          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
