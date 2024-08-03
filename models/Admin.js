// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Ensure the collection is named 'admin'
const Admin = mongoose.model('Admin', AdminSchema, 'admin');
module.exports = Admin;
