const { registerValidation, loginValidation } = require("../helper/validation")
const { Users } = require("../models/index")
const bcrypt = require('bcrypt')
const { createToken } = require("../helper/createToken")
const transporter = require("../helper/nodemailer")
const AuthService = require("../service/authService")

module.exports = {
    register: async (req, res) => {
        try {
            const authService = new AuthService(req.body)
            const serviceResult = await authService.registerUser()

            if (serviceResult.success === false) {
                throw serviceResult.err;
            }
            return res.status(201).json({
                message: "Your account has been registered!",
                result: serviceResult
            });


        } catch (err) {
            return res.status(400).send(err)
        }

    },


    resend: async (req, res) => {
        try {
            const authService = new AuthService(req.body)
            const serviceResult = await authService.resendVerification()

            if (serviceResult.success === false) {
                throw serviceResult.err;
            }
            return res.status(201).json({
                message: "Check your email to verify your account",
                result: serviceResult
            })

        } catch (err) {
            return res.status(400).send(err)
        }

    },
    verification: async (req, res) => {
        try {
            console.log(req.user);
            const authService = new AuthService(req.user)
            const serviceResult = await authService.verification()

            if (serviceResult.success === false) {
                throw serviceResult.err
            }

            return res.status(201).json({
                message: "Your account successfully verify",
            })

        } catch (err) {
            res.status(500).send(err)
        }
    },
    login: async (req, res) => {
        try {
            const authService = new AuthService(req.body)
            const serviceResult = await authService.login()

            if (serviceResult.success === false) {
                throw serviceResult.err
            }

            return res.status(201).json({
                message: "Successfully login",
                result: serviceResult.result,
                token: serviceResult.token
            })

        } catch (err) {
            res.status(500).send(err)
        }

    },
    // Check Login
    getDataUser: async (req, res) => {
        try {
            console.log("HALO");
            const authService = new AuthService(req.user)
            const serviceResult = await authService.checkLogin()

            if (serviceResult.success === false) {
                throw serviceResult.err
            }

            return res.status(201).json({
                message: "Success check login",
                result: serviceResult
            })

        } catch (err) {
            res.status(500).send(err)
        }
    }

}