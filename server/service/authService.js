const { registerValidation, loginValidation } = require("../helper/validation")
const { Users } = require("../models/index")
const bcrypt = require('bcrypt')
const { createToken } = require("../helper/createToken")
const transporter = require("../helper/nodemailer")
const Service = require("./service")


class AuthService {
    constructor(req) {
        this.req = req
    }

    async registerUser() {
        // validate data
        let service = new Service()
        const { error } = registerValidation(this.req)
        if (error) {
            // return {
            //     success: false,
            //     err: error.details[0].message

            // }
            return service.error(error.details[0].message)
        }

        let { username, email, password } = this.req

        // Check if email exist
        const emailExist = await Users.findOne({ where: { email: email } })
        if (emailExist) return service.error("Email is already taken")

        // Check if username exist
        const usernameExist = await Users.findOne({ where: { username: username } })
        if (usernameExist) return service.error("Username is already taken")

        //Hash password
        const hashed = await bcrypt.hash(password, 10)
        const addedUser = await Users.create({
            ...this.req,
            password: hashed,
            isActive: false,
            profilePhoto: "/images/profilePhotos/profile-default.png",
            backgroundPhoto: "/images/backgroundPhotos/profile-default.png",
            roleId: 2
        })

        // Create Token
        const getNewUser = await Users.findByPk(addedUser.id)
        const { id, isActive, roleId } = getNewUser
        const rawData = { id, email, username, isActive, roleId }
        let token = createToken({ rawData })

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
                return service.error("Registration failed")
            }
        })
        delete addedUser.dataValues.password
        return service.success({ user: addedUser, token: token })
    }

    async resendVerification() {
        let service = new Service()
        // validate data
        const { error } = loginValidation(this.req)
        if (error) {
            return service.error(err.details[0].message)
        }

        let { username, password } = this.req

        // Check if username
        const userExist = await Users.findOne({ where: { username: username } })
        if (!userExist) return service.error("User is not exist")

        // Check password
        const validPass = await bcrypt.compare(password, userExist.password)
        if (!validPass) return service.error("Invalid password")

        // Create Token
        let { id, email, isActive, roleId } = userExist
        const rawData = { id, email, username, isActive, roleId }
        let token = createToken({ rawData })


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
                return service.error("Failed to send verification")
            }
        })
        return service.success({ token: token })
    }

    async verification() {
        let service = new Service()
        let { id } = this.req.rawData

        // check if user already verify
        const userVerify = await Users.findOne({ where: { id: id, isActive: 1 } })
        if (userVerify) return service.error("Account is already verify")

        // Update status active
        await Users.update(
            { isActive: true }, { where: { id: id } })
        return service.success()
    }

    async login() {
        let service = new Service()
        // validate data
        const { error } = loginValidation(this.req)
        if (error) {
            return service.error(error.details[0].message)
        }

        let { username, password } = this.req

        // Check if username
        const userExist = await Users.findOne({ where: { username: username } })
        if (!userExist) return service.error('User is not exist')

        // Check password
        const validPass = await bcrypt.compare(password, userExist.password)
        if (!validPass) return service.error('Invalid Password')

        // Create Token
        let { id, email, isActive, roleId } = userExist
        let token = createToken({ id, email, username, isActive, roleId })

        if (isActive === false) {
            return service.error("Your account need to be verify")
        }

        return service.error({ token: token, result: { id, email, username, isActive, roleId } })
    }

    async checkLogin() {
        let service = new Service()
        let { id } = this.req
        const userExist = await Users.findOne({ where: { id: id } })

        if (!userExist) return service.error('Invalid Password')

        delete userExist.dataValues.password

        return service.success(userExist)
    }


}


module.exports = AuthService