import express from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment,  } from "../controllers/appointment.controller.js";
import { isAuthenticated } from "../middleware/middleware.js";

const router = express.Router();

router.post("/create-appointment", isAuthenticated, createAppointment);
router.get("/get-all-appointments", isAuthenticated, getAllAppointments);
router.get("/get-appointment/:id", isAuthenticated, getAppointmentById);
router.put("/update-appointment/:id", isAuthenticated, updateAppointment);
router.delete("/delete-appointment/:id", isAuthenticated, deleteAppointment);


export default router;