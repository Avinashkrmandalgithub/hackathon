// Admin Creation Script using existing models
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './src/models/User.model.js';
import Admin from './src/models/Admin.model.js';
import { DB_NAME } from './src/constants.js';

async function createAdminAccount() {
  try {
    // Connect to database using the same connection as your backend
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
    console.log('✅ Connected to database:', DB_NAME);

    const credentials = {
      email: 'admin@hackathon.com',
      password: 'admin123',
      fullName: 'System Administrator'
    };

    console.log('🚀 Creating admin account with credentials:');
    console.log('📧 Email:', credentials.email);
    console.log('🔑 Password:', credentials.password);

    // 1. Create or find user
    let user = await User.findOne({ email: credentials.email });
    if (!user) {
      console.log('👤 Creating new user...');
      const hashedPassword = await bcrypt.hash(credentials.password, 10);
      user = await User.create({
        fullName: credentials.fullName,
        email: credentials.email,
        password: hashedPassword
      });
      console.log('✅ User created successfully');
    } else {
      console.log('👤 User already exists, updating if needed');
      // Update password in case it changed
      user.password = await bcrypt.hash(credentials.password, 10);
      await user.save();
      console.log('✅ User password updated');
    }

    // 2. Create or update admin profile
    let admin = await Admin.findOne({ user: user._id });
    const hashedAdminPassword = await bcrypt.hash(credentials.password, 10);
    
    if (!admin) {
      console.log('👨‍💼 Creating admin profile...');
      admin = await Admin.create({
        user: user._id,
        role: 'admin',
        gender: 'male',
        contactInfo: {
          phone: '+1234567890',
          address: '123 Admin Street, System City, State 12345'
        },
        location: 'System Headquarters',
        userName: credentials.email,
        password: hashedAdminPassword
      });
      console.log('✅ Admin profile created successfully');
    } else {
      console.log('👨‍💼 Admin profile exists, updating credentials...');
      admin.userName = credentials.email;
      admin.password = hashedAdminPassword;
      admin.role = 'admin'; // Ensure role is set
      await admin.save();
      console.log('✅ Admin credentials updated successfully');
    }

    // 3. Verify the creation
    const verifyUser = await User.findById(user._id);
    const verifyAdmin = await Admin.findById(admin._id).populate('user');
    
    console.log('\n🎉 ADMIN ACCOUNT CREATED SUCCESSFULLY!');
    console.log('=====================================');
    console.log('USER DETAILS:');
    console.log('📧 Email:', verifyUser.email);
    console.log('👤 Full Name:', verifyUser.fullName);
    console.log('🆔 User ID:', verifyUser._id);
    console.log('');
    console.log('ADMIN DETAILS:');
    console.log('🏷️  Role:', verifyAdmin.role);
    console.log('📍 Location:', verifyAdmin.location);
    console.log('📱 Phone:', verifyAdmin.contactInfo.phone);
    console.log('🏠 Address:', verifyAdmin.contactInfo.address);
    console.log('🆔 Admin ID:', verifyAdmin._id);
    console.log('=====================================');
    console.log('');
    console.log('🚀 LOGIN INSTRUCTIONS:');
    console.log('');
    console.log('OPTION 1 - Regular User Login (Recommended):');
    console.log('1. Go to: http://localhost:5173/login');
    console.log('2. Email:', credentials.email);
    console.log('3. Password:', credentials.password);
    console.log('4. After login, navigate to admin dashboard');
    console.log('');
    console.log('OPTION 2 - Direct Admin Login:');
    console.log('1. Go to: http://localhost:5173/admin/login');
    console.log('2. Username:', credentials.email);
    console.log('3. Password:', credentials.password);
    console.log('');
    console.log('🎯 After login, you should have full admin access!');

  } catch (error) {
    console.error('❌ Error creating admin account:', error.message);
    
    // Specific error handling
    if (error.name === 'MongoNetworkError') {
      console.error('💡 MongoDB Connection Issue:');
      console.error('   - Make sure MongoDB is running');
      console.error('   - Check if the database name matches your backend config');
    } else if (error.name === 'ValidationError') {
      console.error('💡 Validation Error:');
      console.error('   - Check if all required fields are provided');
      console.error('   - Verify schema matches your models');
    } else {
      console.error('💡 Full error details:', error);
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from database');
    }
    console.log('');
    console.log('✅ Script execution completed!');
    process.exit(0);
  }
}

// Run the script
console.log('🚀 Starting Admin Creation Script with Backend Models...');
console.log('================================================');
createAdminAccount().catch((error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
