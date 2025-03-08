import { User } from "../models/user.model.js"; 
import { Patient } from "../models/patient.model.js";
import { MedicalRecord } from "../models/medical-record.model.js"; // Ensure this model exists

// ✅ Create Patient
export const registerPatient = async (req, res) => {
    try {
        const { userId, age, bloodGroup, medicalHistory, emergencyContact } = req.body;

        if(!userId || !age || !bloodGroup || !medicalHistory || !emergencyContact) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if user role is "patient"
        if (user.role !== "patient") {
            return res.status(400).json({ message: "User is not registered as a patient", success: false });
        }

        // Create a new Patient entry
        const patient = new Patient({
            userId,
            age,
            name: user.name,
            contact: user.phone,
            bloodGroup,
            medicalHistory,
            emergencyContact
        });

        await patient.save();
        return res.status(201).json({ message: "Patient registered successfully", success: true, patient });
    } catch (error) {
        console.error("Error in registerPatient:", error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

// ✅ Get All Patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate("userId", "name phone email");

        return res.status(200).json({ message: "All Patients fetched successfully", success: true, patients });
    } catch (error) {
        console.error("Error in getAllPatients:", error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

// ✅ Get Patient By ID
export const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate("userId", "name phone email");
        if (!patient) {
            return res.status(404).json({ message: "Patient not found", success: false });
        }
        return res.status(200).json({ message: "Patient By ID fetched successfully", success: true, patient });
    } catch (error) {
        console.error("Error in getPatientById:", error);
        return res.status(500).json({ message: error.message, success: false });
    }
};

// ✅ Update Patient Record
export const updatePatientRecord = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found", success: false });
        }

        // Prevent userId from being updated
        const { userId, ...updateData } = req.body;

        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, updateData, { new: true });

        return res.status(200).json({ message: "Patient Record updated successfully", success: true, updatedPatient });
    } catch (error) {
        console.error("Error in updatePatientRecord:", error);
        return res.status(500).json({ message: "Failed to update Patient Record", success: false });
    }
};

// ✅ Delete Patient Record
export const deletePatientRecord = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found", success: false });
        }

        // Delete the patient
        await Patient.findByIdAndDelete(req.params.id);

        // Delete related medical records
        await MedicalRecord.deleteMany({ patientId: req.params.id });

        return res.status(200).json({ message: "Patient deleted successfully", success: true });
    } catch (error) {
        console.error("Error in deletePatientRecord:", error);
        return res.status(500).json({ message: "Failed to delete Patient Record", success: false });
    }
};
