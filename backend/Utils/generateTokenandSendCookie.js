import jwt from "jsonwebtoken";
//creates a jwt token using the userid as a payload 
export const generateTokenandSendCookie = (res, userId)=>{
    const token = jwt.sign({userId},
    process.env.JWT_SECRET , {
        expiresIn:"7d"}
    )
    const isSecure = process.env.NODE_ENV === "production" && process.env.USE_HTTPS === "true";

    //sending the cookie to client. 
    res.cookie("jwt-Token",token,{
        httpOnly : true ,
        secure: isSecure , 
        samesite:"strict",
        maxAge:7*24*60*60*1000
    })     
    return token;
}