<?php

namespace App\Http\Requests\Share;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if (Auth::user()->role != 'admin' || Auth::user()->role != 'evaluador') {
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
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
            'fecha_inicio' => 'nullable|date|date_equals:today',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'motivo' => 'required|string|max:255|regex:/^[^<>]*$/',
            'observaciones' => 'nullable|string|max:1000|regex:/^[^<>]*$/',
        ];
    }
}
