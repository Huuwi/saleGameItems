const express = require("express")
const dotenv = require("dotenv").config({ path: "./.env" })
const cors = require("cors")
const urls = ["http://localhost5173", process.env.FONT_END_URL]


const configServer = (server) => {
    server.use(express.json())
    server.use(express.static("./src/public"))
    server.use(express.urlencoded({ extended: true }))
    server.use(cors({
        origin: urls
    }))
}

module.exports = { configServer }

