import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { mockDb } from "../utils/mockDb.js";

const registerPatient = asyncHandler(async (req, res) => {
  console.log("🏥 Patient Registration attempt:", req.body);
  
  const patientData = req.body;
  
  // Validate required fields
  const requiredFields = ['fullName', 'age', 'gender', 'bloodType', 'phone', 'address', 'city', 'medicalCondition', 'urgencyLevel'];
  const missingFields = requiredFields.filter(field => {
    const value = patientData[field];
    if (typeof value === 'string') {
      return !value || value.trim() === '';
    } else {
      return !value && value !== 0; // Handle numbers, booleans, etc.
    }
  });
  
  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }
  
  // Check if patient already exists for this user
  const existingPatient = mockDb.findPatientByUserId(patientData.userId);
  if (existingPatient) {
    throw new ApiError(400, "Patient profile already exists for this user");
  }
  
  // Create patient profile
  const patient = mockDb.createPatient({
    ...patientData,
    status: 'active',
    registrationDate: new Date(),
    matchesFound: 0,
    lastUpdated: new Date()
  });
  
  if (!patient) {
    throw new ApiError(500, "Failed to create patient profile");
  }
  
  console.log("✅ Patient registered successfully:", patient);
  
  return res.status(201).json(
    new ApiResponse(201, patient, "Patient registered successfully")
  );
});

const getPatientProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const patient = mockDb.findPatientByUserId(parseInt(userId));
  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }
  
  return res.status(200).json(
    new ApiResponse(200, patient, "Patient profile retrieved successfully")
  );
});

const updatePatientProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;
  
  const patient = mockDb.findPatientByUserId(parseInt(userId));
  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }
  
  // Update patient data (in a real app, this would use proper DB update)
  Object.assign(patient, updateData, { updatedAt: new Date() });
  
  console.log("✅ Patient profile updated:", patient);
  
  return res.status(200).json(
    new ApiResponse(200, patient, "Patient profile updated successfully")
  );
});

const getAllPatients = asyncHandler(async (req, res) => {
  const patients = mockDb.getAllPatients();
  
  return res.status(200).json(
    new ApiResponse(200, patients, "All patients retrieved successfully")
  );
});

const findMatchingDonors = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const patient = mockDb.findPatientByUserId(parseInt(userId));
  if (!patient) {
    throw new ApiError(404, "Patient profile not found");
  }
  
  let donors = mockDb.getAllDonors();
  let matches = [];
  
  // Find blood type matches
  if (patient.requiredBloodType) {
    const bloodMatches = donors.filter(donor => donor.bloodType === patient.requiredBloodType);
    matches.push(...bloodMatches.map(donor => ({ 
      ...donor, 
      matchType: 'blood', 
      compatibility: 100 
    })));
  }
  
  // Find organ matches
  if (patient.requiredOrgans && patient.requiredOrgans.length > 0) {
    for (const requiredOrgan of patient.requiredOrgans) {
      const organMatches = donors.filter(donor => 
        donor.organsToDonate && donor.organsToDonate.includes(requiredOrgan)
      );
      matches.push(...organMatches.map(donor => ({ 
        ...donor, 
        matchType: 'organ', 
        organType: requiredOrgan,
        compatibility: 95 
      })));
    }
  }
  
  // Filter by city for better matches
  const cityMatches = matches.filter(match => 
    match.city.toLowerCase() === patient.city.toLowerCase()
  );
  
  // Boost compatibility for same city
  cityMatches.forEach(match => match.compatibility += 10);
  
  // Remove duplicates and sort by compatibility
  const uniqueMatches = matches.reduce((acc, current) => {
    const existing = acc.find(item => item._id === current._id && item.matchType === current.matchType);
    if (!existing) {
      acc.push(current);
    }
    return acc;
  }, []);
  
  uniqueMatches.sort((a, b) => b.compatibility - a.compatibility);
  
  return res.status(200).json(
    new ApiResponse(200, uniqueMatches, `Found ${uniqueMatches.length} potential matches`)
  );
});

const searchPatients = asyncHandler(async (req, res) => {
  const { bloodType, city, organType, urgencyLevel } = req.query;
  let patients = mockDb.getAllPatients();
  
  // Filter by blood type if provided
  if (bloodType) {
    patients = patients.filter(patient => patient.requiredBloodType === bloodType);
  }
  
  // Filter by city if provided
  if (city) {
    patients = patients.filter(patient => 
      patient.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  
  // Filter by organ type if provided
  if (organType) {
    patients = patients.filter(patient => 
      patient.requiredOrgans && patient.requiredOrgans.includes(organType)
    );
  }
  
  // Filter by urgency level if provided
  if (urgencyLevel) {
    patients = patients.filter(patient => patient.urgencyLevel === urgencyLevel);
  }
  
  return res.status(200).json(
    new ApiResponse(200, patients, `Found ${patients.length} matching patients`)
  );
});

export { 
  registerPatient, 
  getPatientProfile, 
  updatePatientProfile, 
  getAllPatients, 
  findMatchingDonors,
  searchPatients 
};
