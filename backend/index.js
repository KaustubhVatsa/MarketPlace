// Imports
import { connectDb } from "./Database/connectDB.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport"; // Import passport for Google Strategy
import { logger } from "./Logger/logger.js";
import authRoutes from "./Routes/auth.routes.js";
import "./Utils/passport.js"; // Load Passport strategies (Google Strategy)

// Middlewares
dotenv.config();
const log = logger();
const app = express();

app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow requests from the frontend
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Initialize Passport
app.use(passport.initialize()); // No session middleware required

// Routes
app.use("/auth", authRoutes);

// Database Connection
connectDb();

// Start the server
const port = process.env.PORT || 6000;
app.listen(port, () => {
  log.info(`Server is running on port ${port}`);
});
