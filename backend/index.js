import dotenv from "dotenv"
import connectDB from './src/db/db.js'
import { app } from "./src/app.js"
// import "./src/cron/matchingCron.js"  // Disabled temporarily due to database connection issues
dotenv.config({path : "./.env"})

const PORT = process.env.PORT || 8000

// Set NODE_ENV for development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

connectDB().then((connection) => {
    if (connection) {
        console.log("✅ Database connected successfully!");
    } else {
        console.log("⚠️  Running without database (development mode)");
    }
    
    app.on("error", (err)=>{
        console.error("❌ Express app error:", err)
    })
    
    app.listen(PORT,()=>{
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌐 API available at: http://localhost:${PORT}`);
        console.log(`📝 Test registration: POST http://localhost:${PORT}/api/v1/user/register`);
    })
}).catch((err) => {
    console.error("❌ Server startup failed:", err?.message);
    process.exit(1);
})
