import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/barang" className="hover:underline">Barang</Link>
                </li>
                <li>
                    <Link to="/jenis_barang" className="hover:underline">Jenis Barang</Link>
                </li>
                <li>
                    <Link to="/transaksi" className="hover:underline">Transaksi</Link>
                </li>
                <li>
                    <Link to="/penjualan" className="hover:underline">Penjualan</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
