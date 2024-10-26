const bcrypt = require('bcryptjs');


const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()

const AuthHelper = require("../helper/auth.helper.js")
let autHelper = new AuthHelper()

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

            let charactersNotValid = ["`", '"', "`"]


            for (let e of charactersNotValid) {
                if (userName.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userName = ?", [userName])
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    console.log(e);
                })



            if (!bcrypt.compareSync(passWord, userFound.password)) {
                return res.status(400).json({
                    message: "password is not correct!"
                })
            }
            let userId = userFound.userId

            let at = autHelper.generatorAccessToken({ userId }).at
            let rt = autHelper.generatorRefreshToken({ userId }).rt


            globalThis.tokenOfUserId.set(userId, {
                at, rt
            })


            res.cookie("at", at, { httpOnly: true, maxAge: 3600000 * 12, sameSite: "none", secure: true, })
            res.cookie("rt", rt, { httpOnly: true, maxAge: 3600000 * 12, sameSite: "none", secure: true, })

            let { nickName, avartar, gameId, isRegSale, isAdmin, balance } = userFound
            let userData = { nickName, avartar, gameId, isRegSale, isAdmin, balance }
            return res.status(200).json({
                message: "ok",
                userData
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

            let { text, userName, passWord, rePassWord, nickName } = req.body
            let ipAddress = req.ip || req.headers["x-forwarded-for"]

            if (!text || !userName || !passWord || !rePassWord || !nickName) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            let charactersNotValid = ["`", '"', "`"]


            for (let e of charactersNotValid) {
                if (userName.includes(e) || nickName.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
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
                    return data
                })
                .catch((e) => {
                    console.log(e);
                })

            if (userFound?.length) {
                return res.status(400).json({
                    message: "userName already existed!",
                })
            }

            const salt = bcrypt.genSaltSync(10);
            let hashPassWord = bcrypt.hashSync(passWord, salt)

            await globalThis.connection.executeQuery(`INSERT INTO user (userName , passWord , nickName)
                                                        VALUES (? , ? , ?);` , [userName, hashPassWord, nickName])



            return res.status(200).json({
                message: "ok",
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