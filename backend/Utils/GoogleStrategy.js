import { Strategy as googleStrategy } from "passport-google-oauth20";
import { User } from "../Models/Usermodel.js";

export const GoogleProvider = new googleStrategy(
    {
        clientID:"772390556138-7hmnotae08cvprmbma6muihl99l5khsm.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:5000/auth/loginWithGoogle/callback"
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