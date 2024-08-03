const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register User
router.post('/register/user', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});




// Register Admin
router.post('/register/admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if admin already exists
    let admin = await User.findOne({ username, role: 'admin' });
    if (admin) return res.status(400).json({ msg: 'Admin already exists' });

    // Create a new admin
    admin = new User({
      username,
      password: await bcrypt.hash(password, 10), // Hash password
      role: 'admin'
    });

    await admin.save();

    res.json({ msg: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// User Login
router.post('/login/user', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received credentials:', { username, password });

  try {
    const user = await User.findOne({ username, role: 'user' });
    console.log('Found user:', user);

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});



// Admin Login
router.post('/login/admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await User.findOne({ username, role: 'admin' });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: admin.id, role: admin.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
