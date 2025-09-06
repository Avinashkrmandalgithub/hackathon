# Update Profile Functionality - Testing Guide

## Overview
This document outlines the update profile functionality implemented for both donor and patient pages.

## New Components Created

### 1. DonorUpdateForm (`src/components/Forms/DonorUpdateForm.jsx`)
- Pre-populated form for updating donor profiles
- All fields from the original DonorForm included
- Form validation and error handling
- Success/cancel callbacks for parent components

### 2. PatientUpdateForm (`src/components/Forms/PatientUpdateForm.jsx`)
- Pre-populated form for updating patient profiles
- All fields from the original PatientForm included
- Form validation and error handling
- Success/cancel callbacks for parent components

### 3. DonorProfilePage (`src/pages/DonorProfilePage.jsx`)
- View mode displaying all donor information in organized sections
- Edit mode using DonorUpdateForm
- Toggle between view and edit modes
- Loading states and error handling
- Active profile status indicator

### 4. PatientProfilePage (`src/pages/PatientProfilePage.jsx`)
- View mode displaying all patient information in organized sections
- Edit mode using PatientUpdateForm
- Toggle between view and edit modes
- Loading states and error handling
- Active profile status indicator with urgency levels

## API Updates Required

### Backend Endpoints Needed
- `PUT /api/v1/donor/update/:userId` - Update donor profile
- `PUT /api/v1/patient/update/:userId` - Update patient profile

## UserProfileContext Updates

### New Functions Added
- `updateDonorProfile(profileData)` - Updates donor profile via API
- `updatePatientProfile(profileData)` - Updates patient profile via API

## Routing Updates

### New Routes Added
- `/donor-profile` - DonorProfilePage
- `/patient-profile` - PatientProfilePage

### Dashboard Integration
- Updated Donor dashboard to navigate to `/donor-profile` instead of legacy route
- Updated Patient dashboard to navigate to `/patient-profile` instead of legacy route

## Testing Steps

### 1. Start the Backend Server
```bash
cd backend
npm run dev
```

### 2. Start the Frontend Development Server
```bash
cd client/hackathon
npm run dev
```

### 3. Test Donor Profile Update
1. Navigate to donor dashboard (`/donor-dashboard`)
2. Click "Update Profile" in Quick Actions
3. Should navigate to `/donor-profile`
4. Click "Edit Profile" button
5. Verify form is pre-populated with existing data
6. Make changes to any field
7. Click "Update Profile" button
8. Verify success message and return to view mode
9. Verify changes are saved and displayed

### 4. Test Patient Profile Update
1. Navigate to patient dashboard (`/patient-dashboard`)
2. Click "Update Profile" in Quick Actions
3. Should navigate to `/patient-profile`
4. Click "Edit Profile" button
5. Verify form is pre-populated with existing data
6. Make changes to any field
7. Click "Update Profile" button
8. Verify success message and return to view mode
9. Verify changes are saved and displayed

### 5. Error Handling Tests
- Test with invalid data (empty required fields)
- Test with network errors (backend down)
- Test cancel functionality (should return to view mode without saving)

## Features Implemented

### Visual Design
- Consistent styling with existing application
- Green theme for donor pages
- Blue theme for patient pages
- Responsive layout for mobile and desktop
- Loading spinners and states
- Status indicators and badges

### User Experience
- Seamless transition between view and edit modes
- Form pre-population to reduce user effort
- Clear feedback on success/error states
- Cancel option to discard changes
- Professional medical UI design

### Data Management
- Complete profile data handling
- Context state management
- Local storage integration
- API error handling
- Form validation

## Dependencies Used
- React hooks (useState, useEffect, useContext)
- React Router for navigation
- UserProfileContext for state management
- Tailwind CSS for styling
- Existing UI components (Card, Button, etc.)

## Success Criteria
- ✅ Forms pre-populate with existing data
- ✅ Updates are saved to backend via API
- ✅ UI updates reflect changes immediately
- ✅ Error handling works correctly
- ✅ Navigation between view/edit modes is smooth
- ✅ Mobile-responsive design
- ✅ Consistent with application design system
