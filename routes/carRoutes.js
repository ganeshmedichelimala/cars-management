const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const authMiddleware = require('../middleware/authMiddleware');

// Create a car
router.post('/', authMiddleware, async (req, res) => {
  const { name, year, price } = req.body;
  try {
    const newCar = new Car({ name, year, price });
    await newCar.save();
    res.json(newCar);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all cars - Protected route
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update a car
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, year, price } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { name, year, price },
      { new: true }
    );
    res.json(car);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a car
router.delete('/:id', authMiddleware, async (req, res) => {
  const id = req.params.id.replace(/^:/, ''); 
  console.log('Received ID for deletion:', id); 
  try {
    const result = await Car.findByIdAndDelete(id); 
    if (!result) return res.status(404).json({ msg: 'Car not found' });
    res.json({ msg: 'Car removed' });
  } catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a car by ID - Protected route
router.get('/:id', authMiddleware, async (req, res) => {
  console.log('Received ID:', req.params.id);
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.error('Error retrieving car:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Filter by year - Protected route
router.get('/filter', authMiddleware, async (req, res) => {
  const { year } = req.query;
  try {
    const cars = await Car.find({ year });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Sort by price - Protected route
router.get('/sort', authMiddleware, async (req, res) => {
  const { order = 'asc' } = req.query;
  try {
    const cars = await Car.find().sort({ price: order === 'asc' ? 1 : -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
