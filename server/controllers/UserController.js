import { clerkClient } from "@clerk/clerk-sdk-node"; // Add this import at the top
import { v2 as cloudinary } from "cloudinary";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";

export const getUserData = async (req, res) => {
    const userId = req.auth.userId;

    try {
        let user = await User.findById(userId);

        if (!user) {
            // Fetch user data from Clerk
            const clerkUser = await clerkClient.users.getUser(userId);

            // Create a new user in MongoDB
            user = new User({
                _id: userId,
                clerkId: userId,
                name: `${clerkUser.firstName} ${clerkUser.lastName}`,
                email: clerkUser.emailAddresses[0].emailAddress,
                image: clerkUser.imageUrl,
                resume:"",
            });

            await user.save();
        }

        res.status(200).json({ success: true, user });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


//Apply for a job
export const applyForJob = async (req, res) => {
    const {jobId}= req.body;
    const userId = req.auth.userId;
    try {
        const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });
        if (isAlreadyApplied) {
            return res.status(400).json({ success: false, message: "Already applied for this job" });
        }
        const jobData = await Job.findById(jobId);
        if (!jobData) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            status: "pending",
            date: Date.now()
        });
        res.status(200).json({ success: true, message: "Applied for job successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//get user applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const applications = await JobApplication.find({ userId })
            .populate('companyId','name email image')
            .populate('jobId','title description location category level salary')
            .exec();
        if (!applications) {
            return res.status(404).json({ success: false, message: "No applications found" });
        }
        res.status(200).json({ success: true, applications });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }

}

//update user profile(resume)
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const resumeFile = req.file;
        const userData = await User.findById(userId);
        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
            userData.resume = resumeUpload.secure_url;
        }
        await userData.save();
        res.status(200).json({ success: true, message: "Resume updated successfully" });
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}