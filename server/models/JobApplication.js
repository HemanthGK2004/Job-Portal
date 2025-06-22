import mongoose from "mongoose";
const getJobApplicationSchema = new mongoose.Schema({
    userId: { type: String, ref: "User", required: true },
    companyId:{type:mongoose.Schema.Types.ObjectId,ref:"Company",required:true},
    jobId:{type:mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
    status:{type:String,default:"pending"},
    date:{type:Date,default:Date.now,required:true}
});
const JobApplication = mongoose.model("JobApplication", getJobApplicationSchema);
export default JobApplication;