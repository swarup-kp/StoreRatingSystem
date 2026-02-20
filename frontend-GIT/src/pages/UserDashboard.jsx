import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await api.get("/stores");
      setStores(res.data);
    } catch {
      alert("Failed to load stores");
    }
  };

  const submitRating = async (storeId, rating) => {
    try {
      await api.post("/ratings", { store_id: storeId, rating });
      alert("Rating submitted");
      fetchStores();
    } catch {
      alert("Rating failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="page">
      <div className="card text-center">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Welcome to Your Dashboard</h2>
          <button onClick={handleLogout} style={{backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'}}>
            Logout
          </button>
        </div>
        <p style={{color: '#4a5568', marginBottom: '20px'}}>
          Discover stores, share your experiences, and help the community make better choices.
        </p>
        <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2em', color: '#667eea'}}>🏪</div>
            <p>Browse Stores</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2em', color: '#667eea'}}>⭐</div>
            <p>Rate & Review</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2em', color: '#4f46e5'}}>📊</div>
            <p>View Analytics</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Available Stores</h3>
        <p style={{color: '#4a5568', marginBottom: '20px'}}>
          Click on a star rating below each store to share your experience. Your feedback helps others!
        </p>
      </div>

      {stores.length === 0 ? (
        <div className="card text-center">
          <h3>No Stores Available</h3>
          <p style={{color: '#4a5568'}}>Check back later for new stores to rate!</p>
        </div>
      ) : (
        stores.map((store) => (
          <div key={store.id} className="card">
            <h3>{store.name}</h3>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Average Rating:</strong> 
              <span style={{color: '#667eea', fontWeight: 'bold'}}>
                {store.avgRating ? `${store.avgRating}/5` : 'No ratings yet'}
              </span>
            </p>
            <p style={{color: '#4a5568', fontSize: '0.9em', marginBottom: '15px'}}>
              Share your experience by selecting a rating below:
            </p>

            <div className="rating-buttons">
              {[1,2,3,4,5].map((num) => (
                <button 
                  key={num} 
                  onClick={() => submitRating(store.id, num)}
                  style={{
                    backgroundColor: num <= (store.avgRating || 0) ? '#667eea' : '#e5e7eb',
                    color: num <= (store.avgRating || 0) ? 'white' : '#6b7280'
                  }}
                >
                  ⭐ {num}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserDashboard;