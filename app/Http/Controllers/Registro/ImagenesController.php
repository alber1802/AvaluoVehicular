<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Registro\ImagenesRequest;
use App\Http\Requests\Registro\UpdateImagenRequest;
use Illuminate\Support\Facades\Storage;

use Inertia\Inertia;
use App\Models\VehiculoImagen;
use App\Models\Vehiculo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;




class ImagenesController extends Controller
{
    use AuthorizesRequests;
    
    public function index($id)
    {

       $vehiculo = Vehiculo::findOrFail($id);

         // Verificar autorización usando la Policy
        $this->authorize('view', $vehiculo);
       
        if(!$vehiculo){
            if(!VehiculoImagen::where('id_vehiculo', $vehiculo->id)->exists()) {
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

    public function descargarImagen($id)
    {
        $imagen = VehiculoImagen::find($id);
        $path = $imagen->url; // ej: 'vehiculos/vehiculo_1_....png'

        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'Archivo no encontrado');
        }
    
       // return Storage::disk('public')->download($path);
    }
    public function edit($id){

        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('view', $vehiculo);

        $imagenes = VehiculoImagen::where('id_vehiculo', $vehiculo->id)->get();

        if($imagenes){
            return Inertia::render('Registro/update/EditImagenes', [
                'id' => $vehiculo->id,
                'imagenes' => $imagenes,
            ]);
        }
        return redirect()->route('resultados.avaluo.continuar', $id)->with('error', 'Imagen no encontrada.');
        
    }

    public function update(UpdateImagenRequest $request, $id){

        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('update', $vehiculo);

        $imagenesExistentes = VehiculoImagen::where('id_vehiculo', $vehiculo->id)->get();
        $datosValidados = $request->validated();
        
        // 2. Extraer los IDs de las imágenes que se están enviando (las que se mantienen)
        $idsEnviados = [];
        foreach ($datosValidados['imagenes'] as $imagenData) {
            if (isset($imagenData['id']) && $imagenData['id']) {
                $idsEnviados[] = $imagenData['id'];
            }
        }
        
        // 3. Identificar las imágenes que deben eliminarse (existen en BD pero no en la petición)
        $imagenesAEliminar = $imagenesExistentes->whereNotIn('id', $idsEnviados);
        
        // 4. Eliminar las imágenes que ya no están en la lista
        foreach ($imagenesAEliminar as $imagenEliminar) {
            // Eliminar el archivo físico del storage
            if (Storage::disk('public')->exists($imagenEliminar->url)) {
                Storage::disk('public')->delete($imagenEliminar->url);
            }
            
            // Eliminar el registro de la base de datos
            $imagenEliminar->delete();
        }
        
        // 5. Procesar las imágenes enviadas (actualizar existentes y crear nuevas)
        $imagenesNuevasParaInsertar = [];
        
        foreach ($datosValidados['imagenes'] as $imagenData) {
            // Si tiene ID, es una imagen existente que se debe actualizar
            if (isset($imagenData['id']) && $imagenData['id']) {
                $imagenExistente = $imagenesExistentes->where('id', $imagenData['id'])->first();
                
                if ($imagenExistente) {
                    // Actualizar solo la ubicación y descripción
                    $imagenExistente->update([
                        'lado' => $imagenData['ubicacion'],
                        'descripcion' => $imagenData['descripcion'] ?? null,
                        'updated_at' => now(),
                    ]);
                }
            } 
            // Si tiene file, es una imagen nueva que se debe guardar
            elseif (isset($imagenData['file']) && $imagenData['file']) {
                $file = $imagenData['file'];
                
                // Generar nombre único para el archivo
                $extension = $file->getClientOriginalExtension();
                $nombreArchivo = 'vehiculo_' . $id . '_' . uniqid() . '_' . time() . '.' . $extension;
                
                // Guardar el archivo en storage/app/public/vehiculos
                $rutaArchivo = Storage::disk('public')->putFileAs('vehiculos', $file, $nombreArchivo);
                
                // Preparar datos para inserción masiva
                $imagenesNuevasParaInsertar[] = [
                    'id_vehiculo' => $id,
                    'url' => $rutaArchivo,
                    'lado' => $imagenData['ubicacion'],
                    'descripcion' => $imagenData['descripcion'] ?? null,
                    'fecha' => now()->format('Y-m-d'),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        
        // 6. Insertar las nuevas imágenes en la base de datos
        if (!empty($imagenesNuevasParaInsertar)) {
            VehiculoImagen::insert($imagenesNuevasParaInsertar);
        }
        

        return back()->with('success', 'Imágenes actualizadas correctamente.');
    }


   

    //se tiene que enviar un id para ver que datos se estan manejando 




    

}
