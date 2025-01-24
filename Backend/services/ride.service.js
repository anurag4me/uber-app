const RideModel = require('../models/ride.model');
const { getDistanceTime } = require('./map.service');
const { sendMessageToSocketId } = require("../socket")
const crypto = require('crypto');

const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const { distance, duration } = await getDistanceTime(pickup, destination);

    const baseFare = {
        car: 20,
        auto: 15,
        moto: 10
    }
    const perKmRate = {
        car: 10,
        auto: 5,
        moto: 3
    };
    const perMinuteRate = {
        car: 2,
        auto: 1,
        moto: 0.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + (distance.value/1000 * perKmRate.auto) + (duration.value/60 * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distance.value/1000 * perKmRate.car) + (duration.value/60 * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + (distance.value/1000 * perKmRate.moto) + (duration.value/60 * perMinuteRate.moto))
    }

    return fare;
}

function getOtp (num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}


const createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !vehicleType || !destination) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = await RideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    return ride;
}

const confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await RideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }
    
    return ride;
}

const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await RideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }
    
    const ride = await RideModel.findOne({
        _id: rideId, 
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found or not belonging to the captain');
    }

    if (ride.status!== 'ongoing') {
        throw new Error('Ride not ongoing');
    }
    
    await RideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}

module.exports = {createRide, getFare, confirmRide, startRide, endRide}

