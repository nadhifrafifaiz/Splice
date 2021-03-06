const express = require("express")
const { postController } = require('../controllers')
const { auth } = require("../helper/authToken")

const router = express.Router()

router.post("/", auth, postController.AddPost)
router.get("/", postController.GetPosts)
router.post("/liked", postController.LikeAPost)


module.exports = router