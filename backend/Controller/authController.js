import { error } from "console";
import express from "express";
import mongoose from "mongoose";
import { User } from "../Models/Usermodel.js";
import bcrypt from "bcryptjs"
import { generateVerificationCode } from "../Utils/generateVerificationCode.js";
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
        return res.status(200).json({success:true, message:"User Created! Verification Code sent to Email."});
    } catch (error) {
        res.status(400).json({success:false, message:`${error}`})
    }
};
