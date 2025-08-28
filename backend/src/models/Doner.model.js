import mongoose from "mongoose";

const donerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    age: {
        type: Number,
        min: 18,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true
    },
    contactInfo: {
        phone: String,
        address: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Doner = mongoose.model('Doner', donerSchema);
export default Doner;
