const { generatorCaptcha, verifyCaptcha } = require("../helper/common.helper.js")


class CommonController {

    async getNewCaptcha(req, res) {

        try {

            let ipAddress = req.headers["x-forwarded-for"] || req.ip

            if (!ipAddress) {
                return res.status(400).json({
                    message: "not found ip address!"
                })
            }

            let captchaData = await generatorCaptcha(ipAddress)

            if (!captchaData?.state) {

            }


        } catch (error) {

            console.log("error when getNewCaptcha :  ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }

    }

}


module.exports = CommonController



