<?php

namespace App\Http\Requests\Registro;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     */
    public function authorize(): bool
    {

        $user = Auth::user();
        if($user->role=="admin" || $user->role=="evaluador"){
            return true;
        }
        return false;
    }

    /**
     * Obtiene las reglas de validación que se aplican a la solicitud.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'entidad' => 'required',
            'fecha_evaluacion' => 'required|after_or_equal:today',
            'ubicacion_actual' => 'required',
            'tipo_vehiculo' => 'required',
            'tipo_combustible' => 'required',
            'id_marca' => 'required',
            'modelo' => 'required',
            'ano_fabricacion' => 'required',
            'placa' => 'required',
            'serie_motor' => 'required',
            'chasis' => 'required',
            'color' => 'required',
            'procedencia' => 'required',
            'kilometraje' => 'required',
            'precio_referencial' => 'required',
            'estado_operativo' => 'required',
            'estado_general' => 'required',
            'observaciones' => 'required',
        ];
    }
}
