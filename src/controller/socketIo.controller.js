const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()


class SocketIoController {


    async testSocket(req, res) {
        try {
            let userId = req?.decodeAccessToken?.userId

            globalThis.io.to(globalThis.socketOfUserId.get(userId).arraySockets[0]).emit("message", req.body.message)
            res.status(200).json({
                message: "ok"
            })
        } catch (error) {
            console.log("err when testsocket : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    }

    async chatWorld(req, res) {

        try {

            let userId = req?.decodeAccessToken?.userId

            let userInfor = globalThis.socketOfUserId.get(userId)?.userInfor

            if (!userInfor) {
                return res.status(400).json({
                    message: "can't call api for this!"
                })
            }

            let { message } = req.body


            globalThis.io.emit("chat_world", JSON.stringify({ message, userInfor }))

            return res.status(200).json({
                message: "ok"
            })

        } catch (error) {
            console.log("err when chatWorld : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }

    }

}

module.exports = SocketIoController

