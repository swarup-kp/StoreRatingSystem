import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (name.length < 4 || name.length > 60) {
      alert("Name must be between 20 and 60 characters");
      return;
    }

    if (address.length > 400) {
      alert("Address must be less than 400 characters");
      return;
    }

    if (
      password.length < 8 ||
      password.length > 16 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      alert(
        "Password must be 8-16 characters, include one uppercase letter and one special character"
      );
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password, address });
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="card text-center">
        <h2>Join Store Rating System</h2>
        <p className="mt-15" style={{color: '#666', marginBottom: '30px'}}>
          Create your account to start rating stores and sharing your experiences with the community.
        </p>

        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Full Name (4-60 characters)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Enter Address (optional, max 400 characters)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small style={{color: '#4a5568', display: 'block', marginTop: '5px'}}>
            Password must be 8-16 characters with at least one uppercase letter and one special character (!@#$%^&*)
          </small>
        </div>

        <button onClick={handleRegister}>Register</button>

        <p className="mt-15">
          Already have an account? <Link to="/">Login</Link>
        </p>

        <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
          <h3 style={{color: '#667eea', marginBottom: '10px'}}>Why Register?</h3>
          <ul style={{textAlign: 'left', color: '#2d3748'}}>
            <li>📝 Share your honest reviews</li>
            <li>⭐ Help other customers make decisions</li>
            <li>📈 Track your rating history</li>
            <li>🏪 Register your store as an owner</li>
            <li>🔒 Secure and private account</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Register;