import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.username === "admin" && credentials.password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard"); 
    } 
    else if (credentials.username === "user" && credentials.password === "user") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "user");
      navigate("/user/dashboard"); 
    } 
    else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
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
        <button type="submit">Login</button>
      </form>
      <h6 className="disc">
      admin , admin for admin login
      <br />
        user , user for user login
      </h6>
    </div>
  );
}

export default Login;
