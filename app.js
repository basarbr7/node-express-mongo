const express= require('express')
const cors = require('cors');

const app = express();

// Import routes
const userRoute = require('./routes/user.routes')


// Middleware and routes can be defined here
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// Example route
app.get('/', (req, res)=>{
    res.send('Hello world ! This is the home route');
})

// Use user routes
app.use('/api/users', userRoute);

// 404 error handler
app.use((req, res, next) => {
    res.status(404).send( 'Sorry, can\'t find that!')
})

//server error handler
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
})

module.exports = app;
