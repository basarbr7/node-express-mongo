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
        const { title, description, dueDate, status, category } = req.body;
        const userId = req.user.id // middleware theke asche
        if (!title || !description ) {
            return res.status(400).json({ message: 'Title and description  are required' });
        }
        const newTodo = new Todo({
            title,
            description,
            status,
            dueDate,
            category,
            userId
        });
        const savetodo = await newTodo.save()
        res.status(201).json({ message: 'Todo created successfully', savetodo });
        
    } catch (error) {
        console.error('Error creating todo:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }    
}

const getAllTodoByUser = async (req, res)=>{
    try {
        const userId = req.params.id;
        const todos = await Todo.find({userId})

        if (!todos || todos.length === 0) {
            return res.status(404).json({ message: 'No todos found for this user' });
        }

        res.status(200).json({todos})
    } catch (error) {
        console.error('Error Fetching Todo:', error.message)
        res.status(500).json({ message: 'Internal server error'})
    }
}

const getSingleTodo = async (req, res)=>{
    try {
        const { id } = req.params
        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ todo });
    } catch (error) {
        console.error('Error Fetching todo:', error.message)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateTodo = async (req, res)=>{
    try {
        const { id } = req.params
        // const { title, description, dueDate, status, category } = req.body
        const todo = await Todo.findByIdAndUpdate(
            id,
            req.body, // direct body theke asbe data
            // { title, description, dueDate, status, category },
            { new: true, runValidators: true } // update date asbe 
        )
        if(!todo){
            return res.status(404).json({message: 'Todo not found'})
        }

        res.status(200).json({message: 'Todo Update Sucessfully', todo})

    } catch (error) {
        console.error('Error Update Todo:', error.message)
        res.status(500).json({ message: 'Internal server error'})
    }
}

const deleteTodo= async(req, res)=>{
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id)
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
        console.error('Error delete Todo:', error.message)
        res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = { createTodo, getAllTodo, getAllTodoByUser, getSingleTodo, updateTodo, deleteTodo }