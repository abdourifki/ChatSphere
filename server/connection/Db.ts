import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/chat")
mongoose.connection.on("error", () => {
    console.log("Error connecting to MongoDB")
})

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB")
})

