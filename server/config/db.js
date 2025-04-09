import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/job-portal`);
        console.log("MongoDB connected to DB:", mongoose.connection.name);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
};
export default connectDB;