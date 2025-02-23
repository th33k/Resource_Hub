import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import AdminLayout from "./Layout/AdminLayout/Layout";
import UserLayout from "./Layout/UserLayout/Layout";
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

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute element={<AdminLayout />} />}>
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
        <Route path="/" element={<PrivateRoute element={<UserLayout />} />}>
          <Route index element={<DashboardUser />} />
          <Route path="user-DashboardAdmin" element={<DashboardAdmin />} />
          <Route path="user-DashboardUser" element={<DashboardUser />} />
          <Route path="user-mealcalander" element={<MealCalander />} />
          <Route path="user-addmealtime" element={<AddMealTime />} />
          <Route path="user-addmealtype" element={<AddMealType />} />
          <Route path="user-users" element={<Users />} />
          <Route path="user-asset" element={<AssetUser />} />
          <Route path="user-assetrequest" element={<AssetRequestUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
