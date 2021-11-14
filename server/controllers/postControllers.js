const { postValidation } = require("../helper/validation")
const { Posts, Users } = require("../models/index")

module.exports = {
    AddPost: async (req, res) => {
        try {
            const post = req.body
            const { id } = req.user;

            const userActive = await Users.findOne({ where: { id: id } })
            if (userActive.isActive === false) {
                return res.status(400).send({ "message": "Account is not active, please verified your account via email" })
            }

            if (id != post.UserId) {
                return res.status(400).send({ "message": "Error occurs please try to login with right account" })
            }

            // validate data
            const { error } = postValidation(post)
            if (error) {
                return res.status(400).send(error.details[0].message)
            }

            await Posts.create(post)
            res.status(200).send(post)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    GetPosts: async (req, res) => {
        try {
            const listOfPosts = await Posts.findAll()
            res.status(200).send(listOfPosts)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}