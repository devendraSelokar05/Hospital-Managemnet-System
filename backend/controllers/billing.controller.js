import { Appointment } from "../models/appointment.model.js";
import { Billing } from "../models/billing.model.js";
import { Doctor } from "../models/doctor.model.js";
// import { User } from "../models/user.model.js";
//create bill

export const generateBill = async(req, res)=>{
    try {
        const{patientId, doctorId, appointmentId, paymentMethod}= req.body;
        // console.log(patientId, doctorId, appointmentId, paymentMethod)

        const appointment = await Appointment.findById(appointmentId)
        if(!appointment){
            return res.status(404).json({ message: "Appointment not found", success: false });
        }

        const doctor = await Doctor.findById(doctorId)
        if(!doctor){
            return res.status(404).json({ message: "Doctor not found", success: false });
        }

        const totalAmount = doctor.consultationFee

        const newBill = await Billing.create({
            patientId,
            doctorId,
            appointmentId,
            totalAmount,
            paymentStatus: "pending",
            paymentMethod
        })
        return res.status(201).json({
            message: "Bill created successfully",
            success: true,
            newBill
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to create bill", success: false });
    }
}

//update payment status

export const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        const { billId } = req.params;

        const bill = await Billing.findByIdAndUpdate(
            billId,
            { paymentStatus },
            { new: true }
        );
        await bill.save();
        if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });

        res.status(200).json({ success: true, message: "Payment status updated", bill });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



//get all bills for patient

export const getAllBills = async(req, res)=>{
    try {
        const{patientId} = req.params

        const bills = await Billing.find({patientId})
        .populate({
            path: "doctorId",
            populate: {
                path: "userId", 
                select: "name", 
            },
        })
        .populate("appointmentId").populate("patientId")
        if(!bills.length){
            return res.status(404).json({
                message: "Bill not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Bills fetched successfully",
            success: true,
            bills
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to fetch bills", success: false });
    }
}

//get bill by id

export const getBillById = async(req, res)=>{
    try {
        const {billId} = req.params

        const bill = await Billing.findById(billId).populate({
            path: "doctorId",
            populate: {
                path: "userId", 
                select: "name", 
            },
        })
        .populate("appointmentId").populate("patientId")
        if(!bill){
            return res.status(400).json({
                message: "Bill not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Bill by ID fetched successfully",
            success: true,
            bill
        })
    } catch (error) {
            return res.status(500).json({ message: "Failed to fetch bill by ID", success: false})
    }
}

//delete bill 

export const deleteBill = async (req, res) => {
    try {
        const { billId } = req.params;

        const bill = await Billing.findByIdAndDelete(billId);
        if (!bill) return res.status(404).json({ success: false, message: "Bill not found" });

        res.status(200).json({ success: true, message: "Bill deleted successfully" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};