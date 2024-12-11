import passport from "passport";
import { GoogleProvider } from "./GoogleStrategy.js";
passport.use(GoogleProvider);

passport.serializeUser(function (user, done) {
    done(null, user._id); // Serialize user ID
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id); // Fetch user by ID
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export const passport_config = passport;