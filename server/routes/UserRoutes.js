import express from 'express';
import upload from '../config/multer.js';
import { applyForJob, getUserData, getUserJobApplications, updateUserProfile } from '../controllers/UserController.js';
const router = express.Router();


//get user data
router.get("/user",getUserData);

//Apply for a job
router.post("/apply",applyForJob);

//get user applied applications
router.get("/applications",getUserJobApplications);

//update user profile(resume)
router.post("/update-resume",upload.single('resume'),updateUserProfile);


export default router;