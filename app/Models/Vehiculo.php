<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehiculo extends Model
{
    use HasFactory , SoftDeletes;

    protected $table = 'vehiculos';

    protected $fillable = [
        'entidad',
        'fecha_evaluacion',
        'ubicacion_actual',
        'tipo_vehiculo',
        'tipo_combustible',
        'id_marca',
        'modelo',
        'año_fabricacion',
        'placa',
        'serie_motor',
        'chasis',
        'color',
        'procedencia',
        'kilometraje',
        'precio_referencial',
        'id_evaluador',
    ];

    protected $casts = [
        'fecha_evaluacion' => 'date',
        'año_fabricacion' => 'integer',
        'precio_referencial' => 'decimal:2',
    ];

    /**
     * Relación con marca_vehiculo
     */
    public function marca(): BelongsTo
    {
        return $this->belongsTo(MarcaVehiculo::class, 'id_marca');
    }

    /**
     * Relación con evaluador (User)
     */
    public function evaluador(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_evaluador');
    }

    /**
     * Relación con avaluo (uno a uno)
     */
    public function avaluo(): HasOne
    {
        return $this->hasOne(Avaluo::class, 'id_vehiculo');
    }

    /**
     * Relación con condicion_general
     */
    public function condicionGeneral(): HasMany
    {
        return $this->hasMany(CondicionGeneral::class, 'id_vehiculo');
    }

    /**
     * Relación con sistemas
     */
    public function sistemas(): HasMany
    {
        return $this->hasMany(Sistema::class, 'id_vehiculo');
    }

    /**
     * Relación con accesorios
     */
    public function accesorios(): HasMany
    {
        return $this->hasMany(Accesorio::class, 'id_vehiculo');
    }

    /**
     * Relación con inspeccion
     */
    public function inspecciones(): HasMany
    {
        return $this->hasMany(Inspeccion::class, 'id_vehiculo');
    }

    /**
     * Relación con archivos
     */
    public function archivos(): HasMany
    {
        return $this->hasMany(Archivo::class, 'id_vehiculo');
    }

    /**
     * Relación con imagenes
     */
    public function imagenes(): HasMany
    {
        return $this->hasMany(VehiculoImagen::class, 'id_vehiculo');
    }
}
