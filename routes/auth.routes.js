const route = require('express').Router();

// Importing the auth controller functions

const { loginUser } = require('../controllers/auth.controller');

// Route for user registration
route.post('/login', loginUser) 

module.exports = route;