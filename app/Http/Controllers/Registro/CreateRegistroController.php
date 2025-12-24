<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\MarcaVehiculo;
use App\Models\Vehiculo;
use App\Models\Inspeccion;
use App\Models\Sistema;
use App\Models\Avaluo;
use App\Models\VehiculoImagen;
use App\Models\CondicionGeneral;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

use Inertia\Response;

use App\Http\Requests\Registro\CreateRequest;
use App\Http\Requests\Registro\UpdateVehiculoRequest;

class CreateRegistroController extends Controller
{
    use AuthorizesRequests;
    
    public function index()
    {
        $marcas = MarcaVehiculo::all();

        return Inertia::render('Registro/create/registro', [
            'marcas' => $marcas,
        ]);
        
    }

    public function seleccionar($id){

        $vehiculo = Vehiculo::findOrFail($id);

        if(Avaluo::where('id_vehiculo', $vehiculo->id)->exists()){
            
            return redirect()->route('dashboard');
        }
        //hacer validacion para cuando recrese el usuario y ya haya podiver mejor algun registro
        return Inertia::render('Registro/create/condiciones_generales', [
            'id' => $id,
        ]);
    }


    public function store(CreateRequest $request)
    {
        $estadoOperativo = implode(',', $request->estado_operativo);
        $idMarca = (int) $request->id_marca;
        $vehiculo = [
            'entidad' => $request->entidad,
            'fecha_evaluacion' => $request->fecha_evaluacion,
            'ubicacion_actual' => $request->ubicacion_actual,
            'tipo_vehiculo' => $request->tipo_vehiculo,
            'tipo_combustible' => $request->tipo_combustible,
            'id_marca' => $idMarca,
            'modelo' => $request->modelo,
            'año_fabricacion' => $request->ano_fabricacion,
            'placa' => $request->placa,
            'serie_motor' => $request->serie_motor,
            'chasis' => $request->chasis,
            'color' => $request->color,
            'procedencia' => $request->procedencia,
            'kilometraje' => $request->kilometraje,
            'precio_referencial' => $request->precio_referencial,
            'observaciones' => $request->observaciones,
            'id_evaluador' => Auth::user()->id,
        ];

        $vehiculo = Vehiculo::create($vehiculo);

        $condicionGeneral = [
            'id_vehiculo' => $vehiculo->id,
            'estado_operativo' => $estadoOperativo,
            'estado_general' => $request->estado_general,
            'observaciones' => $request->observaciones,
        ];

        CondicionGeneral::create($condicionGeneral);


        return redirect()->route('registro.seleccionar', $vehiculo->id)->with('success', 'Vehiculo creado exitosamente');
        
    }
   
    /**
     * Muestra el recurso especificado.
     */
    public function show(string $id)
    {
        $vehiculo = Vehiculo::findOrFail($id); // Busca un vehículo por su ID; si no lo encuentra, lanza una excepción 404.

        $this->authorize('view', $vehiculo);

        $hasInspeccion = Inspeccion::where('id_vehiculo', $vehiculo->id)->exists();
        $hasSistema = Sistema::where('id_vehiculo', $vehiculo->id)->exists();

        $hasImagenes = VehiculoImagen::where('id_vehiculo', $vehiculo->id)->exists();
        
        if(Avaluo::where('id_vehiculo', $vehiculo->id)->exists() &&  $hasImagenes) {
            
            return redirect()->route('dashboard');
        }
        
        if (!$hasInspeccion && !$hasSistema) {
            
            return Inertia::render('Registro/create/condiciones_generales', [
                'id' => $vehiculo->id,
            ]);
        } elseif (!$hasSistema) {
            
            return redirect()->route('evaluacion.mecanica', $vehiculo->id);
        } elseif (!$hasInspeccion) {
            
            return redirect()->route('evaluacion.inspeccion', $vehiculo->id);
        } else {
            
            return redirect()->route('imagenes.vehiculo', $vehiculo->id);
        }
        
    }
    public function seleccionarEditar($id){

        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('view', $vehiculo);

        return  Inertia::render('Registro/update/EditSeleccion', [
            'id' => $id,
        ]);

    }

    /**
     * Muestra el formulario para editar el recurso especificado.
     */
    public function edit($id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('view', $vehiculo);
        $condicionGeneral = CondicionGeneral::where('id_vehiculo', $vehiculo->id)->first();
        $marcas = MarcaVehiculo::all();
       
         return Inertia::render('Registro/update/EditDatosVehiculo', [
            'vehiculo' => $vehiculo,
            'condicionGeneral' => $condicionGeneral,
            'marcas' => $marcas,
         ]);
    }

    /**
     * Actualiza el recurso especificado en el almacenamiento.
     */ 
    public function update(UpdateVehiculoRequest $request, string $id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('update', $vehiculo);

        // Prepare estado_operativo as comma-separated string
        $estadoOperativo = is_array($request->estado_operativo) 
            ? implode(',', $request->estado_operativo) 
            : $request->estado_operativo;

        // Update vehicle data
        $vehiculo->update([
            'entidad' => $request->entidad,
            'fecha_evaluacion' => $request->fecha_evaluacion,
            'ubicacion_actual' => $request->ubicacion_actual,
            'tipo_vehiculo' => $request->tipo_vehiculo,
            'tipo_combustible' => $request->tipo_combustible,
            'id_marca' => (int) $request->id_marca,
            'modelo' => $request->modelo,
            'año_fabricacion' => $request->ano_fabricacion,
            'placa' => $request->placa,
            'serie_motor' => $request->serie_motor,
            'chasis' => $request->chasis,
            'color' => $request->color,
            'procedencia' => $request->procedencia,
            'kilometraje' => $request->kilometraje,
            'precio_referencial' => $request->precio_referencial,
        ]);

        // Update general condition
        $condicionGeneral = CondicionGeneral::where('id_vehiculo', $vehiculo->id)->first();
        
        if ($condicionGeneral) {
            $condicionGeneral->update([
                'estado_operativo' => $estadoOperativo,
                'estado_general' => $request->estado_general,
                'observaciones' => $request->observaciones,
            ]);
        }

        return redirect()->route('resultados.avaluo', $vehiculo->id)->with('success', 'Vehículo actualizado correctamente');
    }

    /**
     * Elimina el recurso especificado del almacenamiento.
     */
   

}
