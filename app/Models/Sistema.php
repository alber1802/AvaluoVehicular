<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sistema extends Model
{
    use HasFactory , SoftDeletes;

    protected $table = 'sistemas';

    protected $fillable = [
        'id_vehiculo',
        'nombre_sistema',
        'componente',
        'estado',
        'observaciones',
    ];

    /**
     * Relación con vehiculo
     */
    public function vehiculo(): BelongsTo
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }
}
