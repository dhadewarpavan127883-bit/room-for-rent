const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

let rooms = [
  {
    _id: '1',
    title: 'Comfortable Triple Room',
    description: 'A cozy room equipped with one double bed and one single bed, perfect for families or groups of three. Includes AC, wooden cabinets, a mirror, and modern blue-themed bedding.',
    price: 850,
    location: 'Downtown Area',
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    owner: { name: 'Admin', email: 'admin@admin.com' },
    createdAt: new Date().toISOString()
  }
];

// Get all rooms (with optional location search)
router.get('/', (req, res) => {
  try {
    const { location } = req.query;
    let filteredRooms = rooms;
    if (location) {
      filteredRooms = rooms.filter(r => r.location.toLowerCase().includes(location.toLowerCase()));
    }
    // We already have owner mock data in the array, no need to populate
    res.json(filteredRooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new room (Protected)
router.post('/', auth, (req, res) => {
  try {
    const { title, description, price, location, imageUrl } = req.body;
    
    // In our mock, req.user only has { id } from token.
    // For simple mock showing, we'll just mock owner.
    const newRoom = {
      _id: Date.now().toString(),
      title,
      description,
      price,
      location,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      owner: { name: 'Current User', email: 'user@user.com' },
      createdAt: new Date().toISOString()
    };

    rooms.push(newRoom);
    res.json(newRoom);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
