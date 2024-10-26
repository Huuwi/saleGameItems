const AuthHelper = require('../helper/auth.helper.js')
let authHelper = new AuthHelper()




class AuthMiddleWare {

    async decodeAccessToken(req, res, next) {
        try {
            req.decodeAccessToken = {}
            let validAccessToken = authHelper.verifyAccessToken(req?.cookies?.at)

            if (!validAccessToken?.state) {
                return res.status(400).json({
                    message: "invalid access !"
                })
            }
            req.decodeAccessToken = validAccessToken.decodeAccessToken

            if (req?.cookies?.at != globalThis.tokenOfUserId.get(req.decodeAccessToken.userId)) {
                return res.status(400).json({
                    message: "old token!"
                })
            }

            next()


        } catch (error) {
            console.log("error when decode accesstoken : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }

    }



}



module.exports = AuthMiddleWare

