<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Registro\ImagenesRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\VehiculoImagen;
use App\Models\Vehiculo;




class ImagenesController extends Controller
{
    
    public function index($id)
    {
        if(Vehiculo::where('id', $id)->exists()) {
            if(!VehiculoImagen::where('id_vehiculo', $id)->exists()) {
                    return Inertia::render('Registro/create/imagenes_avaluo'
                    , compact('id')
                );
            }else {
                return redirect()->route('dashboard');
            }
        
        }else {
            return redirect()->route('dashboard');
        }


        
    }

    public function store(ImagenesRequest $request, $id)
    {
        $datosValidados = $request->validated();
        $imagenesGuardadas = [];

        foreach ($datosValidados['imagenes'] as $imagenData) {
            $file = $imagenData['file'];
            
            // Generar nombre único para el archivo
            $extension = $file->getClientOriginalExtension();
            $nombreArchivo = 'vehiculo_' . $id . '_' . uniqid() . '_' . time() . '.' . $extension;
            
            // Guardar el archivo en storage/app/public/vehiculos
            $rutaArchivo = Storage::disk('public')->putFileAs('vehiculos', $file, $nombreArchivo);
            
            // Preparar datos para la base de datos
            $imagenesGuardadas[] = [
                'id_vehiculo' => $id,
                'url' => $rutaArchivo,
                'lado' => $imagenData['ubicacion'],
                'descripcion' => $imagenData['descripcion'] ?? null,
                'fecha' => now()->format('Y-m-d'),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        
        VehiculoImagen::insert($imagenesGuardadas);

        return redirect()->route('resultados.avaluo' , $id)->with('success', 'Imágenes guardadas correctamente.');
    }

   

    //se tiene que enviar un id para ver que datos se estan manejando 

    public function viewResultados(){


        return Inertia::render('Registro/create/ViewResultado');
    }


    //se tiene que enviar un id para ver que datos se estan manejando 
    public function editResultados(){
        
        //con el id 

    }

}
