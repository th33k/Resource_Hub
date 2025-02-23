import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import AdminLayout from "./Layout/AdminLayout/Layout";
import UserLayout from "./Layout/UserLayout/Layout";
<<<<<<< HEAD
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import DashboardUser from "./pages/User/DashboardUser";
import MealCalander from "./pages/User/MealCalander";
import AddMealTime from "./pages/Admin/AddMealTime";
import AddMealType from "./pages/Admin/AddMealType";
import { Users } from "./pages/Admin/Users";
import AssetUser from "./pages/User/AssetUser";
import AssetAdmin from "./pages/Admin/AssetAdmin";
=======
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import MealCalander from "./pages/MealCalander";
import AddMealTime from "./pages/AddMealTime";
import AddMealType from "./pages/AddMealType";
import { Users } from "./pages/Users";
import AssetUser from "./pages/AssetUser";
import AssetAdmin from "./pages/AssetAdmin";
import AssetMonitoringAdmin from "./pages/AssetMonitoringAdmin";
import AssetRequestUsers from "./pages/AssetRequestUsers";
>>>>>>> feat/asset

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
          <Route path="admin-assetmonitoring" element={<AssetMonitoringAdmin />} />
        </Route>

        <Route path="/" element={<PrivateRoute element={<UserLayout />} allowedRoles={["user", "admin"]} />}>
          <Route index element={<DashboardUser />} />
          <Route path="user-DashboardUser" element={<DashboardUser />} />
          <Route path="user-mealcalander" element={<MealCalander />} />
          <Route path="user-asset" element={<AssetUser />} />
          <Route path="user-assetrequest" element={<AssetRequestUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
