const AuthHelper = require("../helper/auth.helper.js");
const authHelper = new AuthHelper();
const { Server } = require("socket.io");

class SocketIo extends Server {
    constructor(httpServer, configSocketIo) {
        super(httpServer, configSocketIo);

        this.use(this.validateToken.bind(this));

        this.on("connection", (socket) => {

            socket.on("disconnect", () => {
                let listSocketOfUserId = globalThis.socketOfUserId.get(socket.userId)

                if (listSocketOfUserId.length == 1) {
                    globalThis.socketOfUserId.set(socket.userId, [])
                    return
                }

                globalThis.socketOfUserId.set(socket.userId, listSocketOfUserId.splice(listSocketOfUserId.indexOf(socket.userId), 1))
                console.log(globalThis.socketOfUserId);
            });
        });

        console.log("Socket.IO server initialized successfully.");
    }


    validateToken(socket, next) {
        try {
            const at = socket.handshake?.auth?.at;
            if (!at) {
                return next(this.createError("missing token", 401));
            }

            const validAccessToken = authHelper.verifyAccessToken(at);
            if (!validAccessToken?.state) {
                return next(this.createError(validAccessToken.message, 403));
            }

            const { userId } = validAccessToken.decodeAccessToken;


            const storedToken = globalThis.tokenOfUserId.get(userId)?.at;
            if (at !== storedToken) {
                return next(this.createError("old token detected", 403));
            }

            socket.userId = userId

            if (!globalThis.socketOfUserId.get(userId)?.length) {
                globalThis.socketOfUserId.set(userId, [socket.id])
            } else {
                globalThis.socketOfUserId.get(userId).push(socket.id)
            }


            console.log(globalThis.socketOfUserId);

            next();
        } catch (error) {
            next(this.createError("Internal Server Error", 500));
        }
    }

    handleDisconnect(socket) {
        const { userId } = socket;
        console.log(`UserId :  ${userId} disconnected (socketId: ${socket.id})`);

        // Xóa socketId khi user ngắt kết nối
        globalThis.tokenOfUserId.delete(userId);
    }

    createError(message, statusCode) {
        const error = new Error(message);
        error.status = statusCode;
        return error;
    }
}

module.exports = SocketIo;
