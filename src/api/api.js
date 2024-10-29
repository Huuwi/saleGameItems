const api = require("express").Router()
const CommonController = require("../controller/common.controller.js")
const AuthController = require("../controller/auth.controller.js")

const AuthMiddleWare = require("../middleware/auth.middleware.js")
const authMiddleWare = new AuthMiddleWare()

let commonController = new CommonController()
let authController = new AuthController()

api.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.cookie("test", "test")
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})

api.post("/getNewCaptcha", commonController.getNewCaptcha)
api.post("/login", authController.login)
api.post("/register", authController.register)
api.post("/getNewAccessToken", authController.getNewAccessToken)

api.use("/auth", authMiddleWare.checkInforAccessToken)

api.post("/auth/getInforUser", authController.getInforUser)

api.post("/auth/getSalingItemList", commonController.getSalingItemList)

api.get("/testSocket", (req, res) => {
    globalThis.io.sockets.emit("message", Math.random())
    res.status(200).json({
        message: "ok"
    })
})

module.exports = { api }