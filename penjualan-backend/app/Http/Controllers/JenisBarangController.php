<?php

namespace App\Http\Controllers;

use App\Models\JenisBarang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JenisBarangController extends Controller
{
    public function index()
    {
        $jenisbarang = JenisBarang::all();
        return response()->json($jenisbarang);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:jenis_barang',
        ]);

        $jenisBarang = JenisBarang::create($request->all());
        return response()->json($jenisBarang, 201);
    }

    public function show($id)
    {
        $jenisBarang = JenisBarang::findOrFail($id);
        return response()->json($jenisBarang);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255|unique:jenis_barang,nama,' . $id,
        ]);

        $jenisBarang = JenisBarang::findOrFail($id);
        $jenisBarang->update($request->all());
        return response()->json($jenisBarang);
    }

    public function destroy($id)
    {
        $jenisBarang = JenisBarang::findOrFail($id);
        $jenisBarang->delete();
        return response()->json(null, 204);
    }
    public function terbanyak()
    {
        $results = DB::table('transaksi')
            ->join('barang', 'transaksi.barang_id', '=', 'barang.id')
            ->join('jenis_barang', 'barang.jenis_barang_id', '=', 'jenis_barang.id')
            ->select('jenis_barang.nama as jenis_barang', DB::raw('SUM(transaksi.jumlah_terjual) as total_terjual'))
            ->groupBy('jenis_barang.nama')
            ->orderBy('total_terjual', 'desc')
            ->get();

        return response()->json($results);
    }

    public function terendah()
    {
        $results = DB::table('transaksi')
            ->join('barang', 'transaksi.barang_id', '=', 'barang.id')
            ->join('jenis_barang', 'barang.jenis_barang_id', '=', 'jenis_barang.id')
            ->select('jenis_barang.nama as jenis_barang', DB::raw('SUM(transaksi.jumlah_terjual) as total_terjual'))
            ->groupBy('jenis_barang.nama')
            ->orderBy('total_terjual', 'asc')
            ->get();

        return response()->json($results);
    }
}
