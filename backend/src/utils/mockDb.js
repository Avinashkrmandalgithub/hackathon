// Temporary mock database for testing without MongoDB
let users = [];
let donors = [];
let patients = [];
let nextId = 1;
let nextDonorId = 1;
let nextPatientId = 1;

export const mockDb = {
  // User operations
  findUserByEmail: (email) => {
    return users.find(user => user.email === email) || null;
  },

  createUser: (userData) => {
    const newUser = {
      _id: nextId++,
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password, // In real app this would be hashed
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  findUserById: (id, selectFields = "") => {
    const user = users.find(u => u._id === id);
    if (!user) return null;
    
    // Simulate mongoose select
    const userCopy = { ...user };
    if (selectFields.includes("-password")) {
      delete userCopy.password;
    }
    return userCopy;
  },

  // Donor operations
  createDonor: (donorData) => {
    const newDonor = {
      _id: nextDonorId++,
      userId: donorData.userId,
      ...donorData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    donors.push(newDonor);
    return newDonor;
  },

  findDonorByUserId: (userId) => {
    return donors.find(donor => donor.userId === userId) || null;
  },

  findDonorById: (id) => {
    return donors.find(donor => donor._id === id) || null;
  },

  getAllDonors: () => donors,

  // Patient operations
  createPatient: (patientData) => {
    const newPatient = {
      _id: nextPatientId++,
      userId: patientData.userId,
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    patients.push(newPatient);
    return newPatient;
  },

  findPatientByUserId: (userId) => {
    return patients.find(patient => patient.userId === userId) || null;
  },

  findPatientById: (id) => {
    return patients.find(patient => patient._id === id) || null;
  },

  getAllPatients: () => patients,

  // Get all data (for debugging)
  getAllUsers: () => users,
  getAllData: () => ({ users, donors, patients }),

  // Clear all data (for testing)
  clearUsers: () => {
    users = [];
    nextId = 1;
  },
  
  clearAll: () => {
    users = [];
    donors = [];
    patients = [];
    nextId = 1;
    nextDonorId = 1;
    nextPatientId = 1;
  }
};
