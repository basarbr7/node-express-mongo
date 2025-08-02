const route = require('express').Router();

// Importing the auth controller functions

const { registerUser, getallregisteredUsers, loginUser } = require('../controllers/auth.controller');

// Route for user registration
route.post('/register', registerUser);
route.get('/users', getallregisteredUsers)
route.post('/login', loginUser) 

module.exports = route;