const rideServices = require('../services/ride.services');
const { validateResult } = require('express-validator');
module.exports.createRide = async (req, res) => {
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }

    const {userId, pickup, destination, vehicleType} = req.body;

    try {
        const ride = await rideServices.createRide({user : userId, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    } catch (err) {
        return res.status(400).json({message : err.message});
    }
}