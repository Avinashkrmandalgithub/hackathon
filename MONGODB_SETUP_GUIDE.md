# 🍃 MongoDB Setup Guide for Team Members

## 📋 **Overview**
This guide will help you set up MongoDB locally and connect it to the organ donation platform without any errors. Follow these steps in order.

---

## 🎯 **OPTION 1: LOCAL MONGODB INSTALLATION** (Recommended for Development)

### **Step 1: Download and Install MongoDB**

#### **For Windows:**
1. **Download MongoDB Community Server**:
   - Visit: https://www.mongodb.com/try/download/community
   - Select: `Windows x64`
   - Version: `7.0.x (current)`
   - Package: `msi`

2. **Install MongoDB**:
   - Run the downloaded `.msi` file
   - Choose `Complete` installation
   - ✅ **Important**: Check "Install MongoDB as a Service"
   - ✅ **Important**: Check "Install MongoDB Compass" (GUI tool)
   - Click `Install`

3. **Verify Installation**:
   ```powershell
   # Open Command Prompt as Administrator and run:
   mongod --version
   mongo --version
   ```

#### **For macOS:**
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community
```

#### **For Linux (Ubuntu):**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update packages and install
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### **Step 2: Start MongoDB Service**

#### **Windows:**
```powershell
# Option A: Start as Windows Service (Automatic)
net start MongoDB

# Option B: Manual start (if service not installed)
mongod --dbpath "C:\data\db"
```

#### **macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Check status
sudo systemctl status mongod
```

### **Step 3: Test MongoDB Connection**
```bash
# Connect to MongoDB shell
mongo

# Or with newer versions:
mongosh

# You should see:
# > MongoDB shell version v7.x.x
# > connecting to: mongodb://127.0.0.1:27017
```

---

## 🎯 **OPTION 2: MONGODB ATLAS (Cloud)** (Recommended for Production)

### **Step 1: Create MongoDB Atlas Account**
1. Visit: https://www.mongodb.com/cloud/atlas
2. Click `Try Free`
3. Sign up with email or Google account
4. Complete email verification

### **Step 2: Create a Cluster**
1. **Choose Deployment**:
   - Select `M0 Sandbox` (Free tier)
   - Choose closest region
   - Click `Create Deployment`

2. **Set Database User**:
   - Username: `hackathonuser`
   - Password: Generate secure password (save this!)
   - Click `Create User`

3. **Add IP Address**:
   - Add `0.0.0.0/0` (allows access from anywhere)
   - **Note**: For production, use specific IPs
   - Click `Add Entry`

4. **Get Connection String**:
   - Click `Connect`
   - Choose `Connect your application`
   - Copy the connection string
   - Replace `<password>` with your actual password

### **Step 3: Connection String Format**
```javascript
mongodb+srv://hackathonuser:<password>@cluster0.xxxxx.mongodb.net/OrganDonationSystem?retryWrites=true&w=majority
```

---

## 🔧 **PROJECT INTEGRATION SETUP**

### **Step 1: Create Environment Variables**

Create `.env` file in the `backend` folder:

```env
# MongoDB Configuration
DB_NAME=OrganDonationSystem
MONGODB_URI=mongodb://localhost:27017/OrganDonationSystem

# For MongoDB Atlas, use:
# MONGODB_URI=mongodb+srv://hackathonuser:<password>@cluster0.xxxxx.mongodb.net/OrganDonationSystem?retryWrites=true&w=majority

# JWT Configuration
ACCESS_TOKEN_SECRET=your-super-secret-access-token-key-for-hackathon-2024
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-for-hackathon-2024
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=30d

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### **Step 2: Update Database Connection**

Check `backend/src/db/index.js`:

```javascript
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}` || `mongodb://localhost:27017/${DB_NAME}`);
        console.log(`\n☘️  MongoDB connected! Database Host: ${connectionInstance.connection.host}`);
        console.log(`📊 Database Name: ${connectionInstance.connection.name}`);
    } catch (error) {
        console.error("❌ MONGODB connection FAILED:", error);
        process.exit(1);
    }
}

export default connectDB;
```

### **Step 3: Install Dependencies**

Navigate to backend folder and install:

```bash
cd backend
npm install mongoose dotenv
```

### **Step 4: Update Server Entry Point**

Check `backend/src/index.js` or main server file:

```javascript
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

// Load environment variables
dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 8000;

// Connect to MongoDB and start server
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port: ${PORT}`);
        console.log(`🌐 Frontend URL: http://localhost:5173`);
        console.log(`🔗 API Base URL: http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
});
```

---

## 🧪 **TESTING THE CONNECTION**

### **Step 1: Start Backend Server**
```bash
cd backend
npm start
# or
npm run dev
```

### **Step 2: Check Console Output**
You should see:
```
🚀 Server is running on port: 8000
☘️  MongoDB connected! Database Host: localhost:27017
📊 Database Name: OrganDonationSystem
```

### **Step 3: Test API Endpoints**
```bash
# Test server health
curl http://localhost:8000/

# Should return:
# {"message":"Backend API is working","status":"success"}
```

---

## 🛠️ **TROUBLESHOOTING COMMON ISSUES**

### **Issue 1: "connect ECONNREFUSED"**
**Problem**: MongoDB service not running
**Solution**:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod

# Manual start
mongod --dbpath "C:\data\db"  # Windows
mongod --dbpath /usr/local/var/mongodb  # macOS
```

### **Issue 2: "Authentication failed"**
**Problem**: Wrong username/password for Atlas
**Solution**:
- Double-check connection string
- Verify password in Atlas dashboard
- Ensure user has read/write permissions

### **Issue 3: "Database not found"**
**Problem**: Database doesn't exist
**Solution**:
- MongoDB creates database automatically on first write
- Try registering a user to create the database

### **Issue 4: "MongoServerError: bad auth"**
**Problem**: Atlas IP whitelist issue
**Solution**:
- Add `0.0.0.0/0` to IP Access List in Atlas
- Or add your specific IP address

### **Issue 5: ".env file not loaded"**
**Problem**: Environment variables not reading
**Solution**:
```javascript
// Add this at the very top of your main server file
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
```

---

## 📊 **DATABASE STRUCTURE VERIFICATION**

### **Step 1: Use MongoDB Compass**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. You should see `OrganDonationSystem` database
4. Collections: `users`, `donors`, `patients`, `admins`

### **Step 2: Check Collections via Code**
Create test script `backend/testDB.js`:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/OrganDonationSystem');
        console.log('✅ Connected to MongoDB');
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Available collections:', collections.map(c => c.name));
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error);
        process.exit(1);
    }
}

testConnection();
```

Run test:
```bash
node testDB.js
```

---

## 🚀 **PRODUCTION DEPLOYMENT NOTES**

### **For Team Collaboration:**
1. **Use MongoDB Atlas** (cloud) for consistent database access
2. **Share connection string** securely (not in code!)
3. **Use environment variables** for all sensitive data
4. **Set up proper IP whitelisting** for security

### **Environment Variables for Production:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...  # Atlas connection string
ACCESS_TOKEN_SECRET=secure-production-secret
REFRESH_TOKEN_SECRET=secure-production-refresh-secret
CORS_ORIGIN=your-frontend-domain.com
```

---

## 📋 **QUICK SETUP CHECKLIST**

- [ ] MongoDB installed/Atlas account created
- [ ] MongoDB service running
- [ ] `.env` file created with correct variables
- [ ] Dependencies installed (`mongoose`, `dotenv`)
- [ ] Database connection code updated
- [ ] Server starts without errors
- [ ] API endpoints respond correctly
- [ ] Frontend can communicate with backend

---

## 💡 **PRO TIPS FOR HACKATHON**

### **Backup Strategy:**
1. **Primary**: Local MongoDB for development
2. **Backup**: Atlas free tier for demos
3. **Emergency**: Mock data service if database fails

### **Team Sharing:**
```bash
# Share this exact .env template:
cp .env.example .env
# Then fill in your specific values
```

### **Demo Preparation:**
- Test database connection before demo
- Have Atlas connection ready as backup
- Pre-populate with sample data
- Clear sensitive data before presentation

---

## 🎯 **FINAL VERIFICATION**

After setup, test the complete flow:

1. **Backend starts**: ✅ MongoDB connected
2. **User registration**: ✅ Creates user in database  
3. **Profile creation**: ✅ Donor/Patient records saved
4. **Dashboard loads**: ✅ Data retrieved successfully
5. **Admin functions**: ✅ User management works

**If all steps pass, your MongoDB setup is complete and ready for hackathon!** 🏆

---

**Need help? Check the troubleshooting section or reach out to the team!** 🤝
