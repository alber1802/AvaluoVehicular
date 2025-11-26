<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Accesorio extends Model
{
    use HasFactory;

    protected $table = 'accesorios';

    protected $fillable = [
        'id_vehiculo',
        'nombre_accesorio',
        'tiene',
        'observacion',
    ];

    protected $casts = [
        'tiene' => 'boolean',
    ];

    /**
     * Relación con vehiculo
     */
    public function vehiculo(): BelongsTo
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }
}
