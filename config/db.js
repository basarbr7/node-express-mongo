const mongoose = require('mongoose');
const config = require('./config')

const dbUrl = config.db.url;

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbUrl)
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
}


// const connectDB = async () => {
//     try {
//         await mongoose.connect(dbUrl, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.error('Database connection failed:', error.message);
//         process.exit(1); 
//     }
// }

module.exports = connectDB;