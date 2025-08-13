// const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')

const alluser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send( error.message || 'Internal server error');        
    }
}

const userById = async (req, res) => {
    try {
        const userId = await req.params.id
        console.log(userId);
        
        const user = await User.findOne({
            _id: userId
        })
        res.status(200).json(user || { message: 'User not found' });
    } catch (error) {
        console.error('Error featching user:', error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if(!name || !email || !password || !confirmPassword) {
            return res.status(400).send('All fields are required');
        }
        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).send('User with this email already exists');
        // Check if email is valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Email must be a valid Gmail address');
        }
        // Check if passwords match
        if(password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPass,
        });
        // Save the new user to the database
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            user: { newUser }
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId });
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
        const result = await User.deleteOne({ _id: userId });
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