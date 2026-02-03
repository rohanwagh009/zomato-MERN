import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/bottomNav.css';

const HomeIcon = () => (
  <svg className="bottom-nav-icon" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const SavedIcon = () => (
  <svg className="bottom-nav-icon" viewBox="0 0 24 24">
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </svg>
);

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <SavedIcon />
        <span>Saved</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
