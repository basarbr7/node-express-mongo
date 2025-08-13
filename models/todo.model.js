const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;