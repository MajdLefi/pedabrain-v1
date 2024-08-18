const express = require("express");

const router = express.Router();

const { loginUserValidator, signupUserValidator } = require("../utils/validators/authValidator");

const { signup, login } = require("../services/authService");

//signup
router.route('/signup').post(signupUserValidator, signup)

//login
router.route('/login').post(loginUserValidator, login)

module.exports = router;