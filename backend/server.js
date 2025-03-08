import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import useRoutes from "./routes/user.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import patientRoutes from "./routes/patient.routes.js";
import medicalRecordRoutes from "./routes/medical-record.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import billingRoutes from "./routes/billing.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/users", useRoutes)
app.use("/doctors", doctorRoutes)
app.use("/patients", patientRoutes)
app.use("/medical-records", medicalRecordRoutes)
app.use("/appointments", appointmentRoutes)
app.use("/bills", billingRoutes)





connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is runnig on: http://localhost:${PORT}`);
});
