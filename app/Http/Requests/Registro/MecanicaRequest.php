<?php

namespace App\Http\Requests\Registro;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class MecanicaRequest extends FormRequest
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
            // Validar que sistemas sea un array y sea requerido
            'sistemas' => ['required', 'array', 'min:1'],
            
            // Validar cada sistema dentro del array
            'sistemas.*.nombre_sistema' => ['required', 'string', 'max:255'],
            'sistemas.*.componentes' => ['required', 'array', 'min:1'],
            
            // Validar cada componente dentro de cada sistema
            'sistemas.*.componentes.*.componente' => ['required', 'string', 'max:255'],
            'sistemas.*.componentes.*.estado' => ['nullable', 'string', 'max:10', 'in:B,R,RC,RR,SI,NO'],
            'sistemas.*.componentes.*.observaciones' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'sistemas.required' => 'Debe enviar al menos un sistema de inspección.',
            'sistemas.array' => 'El formato de sistemas es inválido.',
            'sistemas.min' => 'Debe enviar al menos un sistema de inspección.',
            
            'sistemas.*.nombre_sistema.required' => 'El nombre del sistema es requerido.',
            'sistemas.*.nombre_sistema.string' => 'El nombre del sistema debe ser texto.',
            'sistemas.*.nombre_sistema.max' => 'El nombre del sistema no puede exceder 255 caracteres.',
            
            'sistemas.*.componentes.required' => 'Cada sistema debe tener al menos un componente.',
            'sistemas.*.componentes.array' => 'El formato de componentes es inválido.',
            'sistemas.*.componentes.min' => 'Cada sistema debe tener al menos un componente.',
            
            'sistemas.*.componentes.*.componente.required' => 'El nombre del componente es requerido.',
            'sistemas.*.componentes.*.componente.string' => 'El nombre del componente debe ser texto.',
            'sistemas.*.componentes.*.componente.max' => 'El nombre del componente no puede exceder 255 caracteres.',
            
            'sistemas.*.componentes.*.estado.string' => 'El estado debe ser texto.',
            'sistemas.*.componentes.*.estado.max' => 'El estado no puede exceder 10 caracteres.',
            'sistemas.*.componentes.*.estado.in' => 'El estado debe ser uno de: B, R, RC, RR, SI, NO.',
            
            'sistemas.*.componentes.*.observaciones.string' => 'Las observaciones deben ser texto.',
            'sistemas.*.componentes.*.observaciones.max' => 'Las observaciones no pueden exceder 1000 caracteres.',
        ];
    }

    /**
     * Validate that each component has at least estado or observaciones.
     *
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $sistemas = $this->input('sistemas', []);
            
            foreach ($sistemas as $sistemaIndex => $sistema) {
                if (!isset($sistema['componentes'])) {
                    continue;
                }
                
                foreach ($sistema['componentes'] as $componenteIndex => $componente) {
                    $tieneEstado = !empty($componente['estado']);
                    $tieneObservaciones = !empty($componente['observaciones']);
                    
                    if (!$tieneEstado && !$tieneObservaciones) {
                        $validator->errors()->add(
                            "sistemas.{$sistemaIndex}.componentes.{$componenteIndex}",
                            "El componente '{$componente['componente']}' debe tener al menos un estado o una observación."
                        );
                    }
                }
            }
        });
    }
}
