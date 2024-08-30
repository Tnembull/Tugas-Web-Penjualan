import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const TransaksiList = () => {
    const [transaksis, setTransaksis] = useState([]);
    const [barangs, setBarangs] = useState([]);
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        jenis_barang_id: ''
    });

    useEffect(() => {
        // Fetch transaksi data
        const { start_date, end_date, jenis_barang_id } = filter;
        const query = new URLSearchParams({ start_date, end_date, jenis_barang_id }).toString();
        axios.get(`http://localhost:8000/api/transaksi?${query}`)
            .then(response => setTransaksis(response.data))
            .catch(error => console.error(error));
    }, [filter]);

    useEffect(() => {
        // Fetch barang data for item names
        axios.get('http://localhost:8000/api/barang')
            .then(response => setBarangs(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
            axios.delete(`http://localhost:8000/api/transaksi/${id}`)
                .then(() => {
                    setTransaksis(transaksis.filter(transaksi => transaksi.id !== id));
                })
                .catch(error => console.error(error));
        }
    };

    // Function to get item name by ID
    const getItemNameById = (id) => {
        const barang = barangs.find(b => b.id === id);
        return barang ? barang.nama : 'Unknown Item';
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Daftar Transaksi</h1>
            
            <div className="mb-4">
                <Link
                    to="/transaksi/add"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Tambah Transaksi
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">ID</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Barang ID</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Jumlah Terjual</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Tanggal Transaksi</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transaksis.map(transaksi => (
                            <tr key={transaksi.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{transaksi.id}</td>
                                <td className="px-4 py-2">
                                    {transaksi.barang_id} ({getItemNameById(transaksi.barang_id)})
                                </td>
                                <td className="px-4 py-2">{transaksi.jumlah_terjual}</td>
                                <td className="px-4 py-2">{transaksi.tanggal_transaksi}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Link
                                        to={`/transaksi/edit/${transaksi.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 inline" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(transaksi.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        <TrashIcon className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransaksiList;
