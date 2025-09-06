import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { options } from "../constants.js";
import { mockDb } from "../utils/mockDb.js";

// Mock token generation (simplified for testing)
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET || "default-access-secret",
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
  );
  
  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET || "default-refresh-secret",
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
  );
  
  return { accessToken, refreshToken };
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("🚀 Mock Registration attempt:", req.body);
  
  const { email, fullName, password } = req.body;
  
  // Validate input
  if ([email, fullName, password].some((data) => data?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  
  // Check if user already exists
  const existedUser = mockDb.findUserByEmail(email);
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = mockDb.createUser({
    fullName,
    email,
    password: hashedPassword
  });
  
  // Get user without password
  const createdUser = mockDb.findUserById(user._id, "-password");
  
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong creating user");
  }
  
  console.log("✅ Mock user created successfully:", createdUser);
  
  return res.status(200).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  console.log("🔑 Mock Login attempt:", req.body);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }
  
  // Find user
  const user = mockDb.findUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  
  // Check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }
  
  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);
  
  // Get user without password
  const loggedInUser = mockDb.findUserById(user._id, "-password");
  
  console.log("✅ Mock user logged in successfully:", loggedInUser);
  
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "User logged in successfully"
      )
    );
});

const currentUser = asyncHandler(async (req, res) => {
  // For mock setup - in real app, this would get user from JWT token
  console.log("🔍 Current user request - no auth middleware in mock setup");
  
  // Return empty user for now - user will be set on login
  return res.status(401).json(new ApiResponse(401, null, "Not authenticated"));
});

const logOutUser = asyncHandler(async (req, res) => {
  console.log("👋 Mock logout");
  
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Debug endpoint to check mock database state
const debugUsers = asyncHandler(async (req, res) => {
  const allData = mockDb.getAllData();
  console.log("🐛 Debug - All mock data:", allData);
  
  return res.status(200).json(
    new ApiResponse(200, allData, "Debug data retrieved")
  );
});

export { registerUser, loginUser, currentUser, logOutUser, debugUsers };
