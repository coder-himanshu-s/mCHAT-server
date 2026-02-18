
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();



const connectDB = async()=>{
     const url = process.env.MONGO_URI;

    if( !url ){
        throw new Error("MongoDB url is not present in env");
    }

    try {
        await mongoose.connect(url,{
            dbName:"mCHAT-service"
        })
        console.log(`connected to mongodb`);
    } catch (error) {
        console.error(`Failed to connect DB ${error}`);
        process.exit(1);
    }
}

export default connectDB;