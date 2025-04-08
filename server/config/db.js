import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI } = process.env;

//Function to connect to MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");
    }
    catch (error) {
        console.log("Error connecting to MongoDB", error);
        }
    }

//Exporting the connectDB function
export default connectDB;


