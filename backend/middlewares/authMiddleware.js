import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async (req, res, next) => {
    let token;  

    // Read JWT token from cookies
    token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } 
    catch (error) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
});

// Middleware to check if user is admin
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: 'Not authorized as admin' });
    }
};

export { authenticate, authorizeAdmin };