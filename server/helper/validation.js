const Joi = require('joi')

// Registration Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    })
    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        resend: Joi.boolean()
    })
    return schema.validate(data)
}

const postValidation = (data) => {
    const schema = Joi.object({
        postTitle: Joi.string().min(1).max(25).required(),
        postBody: Joi.string().min(6).max(250).required(),
        UserId: Joi.number().required()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation