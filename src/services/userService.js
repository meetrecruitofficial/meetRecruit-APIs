const User = require ('../models/userModel');
require('dotenv').config();
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');


class UserService{
    async createUser(data){

        // hash the password using bcrypt hash function/algorithm 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password,salt)  //bcrypt.hashSync(req.body.password, 10); for automatic salt and hash

        // to create a new user
        const user =  new User ({
            firstname : data.fname,
            lastname : data.lname,
            phone : data.phone,
            sex : data.sex,
            age : data.age,
            country : data.country,
            skills : data.skills,
            level : data.level,
            state: data.state,
            email : data.email,
            password : hashedPassword,    // stores the hashed password
        })

        try{
            const savedUser = await user.save();
            console.log('User created successfully :', savedUser);
            // res.json({status : 200}, savedUser) .. depricated 
            // res.status(200).json(savedUser)
        const token = jwt.sign({id : savedUser._id},process.env.TOKEN_KEY)
        return token;
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

    async getUsers() {
    return await User.find({});
  }

  async getUsersCount() {
    return await User.find({}).count();
  }

  async getUser(userId) {
    const user = await User.findOne({ _id: userId });

    return user;
  }
}

module.exports = new UserService;