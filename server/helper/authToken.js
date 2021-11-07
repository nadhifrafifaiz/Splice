const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        jwt.verify(req.token, "splace1412", (err, decode) => {
            if (err) {
                return res.status(401).send("User not Auth!")
            }
            req.user = decode
            next()
        })
    }
}