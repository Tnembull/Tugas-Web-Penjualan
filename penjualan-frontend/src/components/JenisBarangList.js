import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const JenisBarangList = () => {
    const [jenisBarangs, setJenisBarangs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/jenis_barang')
            .then(response => setJenisBarangs(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus jenis barang ini?")) {
            axios.delete(`http://localhost:8000/api/jenis_barang/${id}`)
                .then(() => {
                    setJenisBarangs(jenisBarangs.filter(jenis => jenis.id !== id));
                })
                .catch(error => console.error(error));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4">Daftar Jenis Barang</h1>

            <div className="mb-4">
                <Link
                    to="/jenis_barang/add"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    Tambah Jenis Barang
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">ID</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Nama</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jenisBarangs.map(jenis => (
                            <tr key={jenis.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{jenis.id}</td>
                                <td className="px-4 py-2">{jenis.nama}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Link
                                        to={`/jenis_barang/edit/${jenis.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 inline" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(jenis.id)}
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

export default JenisBarangList;
