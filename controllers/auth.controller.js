const { nanoid } = require('nanoid');

const Auth = require('../models/auth.model')

const registerUser = async (req, res) => {
    try {
        const {name, email, password, confirmPassword } = req.body;
        const existingUser = await Auth.findOne({ email });
        if (existingUser) return res.status(400).send('User with this email already exists');
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const newUser = new Auth({
            id: nanoid(),
            name,
            email,
            password,
        })
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ email });
        if (!user){
            return res.status(404).json({ message: 'User not found'})
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user: {
            id: user.id,
            name: user.name,
            email: user.email
        }}) 
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }

}

const getallregisteredUsers = async (req, res) => {
    try {
        const users = await Auth.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching registered users:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { registerUser, getallregisteredUsers, loginUser };