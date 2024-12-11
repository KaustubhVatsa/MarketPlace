import express from "express"
import { signup, verifyEmail } from "../Controller/authController.js";
import passport from "passport";
import { generateTokenandSendCookie } from "../Utils/generateTokenandSendCookie.js";


//routes
const router = express.Router();
router.get("/signup", signup)
router.get("/verify-email",verifyEmail)

//googleroutes
router.get(
    "/loginWithGoogle",
    passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
    "/loginWithGoogle/callback",
    passport.authenticate("google", { failureRedirect: "/google/failed", session: false }),
    (req, res) => {
        // This will log the error response if there's any
        passport.authenticate("google", function (err, user, info) {
            if (err) {
                console.error("Error in authentication:", err);
                return res.status(500).json({ success: false, msg: "Google authentication failed", error: err });
            }
            if (!user) {
                console.error("Authentication failed:", info);
                return res.status(401).json({ success: false, msg: "Authentication failed" });
            }

            // Generate JWT token and send cookie
            try {
                generateTokenandSendCookie(res, req.user._id);
                res.send({success:true, msg:"login with google successful"});
            } catch (error) {
                console.log(`Error during Google login callback: ${error}`);
                res.status(500).json({ success: false, msg: "Login failed" });
            }
        })(req, res);
    }
);

// Failed login route
router.get("/google/failed", (req, res) => {
    res.status(401).json({ success: false, msg: "Google login failed" });
});

export default router