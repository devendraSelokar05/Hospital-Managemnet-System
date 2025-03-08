import { MedicalRecord } from "../models/medical-record.model.js";

//create medical record

export const createMedicalRecord = async (req, res) => {
    try {
        const{ patientId, doctorId, diagnosis, medications, tests, notes } = req.body
        if(!patientId || !doctorId || !diagnosis || !medications || !tests || !notes){
            return res.status(400).json({
                message: "All Fields are required",
                success: false
            })
        }
        const record = new MedicalRecord({ patientId, doctorId, diagnosis, medications, tests, notes })
        await record.save()
        return res.status(201).json({
            message: "Medical Record created successfully",
            success: true,
            record
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false,
        })

    }
};

//get all medical records
export const getAllMedicalRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find().populate("patientId doctorId", "name age gender contact address medicalHistory")
        return res.status(200).json({
            message: "All Medical Records fetched successfully",
            success: true,
            records
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false,
        })

    }
}
//get medical record by id

export const getMedicalRecordById = async (req, res) => {
    try {
        const record = await MedicalRecord.findById(req.params.id).populate("patientId doctorId", "name age gender contact address medicalHistory")
        return res.status(200).json({
            message: "Medical Record through ID fetched successfully",
            success: true,
            record
        })    
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

//update medical record
export const updateMedicalRecord = async(req, res)=>{
    try {
        const updatedRecord = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!updatedRecord){
            return res.status(404).json({
                message: "Medical Record not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Medical Record updated successfully",
            success: true,
            updatedRecord
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }
}

//delete medical record

export const deleteMedicalRecord = async(req, res)=>{
    try {
        const deleteRecord = await MedicalRecord.findByIdAndDelete(req.params.id)
        if(!deleteRecord){
            return res.status(404).json({
                message: "Medical Record not found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Medical Record deleted successfully",
            success: true,
            deleteRecord
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete Medical Record",
            success: false,
        })
    }
}