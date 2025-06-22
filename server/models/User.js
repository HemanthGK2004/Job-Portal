import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Clerk user ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    resume: { type: String ,default:""}, // URL to the resume
    image: { type: String, required: true },
    clerkId: { type: String, required: true,unique:true }, // Clerk ID
});

const User = mongoose.model("User", userSchema);
export default User;
