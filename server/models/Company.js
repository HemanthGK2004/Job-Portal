import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    password: { type: String, required: true },
  
    // ✅ New fields
    mobile: { type: String },
    company: { type: String },
    designation: { type: String },
    location: { type: String },
  });
  
  const Company = mongoose.model("Company", companySchema);
  export default Company;
  