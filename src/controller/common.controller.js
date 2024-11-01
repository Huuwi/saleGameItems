const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()


class CommonController {

    async getNewCaptcha(req, res) {

        try {

            let ipAddress = req.headers["x-forwarded-for"] || req.ip

            if (!ipAddress) {
                return res.status(400).json({
                    message: "not found ip address!"
                })
            }

            let captchaData = await commonHelper.generatorCaptcha(ipAddress)

            if (!captchaData?.state) {
                throw new Error("unknown error when generatorCaptcha")
            }

            return res.status(200).json({
                message: "ok!",
                base64: captchaData.base64
            })



        } catch (error) {

            console.log("error when getNewCaptcha :  ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }

    }

    async getSalingItemList(req, res) {
        try {
            let salingItemListData = await globalThis.connection.executeQuery(` 
           SELECT
            i.itemId, 
            i.name,
            i.description,
            i.image,
            i.itemType,
            its.price,
            u.nickName,
            u.avartar,
            u.userId
            FROM user u
            JOIN gameAccount ga ON u.userId = ga.userId
            JOIN item i ON ga.gameId = i.gameId
            JOIN itemSalling its ON i.itemId = its.itemId;
            `)
                .then(data => { return data })
                .catch(err => console.log(err))
            if (!salingItemListData?.length) {
                return res.status(501).json({
                    message: 'Cannot get salingItemListData'
                })
            }
            return res.status(200).json({
                message: 'ok',
                salingItemListData
            })
        }
        catch (err) {
            console.log(`Error when getSalingItemList: ${err}`);
            res.status(500).json({
                message: 'Have wrong'
            })
        }
    }

    async linkAccount(req, res) {
        try {

            let userId = req.decodeAccessToken.userId;

            let { userNameGame, passWordGame, text } = req.body;

            if (!userNameGame || !passWordGame || !text) {
                return res.status(400).json({
                    message: "missing data!",
                })
            }

            let ipAddress = req.ip || req.headers["x-forwarded-for"]
            let valid = commonHelper.verifyCaptcha(ipAddress, text)

            if (!valid?.state) {
                return res.status(400).json({
                    message: valid.message,
                })
            }

            let charactersNotValid = ["`", '"', "`"]
            for (let e of charactersNotValid) {
                if (userNameGame.includes(e) || passWordGame.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userId = ?", [userId])
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    console.log(e);
                })

            if (userFound.gameId > 0) {
                return res.status(400).json({
                    message: "account already linked!"
                })
            }


            let gameAccount = await globalThis.connection.executeQuery("select * from gameAccount where userNameGame = ? and passWordGame = ?", [userNameGame, passWordGame])
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    console.log(e);
                })

            if (gameAccount.userId > 0) {
                return res.status(400).json({
                    message: "account game already linked!"
                })
            }

            await globalThis.connection.executeQuery("update user set gameId = ? where userId = ?", [gameAccount.gameId, userFound.userId])
                .catch((e) => {
                    console.log(e);
                })

            await globalThis.connection.executeQuery("update gameAccount set userId = ? where gameId = ?", [userFound.userId, gameAccount.gameId])
                .catch((e) => {
                    console.log(e);
                })


            return res.status(200).json({
                message: "ok"
            })



        } catch (error) {
            console.log("err when link account : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }


    }




}


module.exports = CommonController

