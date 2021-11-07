const Joi = require('joi')

// Registration Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        isActive: Joi.boolean().required(),
        profilePhoto: Joi.string().required(),
        backgroundPhoto: Joi.string().required(),
        roleId: Joi.number().required()

        //         "isActive":false,
        //  "profilePhoto":"profile.jpeg",
        //  "backgroundPhoto":"background.png",
        //  "RoleId":2  
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation