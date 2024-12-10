import mongoose from "mongoose";

const emailRegex = /^[0-9]+@kiit\.ac\.in$/;

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        match:[emailRegex , "Please enter a valid KIIT email Id"]
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken : String,
    resetPasswordExpiredAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date
},{timestamps:true})

export const User = mongoose.model("User",userSchema)