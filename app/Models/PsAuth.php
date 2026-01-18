<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsAuth extends Model
{
    protected $table = 'ps_auths';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $guarded = [];
}