import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './src/models/User.model.js';
import Admin from './src/models/Admin.model.js';

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/OrganDonationSystem');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Create admin credentials
const createAdminCredentials = async () => {
  try {
    console.log('🚀 Creating admin credentials...');

    // Admin credentials
    const adminCredentials = {
      email: 'admin@hackathon.com',
      password: 'admin123',
      fullName: 'System Administrator'
    };

    const adminProfile = {
      role: 'admin',
      gender: 'male',
      contactInfo: {
        phone: '+1234567890',
        address: '123 Admin Street, Admin City'
      },
      location: 'System Location',
      userName: 'admin@hackathon.com',
      password: 'admin123'
    };

    // 1. Check if admin user already exists
    let user = await User.findOne({ email: adminCredentials.email });
    
    if (!user) {
      // Create user first
      console.log('👤 Creating user account...');
      
      // Hash password for user
      const hashedUserPassword = await bcrypt.hash(adminCredentials.password, 10);
      
      user = await User.create({
        fullName: adminCredentials.fullName,
        email: adminCredentials.email,
        password: hashedUserPassword
      });
      
      console.log('✅ User account created:', user.email);
    } else {
      console.log('👤 User account already exists:', user.email);
    }

    // 2. Check if admin profile already exists
    let admin = await Admin.findOne({ user: user._id });
    
    if (!admin) {
      // Create admin profile
      console.log('👨‍💼 Creating admin profile...');
      
      // Hash password for admin
      const hashedAdminPassword = await bcrypt.hash(adminProfile.password, 10);
      
      admin = await Admin.create({
        user: user._id,
        role: adminProfile.role,
        gender: adminProfile.gender,
        contactInfo: adminProfile.contactInfo,
        location: adminProfile.location,
        userName: adminProfile.userName,
        password: hashedAdminPassword
      });
      
      console.log('✅ Admin profile created');
    } else {
      console.log('👨‍💼 Admin profile already exists');
      
      // Update admin credentials if needed
      const hashedAdminPassword = await bcrypt.hash(adminProfile.password, 10);
      admin.userName = adminProfile.userName;
      admin.password = hashedAdminPassword;
      await admin.save();
      
      console.log('✅ Admin credentials updated');
    }

    // 3. Display credentials
    console.log('\n🎉 ADMIN CREDENTIALS READY!');
    console.log('================================');
    console.log('📧 Email/Username:', adminCredentials.email);
    console.log('🔑 Password:', adminCredentials.password);
    console.log('👤 Full Name:', adminCredentials.fullName);
    console.log('🏥 Admin Username:', adminProfile.userName);
    console.log('🔐 Admin Password:', adminProfile.password);
    console.log('================================');
    console.log('');
    console.log('🚀 HOW TO LOGIN:');
    console.log('1. For regular user login: Use email + password above');
    console.log('2. For admin login: Use admin username + admin password above');
    console.log('');
    console.log('📍 Login URLs:');
    console.log('- User Login: http://localhost:5173/login');
    console.log('- Admin Login: http://localhost:5173/admin/login');

  } catch (error) {
    console.error('❌ Error creating admin credentials:', error);
  }
};

// Main execution
const main = async () => {
  await connectDB();
  await createAdminCredentials();
  
  console.log('\n✅ Admin credentials setup complete!');
  process.exit(0);
};

// Run the script
main().catch(error => {
  console.error('❌ Script error:', error);
  process.exit(1);
});
