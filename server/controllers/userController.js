const { registerValidation } = require("../helper/validation")
const { Users } = require("../models/index")
const bcrypt = require('bcrypt')
const { createToken } = require("../helper/createToken")
const transporter = require("../helper/nodemailer")

module.exports = {
    Register: async (req, res) => {
        // validate data
        const { error } = registerValidation(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // Check if email exist
        const emailExist = await Users.findOne({ where: { email: req.body.email } })
        if (emailExist) return res.status(400).send('Email already exist')


        //Hash password
        const hashed = await bcrypt.hash(req.body.password, 10)
        const addedUser = await Users.create({ ...req.body, password: hashed })

        // Create Token
        const getNewUser = await Users.findByPk(addedUser._previousDataValues.id)
        let { id, email, username, isActive, roleId } = getNewUser
        let token = createToken({ id, email, username, isActive, roleId })

        // Create Email
        let mail = {
            from: `Admin splace`,
            to: `${email}`,
            subject: 'Account Verification',
            html: `<a href='http://localhost:3000/authentication/${token}'>Click here for verification your account<a/>`
        }

        transporter.sendMail(mail, async (errMail, resMail) => {
            if (errMail) {
                console.log("aku error");
                await Users.destroy({
                    where: { id: id },
                    force: true
                })
                return res.status(500).send({ message: "Registration Failed", success: false, err: errMail })
            }
            return res.status(200).send({ message: "Registration success check your email", success: true })
        })


    },
    verification: async (req, res) => {
        try {
            let { id } = req.user
            await Users.update(
                { isActive: true }, { where: { id: id } })
            return res.status(200).send({ message: "Your account is verified" })
        } catch (error) {
            res.status(500).send(error)
        }
    },
    login: async (req, res) => {
        console.log("Aku login");
    }

}