import mongoose from "mongoose";


interface User {
    username: string
}

const UserModel = new mongoose.Schema<User>({
    username: {
        type: String,
    }
})

const User = mongoose.model<User>("User", UserModel)

export default User;