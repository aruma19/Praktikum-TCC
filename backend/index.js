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
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "https://national-news-dot-f-08-450706.uc.r.appspot.com/" }));
app.use(express.json());

app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);

// Sinkronisasi database dan jalankan server
(async () => {
  try {
    console.log("📡 Menghubungkan ke database:", process.env.DB_HOST);
    await db.authenticate();
    console.log("✅ Koneksi ke database berhasil!");

    await db.sync(); // Atau db.sync({ force: true }) jika ingin reset tabel
    console.log("✅ Sinkronisasi model ke DB berhasil");

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () =>
      console.log(`🚀 Server connected on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Gagal koneksi atau sinkronisasi DB:", error.message);
  }
})();