import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/Database.js";

// Import semua model dan asosiasi
import "./models/UserModel.js";
import "./models/NoteModel.js";
import "./models/associations.js"; // Tambahkan ini agar relasi antar model aktif

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://notes-frontend-farros-dot-f-08-450706.uc.r.appspot.com/" }));
app.use(express.json());

app.use(UserRoute);

const port = process.env.PORT || 5005;

// Sinkronisasi database dan jalankan server
(async () => {
  try {
    await db.sync();
    console.log("Database synced!");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("DB Sync Error:", error);
  }
})();