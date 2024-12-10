import express from "express"
import { signup } from "../Controller/authController.js";
import passport from "passport";
const router = express.Router();
router.get("/signup", signup)
export default router