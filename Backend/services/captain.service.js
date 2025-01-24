const CaptainModel = require("../models/captain.model");

const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  vehicleType,
  color,
  plate,
  capacity,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !vehicleType ||
    !color ||
    !plate ||
    !capacity
  ) {
    throw new Error("All fields are required");
  }

  const captain = await CaptainModel.create({
    fullname: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: {
      vehicleType,
      color,
      plate,
      capacity,
    },
  });

  return captain;
};

module.exports = { createCaptain };
