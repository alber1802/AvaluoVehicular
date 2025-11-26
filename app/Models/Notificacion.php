<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Notificacion extends Model
{
    use HasFactory;

    protected $table = 'notificacion';

    protected $fillable = [
        'type',
        'notifiable_id',
        'notifiable_type',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
    ];

    /**
     * Relación polimórfica
     */
    public function notifiable(): MorphTo
    {
        return $this->morphTo();
    }
}
