import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";
import moment from "moment";
import { User } from "../models/user.model.js";

export const createAppointment = async (req, res) => {
    try {
        const { patientId, doctorId, date, timeSlot, reason } = req.body;

        // Check if doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found", success: false });
        }

        // Get the available time slot range (example: "10:00 AM - 12:00 PM")
        const availableSlot = doctor.availableTimeSlots[0]; // Assuming one slot per doctor
        if (!availableSlot) {
            return res.status(400).json({ message: "Doctor has no available slots", success: false });
        }

        // Split the available time range
        const [startTime, endTime] = availableSlot.split(" - ");

        // Convert all times to 24-hour format for comparison
        const userTime = moment(timeSlot, ["h:mm A"]);
        const startTimeMoment = moment(startTime, ["h:mm A"]);
        const endTimeMoment = moment(endTime, ["h:mm A"]);

        // Check if user-selected time is within available range
        if (!userTime.isBetween(startTimeMoment, endTimeMoment, undefined, "[)")) {
            return res.status(400).json({ message: "Invalid time slot. Choose within available range.", success: false });
        }

        // Create an appointment
        const appointment = new Appointment({ patientId, doctorId,  date, timeSlot, reason });
        await appointment.save();

        return res.status(201).json({ message: "Appointment booked successfully", success: true, appointment });

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
};

//get all appointments

export const getAllAppointments =  async(req, res)=>{
    try {
        const appointments = await Appointment.find()
            .populate({
                path: "doctorId",
                populate: {
                    path: "userId", // Ye `User` model se data lekar aayega
                    select: "name", // Sirf name field chahiye
                },
            })
            .populate("patientId"); // Patient ka data bhi populate hoga

        return res.status(200).json({
            message: "All Appointments fetched Successfully",
            success: true,
            appointments,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
}

//get appointment by id

export const getAppointmentById = async(req, res)=>{
    try {
        const appointment = await Appointment.findById(req.params.id).populate("doctorId").populate("patientId").populate({
            path: "doctorId",
            populate: {
                path: "userId", 
                select: "name", 
            },
        });
        if(!appointment){
            return res.status(404).json({ message: "Appointment not found", success: false });
        }
        return res.status(200).json({
            message: "Appointment fetched by ID Successfully ",
            success: true,
            appointment
        })
    } catch (error) {
        console.log(error);
            return res.status(500).json({ message: error.message, success: false });
    }
}

//update appointment 
export const updateAppointment = async(req, res)=>{
    try {
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment){
            return res.status(404).json({ message: "Appointment not found", success: false });
        }

        //if anyone is trying to change the field other than date and status forcofully 
        if(req.body.patientId || req.body.doctorId){
            return res.status(403).json({
                message: "You are not allowed to update patientId, doctorId, or _id", 
                success: false 
            })
        }
        const { date, status } = req.body;

        if (date) {
            appointment.date = date;
        }
        if (status) {
            appointment.status = status;
        }
        appointment.status = req.body.status;
        await appointment.save();
        return res.status(200).json({
            message: "Appointment updated successfully",
            success: true,
            appointment
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
}

//delete appointment

export const deleteAppointment = async(req, res)=>{
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id)
        if(!appointment){
            return res.status(400).json({
                message: "Appointment not found",
                success: false
            })
        }
        return res.status(200).json({  
            message: "Appointment deleted successfully",
            success: true,
            appointment
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message, success: false });
    }
}