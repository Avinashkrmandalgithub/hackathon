import { Router } from 'express';
import { 
  registerPatient, 
  getPatientProfile, 
  updatePatientProfile, 
  getAllPatients, 
  findMatchingDonors,
  searchPatients 
} from "../controllers/patient.controller.temp.js";

const router = Router();

// Register a new patient
router.route("/register").post(registerPatient);

// Get patient profile by user ID
router.route("/profile/:userId").get(getPatientProfile);

// Update patient profile
router.route("/profile/:userId").put(updatePatientProfile);

// Get all patients (for admin purposes)
router.route("/all").get(getAllPatients);

// Find matching donors for a patient
router.route("/matches/:userId").get(findMatchingDonors);

// Search patients with filters
router.route("/search").get(searchPatients);

export default router;
