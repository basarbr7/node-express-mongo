const app = require('./app');
const config = require('./config/config');

// Connect to the database
const connectDB = require('./config/db');

const port = config.app.port;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})