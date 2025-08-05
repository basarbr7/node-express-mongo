const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user){
            return res.status(404).json({ message: 'User not found'})
        }
        // Compare the provided password with the stored hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
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

module.exports = { loginUser };