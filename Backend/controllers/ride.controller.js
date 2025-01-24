const rideServices = require("../services/ride.service");
const mapServices = require("../services/map.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
const RideModel = require("../models/ride.model");

const createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideServices.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
    const pickupCoordinates = await mapServices.getCoordinates(pickup);
    const captainsInTheRadius = await mapServices.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    ride.otp = "";
    const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate(
      "user"
    );
    captainsInTheRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideServices.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideServices.confirmRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId, otp } = req.query;
  try {
    const ride = await rideServices.startRide({ rideId, otp, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}

const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;

  try {
    const ride = await rideServices.endRide({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRide, getFare, confirmRide, startRide, endRide };
