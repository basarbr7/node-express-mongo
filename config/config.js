require('dotenv').config();

const db_url= ()=>{
    const server = process.env.MONGODB_SERVER;
    const password = process.env.DB_PASSWORD;
    if(server && password){
        return server.replace('<password>', process.env.DB_PASSWORD)
    }
    else{
        console.warn("Using local DB because MONGODB_SERVER or DB_PASSWORD not found.")
        return process.env.LOCAL_SERVER;
    }
}

const dev = {
    app: {
        port: process.env.PORT || 3001
    },
    db: {
        url:  db_url(),
    }
}

module.exports = dev;
