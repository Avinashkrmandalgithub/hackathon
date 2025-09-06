import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { mockDb } from "../utils/mockDb.js";

const registerDonor = asyncHandler(async (req, res) => {
  console.log("🩸 Donor Registration attempt:", req.body);
  
  const donorData = req.body;
  
  // Validate required fields
  const requiredFields = ['fullName', 'age', 'gender', 'bloodType', 'phone', 'address', 'city'];
  const missingFields = requiredFields.filter(field => {
    const value = donorData[field];
    if (typeof value === 'string') {
      return !value || value.trim() === '';
    } else {
      return !value && value !== 0; // Handle numbers, booleans, etc.
    }
  });
  
  if (missingFields.length > 0) {
    throw new ApiError(400, `Missing required fields: ${missingFields.join(', ')}`);
  }
  
  // Check if donor already exists for this user
  const existingDonor = mockDb.findDonorByUserId(donorData.userId);
  if (existingDonor) {
    throw new ApiError(400, "Donor profile already exists for this user");
  }
  
  // Create donor profile
  const donor = mockDb.createDonor({
    ...donorData,
    status: 'active',
    registrationDate: new Date(),
    totalDonations: 0,
    lastDonationDate: null
  });
  
  if (!donor) {
    throw new ApiError(500, "Failed to create donor profile");
  }
  
  console.log("✅ Donor registered successfully:", donor);
  
  return res.status(201).json(
    new ApiResponse(201, donor, "Donor registered successfully")
  );
});

const getDonorProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  const donor = mockDb.findDonorByUserId(parseInt(userId));
  if (!donor) {
    throw new ApiError(404, "Donor profile not found");
  }
  
  return res.status(200).json(
    new ApiResponse(200, donor, "Donor profile retrieved successfully")
  );
});

const updateDonorProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;
  
  const donor = mockDb.findDonorByUserId(parseInt(userId));
  if (!donor) {
    throw new ApiError(404, "Donor profile not found");
  }
  
  // Update donor data (in a real app, this would use proper DB update)
  Object.assign(donor, updateData, { updatedAt: new Date() });
  
  console.log("✅ Donor profile updated:", donor);
  
  return res.status(200).json(
    new ApiResponse(200, donor, "Donor profile updated successfully")
  );
});

const getAllDonors = asyncHandler(async (req, res) => {
  const donors = mockDb.getAllDonors();
  
  return res.status(200).json(
    new ApiResponse(200, donors, "All donors retrieved successfully")
  );
});

const searchDonors = asyncHandler(async (req, res) => {
  const { bloodType, city, organType } = req.query;
  let donors = mockDb.getAllDonors();
  
  // Filter by blood type if provided
  if (bloodType) {
    donors = donors.filter(donor => donor.bloodType === bloodType);
  }
  
  // Filter by city if provided
  if (city) {
    donors = donors.filter(donor => 
      donor.city.toLowerCase().includes(city.toLowerCase())
    );
  }
  
  // Filter by organ type if provided
  if (organType) {
    donors = donors.filter(donor => 
      donor.organsToDonate && donor.organsToDonate.includes(organType)
    );
  }
  
  return res.status(200).json(
    new ApiResponse(200, donors, `Found ${donors.length} matching donors`)
  );
});

export { 
  registerDonor, 
  getDonorProfile, 
  updateDonorProfile, 
  getAllDonors, 
  searchDonors 
};
