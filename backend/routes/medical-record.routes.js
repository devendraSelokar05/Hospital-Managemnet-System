import express from "express";
import { createMedicalRecord, deleteMedicalRecord, getAllMedicalRecords, getMedicalRecordById, updateMedicalRecord } from "../controllers/medical-record.controller.js";
import { isAuthenticated } from "../middleware/middleware.js";

const router = express.Router();

router.post("/create", isAuthenticated, createMedicalRecord)
router.get("/get-all-records", isAuthenticated, getAllMedicalRecords)
router.get("/get-records/:id", getMedicalRecordById)
router.put("/update-records/:id", isAuthenticated, updateMedicalRecord)
router.delete("/delete-records/:id", isAuthenticated, deleteMedicalRecord)

export default router;