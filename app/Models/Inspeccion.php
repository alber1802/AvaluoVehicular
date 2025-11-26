<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inspeccion extends Model
{
    use HasFactory;

    protected $table = 'inspeccion';

    protected $fillable = [
        'id_vehiculo',
        'nombre',
        'caracteristica',
        'tiene',
        'valoracion',
        'observaciones',
    ];

    protected $casts = [
        'tiene' => 'boolean',
        'valoracion' => 'decimal:4',
    ];

    /**
     * Relación con vehiculo
     */
    public function vehiculo(): BelongsTo
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }
}
