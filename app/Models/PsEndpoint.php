<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsEndpoint extends Model
{
    protected $table = 'ps_endpoints'; // Nama tabel di Postgres
    protected $primaryKey = 'id';
    public $incrementing = false; // ID-nya string (misal "1001"), bukan angka otomatis
    protected $keyType = 'string';
    public $timestamps = false; // Tabel Asterisk tidak punya kolom created_at/updated_at
    protected $guarded = []; // Izinkan mass assignment biar praktis
}