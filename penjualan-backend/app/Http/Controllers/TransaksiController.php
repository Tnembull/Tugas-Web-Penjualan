<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\Barang;
use Illuminate\Http\Request;

class TransaksiController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaksi::query()
            ->with(['barang.jenisBarang']);

        if ($request->start_date && $request->end_date) {
            $query->whereBetween('tanggal_transaksi', [$request->start_date, $request->end_date]);
        }

        if ($request->jenis_barang_id) {
            $query->whereHas('barang', function ($q) use ($request) {
                $q->where('jenis_barang_id', $request->jenis_barang_id);
            });
        }

        if ($request->sort_by) {
            $sort = explode(':', $request->sort_by);
            $query->orderBy($sort[0], $sort[1] ?? 'asc');
        }

        $transaksis = $query->get();

        return response()->json($transaksis);
    }

    public function store(Request $request)
    {
        $request->validate([
            'barang_id' => 'required|exists:barang,id',
            'jumlah_terjual' => 'required|integer',
            'tanggal_transaksi' => 'required|date',
        ]);

        $transaksi = Transaksi::create($request->all());
        return response()->json($transaksi, 201);
    }

    public function show($id)
    {
        $transaksi = Transaksi::with('barang')->findOrFail($id);
        return response()->json($transaksi);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'barang_id' => 'required|exists:barang,id',
            'jumlah_terjual' => 'required|integer',
            'tanggal_transaksi' => 'required|date',
        ]);

        $transaksi = Transaksi::findOrFail($id);
        $transaksi->update($request->all());
        return response()->json($transaksi);
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();
        return response()->json(null, 204);
    }

    public function compareByJenisBarang(Request $request)
    {

        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'comparison_type' => 'required|in:terbanyak,terendah',
        ]);

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $comparisonType = $request->input('comparison_type');

        $barangs = Barang::pluck('id');
        $transaksis = Transaksi::whereIn('barang_id', $barangs)
            ->whereBetween('tanggal_transaksi', [$startDate, $endDate])
            ->selectRaw('barang_id, SUM(jumlah_terjual) as total_terjual')
            ->groupBy('barang_id')
            ->orderBy('total_terjual', $comparisonType === 'terbanyak' ? 'desc' : 'asc')
            ->get()
            ->map(function ($transaksi) {
                return [
                    'jenis_barang' => Barang::find($transaksi->barang_id)->jenisBarang->nama,
                    'total_terjual' => $transaksi->total_terjual
                ];
            });

        return response()->json($transaksis);
    }
}
