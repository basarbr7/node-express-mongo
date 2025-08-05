const bcrypt = require('bcrypt');

const generateHash = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpass = await bcrypt.hash(password, salt);
    console.log(hashedpass);
    
}
generateHash('12345678')
// generateHash('12345678')
//     .then(hash => console.log('Hashed Password:', hash))
//     .catch(err => console.error('Error hashing password:', err));


