import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JenisBarangForm = () => {
    const [nama, setNama] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/jenis_barang/${id}`)
                .then(response => setNama(response.data.nama))
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nama };

        if (id) {
            axios.put(`http://localhost:8000/api/jenis_barang/${id}`, data)
                .then(() => navigate('/jenis_barang'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8000/api/jenis_barang', data)
                .then(() => navigate('/jenis_barang'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{id ? 'Edit Jenis Barang' : 'Tambah Jenis Barang'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="nama" className="mb-1 font-semibold text-gray-700">Nama:</label>
                    <input
                        type="text"
                        id="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default JenisBarangForm;
