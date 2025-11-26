<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{
    use HasFactory;

    protected $table = 'accesos';

    protected $fillable = [
        'gmail_acceso',
        'telefono',
        'fecha',
        'estado',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];
}
