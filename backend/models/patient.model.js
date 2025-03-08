import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: Number, required: true },
    contact: { type: Number, required: true },
    name: { type: String, required: true },
    bloodGroup: { type: String },
    medicalHistory: [{ type: String }], // Example: ["Diabetes", "Hypertension"]
    emergencyContact: { name: String, phone: Number, relation: String }
})

export const Patient = mongoose.model("Patient", patientSchema)