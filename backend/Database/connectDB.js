import mongoose from "mongoose";
import { logger } from "../Logger/logger.js";
const log  = logger();
export const connectDb = async()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log ("Database Connection successful");

    }catch(error){
        log.error(`Database Connection Failed. Error:${error}`)
        process.exit(1);
    }
}