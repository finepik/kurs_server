const port = 9090;
const process = require("node:process");
const express = require("express");
totalCPUs = require("os").cpus().length;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const os = require("os");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
        console.log("log_request", `user ${socket.id} connected`)

    socket.on("get_info", (args, callback) => {
        console.log("log_request", `GET request from user ${socket.id}`)

        const time = new Date().getTime();

        const process = require("node:process");

        const os = require('os');

        callback({
            homedir:os.homedir(),
            os_version: os.version(),
            time: time,
        });
        console.log("log_request", `Success response to user ${socket.id}`)
    });

    socket.on("disconnect", () => {
                console.log("log_request", `user ${socket.id} disconnected`);
    });
});

server.listen(port, () => {
    console.log("SERVER RUNNING");
});