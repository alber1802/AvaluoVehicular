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

use Inertia\Response;

use App\Http\Requests\Registro\CreateRequest;

class CreateRegistroController extends Controller
{
    
    public function index()
    {
        $marcas = MarcaVehiculo::all();

        return Inertia::render('Registro/create/registro', [
            'marcas' => $marcas,
        ]);
        
    }

    public function seleccionar($id){
        

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
            'estado_operativo' => $estadoOperativo,
            'estado_general' => $request->estado_general,
            'observaciones' => $request->observaciones,
            'id_evaluador' => Auth::user()->id,
        ];

        $vehiculo = Vehiculo::create($vehiculo);



        return redirect()->route('registro.seleccionar', $vehiculo->id);
        
    }
   
    /**
     * Muestra el recurso especificado.
     */
    public function show(string $id)
    {
        $vehiculo = Vehiculo::find($id);

        if (!$vehiculo) {
            return redirect()->route('dashboard');
        }
        if(Avaluo::where('id_vehiculo', $vehiculo->id)->exists()) {
            return redirect()->route('dashboard');
        }
       
        $hasInspeccion = Inspeccion::where('id_vehiculo', $vehiculo->id)->exists();
        $hasSistema = Sistema::where('id_vehiculo', $vehiculo->id)->exists();

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

    /**
     * Muestra el formulario para editar el recurso especificado.
     */
    public function edit(string $id)
    {
         return Inertia::render('Registro/update/EditSeleccion');
    }

    /**
     * Actualiza el recurso especificado en el almacenamiento.
     */ 
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Elimina el recurso especificado del almacenamiento.
     */
    public function destroy(string $id)
    {
        //
    }
}
