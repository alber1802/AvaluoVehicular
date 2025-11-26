<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehiculoImagen extends Model
{
    use HasFactory;

    protected $table = 'vehiculo_imagen';

    protected $fillable = [
        'id_vehiculo',
        'lado',
        'url',
        'fecha',
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    /**
     * Relación con vehiculo
     */
    public function vehiculo(): BelongsTo
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }
}
