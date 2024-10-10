import React from 'react';
import './labcard.css'; // Optional, for styling

const LabCard = ({ title, description, imageUrl }) => {
  return (
    <div className="lab-card" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="card-overlay"></div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LabCard;