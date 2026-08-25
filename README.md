# Chifa Appointment 🏥

A doctor appointment booking system built with **Node.js**, **Express**, and **MongoDB**. The project allows users to register/login and book appointments with doctors, who have their own separate authentication system.

---

## 🚀 Features

- User registration & login (User Auth)
- Doctor registration & login (Doctor Auth)
- Doctor and user profile management
- Appointment booking & management
- Medical notes handling

---

## 🛠️ Tech Stack

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| Node.js            | Runtime environment             |
| Express.js         | Server framework                |
| MongoDB (Mongoose) | Database                        |
| dotenv             | Environment variable management |

---

## 📁 Project Structure

```
chifa_appointment/
├── config/
│   └── db.js                  # Database connection
├── controllers/
│   ├── appointmentController.js
│   ├── doctorController.js
│   ├── drAuthController.js
│   ├── medicalNotesController.js
│   ├── userAuthController.js
│   └── userController.js
├── middlewares/
├── models/
│   ├── appointment.js
│   ├── doctor.js
│   ├── medicalNotes.js
│   └── user.js
├── routes/
│   ├── user.js
│   ├── doctor.js
│   ├── userAuth.js
│   ├── drAuth.js
│   └── appointment.js
├── index.js                   # Server entry point
└── package.json
```

---

## ⚙️ Setup & Run

1. Clone the project:

   ```bash
   git clone https://github.com/amrgoudah61-coder/chifa-appointment.git
   cd chifa_appointment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   npm start
   ```

   If everything is set up correctly, you should see in the terminal:

   ```
   server connected.
   MongoDB connected
   ```

---

## 🔌 API Endpoints

| Base Route         | Routes File        | Description                      |
| ------------------ | ------------------ | -------------------------------- |
| `/api/user`        | user routes        | User operations                  |
| `/api/doctor`      | doctor routes      | Doctor operations                |
| `/api/auth/user`   | userAuth routes    | User registration/login          |
| `/api/auth/doctor` | drAuth routes      | Doctor registration/login        |
| `/api/appointment` | appointment routes | Appointment booking & management |

---

## 📄 License

This project is for educational/personal purposes. Adjust as needed.
