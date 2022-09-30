const mongoose = require ('mongoose');

// create the userschema
const userSchema = new mongoose.Schema({
    firstname: {
        type : String,
        required : true,
        min : 1,
        max : 255
    },
    lastname: {
        type : String,
        required : true,
        min : 1,
        max : 255
    },
    sex : {
        type: String,
        enum:['male','female']
    },
    age :{
        type : String,
    },
    country : {
        type: String
    },
    skills : {
        type : String,
    },
    level : {
        type : String,
        enum: ['entry-level','intermediate', 'Senior'],
        default: 'entry-level'
    },
    email : {
        type : String,
        required : true,
        min : 6,
        max : 255,
        unique :true,    // this enforces uniqueness making sure no two users have the same email or username   
    },
    password : {
        type : String,
        required : true,
        min : 6,
        max : 255        
    },
    date : {
        type : Date,
        default : Date.now
    },
});

module.exports = new mongoose.model("user",userSchema);