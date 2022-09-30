const Joi = require ('joi');

// const schema = Joi.object({
//     name : Joi.string()
//         .min(6)
//         .required(),
//     email : Joi.string()
//         .min(6)
//         .email()
//         .required(),
//     password : Joi.string()
//         .min(6)
//         .required()
// });

// const validation =(data)=>{
//     return schema.validate(data)
// }



const registerValidation = (data)=>{  // registration validation
    const schema = Joi.object({
    firstname : Joi.string()
        .min(1)
        .required(),
    lastname : Joi.string()
        .min(1)
        .required(),
    email : Joi.string()
        .min(6)
        .email()
        .required(),
    password : Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data)
}

const loginValidation = (data)=>{  // logi validation
    const schema = Joi.object({
    email : Joi.string()
        .min(6)
        .email()
        .required(),
    password : Joi.string()
        .min(6)
        .required()
    });
    return schema.validate(data)
}

module.exports = {
    registerValidation,
    loginValidation
}