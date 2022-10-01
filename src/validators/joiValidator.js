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
    fname : Joi.string()
        .min(1)
        .required(),
    lname : Joi.string()
        .min(1)
        .required(),
    phone : Joi.string()
        .min(1),
    sex : Joi.string()
        .min(1),
    age : Joi.string()
        .min(1),
    country : Joi.string()
        .min(1),
    skills : Joi.string()
        .min(1),
    level : Joi.string()
        .min(1),
    state : Joi.string()
        .min(1),
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