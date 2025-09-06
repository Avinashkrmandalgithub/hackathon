import { Router } from 'express';
import { 
  findCompatibleDonors, 
  getQuickMatchSummary, 
  sendMatchRequest 
} from '../controllers/matching.controller.js';
// import { verifyLogin } from '../middlewares/authMiddleware.js'; // Enable when auth is stable

const router = Router();

// Public routes for testing - in production, add verifyLogin middleware
router.route('/patient/:patientId/donors').get(findCompatibleDonors);
router.route('/patient/:patientId/summary').get(getQuickMatchSummary);
router.route('/request').post(sendMatchRequest);

// Protected routes (when authentication is stable)
// router.route('/patient/:patientId/donors').get(verifyLogin, findCompatibleDonors);
// router.route('/patient/:patientId/summary').get(verifyLogin, getQuickMatchSummary);
// router.route('/request').post(verifyLogin, sendMatchRequest);

export default router;
