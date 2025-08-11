const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controllers');

router.post('/register', [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('fullname.firstname')
        .isLength({ min: 3 })
        .withMessage('write proper name ain nobody got 2 letter name'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('password bada rakho babygirl')
],
    userController.registerUser
);

module.exports = router;
