import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    doctorName: { type: String },
    date: { type: Date, required: true },
    timeSlot: { type: String,  required: true }, // Example: "10:30 AM - 11:00 AM"
    status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
    reason: { type: String }
}, { timestamps: true })

export const Appointment = mongoose.model("Appointment", appointmentSchema)