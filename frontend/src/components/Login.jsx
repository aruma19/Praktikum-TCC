import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: `Selamat datang, ${response.data.safeUserData?.name || "User"}!`,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      setMsg(error.response?.data?.message || "Terjadi kesalahan saat login.");
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <div className="section is-flex is-justify-content-center is-align-items-center" style={{ minHeight: "100vh" }}>
      <div className="box p-5" style={{ width: "100%", maxWidth: "420px", borderRadius: "16px" }}>
        <h2 className="title is-3 has-text-centered has-text-primary mb-4">Login</h2>

        {msg && (
          <div className="notification is-danger is-light has-text-centered mb-4 py-3">
            {msg}
          </div>
        )}

        <form onSubmit={loginHandler}>
          <div className="field">
            <label className="label is-size-6">Email</label>
            <div className="control">
              <input
                type="email"
                className="input is-rounded"
                placeholder="Masukkan email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label is-size-6">Password</label>
            <div className="control">
              <input
                type="password"
                className="input is-rounded"
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field mt-5">
            <button
              type="submit"
              className="button is-primary is-rounded is-fullwidth is-medium"
            >
              Login
            </button>
          </div>
        </form>

        <div className="has-text-centered mt-4">
          <p className="is-size-7 mb-2">Belum punya akun?</p>
          <button
            className="button is-link is-light is-rounded is-small"
            onClick={() => navigate("/register")}
          >
            Daftar Akun Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
