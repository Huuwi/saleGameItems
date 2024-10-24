const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()


class AuthController {

    async login(req, res) {

        try {

            let { text, userName, passWord } = req.body
            let ipAddress = req.ip || req.headers["x-forwarded-for"]

            if (!text || !userName || !passWord) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            let valid = commonHelper.verifyCaptcha(ipAddress, text)


            return res.status(200).json({
                message: "ok",
                valid
            })


        } catch (error) {
            console.log("err when login : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }


    }

}


module.exports = AuthController