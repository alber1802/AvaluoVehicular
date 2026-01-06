<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Avaluo extends Model
{
    use HasFactory , SoftDeletes;

    protected $table = 'avaluo';

    protected $fillable = [
        'id_vehiculo',
        'factor_reposicion',
        'final_estimacion',
        'moneda',
        'depre_modelo',
        'depre_kilometraje',
        'depre_inspeccion',
    ];

    protected $casts = [
        'factor_reposicion' => 'decimal:2',
        'final_estimacion' => 'decimal:2',
        'depre_modelo' => 'decimal:4',
        'depre_kilometraje' => 'decimal:4',
        'depre_inspeccion' => 'decimal:4',
    ];

    /**
     * Relación con vehiculo (uno a uno)
     */
    public function vehiculo(): BelongsTo
    {
        return $this->belongsTo(Vehiculo::class, 'id_vehiculo');
    }

    /**
     * Relación con AvaluoCompartido
     */
    public function compartidos(): HasMany
    {
        return $this->hasMany(AvaluoCompartido::class, 'avaluo_id');
    }
}
