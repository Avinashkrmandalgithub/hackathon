import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", process.env.CORS_ORIGIN].filter(Boolean),
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import adminRouter from "./routes/admin.route.js"
import donorRouter from "./routes/doner.route.js"
import recipientRouter from "./routes/recipient.route.js"
import donorRequestRouter from "./routes/donerRequest.route.js"
import recipientRequestRouter from "./routes/recipientRequest.route.js"
import matchRouter from "./routes/match.route.js"
import matchingRouter from "./routes/matching.route.js"

// New temporary routes for mock database
import donorTempRouter from "./routes/donor.route.temp.js"
import patientTempRouter from "./routes/patient.route.temp.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/donor", donorTempRouter)  // Using temp donor routes
app.use("/api/v1/patient", patientTempRouter)  // Using temp patient routes
app.use("/api/v1/recipient", recipientRouter)
app.use("/api/v1/match", matchRouter)
app.use("/api/v1/matching", matchingRouter)
app.use("/api/v1/recipientRequest", recipientRequestRouter)
app.use("/api/v1/donorRequest", donorRequestRouter)

app.get("/", (req, res) => {
    res.json({ message: "Backend API is working", status: "success" })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    
    // Ensure JSON response
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        statusCode: err.statusCode || 500,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Note: 404 handling removed due to routing conflicts

export { app }
