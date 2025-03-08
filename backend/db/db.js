import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async()=>{
    try {
         await mongoose.connect(process.env.DATABASE_URI);
       console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Failed to Connect to Database", error)
    }
}

export default connectDB;