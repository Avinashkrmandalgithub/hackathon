# Admin Functionality & Cross-Tab Synchronization Implementation Guide

## Overview

The `UserProfileContext` has been enhanced to support:

1. **Admin Role Management** - Create, fetch, and update admin profiles
2. **Cross-Tab Synchronization** - Prevent profile conflicts across multiple browser tabs
3. **Role Validation** - Ensure users can only have one profile type

## New Features Added

### 1. Admin Profile State
- `adminProfile` - Stores admin profile data
- Updated `userRole` to support 'admin' alongside 'donor' and 'patient'

### 2. Admin Functions
- `saveAdminProfile(profileData)` - Create new admin profile
- `fetchAdminProfile()` - Retrieve existing admin profile
- `updateAdminProfile(profileData)` - Update admin profile
- Cross-role validation prevents multiple profile types per user

### 3. Cross-Tab Synchronization
- Automatic localStorage sync across all browser tabs
- Real-time profile state updates when changes occur in other tabs
- Prevents stale data and role conflicts

## Important: Authentication Requirements

⚠️ **CRITICAL**: Admin profile creation requires the user to be **logged in first** as a regular user. The backend admin registration endpoint is protected by authentication middleware.

### Authentication Flow:
1. **First**: User registers/logs in as regular user → Gets access token
2. **Then**: Authenticated user can create admin profile

## Usage Examples

### Creating an Admin Profile Component

```jsx
import React, { useState } from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import { useAuth } from '../context/AuthContext'; // Import auth context

const AdminProfileForm = () => {
  const { saveAdminProfile, loading } = useUserProfile();
  const { user, isAuthenticated } = useAuth(); // Get auth state
  const [formData, setFormData] = useState({
    role: 'admin', // 'admin', 'hospital', 'medical'
    gender: '',
    phone: '',
    address: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check authentication first
    if (!isAuthenticated || !user) {
      alert('Please login first to create an admin profile.');
      return;
    }
    
    const result = await saveAdminProfile(formData);
    
    if (result.success) {
      console.log('Admin profile created:', result.data);
      // Show success message and admin credentials
      alert(`Admin Created Successfully!\nUsername: ${result.data.credentials.username}\nPassword: ${result.data.credentials.password}`);
    } else {
      console.error('Failed to create admin profile:', result.error);
      alert('Error: ' + result.error);
    }
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div>
        <h3>Authentication Required</h3>
        <p>You must be logged in as a regular user before creating an admin profile.</p>
        <p>Please <a href="/login">login</a> or <a href="/register">register</a> first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={formData.role} 
        onChange={(e) => setFormData({...formData, role: e.target.value})}
        required
      >
        <option value="admin">Admin</option>
        <option value="hospital">Hospital</option>
        <option value="medical">Medical</option>
      </select>
      
      <select 
        value={formData.gender}
        onChange={(e) => setFormData({...formData, gender: e.target.value})}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      
      <input 
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}
        required
      />
      
      <textarea 
        placeholder="Address"
        value={formData.address}
        onChange={(e) => setFormData({...formData, address: e.target.value})}
        required
      />
      
      <input 
        type="text"
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({...formData, location: e.target.value})}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creating Admin...' : 'Create Admin Profile'}
      </button>
    </form>
  );
};
```

### Using Admin Profile in Components

```jsx
import React, { useEffect } from 'react';
import { useUserProfile } from '../context/UserProfileContext';

const AdminDashboard = () => {
  const { 
    adminProfile, 
    userRole, 
    fetchAdminProfile,
    updateAdminProfile 
  } = useUserProfile();

  useEffect(() => {
    // Fetch admin profile if user role is admin but no profile loaded
    if (userRole === 'admin' && !adminProfile) {
      fetchAdminProfile();
    }
  }, [userRole, adminProfile, fetchAdminProfile]);

  const handleUpdateProfile = async (updates) => {
    const result = await updateAdminProfile(updates);
    if (result.success) {
      console.log('Profile updated successfully');
    }
  };

  if (userRole !== 'admin') {
    return <div>Access denied. Admin role required.</div>;
  }

  if (!adminProfile) {
    return <div>Loading admin profile...</div>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, {adminProfile.user.fullName}</p>
      <p>Role: {adminProfile.role}</p>
      <p>Location: {adminProfile.location}</p>
      {/* Admin dashboard content */}
    </div>
  );
};
```

## Testing Cross-Tab Synchronization

### Test Scenario 1: Profile Creation Conflict Prevention
1. **Tab 1**: Login and create a donor profile
2. **Tab 2**: Open same app, try to create patient profile
   - **Expected**: Error message preventing patient profile creation
   - **Result**: Cross-tab sync prevents role conflicts

### Test Scenario 2: Real-time State Sync
1. **Tab 1**: Create donor profile
2. **Tab 2**: Should automatically update to show donor role
3. **Tab 1**: Update donor profile
4. **Tab 2**: Should reflect updated donor information

### Test Scenario 3: Admin Profile Flow
1. **Tab 1**: Create admin profile
2. **Tab 2**: Should show admin role immediately
3. **Tab 1**: Try creating patient profile
   - **Expected**: Blocked with role conflict error

## Technical Implementation Details

### Backend Integration
The admin functions integrate with these backend endpoints:
- `POST /api/v1/admin/register` - Admin registration
- `GET /api/v1/admin/password/generate` - Generate admin credentials  
- `GET /api/v1/admin/profile` - Fetch admin profile
- `PUT /api/v1/admin/update` - Update admin profile

### localStorage Keys
- `userRole` - Current user role ('donor', 'patient', 'admin')
- `donorProfile` - Donor profile data (JSON)
- `patientProfile` - Patient profile data (JSON)
- `adminProfile` - Admin profile data (JSON)

### Cross-Tab Event Handling
The storage event listener responds to changes in:
- Role changes across tabs
- Profile updates from other tabs
- Profile clearing/logout events

## Error Handling

The implementation includes comprehensive error handling:
- Role conflict detection
- Network error handling  
- JSON parsing error handling
- Invalid response format handling

## Security Considerations

1. **Credentials Security**: Admin credentials are displayed once after creation
2. **Role Validation**: Server-side validation prevents unauthorized role changes
3. **Authentication**: All requests include credentials for proper authentication

## Migration Notes

If upgrading from a previous version:
1. No breaking changes to existing donor/patient functionality
2. Admin functionality is additive
3. Cross-tab sync is automatic and requires no changes to existing components
4. localStorage structure is backward compatible

This implementation provides a robust foundation for admin management while solving the cross-tab synchronization issue that was causing profile conflicts.
