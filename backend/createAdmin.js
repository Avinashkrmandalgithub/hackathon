// Simple Admin Creation Script
// Run this with: node createAdmin.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Simple schema definitions (in case models aren't available)
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  refreshToken: String
});

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: String, enum: ['admin', 'hospital', 'medical'], default: 'admin' },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  contactInfo: {
    phone: String,
    address: String
  },
  userName: String,
  password: String,
  refreshToken: String,
  location: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);

async function createAdminAccount() {
  try {
    // Connect to database
    await mongoose.connect('mongodb://localhost:27017/OrganDonationSystem');
    console.log('✅ Connected to database');

    const credentials = {
      email: 'admin@hackathon.com',
      password: 'admin123',
      fullName: 'System Administrator'
    };

    console.log('🚀 Creating admin account...');

    // 1. Create or find user
    let user = await User.findOne({ email: credentials.email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      user = await User.create({
        fullName: credentials.fullName,
        email: credentials.email,
        password: hashedPassword
      });
      console.log('✅ User created');
    } else {
      console.log('👤 User already exists');
    }

    // 2. Create or update admin
    let admin = await Admin.findOne({ user: user._id });
    const hashedAdminPassword = await bcrypt.hash(credentials.password, 10);
    
    if (!admin) {
      admin = await Admin.create({
        user: user._id,
        role: 'admin',
        gender: 'male',
        contactInfo: {
          phone: '+1234567890',
          address: '123 Admin Street'
        },
        location: 'System HQ',
        userName: credentials.email,
        password: hashedAdminPassword
      });
      console.log('✅ Admin profile created');
    } else {
      admin.userName = credentials.email;
      admin.password = hashedAdminPassword;
      await admin.save();
      console.log('✅ Admin credentials updated');
    }

    console.log('\n🎉 ADMIN CREDENTIALS:');
    console.log('========================');
    console.log('Email:', credentials.email);
    console.log('Password:', credentials.password);
    console.log('========================');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.disconnect();
    console.log('✅ Setup complete!');
  }
}

createAdminAccount();
