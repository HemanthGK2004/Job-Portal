import express from 'express';
import upload from '../config/multer.js';
import {
    changeApplicationStatus,
    changeJobVisibility,
    getCompanyApplications,
    getCompanyData,
    getCompanyPostedJobs,
    loginCompany,
    postJob,
    registerCompany,
    updateCompanyProfile,
} from '../controllers/CompanyController.js';

import {
    resetPassword,
    sendResetLink,
} from '../controllers/companyAuthController.js';
import { getCompanyDashBoardData } from '../controllers/CompanyController.js';
import { protectCompany } from '../middleware/authMiddleware.js';


const router = express.Router();

// Forgot & Reset Password
router.post('/forgot-password', sendResetLink);
router.post('/reset-password', resetPassword);

// Company Register/Login
router.post('/register', upload.single('image'), registerCompany);
router.post('/update-profile', upload.single('image'), protectCompany, updateCompanyProfile);
router.post('/login', loginCompany);

// Authenticated Company Routes
router.get('/company', protectCompany, getCompanyData);
router.post('/post-job', protectCompany, postJob);
router.get('/applicants', protectCompany, getCompanyApplications);
router.get('/list-jobs', protectCompany, getCompanyPostedJobs);
router.post('/change-status', protectCompany, changeApplicationStatus);
router.post('/change-visibility', protectCompany, changeJobVisibility);
router.get("/:id/dashboard", protectCompany, getCompanyDashBoardData);



export default router;
