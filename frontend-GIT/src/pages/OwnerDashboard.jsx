import { useEffect, useState } from "react";
import api from "../services/api";

function OwnerDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/stores/owner/dashboard");
      setData(res.data);
    } catch {
      alert("Failed to load dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  if (!data) return <div className="page text-center"><h2>Loading...</h2></div>;

  return (
    <div className="page">
      <div className="card text-center">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Store Owner Dashboard</h2>
          <button onClick={handleLogout} style={{backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'}}>
            Logout
          </button>
        </div>
        <h3 style={{color: '#667eea', margin: '10px 0'}}>{data.storeName}</h3>
        <div style={{display: 'flex', justifyContent: 'center', gap: '30px', margin: '20px 0'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5em', color: '#667eea'}}>⭐</div>
            <p style={{margin: '5px 0', fontWeight: 'bold'}}>Average Rating</p>
            <p style={{fontSize: '1.5em', color: '#667eea'}}>{data.averageRating}/5</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5em', color: '#667eea'}}>📊</div>
            <p style={{margin: '5px 0', fontWeight: 'bold'}}>Total Reviews</p>
            <p style={{fontSize: '1.5em', color: '#667eea'}}>{data.ratings.length}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5em', color: '#4f46e5'}}>📈</div>
            <p style={{margin: '5px 0', fontWeight: 'bold'}}>Performance</p>
            <p style={{fontSize: '1.5em', color: data.averageRating >= 4 ? '#10b981' : data.averageRating >= 3 ? '#f59e0b' : '#ef4444'}}>
              {data.averageRating >= 4 ? 'Excellent' : data.averageRating >= 3 ? 'Good' : 'Needs Improvement'}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Customer Reviews & Ratings</h3>
        <p style={{color: '#4a5568', marginBottom: '20px'}}>
          Here's what your customers are saying about {data.storeName}. Use this feedback to improve your service!
        </p>
      </div>

      {data.ratings.length === 0 ? (
        <div className="card text-center">
          <h3>No Reviews Yet</h3>
          <p style={{color: '#4a5568'}}>Your store hasn't received any ratings yet. Encourage your customers to leave reviews!</p>
        </div>
      ) : (
        data.ratings.map((r, index) => (
          <div key={index} className="card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
              <h4 style={{margin: 0, color: '#667eea'}}>{r.userName}</h4>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <span style={{fontSize: '1.2em'}}>⭐</span>
                <span style={{fontWeight: 'bold', fontSize: '1.1em'}}>{r.rating}/5</span>
              </div>
            </div>
            <p><strong>Email:</strong> {r.email}</p>
            <p style={{color: '#4a5568', fontSize: '0.9em', marginTop: '10px'}}>
              Thank you for the feedback! This helps us improve our service.
            </p>
          </div>
        ))
      )}

      <div className="card">
        <h3>Tips for Better Ratings</h3>
        <ul style={{color: '#555', lineHeight: '1.6'}}>
          <li>👥 Engage with your customers and ask for feedback</li>
          <li>⭐ Encourage satisfied customers to leave positive reviews</li>
          <li>📞 Respond to reviews to show you care about customer experience</li>
          <li>🎯 Focus on areas mentioned in reviews to improve your service</li>
          <li>📊 Monitor your ratings regularly to track performance</li>
        </ul>
      </div>
    </div>
  );
}

export default OwnerDashboard;