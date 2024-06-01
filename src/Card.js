import React from 'react';


const Card = ({ title, description, imageUrl }) => {
  return (
    <div className="card">
      <img className="card-image" src={imageUrl} alt="Card" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
