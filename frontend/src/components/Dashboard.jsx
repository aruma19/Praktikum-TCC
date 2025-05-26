// Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BASE_URL } from "../utils";
import {jwtDecode} from "jwt-decode";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return (window.location.href = "/");

    try {
      const decoded = jwtDecode(token);
      const timeLeft = decoded.exp - Date.now() / 1000;

      if (timeLeft <= 0) {
        localStorage.removeItem("accessToken");
        return (window.location.href = "/");
      }

      const logoutTimer = setTimeout(() => {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }, timeLeft * 1000);

      getNotes();
      return () => clearTimeout(logoutTimer);
    } catch (err) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  }, []);

  const getNotes = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${BASE_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal memuat",
        text: err.response?.data?.message || "Gagal mengambil catatan.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus catatan?",
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3498db",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${BASE_URL}/notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(notes.filter((n) => n.id !== id));
        Swal.fire("Berhasil!", "Catatan telah dihapus.", "success");
      } catch (err) {
        Swal.fire("Error", "Gagal menghapus catatan.", "error");
      }
    }
  };

  return (
    <>
      <style>{`
        .hover-card {
          border-radius: 10px;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          cursor: pointer;
        }
        .hover-card:hover {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
          transform: translateY(-5px);
        }
        .hover-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <section className="section has-background-black" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="level mb-5">
            <div className="level-left">
              <h1 className="title is-3 has-text-primary">📋 Daftar Catatan</h1>
            </div>
            <div className="level-right">
              <Link to="/add" className="button is-primary is-rounded">
                + Tambah Catatan
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="has-text-centered has-text-grey">Memuat catatan...</div>
          ) : notes.length === 0 ? (
            <div className="notification is-info has-text-centered">
              Belum ada catatan. Silakan tambahkan catatan baru.
            </div>
          ) : (
            <div className="columns is-multiline">
              {notes.map((note) => (
                <div
                  className="column is-full-mobile is-half-tablet is-one-third-desktop"
                  key={note.id}
                >
                  <div className="card hover-card">
                    <div className="card-content">
                      <p className="title is-5 has-text-weight-semibold">{note.title}</p>
                      <p className="is-size-7 has-text-grey mb-2">
                        {new Date(note.date).toLocaleDateString("id-ID")}
                      </p>
                      <div className="content">{note.content}</div>
                    </div>
                    <footer className="card-footer">
                      <Link
                        to={`/edit/${note.id}`}
                        className="card-footer-item has-text-info has-text-weight-medium hover-link"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="card-footer-item has-text-danger has-text-weight-medium hover-link"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Hapus
                      </button>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
