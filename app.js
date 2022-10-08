const express = require ('express');
const app = express();
const path = require ('path');
require('dotenv').config();
const cors = require('cors') //Cross-origin Resource Sharing
const PORT = process.env.PORT || 3000;;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("/public")); // to render static file like CSS, plain javascript, fonts, images.
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());  // to initialise the cors middleware

const corsOptions ={
   origin:'https://meetrecruitweb.netlify.app', 
   credentials:false,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization')
  next();
});

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
