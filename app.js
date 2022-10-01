const express = require ('express');
const app = express();
const path = require ('path');
require('dotenv').config();
const PORT = process.env.PORT || 3000;;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("/public")); // to render static file like CSS, plain javascript, fonts, images.
app.use(express.static(path.join(__dirname, 'public')));


// router middlewares
const indexRoute = require('./src/routes/index');
const UserRoute = require('./src/routes/userRoutes/auth');
app.use('/',indexRoute);
app.use('/api',UserRoute);





//connect to database and spin up the server using IIFE
const connectDb = require('./src/config/dbConfig');
(async()=>{
    try{
        const connected = await connectDb(process.env.DB_ATLAS);
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
