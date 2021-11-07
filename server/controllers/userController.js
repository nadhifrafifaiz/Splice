const { registerValidation } = require("../helper/validation")
const { Users } = require("../models/index")
const bcrypt = require('bcrypt')

module.exports = {
    Register: async (req, res) => {
        // validate data
        const { error } = registerValidation(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // Check if email exist
        const emailExist = await Users.findOne({ where: { email: req.body.email } })
        console.log(emailExist);
        if (emailExist) return res.status(400).send('Email already exist')

        //Hash password
        const hashed = await bcrypt.hash(req.body.password, 10)
        console.log({ ...req.body, password: hashed });

        await Users.create({ ...req.body, password: hashed })

        return res.status(200).send({ message: "Registration Success" })
    }
}