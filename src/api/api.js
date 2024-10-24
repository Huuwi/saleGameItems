const api = require("express").Router()
const CommonController = require("../controller/common.controller.js")


let commonController = new CommonController()

api.get("/", (req, res) => {
    const forwardedIp = req.headers['x-forwarded-for'] || req.ip
    res.status(200).json(
        {
            message: "your ip address : " + forwardedIp
        }
    )
})

api.post("/getNewCaptcha", commonController.getNewCaptcha)


module.exports = { api }