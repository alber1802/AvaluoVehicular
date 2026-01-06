<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AvaluoCompartido extends Model
{
    protected $table = 'avaluo_compartido';

    protected $fillable = [
        'avaluo_id',
        'user_id',
        'token',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'fecha_compartido',
        'motivo',
        'contador_vistas',
        'observaciones',
    ];

    protected $casts = [
        'fecha_inicio' => 'datetime',
        'fecha_fin' => 'datetime',
        'fecha_compartido' => 'datetime',
        'contador_vistas' => 'integer',
    ];

    /**
     * Relación con Avaluo
     */
    public function avaluo(): BelongsTo
    {
        return $this->belongsTo(Avaluo::class, 'avaluo_id');
    }

    /**
     * Relación con User
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
