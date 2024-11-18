const express = require("express");
require("dotenv").config({ path: "./.env" });
const { configApp } = require("./config/configAppExpress.js");
const { api } = require("./api/api.js");
const { Connection } = require("./database/connection.js");
const { createServer } = require("http");
const SocketIo = require("./socketIo/socket.io.js");
const { configSocketIo } = require("./config/configSocketIo.js");
const axios = require("axios")

// Global variables
globalThis.connection = new Connection();
// globalThis.connection.connect();
globalThis.tokenOfUserId = new Map();
globalThis.socketOfUserId = new Map();
globalThis.tokenCaptcha = new Map();

// //testing

// globalThis.tokenCaptcha.set('30e8ba83efd0bf58643cadb6fe25fd42', {
//     isUse: true,
//     text: 'E4Wbn',
//     date: 9731747216718
// }) // captcha already use!

// globalThis.tokenCaptcha.set('af9b71ae0e9149115dce78e25d72a742', {
//     isUse: false,
//     text: 'E4Wbn',
//     date: 31747216718
// }) // captcha expired time!


// globalThis.tokenCaptcha.set('cb5a3d7736c102a417e91c5bc627b692', {
//     isUse: false,
//     text: '329ns',
//     date: 9731747216718
// }) //valid success!



// globalThis.tokenCaptcha.set('91c5bc627b692cb5a3d7736c102a417e', {
//     isUse: false,
//     text: '123sa',
//     date: 9731747216718
// }) //valid success!


// globalThis.tokenCaptcha.set('1235bc627b692cb5a3d7736c102a417e', {
//     isUse: false,
//     text: '123sa',
//     date: 9731747216718
// }) //valid success!


// globalThis.tokenCaptcha.set('6875bc627b692cb5a3d7736c102a417e', {
//     isUse: false,
//     text: '123sa',
//     date: 9731747216718
// }) //valid success!

// globalThis.tokenCaptcha.set('5123bc627b692cb5a3d7736c102a417e', {
//     isUse: false,
//     text: '123sa',
//     date: 9731747216718
// }) //valid success!





//testing


// Create app and config
const app = express();
configApp(app);

const httpServer = createServer(app);
const io = new SocketIo(httpServer, configSocketIo);
globalThis.io = io; // Global io


// Use API route
app.use("/api", api);


//ping server
async function initializeApp() {
    try {
        // Attempt to connect to the database
        await globalThis.connection.connect();

        // Once connected, start the HTTP server
        const PORT = process.env.PORT || 8000;
        httpServer.listen(PORT, () => {
            console.log("httpServer is running on port:", PORT);
        });

        // Use API routes
        app.use("/api", api);

        // Ping the frontend periodically
        setInterval(async () => {
            try {
                const response = await axios.get(process.env.FONT_END_URL + "/ping");
                console.log("Frontend response:", response.data);
            } catch (error) {
                console.error("Error fetching from backend:", error.message);
            }
        }, Math.floor(Math.random() * 500000) + 100000);
    } catch (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1); // Exit if DB connection fails
    }
}

// Initialize the app
initializeApp();

module.exports = { httpServer, initializeApp };