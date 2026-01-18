<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CallServer extends Model
{
    use HasFactory;

    protected $fillable = [
        'workspace_id', // <--- TAMBAHKAN INI
        'ho_site',
        'name',
        'ip_address',
        'port',
        'description',
        'is_active',
    ];
}