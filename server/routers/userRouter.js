const express = require("express")
const { userController } = require('../controllers')

const router = express.Router()

router.post("/register", userController.Register)

module.exports = router
