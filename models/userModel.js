import mongoose from "mongoose";

const userSchema = ({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: null
    }
})

const User = mongoose.model("User", userSchema)
export default User

