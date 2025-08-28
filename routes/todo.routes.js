const route = require('express').Router();

// Importing the todo controller functions
const { createTodo, getAllTodo, getAllTodoByUser, getSingleTodo } = require('../controllers/todo.controller')
const auth = require('../middleware/verifyToken')

route.get('/', getAllTodo)
route.post('/', auth, createTodo)
route.get('/user/:id', auth,  getAllTodoByUser)
route.get('/:id', auth, getSingleTodo)

module.exports = route