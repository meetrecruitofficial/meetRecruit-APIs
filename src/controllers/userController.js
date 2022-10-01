const User = require ('../models/userModel');
const {
    registerValidation,
    loginValidation
} = require ('../validators/joiValidator');

const {
    createUser,
    loginUser,
    getUsers,
    getUsersCount,
    getUser,
} = require ('../services/userService')

class UserController {
    // to register a user
    async register(req, res){
        //validate the userInput
        const validDetails = registerValidation(req.body);
        const { error } = validDetails
        if (error) {
            return res.status(400).json({error:error.details[0].message})
        }
        // check if email exist
        const exist = await User.findOne({email:req.body.email})
        if (exist){
            return res.status(400).json({message:"email exist"})
        }
         
        // generate token
        const token = await createUser(req.body);
        if (token){
            return res.status(200).json({token})
        }
    }

    // to login user
    async login(req, res){
        //validate input
        const validDetails = loginValidation(reg.body);
        const {error} = validDetails
        if(error){
            return res.status(401).json({message:error.details[0].message})
        }

        const token = await loginUser(req.body);
        if (token){
            return res.status(200).json({token})
        }
    }

    async getUsers(req, res){
        const allUsers = await getUsers();
        if(allUsers){
            return res.status(200).json({allUsers});
        }
    }

    async getUsersCount(reg, res){
        const userCount = await getUsersCount();
        if(userCount){
            return res.status(200).json({userCount})
            
        }
    }
}

module.exports = new UserController