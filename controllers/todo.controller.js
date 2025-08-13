const Todo = require('../models/todo.model');


const getAllTodo = async (req, res)=> {
    try {
        const todos = await Todo.find()
        res.status(200).json({ todos })
    } catch (error) {
        console.error('Error get todo:', error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

const createTodo = async (req, res)=> {
    try {
        const { title, description } = req.body;
        const userId = req.user.id // middleware theke asche
        if (!title || !description ) {
            return res.status(400).json({ message: 'Title and description  are required' });
        }
        const newTodo = new Todo({
            title,
            description,
            userId
        });
        const savetodo = await newTodo.save()
        res.status(201).json({ message: 'Todo created successfully', savetodo });
        
    } catch (error) {
        console.error('Error creating todo:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }    
}

const getTodoByUser = async (req, res)=>{
    try {
        const userId = req.params.id;
        const todo = await Todo.find({userId})
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' })
        }
        res.status(200).json(todo)
    } catch (error) {
        console.error('Error Fetching Todo:', error.message)
        res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = { createTodo, getAllTodo, getTodoByUser }