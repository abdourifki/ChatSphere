import express from "express"
import { Server } from "socket.io"
import http from "http"
const app = express()
import Message from './models/MessageModel';
import User from "./models/UserModel";
import './connection/Db';
import router from "./routes/router";
import cors from "cors"
app.use(cors())
app.use(router)


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
    socket.on("message", async(messageData,user) => {//*/
        console.log(user)
        if (messageData.room) {
            const newMessage = new Message({
                content: messageData.message,
                sender : user
            })
           await newMessage.save()
           socket.emit("message")
        } else {
            console.log("please join the room first!")
        }
    })
    socket.on("joinRoom", (username) => {
        socket.join("room")
        const user = new User({
            username:username
        })
        user.save()
        socket.emit("joinRoom", user._id)

    })
})

server.listen(9000, () => {
    console.log("Server running on port 9000")
})