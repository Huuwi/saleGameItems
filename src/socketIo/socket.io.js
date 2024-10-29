const AuthHelper = require("../helper/auth.helper.js");
const authHelper = new AuthHelper();
const { Server } = require("socket.io");

class SocketIo extends Server {
    constructor(httpServer, configSocketIo) {
        super(httpServer, configSocketIo);

        this.activeSockets = new Map();

        this.use(this.validateToken.bind(this));

        // Lắng nghe sự kiện kết nối
        this.on("connection", (socket) => this.handleConnection(socket));

        console.log("Socket.IO server initialized successfully.");
    }

    /**
     * Middleware xác thực token trong quá trình handshake
     */
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

            // Kiểm tra xem token có phải là bản mới nhất không
            const storedToken = globalThis.tokenOfUserId.get(userId)?.at;
            if (at !== storedToken) {
                return next(this.createError("old token detected", 403));
            }

            // Gắn userId vào socket để tái sử dụng trong các sự kiện khác
            socket.userId = userId;

            next(); // Tiếp tục nếu hợp lệ
        } catch (error) {
            next(this.createError("Internal Server Error", 500));
        }
    }

    /**
     * Xử lý khi kết nối thành công
     */
    handleConnection(socket) {
        const { userId } = socket;

        // Lưu socketId tương ứng với userId
        globalThis.tokenOfUserId.set(userId, { at: socket.handshake.auth.at, socketId: socket.id });

        console.log(`User ${userId} connected with socketId: ${socket.id}`);

        // Xử lý sự kiện ngắt kết nối
        socket.on("disconnect", () => this.handleDisconnect(socket));
    }

    /**
     * Xử lý sự kiện ngắt kết nối
     */
    handleDisconnect(socket) {
        const { userId } = socket;
        console.log(`User ${userId} disconnected (socketId: ${socket.id})`);

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
