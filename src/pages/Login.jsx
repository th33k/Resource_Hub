import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
  
    if (credentials.username === "admin" && credentials.password === "admin") {
      localStorage.setItem("isAuthenticated", "true"); 
      navigate("/dashboard"); 
    } 
    else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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
    </div>
  );
}

export default Login;
