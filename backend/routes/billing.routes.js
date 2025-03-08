import express from "express";
import { deleteBill, generateBill, getAllBills, getBillById, updatePaymentStatus } from "../controllers/billing.controller.js";
import { isAuthenticated } from "../middleware/middleware.js";

const router = express.Router();


router.post("/generate-bill", isAuthenticated, generateBill);
router.put("/update-payment-status/:billId", isAuthenticated, updatePaymentStatus);
router.get("/get-all-bills/:patientId", isAuthenticated, getAllBills);
router.get("/get-bill-by-id/:billId", isAuthenticated, getBillById);
router.delete("/delete-bill/:billId", isAuthenticated, deleteBill);


export default router;
