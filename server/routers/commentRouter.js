const express = require("express")
const { commentController, postController } = require('../controllers')
const { auth } = require('../helper/authToken')

const router = express.Router()

// router.post("/", auth, commentController.AddComment)
router.post("/", commentController.AddComment)
router.post("/liked", commentController.LikeAComment)

module.exports = router