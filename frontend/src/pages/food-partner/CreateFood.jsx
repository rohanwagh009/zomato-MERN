import React, { useState } from 'react';
import '../../styles/create-food.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';


const CreateFood = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/food-partner/login');
      return;
    }
    // Handle form submission logic here
    console.log("Form submitted");

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('video', videoFile);
      formData.append('userId', user._id);

      const response = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Food reel created successfully!');
      // Reset form
      setName('');
      setDescription('');
      setVideoFile(null);
      setVideoPreview(null);
      navigate('/');
    } catch (error) {
      console.error("Error creating food reel:", error);
      alert(error.response?.data?.message || "Error creating food reel");
    }

  };

  return (
    <div className="create-food-container">
      <h1 className="header-title">Add New Food Reel</h1>

      <form className="create-food-form" onSubmit={handleSubmit}>

        {/* Video Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="video">Food Video</label>
          <div className={`file-input-wrapper ${videoFile ? 'has-file' : ''}`}>
            <input
              type="file"
              id="video"
              accept="video/*"
              className="file-input"
              onChange={handleFileChange}
              required
            />
            <div className="file-input-placeholder">
              <span className="file-input-icon">📹</span>
              <span className="file-input-text">
                {videoFile ? "Change video" : "Tap to upload video"}
              </span>
            </div>
            {videoPreview && (
              <video
                src={videoPreview}
                className={`file-preview ${videoPreview ? 'visible' : ''}`}
                controls
                autoPlay
                muted
                loop
              />
            )}
          </div>
        </div>

        {/* Name Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="name">Dish Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="e.g., Spicy Chicken Wings"
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Describe the taste, ingredients, etc..."
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Create Food Reel</button>

      </form>
    </div>
  )
}

export default CreateFood;
