const express = require("express")
const dotenv = require("dotenv").config({ path: "./.env" })

const configServer = (server) => {
    server.use(express.json())
    server.use(express.static("./src/public"))
    server.use(express.urlencoded({ extended: true }))
}

module.exports = { configServer }

