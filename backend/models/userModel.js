import mongoose from "mongoose";

// schema for user model
const userSchema = new mongoose.Schema({
    username: {
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

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
},
 {
    timestamps: true
});

// create user model
const User = mongoose.model("User", userSchema);

export default User;