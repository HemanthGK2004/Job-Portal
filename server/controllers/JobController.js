import Job from "../models/Job.js";


//Get all jobs

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({visible:true})
        .populate({path:'companyId',select:"-password"})
        res.status(200).json({ success: true, jobs });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}
//Get a single job by Id
export const getJobById = async (req, res) => {
    try {
        const {id} = req.params;
        const job = await Job.findById(id)
        .populate({path:'companyId',select:"-password"})
        if(!job){
            return res.status(404).json({success:false,message:"Job not found"})
        }
        res.status(200).json({ success: true, job });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }

}