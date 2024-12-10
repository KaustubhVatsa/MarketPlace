//Imports
import { connectDb } from "./Database/connectDB.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import { logger } from "./Logger/logger.js";
import authRoutes from "./Routes/auth.routes.js"



//middlewares
dotenv.config()
const log = logger();
const app = express();
app.use(express.json())
app.use(cors());
app.use("/auth",authRoutes)


connectDb();
const port = process.env.PORT||6000;
app.listen(port, () => { 

    console.log(`Server is running on port ${port}`); 

});