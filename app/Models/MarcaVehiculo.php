<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MarcaVehiculo extends Model
{
    use HasFactory;

    protected $table = 'marca_vehiculo';

    protected $fillable = [
        'nombre',
        'tasa_k',
        'valor_residual',
        'user_id'
    ];

    protected $casts = [
        'tasa_k' => 'decimal:3',
        'valor_residual' => 'decimal:3',
    ];

    /**
     * Relación con vehiculos
     */
    public function vehiculos(): HasMany
    {
        return $this->hasMany(Vehiculo::class, 'id_marca');
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
