<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CondicionGeneral extends Model
{
    use HasFactory , SoftDeletes;

    protected $table = 'condicion_general';

    protected $fillable = [
        'id_vehiculo',
        'estado_operativo',
        'estado_general',
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
