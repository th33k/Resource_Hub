import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Users } from "./pages/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Slidebar from "./components/SideBar/Slidebar";
import Header from "./components/Header/Header";
import MealCalander from "./pages/MealCalander";
import IconBreadcrumbs from "./components/IconBreadcrumbs";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main d-flex">
        {/* Sidebar Section */}
        <div className="slidebarWrapper">
          <Slidebar />
        </div>

        {/* Content Section */}
        <div className="content flex-grow-1 p-3">
          {/* Breadcrumbs */}
          <IconBreadcrumbs />

          {/* Page Content */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mealcalander" element={<MealCalander />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
