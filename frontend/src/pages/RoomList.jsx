import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import RoomCard from '../components/RoomCard';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { user, token } = useContext(AuthContext);
  
  // State for adding a room
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState({ title: '', description: '', price: '', location: '', imageUrl: '' });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.post('http://localhost:5000/api/rooms', newRoom, config);
      setRooms([...rooms, res.data]);
      setShowAddForm(false);
      setNewRoom({ title: '', description: '', price: '', location: '', imageUrl: '' });
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to add room');
    }
  };

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark m-0">All Available Rooms</h2>
        {user && (
          <button className="btn btn-primary fw-semibold" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : 'Add New Room'}
          </button>
        )}
      </div>

      {showAddForm && user && (
        <div className="card shadow-sm border-0 mb-5 rounded-4">
          <div className="card-body p-4 bg-light">
            <h4 className="card-title fw-bold mb-4">List a New Room</h4>
            <form onSubmit={handleAddSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-muted fw-semibold">Title</label>
                  <input type="text" className="form-control" value={newRoom.title} onChange={e => setNewRoom({...newRoom, title: e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted fw-semibold">Location</label>
                  <input type="text" className="form-control" value={newRoom.location} onChange={e => setNewRoom({...newRoom, location: e.target.value})} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-muted fw-semibold">Price per Month ($)</label>
                  <input type="number" className="form-control" value={newRoom.price} onChange={e => setNewRoom({...newRoom, price: e.target.value})} required />
                </div>
                <div className="col-md-8">
                  <label className="form-label text-muted fw-semibold">Image URL (Optional)</label>
                  <input type="text" className="form-control" value={newRoom.imageUrl} onChange={e => setNewRoom({...newRoom, imageUrl: e.target.value})} />
                </div>
                <div className="col-12">
                  <label className="form-label text-muted fw-semibold">Description</label>
                  <textarea className="form-control" rows="3" value={newRoom.description} onChange={e => setNewRoom({...newRoom, description: e.target.value})} required></textarea>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-success fw-bold px-4">Save Room</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="text-center p-5 bg-light rounded text-muted">
          <p className="fs-5">No rooms available currently.</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {rooms.map(room => (
            <div className="col" key={room._id}>
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
