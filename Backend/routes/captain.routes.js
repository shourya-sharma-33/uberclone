const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const captainController = require("../controllers/captain.controllers")

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 letters long'),
    body('password').isLength({min: 6}).withMessage('password must be 6 letters at least'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be picked'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3'),
    body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('invalid choice of vehicle type')
],
captainController.registerCaptain
)

module.exports = router;