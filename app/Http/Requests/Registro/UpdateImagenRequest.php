<?php

namespace App\Http\Requests\Registro;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateImagenRequest extends FormRequest
{ /**
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
            // Validar que imagenes sea un array requerido
            'imagenes' => ['required', 'array', 'min:1', 'max:20'],
            
            // ID para imágenes existentes (opcional, solo si no hay file)
            'imagenes.*.id' => ['sometimes', 'nullable', 'integer', 'exists:vehiculo_imagen,id'],
            
            // Validaciones para el archivo (solo para imágenes NUEVAS)
            // Se valida solo si existe el campo 'file'
            'imagenes.*.file' => [
                'sometimes', // Solo validar si existe
                'required_without:imagenes.*.id', // Requerido si no hay ID (imagen nueva)
                'file',
                'image', // Valida que sea una imagen real
                'mimes:jpeg,jpg,png,gif,webp', // Solo estos tipos MIME
                'max:5120', // Máximo 5MB (5120 KB)
            ],
            
            // Validar ubicación (siempre requerida, tanto para nuevas como existentes)
            'imagenes.*.ubicacion' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z0-9\s\-_áéíóúÁÉÍÓÚñÑ]+$/', // Solo caracteres alfanuméricos y espacios
            ],
            
            // Validar descripción (opcional para ambas)
            'imagenes.*.descripcion' => [
                'nullable',
                'string',
                'max:500',
            ],
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
            'imagenes.required' => 'Debe proporcionar al menos una imagen.',
            'imagenes.array' => 'El formato de imágenes es inválido.',
            'imagenes.min' => 'Debe proporcionar al menos una imagen.',
            'imagenes.max' => 'No puede procesar más de 20 imágenes a la vez.',
            
            'imagenes.*.id.integer' => 'El ID de la imagen debe ser un número.',
            'imagenes.*.id.exists' => 'La imagen seleccionada no existe.',
            
            'imagenes.*.file.required_without' => 'Debe proporcionar un archivo para imágenes nuevas.',
            'imagenes.*.file.file' => 'El archivo debe ser un archivo válido.',
            'imagenes.*.file.image' => 'El archivo debe ser una imagen válida.',
            'imagenes.*.file.mimes' => 'La imagen debe ser de tipo: jpeg, jpg, png, gif o webp.',
            'imagenes.*.file.max' => 'La imagen no puede pesar más de 5MB.',
            'imagenes.*.file.dimensions' => 'Las dimensiones de la imagen deben estar entre 100x100 y 8000x8000 píxeles.',
            
            'imagenes.*.ubicacion.required' => 'La ubicación de la imagen es requerida.',
            'imagenes.*.ubicacion.string' => 'La ubicación debe ser texto.',
            'imagenes.*.ubicacion.max' => 'La ubicación no puede exceder 255 caracteres.',
            'imagenes.*.ubicacion.regex' => 'La ubicación contiene caracteres no permitidos.',
            
            'imagenes.*.descripcion.string' => 'La descripción debe ser texto.',
            'imagenes.*.descripcion.max' => 'La descripción no puede exceder 500 caracteres.',
        ];
    }

    /**
     * Configure the validator instance with additional security checks.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $imagenes = $this->file('imagenes', []);
            
            foreach ($imagenes as $index => $imagenData) {
                if (!isset($imagenData['file'])) {
                    continue;
                }
                
                $file = $imagenData['file'];
                
                // Verificar que el archivo existe y es válido
                if (!$file->isValid()) {
                    $validator->errors()->add(
                        "imagenes.{$index}.file",
                        'El archivo no es válido o está corrupto.'
                    );
                    continue;
                }
                
                // Verificar extensión del archivo (doble verificación)
                $extension = strtolower($file->getClientOriginalExtension());
                $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
                
                if (!in_array($extension, $allowedExtensions)) {
                    $validator->errors()->add(
                        "imagenes.{$index}.file",
                        "La extensión del archivo (.{$extension}) no está permitida."
                    );
                    continue;
                }
                
                // Verificar MIME type real del archivo (no solo la extensión)
                $mimeType = $file->getMimeType();
                $allowedMimes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'image/webp'
                ];
                
                if (!in_array($mimeType, $allowedMimes)) {
                    $validator->errors()->add(
                        "imagenes.{$index}.file",
                        "El tipo de archivo ({$mimeType}) no es una imagen válida."
                    );
                    continue;
                }
                
                // Verificar que el nombre del archivo no contenga caracteres peligrosos
                $originalName = $file->getClientOriginalName();
                if (preg_match('/[<>:"|?*\\\\\/]/', $originalName)) {
                    $validator->errors()->add(
                        "imagenes.{$index}.file",
                        'El nombre del archivo contiene caracteres no permitidos.'
                    );
                    continue;
                }
                
                // Verificar que no sea un archivo ejecutable disfrazado
                // Leer los primeros bytes del archivo para verificar la firma
                $fileContent = file_get_contents($file->getRealPath(), false, null, 0, 20);
                
                // Firmas de archivos ejecutables comunes (magic bytes)
                $dangerousSignatures = [
                    "\x4D\x5A", // EXE, DLL (Windows)
                    "\x7F\x45\x4C\x46", // ELF (Linux executables)
                    "\x23\x21", // Script (#!)
                    "<?php", // PHP
                    "<?", // PHP short tag
                    "<script", // JavaScript
                    "\x50\x4B\x03\x04", // ZIP (puede contener ejecutables)
                ];
                
                foreach ($dangerousSignatures as $signature) {
                    if (strpos($fileContent, $signature) === 0 || strpos($fileContent, $signature) !== false) {
                        $validator->errors()->add(
                            "imagenes.{$index}.file",
                            'El archivo contiene contenido potencialmente peligroso y no puede ser procesado.'
                        );
                        break;
                    }
                }
                
                // Verificar que la imagen sea realmente una imagen válida usando GD o Imagick
                try {
                    $imageInfo = @getimagesize($file->getRealPath());
                    if ($imageInfo === false) {
                        $validator->errors()->add(
                            "imagenes.{$index}.file",
                            'El archivo no es una imagen válida o está corrupto.'
                        );
                    }
                } catch (\Exception $e) {
                    $validator->errors()->add(
                        "imagenes.{$index}.file",
                        'No se pudo verificar la integridad de la imagen.'
                    );
                }
            }
        });
    }
}
