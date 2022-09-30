const User = require ('../models/userModel');
require('dotenv').config();
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const {
    registerValidation,
    loginValidation
} = require ('../validators/joiValidator');


class UserService{
    async createUser(data){

        // hash the password using bcrypt hash function/algorithm 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password,salt)  //bcrypt.hashSync(req.body.password, 10); for automatic salt and hash

        // to create a new user
        const user =  new User ({
            firstname : data.fname,
            lastname : data.lname,
            sex : data.sex,
            age : data.age,
            country : data.country,
            skills : data.skills,
            level : data.level,
            email : date.email,
            password : hashedPassword,    // stores the hashed password
        })

        try{
            const savedUser = await user.save();
            console.log('User created successfully :', savedUser);
            // res.json({status : 200}, savedUser) .. depricated 
            // res.status(200).json(savedUser)
            return savedUser
        }
        catch (error){
            console.log(error)
        }
    }

    async loginUser(data){
        const user = await User.findOne({email : data.email})
        const validPassword = await bcrypt.compare(data.password,user.password);
        if(user && validPassword ){
            const token = jwt.sign({id : user._id},process.env.TOKEN_KEY)
            return token;
        }
    }
}

module.export = new UserService;