import express from "express";
import { deleteDoctor, getAllDoctors, getDoctorById, getDoctorBySpecialization, registerDoctor, updateDoctorDetails } from "../controllers/doctor.controller.js";
import { isAuthenticated } from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", isAuthenticated, registerDoctor)
router.get("/get-all-doctors", isAuthenticated, getAllDoctors)
router.get("/get-doctor/:id",isAuthenticated, getDoctorById)
router.get("/get-doctor-by-specialization",isAuthenticated, getDoctorBySpecialization)
router.put("/update-details/:id", isAuthenticated, updateDoctorDetails)
router.delete("/delete-doctor/:id", isAuthenticated, deleteDoctor)

export default router;