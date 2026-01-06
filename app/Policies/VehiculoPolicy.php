<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vehiculo;
use App\Models\Avaluo;
use App\Models\AvaluoCompartido;

use Illuminate\Auth\Access\Response;

class VehiculoPolicy
{
    /**
     * Determinar si el usuario puede ver algún modelo.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determinar si el usuario puede ver el modelo.
     */
    public function view(User $user, Vehiculo $vehiculo): bool
    {
        // Admin puede ver todo
        if ($user->role === 'admin') {
            return true;
        }
        $avaluo = Avaluo::where('id_vehiculo', $vehiculo->id)->first();
        $avaluoCompartido = AvaluoCompartido::where('avaluo_id', $avaluo->id)->first();

        if($avaluoCompartido->estado === 'activo' || $avaluoCompartido->estado === 'renovado') {
            return true;
        }
        
        // Evaluador solo puede ver sus propios vehículos
        return $vehiculo->id_evaluador === $user->id;
    }

    /**
     * Determinar si el usuario puede crear modelos.
     */
    public function create(User $user): bool
    {
        return false;
    }
    public function continuar(User $user, Vehiculo $vehiculo): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return  $vehiculo->id_evaluador === $user->id;
    }

    /**
     * Determinar si el usuario puede actualizar el modelo.
     */
     public function update(User $user, Vehiculo $vehiculo): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return  $vehiculo->id_evaluador === $user->id;
    }

    /**
     * Determinar si el usuario puede eliminar el modelo.
     */
    public function delete(User $user, Vehiculo $vehiculo): bool
    {
        return false;
    }

    /**
     * Determinar si el usuario puede restaurar el modelo.
     */
    public function restore(User $user, Vehiculo $vehiculo): bool
    {
        return false;
    }

    /**
     * Determinar si el usuario puede eliminar permanentemente el modelo.
     */
    public function forceDelete(User $user, Vehiculo $vehiculo): bool
    {
        return false;
    }
}
