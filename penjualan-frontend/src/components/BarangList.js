import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const BarangList = () => {
    const [barangs, setBarangs] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/barang')
            .then(response => setBarangs(response.data))
            .catch(error => console.error(error));
    }, []);

    const filteredBarangs = barangs.filter(barang =>
        barang.nama.toLowerCase().includes(search.toLowerCase())
    );

    const sortedBarangs = filteredBarangs.sort((a, b) => {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
    });

    const handleDelete = (id) => {
        // Add confirmation and delete logic here
        if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
            axios.delete(`http://localhost:8000/api/barang/${id}`)
                .then(() => {
                    setBarangs(barangs.filter(barang => barang.id !== id));
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Daftar Barang</h1>
            
            <div className="mb-4 flex gap-4 items-center">
                <input
                    type="text"
                    placeholder="Cari Barang..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg"
                />
                <select
                    onChange={(e) => setSort(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg bg-white"
                >
                    <option value="nama">Nama</option>
                    <option value="stok">Stok</option>
                </select>
                <Link
                    to="/barang/add"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Tambah Barang
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">ID</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Nama</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Stok</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedBarangs.map(barang => (
                            <tr key={barang.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{barang.id}</td>
                                <td className="px-4 py-2">{barang.nama}</td>
                                <td className="px-4 py-2">{barang.stok}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Link
                                        to={`/barang/edit/${barang.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 inline" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(barang.id)}
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

export default BarangList;
