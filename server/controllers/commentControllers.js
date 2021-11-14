const { Users, Comments, CommentLikes } = require("../models/index")

module.exports = {
    AddComment: async (req, res) => {
        try {
            const comment = req.body

            await Comments.create(comment)
            res.status(200).send({ comment, message: "Comment succesfully added" })

        } catch (error) {
            return res.status(400).send(error)
        }
    },
    LikeAComment: async (req, res) => {
        try {
            const like = req.body
            const checkLiked = await CommentLikes.findAll({ where: { CommentId: like.CommentId, UserId: like.UserId } })

            if (checkLiked.length === 0) {
                await CommentLikes.create(like)
                return res.status(200).send({ like, message: "Liked Success" })
            }
            return res.status(200).send({ message: "You already liked this comment" })

        } catch (error) {
            return res.status(400).send(error)
        }
    }
}