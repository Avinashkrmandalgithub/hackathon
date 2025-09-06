import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async () => {
    try {
        // Configure mongoose with better timeout and connection options
        mongoose.set('strictQuery', false);
        
        const connectionOptions = {
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            connectTimeoutMS: 30000,
            maxPoolSize: 10, // Maximum number of connections
        };
        
        const connectionIn = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`,
            connectionOptions
        );
        
        console.log("✅ MongoDB connected successfully!", connectionIn.connection.host);
        console.log("📊 Database:", connectionIn.connection.name);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('🔌 MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });
        
        return connectionIn;
        
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error?.message);
        
        // Check if it's a specific connection error
        if (error.name === 'MongoServerSelectionError') {
            console.log("🔍 Troubleshooting tips:");
            console.log("   1. Check if MongoDB is running locally (if using localhost)");
            console.log("   2. Verify your MongoDB URI in .env file");
            console.log("   3. Check your internet connection (if using MongoDB Atlas)");
            console.log("   4. Verify database credentials and IP whitelist (MongoDB Atlas)");
        }
        
        // For development, continue without database
        if (process.env.NODE_ENV === 'development') {
            console.log("⚠️  Running in development mode without database");
            return null;
        }
        
        // For production, exit with error
        process.exit(1);
    }
}

export default connectDB