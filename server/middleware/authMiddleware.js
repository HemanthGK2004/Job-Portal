import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const company = await Company.findById(decoded.id).select('-password');

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });

    }
    req.company = company;
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};
