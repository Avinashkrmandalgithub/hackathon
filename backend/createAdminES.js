// ES Module Admin Creation Script
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Schema definitions
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
    console.log('🔌 Connecting to MongoDB...');
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
      console.log('✅ User created:', credentials.email);
    } else {
      console.log('👤 User already exists:', credentials.email);
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
          address: '123 Admin Street, System City'
        },
        location: 'System Headquarters',
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

    console.log('\n🎉 SUCCESS! ADMIN CREDENTIALS READY:');
    console.log('=====================================');
    console.log('📧 Email:', credentials.email);
    console.log('🔑 Password:', credentials.password);
    console.log('👤 Full Name:', credentials.fullName);
    console.log('=====================================');
    console.log('');
    console.log('🚀 HOW TO LOGIN:');
    console.log('1. Go to: http://localhost:5173/login');
    console.log('2. Use the email and password above');
    console.log('3. Navigate to admin dashboard after login');
    console.log('');
    console.log('OR');
    console.log('');
    console.log('1. Go to: http://localhost:5173/admin/login');
    console.log('2. Username:', credentials.email);
    console.log('3. Password:', credentials.password);

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.name === 'MongoNetworkError') {
      console.error('💡 Make sure MongoDB is running on localhost:27017');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
    console.log('✅ Admin setup complete!');
    process.exit(0);
  }
}

// Run the script
console.log('🚀 Starting Admin Creation Script...');
createAdminAccount().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
