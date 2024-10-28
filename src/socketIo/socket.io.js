const { Server } = require("socket.io");

class SocketIo extends Server {
    constructor(httpServer, configSocketIo) {
        super(httpServer, configSocketIo);
        this.middlewares = []; // Danh sách middleware cho socket

        // Lắng nghe sự kiện kết nối
        this.on("connection", (socket) => this.handleConnection(socket));

        console.log("Socket.IO server initialized successfully.");
    }

    /**
     * Xử lý sự kiện kết nối từ client
     */
    handleConnection(socket) {
        console.log(`Client connected: ${socket.id}`);

        // Gọi tất cả middleware trước khi xử lý sự kiện
        this.runMiddlewares(socket);

        // Xử lý khi client ngắt kết nối
        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    }

    /**
     * Chạy tất cả middleware cho một socket
     */
    runMiddlewares(socket) {
        this.middlewares.forEach((middleware) => middleware(socket));
    }

    /**
     * Đăng ký middleware cho tất cả socket
     */
    useMiddleware(middleware) {
        this.middlewares.push(middleware);
    }

    /**
     * Phát tin nhắn tới tất cả các client (broadcast)
     */
    broadCastMessage(message) {
        this.emit("message", message);
    }

    /**
     * Gửi tin nhắn đến một client cụ thể bằng socketId
     */
    sendMessageToSocketId(message, socketId) {
        const socket = this.sockets.sockets.get(socketId);
        if (socket) {
            socket.emit("message", message);
        } else {
            console.log("Socket ID not found: " + socketId);
        }
    }

    /**
     * Gửi tin nhắn đến một room cụ thể
     */
    sendMessageToRoom(room, event, message) {
        this.to(room).emit(event, message);
    }

    /**
     * Đăng ký sự kiện tùy chỉnh cho tất cả các client
     */
    registerGlobalEvent(eventName, callBack) {
        this.on(eventName, callBack);
    }

    /**
     * Thêm socket vào một room
     */
    addSocketToRoom(socket, room) {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room ${room}`);
    }

    /**
     * Loại bỏ socket khỏi một room
     */
    removeSocketFromRoom(socket, room) {
        socket.leave(room);
        console.log(`Socket ${socket.id} left room ${room}`);
    }
}

module.exports = SocketIo;
