# Healthcare Management System - Backend

## Overview
This is the backend for a Healthcare Management System, built using Node.js, Express, and MongoDB. It provides API endpoints for managing users, doctors, patients, appointments, billing, and medical records.

---

## File Structure

📂 backend/
├── 📄 .env
├── 📄 package.json
├── 📄 server.js
├── 📂 controllers/
│   ├── 📄 appointment.controller.js
│   ├── 📄 billing.controller.js
│   ├── 📄 doctor.controller.js
│   ├── 📄 medical-record.controller.js
│   ├── 📄 patient.controller.js
│   └── 📄 user.controller.js
├── 📂 db/
│   └── 📄 db.js
├── 📂 middleware/
│   └── 📄 middleware.js
├── 📂 models/
│   ├── 📄 appointment.model.js
│   ├── 📄 billing.model.js
│   ├── 📄 doctor.model.js
│   ├── 📄 medical-record.model.js
│   ├── 📄 patient.model.js
│   └── 📄 user.model.js
└── 📂 routes/
    ├── 📄 appointment.routes.js
    ├── 📄 billing.routes.js
    ├── 📄 doctor.routes.js
    ├── 📄 medical-record.routes.js
    ├── 📄 patient.routes.js
    └── 📄 user.routes.js

### Configuration Files
- **.env**: Contains environment variables such as `DATABASE_URI`, `PORT`, and `JWT_SECRET`.
- **package.json**: Defines the project's dependencies and scripts. Key dependencies include `express`, `mongoose`, `jsonwebtoken`, and `dotenv`.
- **server.js**: The main entry point of the application. It sets up the Express server, connects to the database, and defines the routes.

### Controllers

#### User Controller (`user.controller.js`)
Handles user authentication and profile management:
- `register`: Creates a new user with validation for required fields.
- `login`: Authenticates users, generates JWT tokens, and sets HTTP-only cookies.
- `updateProfile`: Updates user profile (name, gender, password, phone, address).
- `logout`: Clears authentication cookies to log users out.

#### Appointment Controller (`appointment.controller.js`)
Manages scheduling and doctor appointments:
- `createAppointment`: Books appointments after validating doctor availability.
- `getAllAppointments`: Retrieves all appointments with doctor and patient info.
- `getAppointmentById`: Fetches a specific appointment.
- `updateAppointment`: Updates appointment date and status.
- `deleteAppointment`: Removes appointments.

#### Patient Controller (`patient.controller.js`)
Handles patient records:
- `registerPatient`: Creates patient records with medical history.
- `getAllPatients`: Retrieves all patient records.
- `getPatientById`: Fetches detailed patient information.
- `updatePatientRecord`: Updates medical information.
- `deletePatientRecord`: Deletes patient records.

#### Doctor Controller (`doctor.controller.js`)
Manages doctor registration and profiles:
- `registerDoctor`: Creates doctor profiles with specialization, experience.
- `getAllDoctors`: Retrieves all doctors.
- `getDoctorById`: Fetches specific doctor details.
- `getDoctorBySpecialization`: Filters doctors by specialization.
- `updateDoctorDetails`: Updates doctor information.
- `deleteDoctor`: Removes doctor records.

#### Billing Controller (`billing.controller.js`)
Handles payments and billing:
- `generateBill`: Creates bills for appointments.
- `updatePaymentStatus`: Updates payment status.
- `getAllBills`: Retrieves all billing records.
- `getBillById`: Fetches detailed billing information.
- `deleteBill`: Removes billing records.

#### Medical Record Controller (`medical-record.controller.js`)
Manages patient medical history:
- `createMedicalRecord`: Creates medical records.
- `getAllMedicalRecords`: Retrieves all medical records.
- `getMedicalRecordById`: Fetches specific medical record.
- `updateMedicalRecord`: Updates medical record information.
- `deleteMedicalRecord`: Deletes medical records.

### Models (MongoDB Schemas)
Located in the `models/` directory:
- **`appointment.model.js`**: Defines appointment schema.
- **`billing.model.js`**: Defines billing schema.
- **`doctor.model.js`**: Defines doctor schema.
- **`medical-record.model.js`**: Defines medical record schema.
- **`patient.model.js`**: Defines patient schema.
- **`user.model.js`**: Defines user schema.

---

## Getting Started

### Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the necessary environment variables.
4. Start the server:
   ```bash
   npm start
   ```

---

## API Endpoints

### User Routes
- `POST /users/register` - Register a new user.
- `POST /users/login` - Login user and return authentication token.
- `PUT /users/profile/update` - Update user profile.
- `GET /users/logout` - Logout user by clearing cookies.

### Doctor Routes
- `POST /doctors/register` - Register a new doctor.
- `GET /doctors/get-all-doctors` - Retrieve all doctors.
- `GET /doctors/get-doctor/:id` - Retrieve doctor by ID.
- `GET /doctors/get-doctor-by-specialization` - Find doctors by specialization.
- `PUT /doctors/update-details/:id` - Update doctor details.
- `DELETE /doctors/delete-doctor/:id` - Delete doctor.

### Patient Routes
- `POST /patients/register` - Register a new patient.
- `GET /patients/get-all-patients` - Retrieve all patients.
- `GET /patients/get-patient/:id` - Retrieve patient by ID.
- `PUT /patients/update-patient/:id` - Update patient info.
- `DELETE /patients/delete-patient/:id` - Delete patient record.

### Appointment Routes
- `POST /appointments/create-appointment` - Create a new appointment.
- `GET /appointments/get-all-appointments` - Retrieve all appointments.
- `GET /appointments/get-appointment/:id` - Retrieve appointment by ID.
- `PUT /appointments/update-appointment/:id` - Update appointment.
- `DELETE /appointments/delete-appointment/:id` - Delete appointment.

### Billing Routes
- `POST /bills/generate-bill` - Generate a new bill.
- `PUT /bills/update-payment-status/:billId` - Update payment status.
- `GET /bills/get-all-bills/:patientId` - Retrieve billing records.
- `GET /bills/get-bill-by-id/:billId` - Retrieve specific bill.
- `DELETE /bills/delete-bill/:billId` - Delete bill.

### Medical Record Routes
- `POST /medical-records/create` - Create a new medical record.
- `GET /medical-records/get-all-records` - Retrieve all medical records.
- `GET /medical-records/get-records/:id` - Retrieve specific record.
- `PUT /medical-records/update-records/:id` - Update record.
- `DELETE /medical-records/delete-records/:id` - Delete record.

---

## Security Features
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Password Hashing**: Uses bcrypt for password security.
- **Role-based Access Control**: Restricts endpoints based on user roles.
- **Input Validation**: Ensures all inputs are sanitized.
- **Secure Updates**: Prevents unauthorized updates with validation.

---

## System Architecture
```plaintext
+--------------------+
|  User Management  |
|  Authentication   |
+--------------------+
        |
        v
+---------------------+
|  Doctor & Patient  |
|  Management        |
+---------------------+
        |
        v
+---------------------+
|  Appointments     |
|  Scheduling       |
+---------------------+
        |
        v
+---------------------+
|  Billing & Medical |
|  Records          |
+---------------------+
```

This system follows a modular structure with separate controllers, routes, and models, ensuring scalability and maintainability.

