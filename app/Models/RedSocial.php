<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RedSocial extends Model
{
    use HasFactory;

    protected $table = 'redes_sociales';

    protected $fillable = [
        'nombre',
        'url',
        'estado',
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];
}
