> in maps.router


router.get('/get-suggestions',
    query('input').isString().isLength({ min: 4 }),
    //authMiddleware.authUser,
    mapsController.getAutoCompleteSuggestions
)

>maps.services

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query if required')
    }

    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error('unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

>map.controller

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { input } = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);
    } catch (error) {
        console.log(error);
        res.status(500).json{
            (

                message: 'iternal server errro'
            ) }
    }
}

> in ride.services


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

> ridecontroller
const rideServices = require('../services/ride.services');
const { validateResult } = require('express-validator');
module.exports.createRide = async (req, res) => {
    const errors = validateResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array});
    }

    try {
        const ride = await rideServices.createRide(req.body);
        return res.status(201).json(ride);
    } catch (err) {
        return res.status(400).json({message : err.message});
    }
}


> ride routes

const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const rideController = require('../controllers/ride.controller');

router.post('/create',
    body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('invalid user id'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup adress'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('invalid vehicletype'),
    rideController.createRide

)