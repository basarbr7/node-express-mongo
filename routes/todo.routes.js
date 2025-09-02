const route = require('express').Router();

// Importing the todo controller functions
const { createTodo, getAllTodo, getAllTodoByUser, getSingleTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller')
const verifyToken = require('../middleware/verifyToken')

route.get('/', getAllTodo)
route.post('/', verifyToken, createTodo)
route.get('/user/:id', verifyToken,  getAllTodoByUser)
route.get('/:id', verifyToken, getSingleTodo)
route.patch('/:id', verifyToken, updateTodo)
route.delete('/:id', verifyToken, deleteTodo)

module.exports = route