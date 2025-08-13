const express= require('express')
const cors = require('cors');

const app = express();

// Import routes
const userRoute = require('./routes/user.routes')
const authRoute = require('./routes/auth.routes');
const todoRoute = require('./routes/todo.routes')
// Middleware and routes can be defined here
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Use user routes
app.use('/api/users', userRoute);

// Use auth routes
app.use('/auth', authRoute);

// Use Todo routes
app.use('/api/todos', todoRoute)

// 404 error handler
app.use((req, res, next) => {
    res.status(404).send( 'Sorry, can\'t find that!')
    next();
})

//server error handler
app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
    console.error(err.stack);
    next(err);
    res.status(500).json({ message: 'Internal server error' });
})

module.exports = app;
