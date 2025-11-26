<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MarcaVehiculo extends Model
{
    use HasFactory;

    protected $table = 'marca_vehiculo';

    protected $fillable = [
        'nombre',
        'tasa_k',
        'valor_residual',
    ];

    protected $casts = [
        'tasa_k' => 'decimal:2',
        'valor_residual' => 'decimal:2',
    ];

    /**
     * Relación con vehiculos
     */
    public function vehiculos(): HasMany
    {
        return $this->hasMany(Vehiculo::class, 'id_marca');
    }
}
