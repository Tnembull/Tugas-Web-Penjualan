<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBarangTable extends Migration
{
    /**
     * Jalankan migration untuk membuat tabel.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->integer('stok');
            $table->foreignId('jenis_barang_id')->constrained('jenis_barang')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Hapus tabel jika diperlukan.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('barang');
    }
}
