import { error } from "console";
import express from "express";
import mongoose from "mongoose";
import { User } from "../Models/Usermodel.js";
import bcrypt from "bcryptjs"
import { generateVerificationCode } from "../Utils/generateVerificationCode.js";
import { generateTokenandSendCookie } from "../Utils/generateTokenandSendCookie.js";
import { logger } from "../Logger/logger.js";


export const signup = async (req, res) => {
    const {email , password} = req.body;
    try {
        if(!email||!password){
           throw new Error("All fields required!!")
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success:false , message:"Email Already Exists. Try Logging In"});
        }
        //Hashing password--- using bcrypt
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        //generate verification token-- 
        const verificationToken = generateVerificationCode();
        const verificationTokenExpiresAt = Date.now()+1*60*60*1000;
        const user = new User({email:email,password:hashedPassword,verificationToken:verificationToken, verificationTokenExpiresAt , verificationTokenExpiresAt:verificationTokenExpiresAt});
        await user.save({ collection: 'User' });
        generateTokenandSendCookie(res , user._id)
        return res.status(200).json({success:true, message:"User Created! Verification Code sent to Email."});
    } catch (error) {
        res.status(400).json({success:false, message:`${error}`})
        log.error(`failed during signup process ${error}`);
    }
};

export const verifyEmail = async (req, res)=>{
    //take the verification code from the body 
    const {verificationToken} = req.body;
    //try to find the user
    try {
        const user = await User.findOne({
            verificationToken:verificationToken,
            verificationTokenExpiresAt:{$gt:Date.now()}
        })
        if (!user){
            return res.status(400).json({success:false , msg:"invalid or expired verification token"})
        }
        user.is_verified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        res.status(200).json({ success: true, msg: "Email successfully verified" });
    } catch (error) {
        res.status(400).json({success:false, message:`${error}`})
        log.error(`failed during verifying email: ${error}`);
    }
}