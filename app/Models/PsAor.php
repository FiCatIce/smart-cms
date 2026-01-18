<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsAor extends Model
{
    protected $table = 'ps_aors';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    // --- TAMBAHKAN BARIS INI ---
    // Ini mengizinkan kita mengisi ID secara manual
    protected $guarded = []; 
}