import express from "express";
import { deletePatientRecord, getAllPatients, getPatientById, registerPatient, updatePatientRecord } from "../controllers/patient.controller.js";
import { isAuthenticated } from "../middleware/middleware.js";


const router = express.Router();

router.post("/register", isAuthenticated, registerPatient)
router.get("/get-all-patients", isAuthenticated, getAllPatients)
router.get("/get-patient/:id", isAuthenticated, getPatientById)
router.put("/update-patient/:id", isAuthenticated, updatePatientRecord)
router.delete("/delete-patient/:id", isAuthenticated, deletePatientRecord)



export default router;