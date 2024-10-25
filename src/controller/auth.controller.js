var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

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

            if (!valid?.state) {
                return res.status(400).json({
                    message: valid.message,
                })
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userName = ?", [userName])
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    console.log(e);
                })



            return res.status(200).json({
                message: "ok",
                userFound: JSON.stringify(userFound)
            })


        } catch (error) {
            console.log("err when login : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }


    }


    async register(req, res) {
        try {

            let { text, userName, passWord, rePassWord } = req.body
            let ipAddress = req.ip || req.headers["x-forwarded-for"]

            if (!text || !userName || !passWord || !rePassWord) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            if (rePassWord != passWord) {
                return res.status(400).json({
                    message: "Password and re-entered password are not the same!!"
                })
            }


            let valid = commonHelper.verifyCaptcha(ipAddress, text)

            if (!valid?.state) {
                return res.status(400).json({
                    message: valid.message,
                })
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userName = ?", [userName])
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    console.log(e);
                })



            return res.status(200).json({
                message: "ok",
                userFound: JSON.stringify(userFound)
            })


        } catch (error) {
            console.log("err when register : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }



    }

}


module.exports = AuthController