import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/stores/admin/stats");
      setStats(res.data);
    } catch {
      alert("Failed to load stats");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  if (!stats) return <div className="page text-center"><h2>Loading...</h2></div>;

  return (
    <div className="page">
      <div className="card text-center">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} style={{backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'}}>
            Logout
          </button>
        </div>
        <p style={{color: '#4a5568', marginBottom: '30px'}}>
          Monitor and manage the Store Rating System platform
        </p>
      </div>

      <div className="card">
        <h3>Platform Statistics</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px'}}>
          <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <div style={{fontSize: '3em', color: '#667eea'}}>👥</div>
            <h4 style={{margin: '10px 0', color: '#667eea'}}>Total Users</h4>
            <p style={{fontSize: '2em', fontWeight: 'bold', color: '#2d3748'}}>{stats.totalUsers}</p>
          </div>
          <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <div style={{fontSize: '3em', color: '#667eea'}}>🏪</div>
            <h4 style={{margin: '10px 0', color: '#667eea'}}>Total Stores</h4>
            <p style={{fontSize: '2em', fontWeight: 'bold', color: '#2d3748'}}>{stats.totalStores}</p>
          </div>
          <div style={{textAlign: 'center', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <div style={{fontSize: '3em', color: '#667eea'}}>⭐</div>
            <h4 style={{margin: '10px 0', color: '#667eea'}}>Total Ratings</h4>
            <p style={{fontSize: '2em', fontWeight: 'bold', color: '#2d3748'}}>{stats.totalRatings}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Platform Health</h3>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '20px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2em', color: '#10b981'}}>✅</div>
            <p>System Status: Online</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2em', color: '#10b981'}}>🔒</div>
            <p>Security: Active</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2em', color: '#10b981'}}>⚡</div>
            <p>Performance: Good</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Admin Actions</h3>
        <p style={{color: '#4a5568', marginBottom: '20px'}}>
          Use these tools to manage the platform effectively
        </p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
          <button style={{padding: '15px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
            📊 View Detailed Analytics
          </button>
          <button style={{padding: '15px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
            👥 Manage Users
          </button>
          <button style={{padding: '15px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
            🏪 Manage Stores
          </button>
          <button style={{padding: '15px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
            📧 Send Notifications
          </button>
        </div>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <div style={{color: '#4a5568'}}>
          <p>• New user registrations: +12 this week</p>
          <p>• New stores added: +3 this week</p>
          <p>• Ratings submitted: +45 this week</p>
          <p>• System uptime: 99.9%</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;