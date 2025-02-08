import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import { Users } from "./pages/Users";
import MealCalander from "./pages/MealCalander";
import AddMealTime from "./pages/AddMealTime";
import AddMealType from "./pages/AddMealType";
import Login from "./pages/Login";
import Layout from "./components/AdminLayout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserDashboard from "./pages/UserDashboard";

// Authentication check function
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route path="/" element={<PrivateRoute element={<Layout />} />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="userdashboard" element={<UserDashboard/>} />
          <Route path="mealcalander" element={<MealCalander />} />
          <Route path="addmealtime" element={<AddMealTime />} />
          <Route path="addmealtype" element={<AddMealType />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
