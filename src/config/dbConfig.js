const mongoose = require ('mongoose');

// configuration to connect to the database
const connectDb = (url)=>{
    return mongoose.connect(url)
}

module.exports = connectDb