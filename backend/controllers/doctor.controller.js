import { Doctor } from "../models/doctor.model.js";
import { User } from "../models/user.model.js";

//register doctor

export const registerDoctor = async (req, res) => {
    try {
        const { userId, specialization, experience, consultationFee, availableDays, availableTimeSlots } = req.body;

        if (!userId || !specialization || !experience || !consultationFee || !availableDays || !availableTimeSlots) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }   

        if(user.role !=="doctor"){
            return res.status(400).json({
                message:"User is not a doctor",
                success: false
            })
        }

        const doctor= await Doctor.create({
            userId,
            specialization,
            experience,
            consultationFee,
            availableDays,
            availableTimeSlots
        })
        
        await doctor.save()
        return res.status(201).json({
            message: "Doctor registered successfully",
            success: true,
            doctor
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

// Get all doctors

export const getAllDoctors = async(req, res) => {
    try {
        const doctors = await Doctor.find().populate("userId")
        return res.status(200).json({
            message: "All Doctors fetched successfully",
            success: true,
            doctors
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}


//Get Doctor By Id
export const getDoctorById = async(req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate("userId", "name email phone");
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({message:"Doctor By ID fetched successfully", success: true, doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//Get Doctor By Specialization

export const getDoctorBySpecialization = async(req, res) => {
    try {
        const {specialization} = req.body
        const doctor = await Doctor.find({specialization}).populate("userId", "name email phone");
        return res.status(200).json({
            message: "Doctors fetched successfully",
            success: true,
            doctor
        })
    } catch (error) {
        
    }
}

//update doctor detials

export const updateDoctorDetails = async(req, res) => {
    try {
        const { specialization, experience,  consultationFee, availableDays, availableTimeSlots, status } = req.body;
        const doctor = await Doctor.findById(req.params.id)
        if(!doctor){
            return res.status(400).json({
                message: "Doctor not found",
                success: false
            })
        }
        if(specialization) doctor.specialization = specialization
        if(experience) doctor.experience = experience
        if(consultationFee) doctor.consultationFee = consultationFee
        if(availableDays) doctor.availableDays = availableDays
        if(availableTimeSlots) doctor.availableTimeSlots = availableTimeSlots
        if(status) doctor.status = status
        await doctor.save()
        return res.status(200).json({
            message: "Doctor Details updated successfully",
            success: true,
            doctor
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed To Update Details",
            success: false
        })
    }
}

//delete Doctor by id

export const deleteDoctor = async(req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        if(!doctor){
            return res.status(400).json({
                message: "Doctor not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Doctor deleted successfully",
            success: true,
            doctor
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Failed To Delete Doctor",
            success: false
        })
    }
}