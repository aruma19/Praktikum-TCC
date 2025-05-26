import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils"; // Ganti dengan URL backend kamu

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return Swal.fire({
        icon: "warning",
        title: "Kata sandi terlalu pendek",
        text: "Minimal 6 karakter.",
      });
    }
    if (!gender) {
      return Swal.fire({
        icon: "warning",
        title: "Jenis kelamin belum dipilih",
      });
    }

    try {
      await axios.post(`${BASE_URL}/register`, {
        name,
        email,
        gender,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Silakan login untuk melanjutkan.",
      });
      navigate("/"); // Redirect ke halaman login
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div
      className="section is-flex is-justify-content-center is-align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="box p-5"
        style={{ width: "100%", maxWidth: "420px", borderRadius: "16px" }}
      >
        <h2 className="title is-3 has-text-centered has-text-primary mb-4">
          Daftar Akun Baru
        </h2>

        <form onSubmit={handleRegister}>
          <div className="field">
            <label className="label is-size-6">Nama Lengkap</label>
            <div className="control">
              <input
                type="text"
                className="input is-rounded"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label is-size-6">Email</label>
            <div className="control">
              <input
                type="email"
                className="input is-rounded"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label is-size-6">Jenis Kelamin</label>
            <div className="control">
              <div className="select is-rounded is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    -- Pilih Jenis Kelamin --
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label is-size-6">Kata Sandi</label>
            <div className="control">
              <input
                type="password"
                className="input is-rounded"
                placeholder="Minimal 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mt-5 is-flex is-justify-content-space-between">
            <button
              type="button"
              className="button is-light is-rounded is-flex-grow-1 mx-2"
              onClick={() => navigate("/")}
            >
              Kembali
            </button>
            <button
              type="submit"
              className="button is-primary is-rounded is-flex-grow-1 mx-2"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
