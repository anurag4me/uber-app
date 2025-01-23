const rideServices = require("../services/ride.service");
const { validationResult } = require("express-validator");

const createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideServices.createRide({user: req.user._id, pickup, destination, vehicleType});
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRide };
