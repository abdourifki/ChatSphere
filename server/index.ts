import express from "express"
import { Server } from "socket.io"
import http from "http"
const app = express()
import Message from './models/MessageModel';
import './connection/Db';



const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
    socket.on("message", (data, room) => {
        if (room.length) {
            const newMessage = new Message({
                content: data,
                sender: socket.id
            })
            newMessage.save()
            data && io.to(room).emit("message", data)
            console.log("sending " + data + " to room " + room)
        } else {
            console.log("please join the room first!")
        }
    })
    socket.on("joinRoom", (data) => {
        socket.join("room")
    })
})

server.listen(3030, () => {
    console.log("Server running on port 3030")
})