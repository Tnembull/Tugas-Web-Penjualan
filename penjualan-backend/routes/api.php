<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\JenisBarangController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\ComparisonController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('jenis_barang', JenisBarangController::class);
Route::apiResource('barang', BarangController::class);
Route::apiResource('transaksi', TransaksiController::class);


Route::get('transaksi/compare/highest', [ComparisonController::class, 'getHighest']);
Route::get('transaksi/compare/lowest', [ComparisonController::class, 'getLowest']);
