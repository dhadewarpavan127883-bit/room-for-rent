import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <h5 className="fw-bold mb-3">RoomRentals</h5>
        <p className="text-secondary mb-2" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Welcome to RoomRentals, your guaranteed platform for discovering the perfect room. 
          Whether you are an owner looking to list your property or a tenant trying to find a comfortable place, 
          we bridge the gap and make accommodations seamless.
        </p>
        <div className="mt-3 text-muted small">
          &copy; {new Date().getFullYear()} RoomRentals Full-Stack Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
