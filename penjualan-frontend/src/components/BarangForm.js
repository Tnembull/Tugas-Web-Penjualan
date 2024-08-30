import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BarangForm = () => {
    const [nama, setNama] = useState("");
    const [stok, setStok] = useState("");
    const [jenisBarangs, setJenisBarangs] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/jenis_barang')
            .then(response => setJenisBarangs(response.data))
            .catch(error => console.error(error));

        if (id) {
            axios.get(`http://localhost:8000/api/barang/${id}`)
                .then(response => {
                    setNama(response.data.nama);
                    setStok(response.data.stok);
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { nama, stok, jenis_barang_id: parseInt(e.target.jenis_barang_id.value) };

        if (id) {
            axios.put(`http://localhost:8000/api/barang/${id}`, data)
                .then(() => navigate('/barang'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8000/api/barang', data)
                .then(() => navigate('/barang'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{id ? 'Edit Barang' : 'Tambah Barang'}</h1>
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

                <div className="flex flex-col">
                    <label htmlFor="stok" className="mb-1 font-semibold text-gray-700">Stok:</label>
                    <input
                        type="number"
                        id="stok"
                        value={stok}
                        onChange={(e) => setStok(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="jenis_barang_id" className="mb-1 font-semibold text-gray-700">Jenis Barang:</label>
                    <select
                        id="jenis_barang_id"
                        name="jenis_barang_id"
                        required
                        className="p-2 border border-gray-300 rounded-lg bg-white"
                    >
                        {jenisBarangs.map(jenis => (
                            <option key={jenis.id} value={jenis.id}>
                                {jenis.nama}
                            </option>
                        ))}
                    </select>
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

export default BarangForm;
