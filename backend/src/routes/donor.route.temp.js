import { Router } from 'express';
import { 
  registerDonor, 
  getDonorProfile, 
  updateDonorProfile, 
  getAllDonors, 
  searchDonors 
} from "../controllers/donor.controller.temp.js";

const router = Router();

// Register a new donor
router.route("/register").post(registerDonor);

// Get donor profile by user ID
router.route("/profile/:userId").get(getDonorProfile);

// Update donor profile
router.route("/profile/:userId").put(updateDonorProfile);

// Get all donors (for admin/matching purposes)
router.route("/all").get(getAllDonors);

// Search donors with filters
router.route("/search").get(searchDonors);

export default router;
