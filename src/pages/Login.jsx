import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/Login.css';

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.username === "admin" && credentials.password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "admin");
      navigate("/admin-dashboardadmin");
    } else if (credentials.username === "user" && credentials.password === "user") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", "user");
      navigate("/user-DashboardUser");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">
          <img src="/logo.png" alt="" />
        </div>
        <h1>Welcome Back .!</h1>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Email address"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
          <div className="form-options">
            <label><a href="/reset-password">Forgot password?</a></label>
          </div>
          <button type="submit">SIGN IN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
