import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") navigate("/admin");
      else if (res.data.role === "OWNER") navigate("/owner");
      else navigate("/user");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <div className="card text-center">
        <h2>Welcome to Store Rating System</h2>
        <p className="mt-15" style={{color: '#4a5568', marginBottom: '30px'}}>
          Discover and rate your favorite stores. Share your experience and help others make better choices.
        </p>

        <h2>Login to Your Account</h2>

        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>

        <p className="mt-15">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
          <h3 style={{color: '#667eea', marginBottom: '10px'}}>Features</h3>
          <ul style={{textAlign: 'left', color: '#2d3748'}}>
            <li>⭐ Rate stores from 1 to 5 stars</li>
            <li>📊 View average ratings and reviews</li>
            <li>🏪 Discover new stores in your area</li>
            <li>👤 Manage your store as an owner</li>
            <li>⚡ Real-time rating updates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;