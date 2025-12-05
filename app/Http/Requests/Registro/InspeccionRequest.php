<?php

namespace App\Http\Requests\Registro;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class InspeccionRequest extends FormRequest
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
            'data' => ['required', 'array'], // Assuming 'vehiculos' is the table name
            'data.*.nombre' => ['required', 'string', 'max:255'],
            'data.*.caracteristica' => ['required', 'string', 'max:255'],
            'data.*.tiene' => ['nullable', 'boolean'],
            'data.*.valoracion' => ['required' , 'numeric' ], // Assuming a 1-5 scale
            'data.*.observaciones' => ['nullable', 'string', 'max:1000'],
        ];
         
    }

   
}
