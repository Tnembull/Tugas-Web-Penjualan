<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;
    protected $table = 'transaksi';
    protected $fillable = ['barang_id', 'jumlah_terjual', 'tanggal_transaksi'];

    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }
}
