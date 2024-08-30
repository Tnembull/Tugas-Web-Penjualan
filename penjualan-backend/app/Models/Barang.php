<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;
    protected $table = 'barang';
    protected $fillable = ['nama', 'stok', 'jenis_barang_id'];

    public function jenisBarang()
    {
        return $this->belongsTo(JenisBarang::class);
    }

    public function transaksis()
    {
        return $this->hasMany(Transaksi::class);
    }
}
