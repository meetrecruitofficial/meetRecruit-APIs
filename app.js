const express = require ('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;;






//connect to database and spin up the server using IIFE
const connectDb = require('./src/config/dbConfig');
(async()=>{
    try{
        const connected = await connectDb(process.env.DB_URL);
        app.listen(PORT,()=>{ return console.log(`Server is listening on port: ${PORT}`)});
        if(connected){
            console.log("Database connected")
        }
        else console.log('Database not connected')
    }
    catch(error){
        console.log(error)
    }
})();
