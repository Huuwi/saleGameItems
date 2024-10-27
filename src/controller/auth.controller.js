const bcrypt = require('bcryptjs');


const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()

const AuthHelper = require("../helper/auth.helper.js")
let authHelper = new AuthHelper()

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

            let at = authHelper.generatorAccessToken({ userId }).at
            let rt = authHelper.generatorRefreshToken({ userId }).rt


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

    async getInforUser(req, res) {

        try {
            let userId = req?.decodeAccessToken?.userId

            if (!userId) {
                res.status(400).json({
                    message: "not found userId!"
                })
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userId = ?", [userId])
                .then((res) => {
                    return res[0]
                })

            if (!userFound) {
                return res.status(400).json({
                    message: "not found user!"
                })
            }

            let { password, ...userData } = userFound

            return res.status(200).json({
                message: "ok",
                userData
            })


        } catch (error) {

            console.log("err when getInforUser : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }
    }

    getNewAccessToken(req, res) {

        try {

            let rt = req.cookies?.rt

            console.log("get new access : ", req.cookies);


            if (!rt) {
                return res.status(400).json({
                    message: "not found refresh token!"
                })
            }

            let validRefreshToken = authHelper.verifyRefreshToken(rt)

            if (!validRefreshToken?.state) {
                return res.status(400).json({
                    message: validRefreshToken.message
                })
            }

            let tokenOfUserId = globalThis.tokenOfUserId.get(validRefreshToken?.decodeRefreshToken?.userId)

            if (tokenOfUserId?.rt != rt) {
                res.cookie("rt", "")
                return res.status(400).json({
                    message: "old refresh token!"
                })
            }

            let newAt = authHelper.generatorAccessToken({ userId: validRefreshToken?.decodeRefreshToken?.userId })

            res.cookie("at", newAt, { httpOnly: true, maxAge: 3600000 * 12, sameSite: "none", secure: true })

            return res.status(200).json({
                message: "ok"
            })

        } catch (error) {
            console.log("err when getNewAccessToken : ", error);
            res.status(500).json({
                message: "have wrong!"
            })
        }

    }


}


module.exports = AuthController