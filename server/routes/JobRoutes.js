import express from 'express';
import { getJobById, getJobs } from '../controllers/JobController.js';


const router = express.Router();

//Roue to get all jobs data
router.get('/',getJobs);


//Route to geat a single job by Id
router.get('/:id',getJobById);

export default router;

