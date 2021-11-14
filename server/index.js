const express = require('express')
const cors = require('cors')

const PORT = "3001"
const app = express()
const db = require('./models')
const { userRouter, postRouter, commentRouter } = require("./routers")

app.use(express.json())
app.use(cors())


app.use("/auth", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter)


db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 3001");
    })
})