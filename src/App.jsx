import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import { Users } from "./pages/Users";
import MealCalander from "./pages/MealCalander";
import AddMealTime from "./pages/AddMealTime";
import AddMealType from "./pages/AddMealType";
import Login from "./pages/Login";
import AdminLayout from "./Layout/AdminLayout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserDashboard from "./pages/UserDashboard";
import UserLayout from './Layout/UserLayout/Layout'

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
          <Route index element={<Dashboard />} />
          <Route path="admin/dashboard" element={<Dashboard />} />
          <Route path="admin/userdashboard" element={<Dashboard/>} />
          <Route path="admin/mealcalander" element={<MealCalander />} />
          <Route path="admin/addmealtime" element={<AddMealTime />} />
          <Route path="admin/addmealtype" element={<AddMealType />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/" element={<PrivateRoute element={<UserLayout />} />}>
          <Route index element={<Dashboard />} />
          <Route path="user/dashboard" element={<UserDashboard />} />
          <Route path="user/userdashboard" element={<UserDashboard/>} />
          <Route path="user/mealcalander" element={<MealCalander />} />
          <Route path="user/addmealtime" element={<AddMealTime />} />
          <Route path="user/addmealtype" element={<AddMealType />} />
          <Route path="user/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
