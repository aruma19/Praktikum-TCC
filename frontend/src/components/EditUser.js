import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("Kuliner");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getNoteById = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/notes/${id}`);
                setDate(response.data.date ? response.data.date.substring(0, 10) : "");
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };
        getNoteById();
    }, [id]);

    const updateNote = async (e) => {
        e.preventDefault();
        
        // Konfirmasi sebelum update
        Swal.fire({
            title: "Yakin ingin memperbarui catatan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Update!",
            cancelButtonText: "Batal",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.patch(`http://localhost:5002/notes/${id}`, {
                        date,
                        title,
                        content,
                    });
                    // Notifikasi sukses
                    Swal.fire("Berhasil!", "Catatan berhasil diperbarui.", "success");
                    navigate("/");
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    return (
        <div className="columns is-centered mt-6">
            <div className="column is-half">
                <div className="box has-shadow p-5" style={{ borderRadius: "12px" }}>
                    <h2 className="title is-4 has-text-centered has-text-primary">
                        Edit Catatan
                    </h2>
                    <form onSubmit={updateNote}>
                        <div className="field">
                            <label className="label has-text-weight-semibold">Tanggal</label>
                            <div className="control">
                                <input
                                    type="date"
                                    className="input is-rounded"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-weight-semibold">Kategori</label>
                            <div className="control">
                                <div className="select is-fullwidth is-rounded">
                                    <select value={title} onChange={(e) => setTitle(e.target.value)}>
                                        <option value="Kuliner">Kuliner</option>
                                        <option value="Transfer">Transfer</option>
                                        <option value="Kuliah">Kuliah</option>
                                        <option value="Notifikasi">Notifikasi</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-weight-semibold">Isi Catatan</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input is-rounded"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Masukkan catatan Anda..."
                                />
                            </div>
                        </div>

                        <div className="field mt-4 is-flex is-justify-content-space-between">
                            <button
                                type="button"
                                className="button is-light is-rounded has-text-weight-semibold is-flex-grow-1 mx-1"
                                onClick={() => navigate(-1)}
                            >
                                Kembali
                            </button>
                            <button
                                type="submit"
                                className="button is-primary is-rounded has-text-weight-semibold is-flex-grow-1 mx-1"
                            >
                                Update Catatan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
