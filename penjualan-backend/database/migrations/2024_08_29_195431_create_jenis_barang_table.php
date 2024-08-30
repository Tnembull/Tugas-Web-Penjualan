<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJenisBarangTable extends Migration
{
    /**
     * Jalankan migration untuk membuat tabel.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jenis_barang', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->unique();
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
        Schema::dropIfExists('jenis_barang');
    }
}
