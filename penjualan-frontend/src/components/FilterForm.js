import React from 'react';

const FilterForm = ({ setFilter, jenisBarangs }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Start Date */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700" htmlFor="start_date">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700" htmlFor="end_date">
                        End Date:
                    </label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Jenis Barang */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700" htmlFor="jenis_barang_id">
                        Jenis Barang:
                    </label>
                    <select
                        id="jenis_barang_id"
                        name="jenis_barang_id"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Pilih Jenis Barang</option>
                        {jenisBarangs.map(jenis => (
                            <option key={jenis.id} value={jenis.id}>
                                {jenis.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort By */}
                <div className="flex flex-col">
                    <label className="mb-1 font-semibold text-gray-700" htmlFor="sort_by">
                        Sort By:
                    </label>
                    <select
                        id="sort_by"
                        name="sort_by"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg"
                    >
                        <option value="tanggal_transaksi:asc">Tanggal Transaksi Ascending</option>
                        <option value="tanggal_transaksi:desc">Tanggal Transaksi Descending</option>
                    </select>
                </div>
            </div>
        </form>
    );
};

export default FilterForm;
