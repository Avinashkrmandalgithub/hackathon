import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { registerAdmin, generateAdminPassword } from '../api/Admin';

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [donorProfile, setDonorProfile] = useState(null);
  const [patientProfile, setPatientProfile] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'donor', 'patient', or 'admin'
  const [loading, setLoading] = useState(false);

  // Save donor profile data
  const saveDonorProfile = async (profileData) => {
    // Check if user already has a different profile type
    const existingPatientProfile = localStorage.getItem('patientProfile');
    const existingAdminProfile = localStorage.getItem('adminProfile');
    const existingUserRole = localStorage.getItem('userRole');
    
    if ((existingPatientProfile && existingUserRole === 'patient') || 
        (existingAdminProfile && existingUserRole === 'admin')) {
      console.error('❌ Cannot create donor profile: User already has a different profile type');
      return { 
        success: false, 
        error: `You already have a ${existingUserRole} profile. Each user can only have one profile type. Please logout and create a new account if you need a different role.` 
      };
    }

    // Check if donor profile already exists
    const existingDonorProfile = localStorage.getItem('donorProfile');
    if (existingDonorProfile && existingUserRole === 'donor') {
      console.error('❌ Donor profile already exists');
      return { 
        success: false, 
        error: 'You already have a donor profile.' 
      };
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/donor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...profileData,
          userId: user._id,
          role: 'donor'
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          setDonorProfile(result.data);
          setUserRole('donor');
          localStorage.setItem('userRole', 'donor');
          localStorage.setItem('donorProfile', JSON.stringify(result.data));
          console.log('✅ Donor profile saved to context:', result.data);
          return { success: true, data: result.data };
        } else {
          const text = await response.text();
          console.error('❌ Unexpected response format:', text);
          return { success: false, error: 'Unexpected response format from server' };
        }
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          console.error('❌ Failed to save donor profile:', error);
          return { success: false, error: error.message };
        } else {
          const text = await response.text();
          console.error('❌ Server error (non-JSON):', text);
          return { success: false, error: 'Server returned an error' };
        }
      }
    } catch (error) {
      console.error('Error saving donor profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Save patient profile data
  const savePatientProfile = async (profileData) => {
    // Check if user already has a different profile type
    const existingDonorProfile = localStorage.getItem('donorProfile');
    const existingAdminProfile = localStorage.getItem('adminProfile');
    const existingUserRole = localStorage.getItem('userRole');
    
    if ((existingDonorProfile && existingUserRole === 'donor') || 
        (existingAdminProfile && existingUserRole === 'admin')) {
      console.error('❌ Cannot create patient profile: User already has a different profile type');
      return { 
        success: false, 
        error: `You already have a ${existingUserRole} profile. Each user can only have one profile type. Please logout and create a new account if you need a different role.` 
      };
    }

    // Check if patient profile already exists
    const existingPatientProfile = localStorage.getItem('patientProfile');
    if (existingPatientProfile && existingUserRole === 'patient') {
      console.error('❌ Patient profile already exists');
      return { 
        success: false, 
        error: 'You already have a patient profile.' 
      };
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/patient/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...profileData,
          userId: user._id,
          role: 'patient'
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          setPatientProfile(result.data);
          setUserRole('patient');
          localStorage.setItem('userRole', 'patient');
          localStorage.setItem('patientProfile', JSON.stringify(result.data));
          console.log('✅ Patient profile saved to context:', result.data);
          return { success: true, data: result.data };
        } else {
          const text = await response.text();
          console.error('❌ Unexpected response format:', text);
          return { success: false, error: 'Unexpected response format from server' };
        }
      } else {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          console.error('❌ Failed to save patient profile:', error);
          return { success: false, error: error.message };
        } else {
          const text = await response.text();
          console.error('❌ Server error (non-JSON):', text);
          return { success: false, error: 'Server returned an error' };
        }
      }
    } catch (error) {
      console.error('Error saving patient profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Save admin profile data
  const saveAdminProfile = async (profileData) => {
    // Debug logging
    console.log('🔍 Admin Profile Creation Debug:');
    console.log('User object:', user);
    console.log('User ID:', user?._id);
    console.log('Is authenticated:', !!user);
    console.log('Profile data:', profileData);
    
    // Check if user is logged in
    if (!user) {
      console.error('❌ Cannot create admin profile: User not logged in');
      return { 
        success: false, 
        error: 'You must be logged in to create an admin profile. Please login first.' 
      };
    }

    // Check if user already has a different profile type
    const existingDonorProfile = localStorage.getItem('donorProfile');
    const existingPatientProfile = localStorage.getItem('patientProfile');
    const existingUserRole = localStorage.getItem('userRole');
    
    if ((existingDonorProfile && existingUserRole === 'donor') || 
        (existingPatientProfile && existingUserRole === 'patient')) {
      console.error('❌ Cannot create admin profile: User already has a different profile type');
      return { 
        success: false, 
        error: `You already have a ${existingUserRole} profile. Each user can only have one profile type. Please logout and create a new account if you need a different role.` 
      };
    }

    // Check if admin profile already exists
    const existingAdminProfile = localStorage.getItem('adminProfile');
    if (existingAdminProfile && existingUserRole === 'admin') {
      console.error('❌ Admin profile already exists');
      return { 
        success: false, 
        error: 'You already have an admin profile.' 
      };
    }

    setLoading(true);
    try {
      const requestBody = {
        user: user._id,
        role: profileData.role || 'admin',
        gender: profileData.gender,
        contactInfo: {
          phone: profileData.phone,
          address: profileData.address
        },
        location: profileData.location
      };
      
      console.log('🚀 Making admin registration request with axios:');
      console.log('Request body:', requestBody);
      
      // First register the admin using axios API
      const registerResult = await registerAdmin(requestBody);
      console.log('✅ Admin registration successful:', registerResult.data);
      
      // Then generate the admin password
      const passwordResult = await generateAdminPassword();
      console.log('✅ Admin password generated:', passwordResult.data);
      
      const adminData = {
        ...registerResult.data.data,
        credentials: passwordResult.data.data
      };
      
      setAdminProfile(adminData);
      setUserRole('admin');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('adminProfile', JSON.stringify(adminData));
      console.log('✅ Admin profile saved to context:', adminData);
      return { success: true, data: adminData };
    } catch (error) {
      console.error('❌ Error saving admin profile:', error);
      
      // Handle axios errors
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Server error';
        console.error('❌ Server error response:', error.response.data);
        return { success: false, error: errorMessage };
      } else if (error.request) {
        // Network error
        console.error('❌ Network error:', error.request);
        return { success: false, error: 'Network error - please check your connection' };
      } else {
        // Other error
        console.error('❌ Unexpected error:', error.message);
        return { success: false, error: error.message || 'An unexpected error occurred' };
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch donor profile from server
  const fetchDonorProfile = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/donor/profile/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setDonorProfile(result.data);
        setUserRole('donor');
        localStorage.setItem('userRole', 'donor');
        localStorage.setItem('donorProfile', JSON.stringify(result.data));
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching donor profile:', error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Fetch patient profile from server
  const fetchPatientProfile = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/patient/profile/${userId}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setPatientProfile(result.data);
        setUserRole('patient');
        localStorage.setItem('userRole', 'patient');
        localStorage.setItem('patientProfile', JSON.stringify(result.data));
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Fetch admin profile from server
  const fetchAdminProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/profile', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setAdminProfile(result.data);
        setUserRole('admin');
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('adminProfile', JSON.stringify(result.data));
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Load profile from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedRole = localStorage.getItem('userRole');
      const savedDonorProfile = localStorage.getItem('donorProfile');
      const savedPatientProfile = localStorage.getItem('patientProfile');
      const savedAdminProfile = localStorage.getItem('adminProfile');

      if (savedRole) {
        setUserRole(savedRole);
        
        if (savedRole === 'donor' && savedDonorProfile) {
          try {
            setDonorProfile(JSON.parse(savedDonorProfile));
          } catch (error) {
            console.error('Error parsing saved donor profile:', error);
          }
        }
        
        if (savedRole === 'patient' && savedPatientProfile) {
          try {
            setPatientProfile(JSON.parse(savedPatientProfile));
          } catch (error) {
            console.error('Error parsing saved patient profile:', error);
          }
        }
        
        if (savedRole === 'admin' && savedAdminProfile) {
          try {
            setAdminProfile(JSON.parse(savedAdminProfile));
          } catch (error) {
            console.error('Error parsing saved admin profile:', error);
          }
        }
      }
    }
  }, [user]);

  // Cross-tab synchronization - listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (event) => {
      // Only respond to changes from other tabs/windows
      if (event.storageArea === localStorage) {
        switch (event.key) {
          case 'userRole':
            if (event.newValue !== userRole) {
              setUserRole(event.newValue);
              console.log('ὐ4 Cross-tab sync: userRole changed to', event.newValue);
            }
            break;
            
          case 'donorProfile':
            try {
              const newProfile = event.newValue ? JSON.parse(event.newValue) : null;
              setDonorProfile(newProfile);
              console.log('ὐ4 Cross-tab sync: donorProfile updated');
            } catch (error) {
              console.error('Error parsing updated donor profile:', error);
            }
            break;
            
          case 'patientProfile':
            try {
              const newProfile = event.newValue ? JSON.parse(event.newValue) : null;
              setPatientProfile(newProfile);
              console.log('ὐ4 Cross-tab sync: patientProfile updated');
            } catch (error) {
              console.error('Error parsing updated patient profile:', error);
            }
            break;
            
          case 'adminProfile':
            try {
              const newProfile = event.newValue ? JSON.parse(event.newValue) : null;
              setAdminProfile(newProfile);
              console.log('ὐ4 Cross-tab sync: adminProfile updated');
            } catch (error) {
              console.error('Error parsing updated admin profile:', error);
            }
            break;
            
          default:
            // Handle case where multiple keys might be cleared
            if (!event.newValue && (event.key === null || event.key === '')) {
              // localStorage was cleared - sync all profiles
              setUserRole(null);
              setDonorProfile(null);
              setPatientProfile(null);
              setAdminProfile(null);
              console.log('ὐ4 Cross-tab sync: All profiles cleared');
            }
            break;
        }
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [userRole]); // Include userRole as dependency to avoid stale closures

  // Update donor profile
  const updateDonorProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/donor/profile/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const result = await response.json();
        setDonorProfile(result.data);
        localStorage.setItem('donorProfile', JSON.stringify(result.data));
        console.log('✅ Donor profile updated successfully:', result.data);
        return { success: true, data: result.data };
      } else {
        const error = await response.json();
        console.error('❌ Failed to update donor profile:', error);
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Error updating donor profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update patient profile
  const updatePatientProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/patient/profile/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const result = await response.json();
        setPatientProfile(result.data);
        localStorage.setItem('patientProfile', JSON.stringify(result.data));
        console.log('✅ Patient profile updated successfully:', result.data);
        return { success: true, data: result.data };
      } else {
        const error = await response.json();
        console.error('❌ Failed to update patient profile:', error);
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Error updating patient profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Update admin profile
  const updateAdminProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const result = await response.json();
        setAdminProfile(result.data);
        localStorage.setItem('adminProfile', JSON.stringify(result.data));
        console.log('✅ Admin profile updated successfully:', result.data);
        return { success: true, data: result.data };
      } else {
        const error = await response.json();
        console.error('❌ Failed to update admin profile:', error);
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Error updating admin profile:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Clear profiles on logout
  const clearProfiles = () => {
    setDonorProfile(null);
    setPatientProfile(null);
    setAdminProfile(null);
    setUserRole(null);
    localStorage.removeItem('userRole');
    localStorage.removeItem('donorProfile');
    localStorage.removeItem('patientProfile');
    localStorage.removeItem('adminProfile');
  };

  const value = {
    donorProfile,
    patientProfile,
    adminProfile,
    userRole,
    loading,
    saveDonorProfile,
    savePatientProfile,
    saveAdminProfile,
    updateDonorProfile,
    updatePatientProfile,
    updateAdminProfile,
    fetchDonorProfile,
    fetchPatientProfile,
    fetchAdminProfile,
    clearProfiles
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook to use the context
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
