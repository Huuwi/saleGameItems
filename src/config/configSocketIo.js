require("dotenv").config({ path: "./.env" })


const configSocketIo = {
    cors: {
        origin: process.env.FONT_END_URL,
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }

}

module.exports = { configSocketIo }