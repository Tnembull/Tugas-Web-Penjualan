import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ComparisonList = ({ comparisonType }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const endpoint = comparisonType === 'terbanyak' ? 
            'http://localhost:8000/api/transaksi/compare/highest' : 
            'http://localhost:8000/api/transaksi/compare/lowest';
        
        axios.get(endpoint, {
            params: {
                start_date: '2021-05-01', // Ganti dengan tanggal awal yang sesuai
                end_date: '2021-05-12'    // Ganti dengan tanggal akhir yang sesuai
            }
        })
        .then(response => setData(response.data))
        .catch(error => {
            setError('Failed to fetch comparison data');
            console.error('Error fetching comparison data:', error);
        });
    }, [comparisonType]);

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">
                Jenis Barang dengan {comparisonType === 'terbanyak' ? 'Jumlah Terjual Terbanyak' : 'Jumlah Terjual Terendah'}
            </h2>
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b">Jenis Barang</th>
                        <th className="px-4 py-2 border-b">Total Terjual</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{item.jenis_barang}</td>
                            <td className="px-4 py-2 border-b">{item.total_terjual}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonList;
