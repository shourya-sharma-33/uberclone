const mapsService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(401).json({
            message: "Coordinates not found!"
        });
    }
};


module.exports.getDistanceTime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await mapsService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { input } = req.query;
        const suggestions = await mapsService.getAutoCompleteSuggestions(input);

        res.status(200).json({
            success: true,
            suggestions
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

