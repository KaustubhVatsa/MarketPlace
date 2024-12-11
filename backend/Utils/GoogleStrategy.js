import { Strategy as googleStrategy } from "passport-google-oauth20";
import { User } from "../Models/Usermodel.js";

export const GoogleProvider = new googleStrategy(
    {
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:process.env.GOOGLE_CALLBACK_URL
    },
    async function(accessToken , refreshToken , profile , callback){
        try {
            let user = await User.findOne({email: profile.emails[0].value});
            if (!user){
                user = new User({
                    email:profile.emails[0].value,
                    password:undefined,
                    is_verified:true
                });
                await user.save();
            }   
            callback(null, user);
        } catch (error) {
            console.log(`Error in googleStrategy: ${error}`);
            callback(error , null);
        }
    }
)