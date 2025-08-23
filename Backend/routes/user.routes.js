const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/maps.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { query } = require('express-validator');

router.get(
    '/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapsController.getCoordinates
);

module.exports = router;
