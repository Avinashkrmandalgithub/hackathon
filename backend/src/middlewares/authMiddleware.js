import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.model.js"
import jwt from "jsonwebtoken";

const verifyLogin = asyncHandler(async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            throw new ApiError(401, "Access token is required");
        }
        
        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                throw new ApiError(401, "Access token has expired");
            } else if (jwtError.name === 'JsonWebTokenError') {
                throw new ApiError(401, "Invalid access token");
            } else {
                throw new ApiError(401, "Token verification failed");
            }
        }
        
        // Find user by ID from token
        const user = await User.findById(decoded?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid access token - user not found");
        }
        
        // Add user to request object
        req.user = user;
        next();
        
    } catch (error) {
        // Log the error for debugging
        console.error('🚫 Authentication error:', error.message);
        
        // If it's already an ApiError, throw it as is
        if (error instanceof ApiError) {
            throw error;
        }
        
        // For any other error, throw a generic unauthorized error
        throw new ApiError(401, "Authentication failed");
    }
});

export { verifyLogin };