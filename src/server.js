const express = require("express")
const dotenv = require("dotenv").config({ path: "./.env" })
const { configServer } = require("./config/configServer.js")
const { api } = require("./api/api.js")
const { Connection } = require("./database/connection.js")
globalThis.connection = new Connection()
globalThis.connection.connect()
globalThis.captchaOfIpAddress = new Map()
//create server and config
const server = express()
configServer(server)


//use api route
server.use("/api", api)



//running server
let PORT = process.env.PORT || 8000
server.listen(PORT, () => {
    console.log("server is running on port : ", PORT);
})