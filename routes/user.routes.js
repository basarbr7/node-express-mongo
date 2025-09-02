const route = require('express').Router()

// Importing the user controller functions
const { alluser, userById, createUser, updateProfileUser, deleteUser } = require('../controllers/user.controller');
const upload = require("../middleware/uploadMiddleware")
const verifyToken = require('../middleware/verifyToken')


// Defining the routes for user operations
route.get('/', alluser)

route.get('/:id', userById)

route.post('/', createUser)

route.patch('/:id',verifyToken, upload.single("image"), updateProfileUser)

route.delete('/:id', verifyToken, deleteUser)

module.exports = route