import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Company from "../models/Company.js";

// Ensure JWT_SECRET exists in the environment variable
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Send reset link to the company's email
export const sendResetLink = async (req, res) => {
  const { email } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Generate a JWT token valid for 15 minutes
    const token = jwt.sign({ id: company._id }, JWT_SECRET, { expiresIn: "15m" });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // Create the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the reset link via email
    await transporter.sendMail({
      to: email,
      subject: "Reset Your Company Password",
      html: `
  <div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h2>Password Reset Request</h2>
    <p>Hi,</p>
    <p>We received a request to reset your password. Click the button below:</p>
    <a href="${resetLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
      Reset Password
    </a>
    <p>If you didn’t request this, just ignore this email.</p>
    <p>Thanks,<br/>Your Team</p>
  </div>
`
    });

    res.json({ message: "Reset link sent to your email." });
  } catch (err) {
    // In production, avoid sending raw error messages to the client
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

// Reset the company's password after validating the token
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    const company = await Company.findById(decoded.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Hash the new password and update it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    company.password = hashedPassword;

    await company.save();
    res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error(err);

    // Handle specific error for expired token
    if (err.name === "TokenExpiredError") {
      return res.status(400).json({ message: "The reset link has expired. Please request a new one." });
    }

    res.status(400).json({ message: "Invalid or expired token." });
  }
};

