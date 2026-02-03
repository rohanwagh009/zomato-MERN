import React, { useEffect, useRef, useState } from 'react';
import '../../styles/home.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import BottomNav from '../../components/BottomNav';
import { useAuth } from '../../context/AuthContext';

const HeartIcon = ({ filled }) => (
  <svg className="interaction-icon" viewBox="0 0 24 24" style={{ fill: filled ? '#ef4f5f' : 'white' }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const BookmarkIcon = ({ filled }) => (
  <svg className="interaction-icon" viewBox="0 0 24 24" style={{ fill: filled ? '#ef4f5f' : 'white' }}>
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
);

const CommentIcon = () => (
  <svg className="interaction-icon" viewBox="0 0 24 24">
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </svg>
);

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState(new Set());
  const [likedVideos, setLikedVideos] = useState(new Set());
  // Store like counts separately to avoid re-rendering videos (and breaking observer) when count changes
  const [likeCounts, setLikeCounts] = useState({});

  const videoRefs = useRef([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          if (videoElement.readyState === 0 && videoElement.networkState === 3) {
            return;
          }

          videoRefs.current.forEach(ref => {
            if (ref && ref !== videoElement) {
              ref.pause();
              ref.currentTime = 0;
            }
          });

          const playPromise = videoElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              if (error.name !== 'AbortError') {
                console.log("Auto-play was prevented:", error);
              }
            });
          }
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const currentRefs = videoRefs.current;

    currentRefs.forEach(video => {
      if (video) observer.observe(video);
    });

    return () => {
      currentRefs.forEach(video => {
        if (video) observer.unobserve(video);
      });
    };
  }, [videos]);

  // Fetch Data
  useEffect(() => {
    // Fetch Videos
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then(response => {
        const fetchedVideos = response.data.foodItems;
        setVideos(fetchedVideos);

        // Initialize counts
        const initialCounts = {};
        fetchedVideos.forEach(v => {
          initialCounts[v._id] = v.likeCount || 0;
        });
        setLikeCounts(initialCounts);
      });

    // Fetch User Interaction State
    if (user) {
      // Saved
      axios.get("http://localhost:3000/api/food/saved", { withCredentials: true })
        .then(response => {
          // Safety filter for deleted items
          const validItems = response.data.savedItems.filter(item => item.food);
          const savedIds = new Set(validItems.map(item => item.food._id));
          setSavedVideos(savedIds);
        })
        .catch(err => console.error("Error fetching saved status:", err));

      // Liked
      axios.get("http://localhost:3000/api/food/liked", { withCredentials: true })
        .then(response => {
          const likedIds = new Set(response.data.likedItems.map(item => item.food));
          setLikedVideos(likedIds);
        })
        .catch(err => console.error("Error fetching liked status:", err));
    }

  }, [user]);

  const handleSave = async (foodId) => {
    if (!user) {
      navigate('/user/login');
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/food/save", { foodId }, { withCredentials: true });

      setSavedVideos(prev => {
        const newSet = new Set(prev);
        if (newSet.has(foodId)) {
          newSet.delete(foodId);
        } else {
          newSet.add(foodId);
        }
        return newSet;
      });

    } catch (error) {
      console.error("Error saving food:", error);
    }
  };

  const handleLike = async (foodId) => {
    if (!user) {
      navigate('/user/login');
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/food/like", { foodId }, { withCredentials: true });

      setLikedVideos(prev => {
        const newSet = new Set(prev);
        if (newSet.has(foodId)) {
          newSet.delete(foodId);
        } else {
          newSet.add(foodId);
        }
        return newSet;
      });

      // Optimistic update for count
      setLikeCounts(prev => {
        const currentCount = prev[foodId] || 0;
        const isLiked = likedVideos.has(foodId); // State before this update
        return {
          ...prev,
          [foodId]: isLiked ? Math.max(0, currentCount - 1) : currentCount + 1
        };
      });

    } catch (error) {
      console.error("Error liking food:", error);
    }
  };

  return (
    <>
      <div className="video-feed-container">
        {videos.map((item, index) => (
          <div key={item._id} className="video-card">
            <video
              ref={el => videoRefs.current[index] = el}
              className="video-player"
              src={item.video}
              loop
              muted
              autoPlay
              playsInline
            />

            {user && (
              <div className="interaction-sidebar">
                <div className="interaction-item" onClick={() => handleLike(item._id)}>
                  <HeartIcon filled={likedVideos.has(item._id)} />
                  <span className="interaction-text">likes: {likeCounts[item._id] || 0}</span>
                </div>
                <div className="interaction-item" onClick={() => handleSave(item._id)}>
                  <BookmarkIcon filled={savedVideos.has(item._id)} />
                  <span className="interaction-text">{savedVideos.has(item._id) ? 'Saved' : 'Save'}</span>
                </div>
                <div className="interaction-item">
                  <CommentIcon />
                  <span className="interaction-text">Comment</span>
                </div>
              </div>
            )}

            <div className="video-overlay">
              <p className="video-description">{item.description}</p>
              <Link
                className="visit-store-btn"
                to={`/food-partner/${item.foodPartner}`}
              >
                Visit Store
              </Link>
            </div>
          </div>
        ))}
      </div>
      {user && <BottomNav />}
    </>
  );
}

export default Home;
