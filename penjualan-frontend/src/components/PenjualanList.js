import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterForm from './FilterForm';
import ComparisonList from './ComparisonList';

const PenjualanList = () => {
    const [penjualans, setPenjualans] = useState([]);
    const [barangs, setBarangs] = useState([]);
    const [jenisBarangs, setJenisBarangs] = useState([]);
    const [filter, setFilter] = useState({
        start_date: '',
        end_date: '',
        jenis_barang_id: '',
        sort_by: ''
    });
    const [comparisonType, setComparisonType] = useState('terbanyak');

    useEffect(() => {
        const { start_date, end_date, jenis_barang_id, sort_by } = filter;
        const query = new URLSearchParams({ start_date, end_date, jenis_barang_id, sort_by }).toString();
        axios.get(`http://localhost:8000/api/transaksi?${query}`)
            .then(response => setPenjualans(response.data))
            .catch(error => console.error(error));
    }, [filter]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/barang')
            .then(response => setBarangs(response.data))
            .catch(error => console.error('Error fetching barangs:', error));

        axios.get('http://localhost:8000/api/jenis_barang')
            .then(response => setJenisBarangs(response.data))
            .catch(error => console.error('Error fetching jenis_barang:', error));
    }, []);

    const combinedData = penjualans.map(penjualan => {
        const barang = barangs.find(b => b.id === penjualan.barang_id);
        const jenis = jenisBarangs.find(j => j.id === (barang ? barang.jenis_barang_id : null));
        return {
            ...penjualan,
            nama_barang: barang ? barang.nama : 'Unknown',
            stok: barang ? barang.stok : 0,
            jenis_barang: jenis ? jenis.nama : 'Unknown'
        };
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Penjualan</h1>
            <FilterForm setFilter={setFilter} jenisBarangs={jenisBarangs} />
            <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border-b">No</th>
                        <th className="px-4 py-2 border-b">Nama Barang</th>
                        <th className="px-4 py-2 border-b">Stok</th>
                        <th className="px-4 py-2 border-b">Jumlah Terjual</th>
                        <th className="px-4 py-2 border-b">Tanggal Transaksi</th>
                        <th className="px-4 py-2 border-b">Jenis Barang</th>
                    </tr>
                </thead>
                <tbody>
                    {combinedData.map((penjualan, index) => (
                        <tr key={penjualan.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b">{index + 1}</td>
                            <td className="px-4 py-2 border-b">{penjualan.nama_barang}</td>
                            <td className="px-4 py-2 border-b">{penjualan.stok}</td>
                            <td className="px-4 py-2 border-b">{penjualan.jumlah_terjual}</td>
                            <td className="px-4 py-2 border-b">{penjualan.tanggal_transaksi}</td>
                            <td className="px-4 py-2 border-b">{penjualan.jenis_barang}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PenjualanList;
