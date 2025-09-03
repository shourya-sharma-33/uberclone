const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/create',
    authMiddleware.authUser,
    body('userId').isString().isLength({ min: 24, max: 24 }).withMessage('invalid user id'),
    body('pickup').isString().isLength({ min: 3 }).withMessage('invalid pickup adress'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('invalid vehicletype'),
    rideController.createRide
)