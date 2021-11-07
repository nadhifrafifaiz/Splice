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
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation