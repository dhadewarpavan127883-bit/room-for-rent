import React from 'react';

const RoomCard = ({ room }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={room.imageUrl || 'https://via.placeholder.com/300x200?text=Room+Image'}
        className="card-img-top"
        alt={room.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-dark">{room.title}</h5>
        <h6 className="card-subtitle mb-2 text-primary fw-semibold">${room.price} / month</h6>
        <p className="card-text text-muted mb-2">
          <i className="bi bi-geo-alt-fill me-1"></i>
          {room.location}
        </p>
        <p className="card-text text-secondary mb-4 flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {room.description && room.description.length > 100
            ? `${room.description.substring(0, 100)}...`
            : room.description}
        </p>
        <button className="btn btn-outline-primary mt-auto w-100 fw-medium">View Details</button>
      </div>
    </div>
  );
};

export default RoomCard;
