> created a maps.services.js file

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GEOAPIFY_API_KEY;
    const url = "something something url";

    try {
        const response = await axios.get{ url };
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd : location.lat,
                lng : location.lng
            };
        }else{
            throw new Error('unable to load coordinates')
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


> then created a map.controller.js

const mapsService = require('../services/maps.service')
const { validationResult } = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({
            errors: errors.array()
        });

    }
    const { address } = req.query;

    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(401).json({
            message: "Cooordinates Didnt Foundddd :333"
        })
    }
}


> created a map.routes.js

const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/maps.controllers');
const authMiddleware = require('../middlewares/auth.middleware')
const {query} = require('express-validator');

router.get('/get-coordinates', 
    query('address').isString().isLength({min  : 3}),
    authMiddleware.authUser, getCoordinates )

module.exports = router; 

> in app.js he added this


// rest of code
const mapsRoutes = require('./routes/maps.routes.js');
// rest of code
app.use('/maps', mapsRoutes)
// rest of code