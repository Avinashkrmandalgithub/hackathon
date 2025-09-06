import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { mockDb } from "../utils/mockDb.js";
import User from "../models/User.model.js";
import mongoose from 'mongoose';

// Blood type compatibility matrix
const BLOOD_COMPATIBILITY = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+']
};

// Calculate compatibility score between donor and patient
const calculateCompatibilityScore = (donor, patient) => {
  let score = 0;
  
  // Blood type compatibility (40% weight)
  if (BLOOD_COMPATIBILITY[donor.bloodType]?.includes(patient.bloodType)) {
    score += 40;
  }
  
  // Age compatibility (20% weight) - prefer similar ages ±10 years
  const ageDiff = Math.abs(donor.age - patient.age);
  if (ageDiff <= 5) score += 20;
  else if (ageDiff <= 10) score += 15;
  else if (ageDiff <= 15) score += 10;
  else if (ageDiff <= 20) score += 5;
  
  // Location/distance (15% weight) - mock calculation
  if (donor.city === patient.city) score += 15;
  else if (donor.state === patient.state) score += 10;
  else score += 5;
  
  // Organ availability (25% weight)
  if (patient.requiredOrgans && donor.availableOrgans) {
    const commonOrgans = patient.requiredOrgans.filter(organ => 
      donor.availableOrgans.includes(organ)
    );
    score += (commonOrgans.length / patient.requiredOrgans.length) * 25;
  }
  
  return Math.min(100, Math.round(score));
};

// Calculate distance between two locations (mock implementation)
const calculateDistance = (donor, patient) => {
  // Mock distance calculation - in real app, use geolocation APIs
  if (donor.city === patient.city) return `${Math.random() * 10 + 1}`;
  if (donor.state === patient.state) return `${Math.random() * 50 + 20}`;
  return `${Math.random() * 500 + 100}`;
};

// Get compatible donors for a patient
const findCompatibleDonors = asyncHandler(async (req, res) => {
  console.log("🔍 Finding compatible donors for patient:", req.params.patientId);
  
  const { patientId } = req.params;
  const { 
    organ = 'all', 
    bloodType = 'all', 
    location = 'all', 
    maxDistance = 100,
    urgencyLevel = 'all' 
  } = req.query;
  
  // Check if database is connected
  const isDbConnected = mongoose.connection.readyState === 1;
  
  if (isDbConnected) {
    // TODO: Implement MongoDB version when models are ready
    console.log("📝 Using MongoDB for matching (not implemented yet)");
    return res.status(501).json(
      new ApiResponse(501, [], "MongoDB matching not implemented yet - using mock data")
    );
  } else {
    console.log("🎭 Using mock database for matching");
    
    // Get patient profile from mock DB or create a mock patient
    let patient = mockDb.findPatientById(parseInt(patientId));
    if (!patient) {
      console.log(`🎭 Creating mock patient for ID: ${patientId}`);
      // Create a mock patient for testing
      patient = {
        _id: parseInt(patientId),
        fullName: "Test Patient",
        age: 35,
        bloodType: "O+",
        requiredOrgans: ["Heart", "Kidney"],
        city: "New York",
        state: "NY",
        urgencyLevel: "Normal",
        createdAt: new Date()
      };
    }
    
    // Get all donors from mock DB
    const allDonors = mockDb.getAllDonors();
    
    // Mock donors if none exist
    const mockDonors = allDonors.length > 0 ? allDonors : [
      {
        _id: 1,
        fullName: "John Smith",
        age: 28,
        gender: "Male",
        bloodType: patient.bloodType || "O+",
        availableOrgans: patient.requiredOrgans || ["Heart", "Kidney"],
        city: patient.city || "New York",
        state: patient.state || "NY",
        phone: "+1 (555) 123-4567",
        email: "john.smith@example.com",
        emergencyAvailable: true,
        lastDonation: "Never",
        registeredSince: "2023-01-15",
        lastActive: new Date(),
        medicalHistory: "No major conditions",
        status: "Available"
      },
      {
        _id: 2,
        fullName: "Maria Garcia",
        age: 35,
        gender: "Female",
        bloodType: patient.bloodType || "A+",
        availableOrgans: patient.requiredOrgans || ["Liver", "Kidney"],
        city: patient.city || "Los Angeles",
        state: patient.state || "CA", 
        phone: "+1 (555) 987-6543",
        email: "maria.garcia@example.com",
        emergencyAvailable: false,
        lastDonation: "Blood - 6 months ago",
        registeredSince: "2022-08-20",
        lastActive: new Date(Date.now() - 3600000), // 1 hour ago
        medicalHistory: "Healthy donor",
        status: "Available"
      },
      {
        _id: 3,
        fullName: "David Chen",
        age: 41,
        gender: "Male",
        bloodType: patient.bloodType || "B+",
        availableOrgans: patient.requiredOrgans || ["Kidney"],
        city: patient.city || "Chicago",
        state: patient.state || "IL",
        phone: "+1 (555) 456-7890",
        email: "david.chen@example.com",
        emergencyAvailable: true,
        lastDonation: "Never",
        registeredSince: "2023-06-10",
        lastActive: new Date(Date.now() - 86400000), // 1 day ago
        medicalHistory: "No restrictions",
        status: "Available"
      }
    ];
    
    // Filter and score donors
    let compatibleDonors = mockDonors.map(donor => {
      const score = calculateCompatibilityScore(donor, patient);
      const distance = calculateDistance(donor, patient);
      
      return {
        ...donor,
        matchScore: score,
        distance: `${distance} km`,
        medicalCompatibility: score >= 95 ? 'Excellent' : 
                           score >= 85 ? 'Very Good' : 
                           score >= 70 ? 'Good' : 'Fair',
        lastActive: formatLastActive(donor.lastActive),
        canContact: score >= 70, // Only allow contact for good matches
        urgencyCompatible: true // Mock urgency compatibility
      };
    });
    
    // Apply filters
    if (organ !== 'all') {
      compatibleDonors = compatibleDonors.filter(donor => 
        donor.availableOrgans.includes(organ)
      );
    }
    
    if (bloodType !== 'all') {
      compatibleDonors = compatibleDonors.filter(donor => 
        BLOOD_COMPATIBILITY[donor.bloodType]?.includes(bloodType)
      );
    }
    
    // Sort by compatibility score (highest first)
    compatibleDonors.sort((a, b) => b.matchScore - a.matchScore);
    
    console.log(`✅ Found ${compatibleDonors.length} compatible donors`);
    
    return res.status(200).json(
      new ApiResponse(200, compatibleDonors, `Found ${compatibleDonors.length} compatible donors`)
    );
  }
});

// Get quick match summary for dashboard
const getQuickMatchSummary = asyncHandler(async (req, res) => {
  console.log("⚡ Getting quick match summary for patient:", req.params.patientId);
  
  const { patientId } = req.params;
  
  // Check if database is connected
  const isDbConnected = mongoose.connection.readyState === 1;
  
  if (isDbConnected) {
    // TODO: Implement MongoDB version
    console.log("📝 Using MongoDB for quick match (not implemented yet)");
    return res.status(501).json(
      new ApiResponse(501, {}, "MongoDB quick match not implemented yet")
    );
  } else {
    console.log("🎭 Using mock database for quick match summary");
    
    // Mock quick match data
    const quickMatchSummary = {
      totalMatches: 7,
      excellentMatches: 2,
      goodMatches: 3,
      fairMatches: 2,
      emergencyAvailable: 4,
      nearbyDonors: 5, // within 50km
      recentActivity: [
        {
          type: "new_donor",
          message: "New compatible donor registered in your area",
          time: "2 hours ago",
          priority: "high"
        },
        {
          type: "match_update", 
          message: "3 donors updated their availability status",
          time: "1 day ago",
          priority: "medium"
        },
        {
          type: "location_match",
          message: "2 new donors found within 10km of your location",
          time: "2 days ago",
          priority: "medium"
        }
      ],
      topMatches: [
        {
          id: 1,
          name: "John S.",
          matchScore: 96,
          bloodType: "O+",
          distance: "2.1 km",
          status: "Available",
          emergencyAvailable: true
        },
        {
          id: 2,
          name: "Maria G.", 
          matchScore: 92,
          bloodType: "A+",
          distance: "4.5 km", 
          status: "Available",
          emergencyAvailable: false
        }
      ]
    };
    
    console.log("✅ Quick match summary generated");
    
    return res.status(200).json(
      new ApiResponse(200, quickMatchSummary, "Quick match summary retrieved successfully")
    );
  }
});

// Send match request to donor
const sendMatchRequest = asyncHandler(async (req, res) => {
  console.log("📤 Sending match request to donor:", req.body);
  
  const { donorId, patientId, message, urgency } = req.body;
  
  if (!donorId || !patientId) {
    throw new ApiError(400, "Donor ID and Patient ID are required");
  }
  
  // Check if database is connected
  const isDbConnected = mongoose.connection.readyState === 1;
  
  if (isDbConnected) {
    // TODO: Implement MongoDB version
    console.log("📝 Using MongoDB for match request (not implemented yet)");
    return res.status(501).json(
      new ApiResponse(501, {}, "MongoDB match request not implemented yet")
    );
  } else {
    console.log("🎭 Using mock database for match request");
    
    // Mock successful request
    const matchRequest = {
      id: Date.now(),
      donorId: parseInt(donorId),
      patientId: parseInt(patientId),
      message: message || "I would like to request your consideration for organ donation.",
      urgency: urgency || "normal",
      status: "sent",
      createdAt: new Date(),
      estimatedResponseTime: "24-48 hours"
    };
    
    console.log("✅ Match request sent successfully");
    
    return res.status(201).json(
      new ApiResponse(201, matchRequest, "Match request sent successfully")
    );
  }
});

// Helper function to format last active time
const formatLastActive = (lastActive) => {
  const now = new Date();
  const diff = now - lastActive;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
};

export {
  findCompatibleDonors,
  getQuickMatchSummary,
  sendMatchRequest
};
