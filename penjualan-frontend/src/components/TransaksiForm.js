import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TransaksiForm = () => {
    const [jumlahTerjual, setJumlahTerjual] = useState("");
    const [tanggalTransaksi, setTanggalTransaksi] = useState("");
    const [barangs, setBarangs] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/barang')
            .then(response => setBarangs(response.data))
            .catch(error => console.error(error));

        if (id) {
            axios.get(`http://localhost:8000/api/transaksi/${id}`)
                .then(response => {
                    setJumlahTerjual(response.data.jumlah_terjual);
                    setTanggalTransaksi(response.data.tanggal_transaksi);
                })
                .catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            barang_id: parseInt(e.target.barang_id.value),
            jumlah_terjual: jumlahTerjual,
            tanggal_transaksi: tanggalTransaksi
        };

        if (id) {
            axios.put(`http://localhost:8000/api/transaksi/${id}`, data)
                .then(() => navigate('/transaksi'))
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:8000/api/transaksi', data)
                .then(() => navigate('/transaksi'))
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-semibold mb-4">{id ? 'Edit Transaksi' : 'Tambah Transaksi'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="barang_id" className="mb-1 font-semibold text-gray-700">Barang:</label>
                    <select
                        id="barang_id"
                        name="barang_id"
                        required
                        className="p-2 border border-gray-300 rounded-lg bg-white"
                    >
                        {barangs.map(barang => (
                            <option key={barang.id} value={barang.id}>
                                {barang.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="jumlah_terjual" className="mb-1 font-semibold text-gray-700">Jumlah Terjual:</label>
                    <input
                        type="number"
                        id="jumlah_terjual"
                        value={jumlahTerjual}
                        onChange={(e) => setJumlahTerjual(e.target.value)}
                        required
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="tanggal_transaksi" className="mb-1 font-semibold text-gray-700">Tanggal Transaksi:</label>
                    <input
                        type="date"
                        id="tanggal_transaksi"
                        value={tanggalTransaksi}
                        onChange={(e) => setTanggalTransaksi(e.target.value)}
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

export default TransaksiForm;
