const RideModel = require('../models/ride.model');
const { getDistanceTime } = require('./map.service');
const crypto = require('crypto');

async function getFare (pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const { distance, duration } = await getDistanceTime(pickup, destination);
    console.log(duration)

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
        auto: baseFare.auto + (distance.value/1000 * perKmRate.auto) + (duration.value/60 * perMinuteRate.auto),
        car: baseFare.car + (distance.value/1000 * perKmRate.car) + (duration.value/60 * perMinuteRate.car),
        moto: baseFare.moto + (distance.value/1000 * perKmRate.moto) + (duration.value/60 * perMinuteRate.moto)
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

module.exports = {createRide}

