const express = require("express")
const { userController } = require('../controllers')
const { auth } = require("../helper/authToken")

const router = express.Router()

router.post("/register", userController.Register)
router.post("/verification", auth, userController.verification)

module.exports = router
