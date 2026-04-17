import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (query = '') => {
    try {
      const url = query ? `http://localhost:5000/api/rooms?location=${query}` : 'http://localhost:5000/api/rooms';
      const res = await axios.get(url);
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRooms(search);
  };

  return (
    <div className="py-4">
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold text-primary mb-3">Find Your Perfect Room</h1>
          <p className="col-md-8 mx-auto fs-5 text-muted mb-4">
            Discover affordable and comfortable room rentals in your desired location.
          </p>
          <form className="d-flex justify-content-center mx-auto" style={{ maxWidth: '600px' }} onSubmit={handleSearch}>
            <input 
              className="form-control form-control-lg me-2 shadow-sm border-0" 
              type="search" 
              placeholder="Search by location (e.g., 'Downtown')" 
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary btn-lg px-4 shadow-sm" type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark m-0">Featured Rooms</h2>
          <Link to="/rooms" className="text-decoration-none fw-semibold">View All <i className="bi bi-arrow-right"></i></Link>
        </div>
        
        {rooms.length === 0 ? (
          <div className="text-center p-5 bg-light rounded text-muted">
            <p className="fs-5">No rooms found. Try a different search.</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {rooms.slice(0, 6).map(room => (
              <div className="col" key={room._id}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
