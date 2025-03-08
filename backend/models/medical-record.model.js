import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    diagnosis: { type: String, required: true },
    medications: [{ name: String, dosage: String, frequency: String }], 
    tests: [{ type: String }], // Example: ["Blood Test", "X-Ray"]
    notes: { type: String },
})

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);