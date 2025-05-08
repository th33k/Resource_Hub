import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import { useUser } from "../contexts/UserContext";
import { BASE_URLS } from '../services/api/config';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { refreshUserData } = useUser();

  // Check if user is already logged in, redirect accordingly
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");

    if (isAuthenticated === "true" && userRole) {
      const redirectPath =
        userRole.toLowerCase() === "admin"
          ? "/admin-dashboardadmin"
          : "/user-dashboarduser";
      navigate(redirectPath);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await fetch(`${BASE_URLS.login}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Standardize role format (capitalize first letter)
      const userRole =
        data.usertype.charAt(0).toUpperCase() +
        data.usertype.slice(1).toLowerCase();

      // Store authentication details in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("Email", data.email);
      localStorage.setItem("Username", data.username);
      localStorage.setItem("Userid", data.id);
      localStorage.setItem(
        "Profile_picture",
        data.profile_picture_url ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.username
          )}`
      );

      // Refresh user data in context
      refreshUserData();

      // Redirect based on standardized user role
      if (userRole === "Admin") {
        navigate("/admin-dashboardadmin");
      } else {
        navigate("/user-dashboarduser");
      }
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <h1>Welcome Back!</h1>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Sign In</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input
            type="text"
            placeholder="Email address"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
          <div className="form-options">
            <label>
              <a href="/forgot-password">Forgot password?</a>
            </label>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
