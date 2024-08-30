import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarangList from './components/BarangList';
import BarangForm from './components/BarangForm';
import JenisBarangList from './components/JenisBarangList';
import JenisBarangForm from './components/JenisBarangForm';
import TransaksiList from './components/TransaksiList';
import TransaksiForm from './components/TransaksiForm';
import PenjualanList from './components/PenjualanList';
import Navigation from './components/Navigation'; // Impor komponen Navigation

const App = () => {
    return (
        <Router>
            <Navigation /> {/* Tambahkan komponen Navigation */}
            <Routes>
                <Route path="/barang" element={<BarangList />} />
                <Route path="/barang/add" element={<BarangForm />} />
                <Route path="/barang/edit/:id" element={<BarangForm />} />
                <Route path="/jenis_barang" element={<JenisBarangList />} />
                <Route path="/jenis_barang/add" element={<JenisBarangForm />} />
                <Route path="/jenis_barang/edit/:id" element={<JenisBarangForm />} />
                <Route path="/transaksi" element={<TransaksiList />} />
                <Route path="/transaksi/add" element={<TransaksiForm />} />
                <Route path="/transaksi/edit/:id" element={<TransaksiForm />} />
                <Route path="/penjualan" element={<PenjualanList />} /> {/* Tambahkan route untuk PenjualanList */}
            </Routes>
        </Router>
    );
};

export default App;
