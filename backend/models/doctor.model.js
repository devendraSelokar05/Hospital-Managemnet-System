import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    availableDays: [{ type: String }], // Example: ["Monday", "Wednesday"]
    availableTimeSlots: [{ type: String }], // Example: ["10:00 AM - 12:00 PM"]
    status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true })

export const Doctor = mongoose.model("Doctor", doctorSchema)