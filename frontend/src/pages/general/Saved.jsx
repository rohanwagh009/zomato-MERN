import React, { useEffect, useState } from 'react';
import BottomNav from '../../components/BottomNav';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/home.css';

const Saved = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/user/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food/saved", { withCredentials: true });
        setSavedItems(response.data.savedItems);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      } finally {
        setIsLoadingItems(false);
      }
    };

    if (user) {
      fetchSavedItems();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div style={{ backgroundColor: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#000',
      minHeight: '100vh',
      color: '#fff',
      paddingBottom: '60px'
    }}>
      <header style={{
        padding: '16px',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        backgroundColor: '#000',
        zIndex: 10
      }}>
        <span style={{ width: '60px' }}></span>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Saved</span>
        <button
          onClick={() => { logout(); navigate('/'); }}
          style={{
            background: 'transparent',
            border: '1px solid #333',
            color: '#ef4f5f', // Red accent
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          Logout
        </button>
      </header>

      {isLoadingItems ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>Loading saved items...</div>
      ) : savedItems.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔖</div>
          <p>No saved videos yet.</p>
          <p style={{ fontSize: '0.8rem' }}>Go to home and save some yummy food!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px', // 2px gap between items
          padding: '2px'
        }}>
          {savedItems.map((item) => (
            <div key={item._id} style={{
              aspectRatio: '9/16',
              backgroundColor: '#1a1a1a',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Assuming item.food contains the video URL and other details */}
              {item.food ? (
                <video
                  src={item.food.video}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  muted // Muted thumbnail
                  onMouseOver={(e) => e.target.play()} // Optional: play on hover
                  onMouseOut={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Item removed</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Spacing for bottom text if list is long, or generic footer */}
      {savedItems.length > 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666', fontSize: '0.8rem' }}>
          Tap to view details
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Saved;
