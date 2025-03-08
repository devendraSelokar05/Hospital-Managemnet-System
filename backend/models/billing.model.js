import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    // doctorName: { type: String },
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment" },
    totalAmount: { type: Number },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "credit card", "insurance"], required: true },
}, { timestamps: true })

export const Billing = mongoose.model("Billing", billingSchema)
