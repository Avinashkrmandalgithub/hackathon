import { Router } from 'express';
import { registerUser, loginUser, currentUser, logOutUser, debugUsers } from "../controllers/user.controller.temp.js"
// import { verifyLogin } from "../middlewares/authMiddleware.js"  // Commented out for mock setup

const router = Router();

// Public routes (no authentication required)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Protected routes (no auth middleware for mock setup)
router.route("/profile").get(currentUser);
router.route("/logout").post(logOutUser);

// Debug route for development
router.route("/debug").get(debugUsers);

export default router;
