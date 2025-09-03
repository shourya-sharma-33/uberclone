const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service')
const bcrypt = require('bcrypt');
const crypto = require('crypto');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required')
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 0
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };

    const fare = {
        auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.time * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.time * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.time + perMinuteRate.motorcycle)
    };
    return fare;
} 

module.exports.createRide = async ({ 
    user, pickup, destination, vehicleType
 }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("all fields are required");
    }

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare : fare[vehicleType]
    })

    return ride;
}

function getOtp(num) {
    function generateOtp(num){
        const otp = create.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    }
    return generateOtp(num);
}