import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: [true, "Provide a username"]
    }, 
    fullName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Provide an email"]
    },
    password: {
        type: String,
        required: [true, "Password must be 6 characters"] 
    },
    isVerified: {
        type: Boolean, 
        default: false
    },
    isAdmin: {
        type: Boolean, 
        default: false
    },
    forgotPasswordToken: String, 
    forgotPasswordTokenExpiry: Date,
    verifyToken: String, 
    verifyTokenExpiry: Date

},{timestamps: true}); 


const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User