const route = require('express').Router()

// Importing the user controller functions
const { alluser, userById, createUser, updateUser, deleteUser } = require('../controllers/user.controller');

// Defining the routes for user operations
route.get('/', alluser)

route.get('/:id', userById)

route.post('/', createUser)

route.patch('/:id', updateUser)

route.delete('/:id', deleteUser)


module.exports = route