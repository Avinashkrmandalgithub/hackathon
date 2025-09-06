# 🔑 ADMIN LOGIN CREDENTIALS - SETUP GUIDE

## 🚀 **Quick Solution**: Create Admin Credentials Directly

Since the registration flow has authentication issues, I've created a script to add admin credentials directly to your database.

---

## 🎯 **STEP 1: Create Admin Credentials**

### **Navigate to Backend Directory:**
```bash
cd "C:\Users\USER\Desktop\hackathon project\hackathon\backend"
```

### **Run Admin Creation Script:**
```bash
node createAdmin.js
```

**Expected Output:**
```
✅ Connected to database
🚀 Creating admin account...
✅ User created
✅ Admin profile created

🎉 ADMIN CREDENTIALS:
========================
Email: admin@hackathon.com
Password: admin123
========================
✅ Setup complete!
```

---

## 🎯 **STEP 2: Login Options**

### **Option A: Regular User Login** (Recommended)
1. Go to: `http://localhost:5173/login`
2. Use these credentials:
   - **Email**: `admin@hackathon.com`
   - **Password**: `admin123`
3. After login, you can access admin features

### **Option B: Direct Admin Login**
1. Go to: `http://localhost:5173/admin/login`
2. Use these credentials:
   - **Username**: `admin@hackathon.com`
   - **Password**: `admin123`

---

## 🎯 **STEP 3: Test Admin Access**

After logging in:

### **Check Admin Dashboard:**
- Navigate to: `http://localhost:5173/admin/dashboard`
- Should work without authentication issues

### **Verify Profile:**
- You should see admin profile information
- Role should be set to 'admin'
- No need to go through registration flow

---

## 🎊 **WHAT THIS CREATES:**

### **User Account:**
- Email: `admin@hackathon.com`
- Password: `admin123`
- Full Name: `System Administrator`

### **Admin Profile:**
- Role: `admin`
- Gender: `male`
- Phone: `+1234567890`
- Address: `123 Admin Street`
- Location: `System HQ`
- Username: `admin@hackathon.com`
- Password: `admin123`

---

## 🔧 **Troubleshooting:**

### **If Script Fails:**
1. **Make sure MongoDB is running:**
   ```bash
   # Check if MongoDB service is running
   # Or start it manually if needed
   ```

2. **Check database connection:**
   - The script uses: `mongodb://localhost:27017/OrganDonationSystem`
   - Make sure this matches your backend configuration

3. **Try alternative script:**
   ```bash
   # If createAdmin.js doesn't work, try:
   node createAdminCredentials.js
   ```

### **If Login Still Fails:**
1. **Clear browser data** (F12 → Application → Clear All)
2. **Restart backend server**
3. **Try both login methods** (user login vs admin login)

---

## 🎯 **FINAL RESULT:**

✅ **Admin credentials created in database**  
✅ **Can login directly without registration**  
✅ **Bypasses authentication issues**  
✅ **Ready to use admin features**  

---

## 🚀 **SUMMARY:**

**Just run:** `node createAdmin.js`  
**Then login with:** `admin@hackathon.com` / `admin123`  
**Access admin dashboard:** `http://localhost:5173/admin/dashboard`

**No more registration headaches - you can login directly!** 🎉
