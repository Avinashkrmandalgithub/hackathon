# ⚡ Quick Setup Guide for Teammates

## 🚀 **1-Minute Setup** (If you have MongoDB installed)

```bash
# 1. Clone/download the project
# 2. Navigate to backend folder
cd backend

# 3. Install dependencies
npm install

# 4. Copy environment template
copy .env.example .env

# 5. Start MongoDB (Windows)
net start MongoDB

# 6. Start the backend server
npm start

# 7. In new terminal, start frontend
cd ../client/hackathon
npm install
npm run dev
```

**That's it! Your project should be running!**

---

## 🔧 **If MongoDB Not Installed**

### **Windows Quick Install:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer → Choose "Complete" → Check "Install as Service"
3. Follow steps above

### **Alternative: Use MongoDB Atlas (Cloud)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster
3. Get connection string
4. Update `.env` file with Atlas connection string

---

## 📋 **Environment Variables**

Copy `.env.example` to `.env` and update:

```env
# Local MongoDB (Default)
MONGODB_URI=mongodb://localhost:27017

# OR Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/OrganDonationSystem

# JWT Secrets (Change these!)
ACCESS_TOKEN_SECRET=your-secret-key-here
REFRESH_TOKEN_SECRET=your-refresh-secret-here
```

---

## ✅ **Verification Steps**

1. **Backend started**: Should see "MongoDB connected!"
2. **Frontend started**: Opens http://localhost:5173
3. **API working**: Visit http://localhost:8000 → Should show success message
4. **Database connected**: Create a test user account

---

## 🆘 **Need Help?**

### **Common Issues:**
- **MongoDB won't start**: Try `mongod --dbpath C:\data\db`
- **Connection refused**: Check if MongoDB service is running
- **Environment variables not loading**: Make sure `.env` is in backend folder

### **Quick Fixes:**
```bash
# Check MongoDB status
mongo --version

# Start MongoDB manually
mongod --dbpath "C:\data\db"

# Test database connection
npm run test-db
```

---

## 🎯 **For Hackathon Demo**

### **Demo Data Setup:**
```bash
# Run this to add sample data
npm run seed-demo-data
```

### **Production Ready:**
- Use MongoDB Atlas for consistent access
- Share Atlas connection string with team
- Test all features before presentation

---

**🎉 Ready to hack! The full setup guide is in `MONGODB_SETUP_GUIDE.md` for detailed instructions.**
