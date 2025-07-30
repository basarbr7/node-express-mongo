const { nanoid } = require('nanoid');

const User = require('../models/user.model')

const alluser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send( error.message || 'Internal server error');        
    }
}
const userById = async (req, res) => {
    try {
        const userId = await req.params.id
        const user = await User.findOne({
            id: userId
        })
        res.status(200).json(user || { message: 'User not found' });
    } catch (error) {
        console.error('Error featching user:', error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    try {
        const newUser = new User({
            id: nanoid(),
            name: req.body.name,
            email: req.body.email,
            age: Number(req.body.age) || 18
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ id: userId });
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.age = Number(req.body.age) || user.age;
        await user.save();
        res.status(200).json(user || { message: 'User not found' });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await User.deleteOne({ id: userId });
        console.log(result);
        if(result.deletedCount === 0){
            res.status(404).send('User not found' );
        } 
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { alluser, userById, createUser, updateUser, deleteUser };