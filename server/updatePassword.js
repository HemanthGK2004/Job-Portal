import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Company from './models/Company.js';  // Ensure the correct import path

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;

// Update password function
const updatePassword = async (req, res) => {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const newPassword = "Hemanth@2004";  // New password you want to set
        const hashedPassword = await bcrypt.hash(newPassword, 10);  // Hash the password

        // Update the password for the user
        const result = await Company.updateOne(
            { email: 'Sanjanahemanth@gmail.com' },  // Find the company by email
            { $set: { password: hashedPassword } }  // Update the password
        );

        console.log(result);  // Logging the result for debugging

        // Check if the password was updated
        if (result.matchedCount > 0) {  // Use 'matchedCount' to check if a document was found
            res.status(200).json({ success: true, message: "Password updated successfully" });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating password:", error);  // Log the error for debugging
        res.status(500).json({ success: false, message: "Server error" });
    } finally {
        // Close the MongoDB connection after the operation
        await mongoose.connection.close();
    }
};

// Call updatePassword function if needed
updatePassword();
