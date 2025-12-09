<?php

namespace App\Http\Requests\Registro;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateVehiculoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'entidad' => 'required',
            'fecha_evaluacion' => 'required|date',
            'ubicacion_actual' => 'required',
            'tipo_vehiculo' => 'required',
            'tipo_combustible' => 'required',
            'id_marca' => 'required|exists:marca_vehiculo,id',
            'modelo' => 'required',
            'ano_fabricacion' => 'required',
            'placa' => 'required',
            'serie_motor' => 'required',
            'chasis' => 'required',
            'color' => 'required',
            'procedencia' => 'required',
            'kilometraje' => 'required|numeric',
            'precio_referencial' => 'required|numeric',
            'estado_operativo' => 'required',
            'estado_general' => 'required',
            'observaciones' => 'required|string|max:255',
        ];
    }
}
