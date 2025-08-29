import React from 'react';

const PlaceholderPage = ({ title, description, icon }) => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{description}</p>
      </div>

      <div className="placeholder-container">
        <div className="placeholder-card">
          <div className="placeholder-icon">{icon}</div>
          <h2 className="placeholder-title">Coming Soon!</h2>
          <p className="placeholder-description">
            This page is currently under development and will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;


