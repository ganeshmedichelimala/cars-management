const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Car = require("../models/Car");
const authMiddleware = require("../middleware/authMiddleware");

// Create a car
router.post("/", authMiddleware, async (req, res) => {
  const { name, year, price } = req.body;
  try {
    const newCar = new Car({ name, year, price });
    await newCar.save();
    res.json(newCar);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all cars - Protected route
router.get("/", authMiddleware, async (req, res) => {
  console.log("Received request for all cars");

  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error("Error retrieving cars:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/filter", authMiddleware, async (req, res) => {
  const { year } = req.query;
  console.log("Received year for filtering:", year);

  try {
    if (!year || typeof year !== "string") {
      return res.status(400).json({ msg: "Invalid year format" });
    }

    const cars = await Car.find({ year });
    res.json(cars);
  } catch (err) {
    console.error("Error filtering cars:", err); // Log full error object
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Update a car
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, year, price } = req.body;
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { name, year, price },
      { new: true }
    );
    res.json(car);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a car
router.delete("/:id", authMiddleware, async (req, res) => {
  const id = req.params.id.replace(/^:/, "");
  console.log("Received ID for deletion:", id);
  try {
    const result = await Car.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ msg: "Car not found" });
    res.json({ msg: "Car removed" });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get a car by ID - Protected route
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }

  try {
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ msg: "Car not found" });
    res.json(car);
  } catch (err) {
    console.error("Error retrieving car:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Filter by year - Protected route
router.get("/filter", authMiddleware, async (req, res) => {
  const { year } = req.query;
  console.log("Received year:", year);

  try {
    // Validate the year format if needed
    if (!year || typeof year !== "string") {
      return res.status(400).json({ msg: "Invalid year format" });
    }

    // Debug logging
    console.log("Querying database with year:", year);
    const cars = await Car.find({ year });
    console.log("Found cars:", cars);

    // Check if cars array is empty
    if (cars.length === 0) {
      return res.status(404).json({ msg: "No cars found for the given year" });
    }

    res.json(cars);
  } catch (err) {
    console.error("Error filtering cars:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});




module.exports = router;
