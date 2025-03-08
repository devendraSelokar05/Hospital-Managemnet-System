import express from "express";
import {  isAuthenticated } from "../middleware/middleware.js";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.put("/profile/update", isAuthenticated, updateProfile)
router.get("/logout", logout)

export default router;