const route = require('express').Router();

// Importing the todo controller functions
const { createTodo, getAllTodo, getTodoByUser } = require('../controllers/todo.controller')
const auth = require('../middleware/verifyToken')

route.get('/', getAllTodo)
route.post('/', auth, createTodo)
route.get('/user/:id', auth,  getTodoByUser)

module.exports = route