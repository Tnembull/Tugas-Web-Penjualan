<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;

class ComparisonController extends Controller
{
    public function getHighest(Request $request)
    {
        $this->validateRequest($request);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $barangs = Barang::pluck('id');
        $transaksis = $this->getComparativeData($barangs, $startDate, $endDate, 'desc');

        return response()->json($transaksis);
    }

    public function getLowest(Request $request)
    {
        $this->validateRequest($request);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $barangs = Barang::pluck('id');
        $transaksis = $this->getComparativeData($barangs, $startDate, $endDate, 'asc');

        return response()->json($transaksis);
    }

    private function validateRequest(Request $request)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);
    }

    private function getComparativeData($barangs, $startDate, $endDate, $order)
    {
        return Transaksi::whereIn('barang_id', $barangs)
            ->whereBetween('tanggal_transaksi', [$startDate, $endDate])
            ->selectRaw('barang_id, SUM(jumlah_terjual) as total_terjual')
            ->groupBy('barang_id')
            ->orderBy('total_terjual', $order)
            ->get()
            ->map(function ($transaksi) {
                return [
                    'jenis_barang' => Barang::find($transaksi->barang_id)->jenisBarang->nama,
                    'total_terjual' => $transaksi->total_terjual
                ];
            });
    }
}
