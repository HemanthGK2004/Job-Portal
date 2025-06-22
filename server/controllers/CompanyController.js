import bcrypt from "bcrypt";
import cloudinary from "../config/Cloudinary.js";
import Company from "../models/Company.js"; // ✅ Import model
import Job from "../models/Job.js"; // ✅ Import model
import JobApplication from "../models/JobApplication.js"; // ✅ Import model
import generateToken from "../utils/generatetoken.js";

// Register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const companyExist = await Company.findOne({ email });
    if (companyExist) {
      return res.status(400).json({ success: false, message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const newCompany = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url
    });

    res.status(201).json({
      success: true,
      newCompany: {
        _id: newCompany._id,
        name: newCompany.name,
        email: newCompany.email,
        image: newCompany.image
      },
      token: generateToken(newCompany._id)
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
//update company profile
// Update Company Profile
// export const updateCompanyProfile = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const imageFile = req.file;
//     const companyId = req.company._id;

//     const company = await Company.findById(companyId);
//     if (!company) {
//       return res.status(404).json({ success: false, message: "Company not found" });
//     }

//     if (name) company.name = name;
//     if (email) company.email = email;

//     if (password) {
//       const salt = await bcrypt.genSalt(10);
//       company.password = await bcrypt.hash(password, salt);
//     }

//     if (imageFile) {
//       const imageUpload = await cloudinary.uploader.upload(imageFile.path);
//       company.image = imageUpload.secure_url;
//     }

//     await company.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       company: {
//         _id: company._id,
//         name: company.name,
//         email: company.email,
//         image: company.image,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating profile:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const updateCompanyProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      company: companyName,
      designation,
      location,
    } = req.body;
    const imageFile = req.file;
    const companyId = req.company._id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    if (name) company.name = name;
    if (email) company.email = email;
    if (mobile) company.mobile = mobile;
    if (companyName) company.company = companyName;
    if (designation) company.designation = designation;
    if (location) company.location = location;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      company.password = await bcrypt.hash(password, salt);
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      company.image = imageUpload.secure_url;
    }

    await company.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
        mobile: company.mobile,
        company: company.company,
        designation: company.designation,
        location: company.location,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


//Company Log in
export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    try{
        const company = await Company.findOne({ email });
        
        if(await bcrypt.compare(password,company.password)){
            res.status(200).json({
                success:true,
                company:{
                    _id:company._id,
                    name:company.name,
                    email:company.email,
                    image:company.image
                },
                token:generateToken(company._id)
            })
        }
        else{
            res.status(400).json({success:false,message:"Invalid credentials"})
        }
    }
    catch(error){
        res.status(500).json({success:false,message:error.message})
    }
}

//Get Companay data
export const getCompanyData = async (req, res) => {
  try {
    console.log('Requesting company data:', req.company); // ✅ Add this
    const company = req.company;
    res.status(200).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//Post a new Job
export const postJob = async (req, res) => {
  try {
    console.log('🔥 POST JOB INIT');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Company:', req.company);

    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company?._id;

    if (!companyId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const newJob = new Job({
      title,
      description,
      location,
      salary: Number(salary), // force number in case sent as string
      level,
      category,
      companyId,
    });

    await newJob.save();
    console.log('✅ Job saved');
    res.json({ success: true, newJob });
  } catch (error) {
    console.error('❌ Error saving job:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Company applications
export const getCompanyApplications = async (req, res) => {
  try {
      const companyId = req.company._id;

      const applications = await JobApplication.find({ companyId })
  .populate("userId", "name image resume")
  .populate("jobId", "title description location category level salary")
  .exec();
console.log('📝 Applications:', applications);

      res.status(200).json({ success: true, applications });
  } catch (error) {
      console.error("❌ Error fetching applications:", error);  // Log the full error
      res.status(500).json({ success: false, message: error.message });
  }
};



//Get company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id;
        const jobs = await Job.find({ companyId }).populate({ path: 'companyId', select: "-password" });
        //(ToDo) Adding number of applicants

        const jobsData = await Promise.all(
            jobs.map(async (job) => {
                const applicants = await JobApplication.find({ jobId: job._id });
                return {
                    ...job.toObject(),
                    applicants: applicants.length,
                };
            })
        );
        res.status(200).json({ success: true, jobsData});
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    
}
//Change Application Status
export const changeApplicationStatus = async (req, res) => {
  try {
      const { id, status } = req.body;
    //find job application data and update status
    await JobApplication.findOneAndUpdate({_id:id},{status})
    res.status(200).json({ success: true, message: "Application status Changes" });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
}
//Change Job Visibility
export const changeJobVisibility = async (req, res) => {
    try {
      const {id} = req.body;

      const companyId = req.company._id;
      const job = await Job.findById(id);
      if(companyId.toString()===job.companyId.toString()){
        job.visible = !job.visible;
      }
      await job.save();
      res.status(200).json({ success: true, job });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
    
}
// controllers/CompanyController.js
export const getCompanyDashBoardData = async (req, res) => {
  try {
    const companyId = req.params.id;  // Getting companyId from URL

    const jobs = await Job.find({ companyId }); // Fetch all jobs for the company
    const totalJobs = jobs.length;

    const jobIds = jobs.map(job => job._id); // Extracting job IDs
    const applications = await JobApplication.find({ jobId: { $in: jobIds } });  // Fetching applications for those jobs
    const totalApplications = applications.length;
    const totalHired = applications.filter(app => app.status === "hired").length;

    // Get number of applications per job
    const applicationsPerJob = await Promise.all(
      jobs.map(async job => {
        const count = await JobApplication.countDocuments({ jobId: job._id });  // Counting applications for each job
        return { title: job.title, applications: count };
      })
    );

    console.log('Dashboard Data:', { totalJobs, totalApplications, totalHired, applicationsPerJob });

    // Send the data back as JSON
    res.json({ totalJobs, totalApplications, totalHired, applicationsPerJob });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);  // Log any error that occurs
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};
