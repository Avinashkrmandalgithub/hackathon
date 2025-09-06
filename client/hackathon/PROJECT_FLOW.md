# 🏥 Organ Donation Platform - Complete Project Flow

## 📋 **Overview**
This is a comprehensive organ donation management system that connects donors with patients in need of organ transplants.

## 🎯 **Core Purpose**
- Help patients find compatible organ donors
- Allow donors to register and offer organs
- Facilitate secure communication between parties
- Maintain medical records and matching algorithms
- Provide dashboards for monitoring and management

## 🔄 **Complete User Journey Flow**

### **1. Landing & Authentication**
```
User visits website
    ↓
Homepage (/) - Information about organ donation
    ↓
User decides to join → Click "Get Started" or "Sign Up"
    ↓
Sign Up (/signup) - Create account with email/password
    ↓
Login (/login) - Authenticate with credentials
    ↓
Authentication successful → Redirect to Role Selection
```

### **2. Role Selection & Profile Setup**
```
Role Selection (/role-selection) - Choose "Donor" or "Patient"
    ↓
If Donor:                          If Patient:
    ↓                                  ↓
Donor Form (/donor-form)          Patient Form (/patient-form)
- Personal details                - Personal details
- Medical information            - Medical condition
- Organs to donate               - Required organs/blood
- Emergency contacts             - Doctor information
    ↓                                  ↓
Profile saved to database        Profile saved to database
    ↓                                  ↓
Redirect to Donor Dashboard      Redirect to Patient Dashboard
```

### **3. Dashboard Experience**

#### **Donor Dashboard (/donor-dashboard)**
```
Dashboard shows:
├── Profile Summary (name, blood type, age, city)
├── Donation Status (available/unavailable toggle)
├── Organs Available (heart, liver, kidneys, etc.)
├── Medical Information (height, weight, history)
├── Recent Notifications (match requests, urgent needs)
├── Quick Actions:
    ├── Update Profile → /donor-profile
    ├── Find Recipients → Matching system
    ├── Donation History
    ├── Contact Support
    └── Settings
```

#### **Patient Dashboard (/patient-dashboard)**
```
Dashboard shows:
├── Patient Profile (name, condition, urgency)
├── Medical Status (required organs, blood type)
├── Doctor Information (name, hospital, contact)
├── Priority Level (Emergency/Urgent/Normal)
├── Medical Updates (appointments, test results)
├── Quick Actions:
    ├── Update Profile → /patient-profile
    ├── Find Donors → Matching system
    ├── Medical Records
    ├── Contact Doctor
    └── Appointments
```

### **4. Profile Management**
```
Profile Pages:
├── Donor Profile (/donor-profile)
    ├── View Mode: Display all information
    ├── Edit Mode: Update any field
    └── Save changes → Update database
├── Patient Profile (/patient-profile)
    ├── View Mode: Display all information
    ├── Edit Mode: Update any field
    └── Save changes → Update database
```

### **5. Matching System**
```
Matching Flow:
├── From Donor Dashboard → "Find Recipients"
    ├── Show compatible patients
    ├── Filter by: Blood type, Organ needed, Location, Urgency
    ├── Display match percentage
    └── Contact patient option
├── From Patient Dashboard → "Find Donors"
    ├── Show compatible donors
    ├── Filter by: Blood type, Organ available, Location
    ├── Display match percentage
    └── Contact donor option
```

## 🗄️ **Database Structure**

### **Collections/Tables:**
```
Users Collection:
├── _id (unique identifier)
├── fullName
├── email (unique)
├── password (hashed)
├── refreshToken
└── timestamps (created/updated)

Donors Collection:
├── _id
├── userId (reference to Users)
├── Personal Info (age, gender, bloodType, phone, address, city)
├── Medical Info (weight, height, medical history, medications)
├── Donation Info (organs to donate, availability, last donation)
├── Emergency Contact (name, phone)
└── Status (active/inactive)

Patients Collection:
├── _id
├── userId (reference to Users)
├── Personal Info (age, gender, bloodType, phone, address, city)
├── Medical Info (condition, medications, allergies, doctor info)
├── Requirements (required organs, blood type, urgency, required by date)
├── Insurance (provider, number)
├── Emergency Contact (name, phone, relation)
└── Status (active/waiting/matched)
```

## 🔐 **Authentication & Security Flow**

### **Protected Routes System:**
```
Route Protection Levels:

Level 1 - Public (No authentication):
├── / (Homepage)
├── /about
├── /work
└── /contact

Level 2 - Authentication Required:
├── /role-selection (must be logged in)
├── /donor-form (must be logged in)
└── /patient-form (must be logged in)

Level 3 - Profile Required:
├── /donor-dashboard (must have donor profile)
├── /patient-dashboard (must have patient profile)
├── /donor-profile (must have donor profile)
└── /patient-profile (must have patient profile)

Level 4 - Admin Only (future):
├── /admin/dashboard
├── /admin/users
└── /admin/reports
```

### **Authentication Process:**
```
Login Process:
1. User enters email/password
2. Backend validates credentials
3. Generate JWT tokens (access + refresh)
4. Store user data in localStorage
5. Set authentication cookies
6. Redirect to intended page

Session Management:
1. Check authentication on app load
2. Validate tokens on protected routes
3. Auto-refresh expired tokens
4. Clear session on logout
```

## 🌐 **API Endpoints Structure**

### **User Management:**
```
POST /api/v1/user/register    - Create new user
POST /api/v1/user/login       - Authenticate user  
POST /api/v1/user/logout      - Logout user
GET  /api/v1/user/profile     - Get current user
PUT  /api/v1/user/profile     - Update user info
```

### **Donor Management:**
```
POST /api/v1/donor/register           - Create donor profile
GET  /api/v1/donor/profile/:userId    - Get donor profile
PUT  /api/v1/donor/profile/:userId    - Update donor profile
GET  /api/v1/donor/all               - List all donors
GET  /api/v1/donor/search            - Search donors with filters
```

### **Patient Management:**
```
POST /api/v1/patient/register           - Create patient profile
GET  /api/v1/patient/profile/:userId    - Get patient profile  
PUT  /api/v1/patient/profile/:userId    - Update patient profile
GET  /api/v1/patient/all               - List all patients
GET  /api/v1/patient/matches/:userId   - Find matching donors
```

## 🔄 **Data Flow Process**

### **Registration Flow:**
```
1. User fills signup form
2. Frontend validates input
3. Send POST to /api/v1/user/register
4. Backend creates user in database
5. Return success response
6. Redirect to login page
```

### **Profile Creation Flow:**
```
1. User selects role (donor/patient)
2. Fill comprehensive form
3. Frontend validates all fields
4. Send POST to respective /register endpoint
5. Backend validates and saves to database
6. Update user context with profile data
7. Redirect to dashboard
```

### **Matching Flow:**
```
1. User clicks "Find Matches"
2. Frontend requests matches from API
3. Backend runs matching algorithm:
   - Blood type compatibility
   - Organ requirements match
   - Location proximity
   - Urgency priority
4. Return sorted match results
5. Display in matching interface
```

## 📱 **Frontend Architecture**

### **Component Structure:**
```
src/
├── components/
│   ├── Auth/ (Login, SignUp)
│   ├── Dashboard/ (Donor, Patient)
│   ├── Forms/ (DonorForm, PatientForm, UpdateForms)
│   ├── Matching/ (MatchingSystem, MatchCard)
│   ├── Profile/ (ProfileView, ProfileEdit)
│   └── UI/ (Button, Card, Modal)
├── pages/
│   ├── Home.jsx
│   ├── DonorProfilePage.jsx
│   ├── PatientProfilePage.jsx
│   └── Unauthorized.jsx
├── context/
│   ├── AuthContext.jsx (user authentication)
│   ├── UserProfileContext.jsx (profile management)
│   └── DonarContext.jsx (legacy)
└── api/
    └── Auth.js (API calls)
```

### **State Management:**
```
AuthContext:
├── user (current logged-in user)
├── loading (authentication check state)
├── isAuthenticated (boolean flag)
└── methods (login, logout, signup)

UserProfileContext:
├── donorProfile (donor data)
├── patientProfile (patient data)
├── userRole (donor/patient)
└── methods (save, update, fetch profiles)
```

## 🚀 **Future Enhancements**

### **Phase 1 - Core Features:**
- Real-time notifications
- Advanced matching algorithms
- Medical document upload
- Communication system

### **Phase 2 - Advanced Features:**
- Video consultations
- Hospital integration
- Insurance processing
- Mobile applications

### **Phase 3 - Enterprise Features:**
- AI-powered matching
- Predictive analytics
- Multi-language support
- Regulatory compliance

## 🔧 **Technology Stack**

### **Frontend:**
- React.js (UI library)
- React Router (routing)
- Context API (state management)
- Tailwind CSS (styling)
- Lucide React (icons)

### **Backend:**
- Node.js (runtime)
- Express.js (web framework)
- MongoDB (database)
- Mongoose (ODM)
- JWT (authentication)
- Bcrypt (password hashing)

### **Tools & Services:**
- MongoDB Atlas (cloud database)
- Nodemon (development)
- CORS (cross-origin requests)
- Cookie-parser (session management)

## 🎯 **Success Metrics**

### **User Engagement:**
- User registration rate
- Profile completion rate
- Active user sessions
- Match success rate

### **Medical Impact:**
- Successful matches
- Response time to urgent cases
- Geographic coverage
- User satisfaction scores

This flow ensures a comprehensive, secure, and user-friendly organ donation platform! 🏥
