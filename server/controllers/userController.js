const { registerValidation, loginValidation } = require("../helper/validation")
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
        if (emailExist) return res.status(200).send({ message: 'Email already exist', success: false })

        // Check if username exist
        const usernameExist = await Users.findOne({ where: { username: req.body.username } })
        if (usernameExist) return res.status(200).send({ message: 'Username already exist', success: false })

        //Hash password
        const hashed = await bcrypt.hash(req.body.password, 10)
        const addedUser = await Users.create({
            ...req.body,
            password: hashed,
            isActive: false,
            profilePhoto: "/images/profilePhotos/profile-default.png",
            backgroundPhoto: "/images/backgroundPhotos/profile-default.png",
            roleId: 2
        })

        // Create Token
        const getNewUser = await Users.findByPk(addedUser._previousDataValues.id)
        let { id, email, username, isActive, roleId } = getNewUser
        let token = createToken({ id, email, username, isActive, roleId })

        // Create Email
        let mail = {
            from: `Admin splace`,
            to: `${email}`,
            subject: 'Account Verification',
            html: `<a href='http://localhost:3000/verification/${token}'>Click here for verification your account<a/>`
        }

        transporter.sendMail(mail, async (errMail, resMail) => {
            if (errMail) {
                await Users.destroy({
                    where: { id: id },
                    force: true
                })
                return res.status(500).send({ message: "Registration Failed", success: false, err: errMail })
            }
            return res.status(200).send({ message: "Registration success check your email", success: true })
        })
    },
    resend: async (req, res) => {
        // validate data
        const { error } = loginValidation(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // Check if username
        const userExist = await Users.findOne({ where: { username: req.body.username } })
        if (!userExist) return res.status(400).send('User is not exist')

        // Check password
        const validPass = await bcrypt.compare(req.body.password, userExist.password)
        if (!validPass) return res.status(400).send('Invalid password')

        // Create Token
        let { id, email, username, isActive, roleId } = userExist
        let token = createToken({ id, email, username, isActive, roleId })

        // Create Email
        let mail = {
            from: `Admin splace`,
            to: `${email}`,
            subject: 'Account Verification',
            html: `<a href='http://localhost:3000/verification/${token}'>Click here for verificationNNNN your account<a/>`
        }

        transporter.sendMail(mail, async (errMail, resMail) => {
            if (errMail) {
                await Users.destroy({
                    where: { id: id },
                    force: true
                })
                return res.status(500).send({ message: "Failed", success: false, err: errMail })
            }
            return res.status(200).send({ message: "Check your email", success: true })
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

        // validate data
        const { error } = loginValidation(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // Check if username
        const userExist = await Users.findOne({ where: { username: req.body.username } })
        if (!userExist) return res.status(200).send({ message: 'User is not exist', success: false })

        // Check password
        const validPass = await bcrypt.compare(req.body.password, userExist.password)
        if (!validPass) return res.status(200).send({ message: 'Invalid Password', success: false })

        // Create Token
        let { id, email, username, isActive, roleId } = userExist
        let token = createToken({ id, email, username, isActive, roleId })

        if (isActive === false) {
            return res.status(200).send({ message: "Your account need to be verify" })
        }

        return res.status(200).send({ message: "Successfully login", token: token, id, email, username, isActive, roleId, success: true })



    },
    // Check Login
    getDataUser: async (req, res) => {
        try {
            const { id } = req.user
            const userExist = await Users.findOne({ where: { id: id } })
            delete userExist.dataValues.password

            return res.status(200).send(userExist)
        } catch (error) {
            return res.send(error)
        }
    }

}