import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/profile.css';
import BottomNav from '../../components/BottomNav';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/food-partner/${id}`, {
          withCredentials: true
        });
        setProfile(response.data.foodPartner);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (loading) return <div className="profile-page">Loading...</div>;
  if (!profile) return <div className="profile-page">Profile not found</div>;

  const { name, contactName, foodItems = [], totalMeals = 50, customersServed = "15k+" } = profile;

  // Use placeholder stats if DB doesn't have them yet, to match sketch for demo
  const displayMeals = profile.totalMeals || 50;
  const displayServed = profile.customersServed || "15k+";

  return (
    <main className="profile-page">
      {/* Header: Photo + Text */}
      <section className="profile-header">
        <div className="profile-avatar-container">
          <img
            src="https://images.unsplash.com/photo-1579503841516-e0bd7fca5faa?w=500&auto=format&fit=crop&q=60"
            alt="Profile"
            className="profile-avatar"
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{name}</h1>
          <p className="profile-contact">{contactName || 'No Contact Name'}</p>
        </div>
      </section>

      {/* Stats: Meals + Served */}
      <section className="profile-stats">
        <div className="profile-stat-item">
          <span className="profile-stat-label">All meals</span>
          <span className="profile-stat-value">{displayMeals}</span>
        </div>
        <div className="profile-stat-item">
          <span className="profile-stat-label">People served</span>
          <span className="profile-stat-value">{displayServed}</span>
        </div>
      </section>

      {/* Grid: Videos */}
      <section className="profile-video-grid">
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <div key={item._id || index} className="profile-video-card">
              {item.video ? (
                <video
                  src={item.video}
                  className="profile-video-thumbnail"
                  muted
                  playsInline
                />
              ) : (
                <span className="profile-video-placeholder-text">video</span>
              )}
            </div>
          ))
        ) : (
          /* Show placeholders if no content, just to match design visual */
          <>
            <div className="profile-video-card"><span className="profile-video-placeholder-text">video</span></div>
            <div className="profile-video-card"><span className="profile-video-placeholder-text">video</span></div>
            <div className="profile-video-card"><span className="profile-video-placeholder-text">video</span></div>
            <div className="profile-video-card"><span className="profile-video-placeholder-text">video</span></div>
            <div className="profile-video-card"><span className="profile-video-placeholder-text">video</span></div>
            <div className="profile-video-card"><span className="profile-video-placeholder-text">video</span></div>
          </>
        )}
      </section>


      {user && <BottomNav />}
    </main>
  );
}

export default Profile;