<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Registro;
use App\Models\Inspeccion;
use App\Models\Vehiculo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Http\Requests\Registro\InspeccionRequest;

class InspeccionController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        $this->authorize('view', $vehiculo);

        if(Inspeccion::where('id_vehiculo', $id)->exists()) {
            return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Ya se ha realizado la evaluación por Inspección para este vehículo.');
        } else {    
         return Inertia::render('Registro/create/evaluacion_inspeccion', [
            'id' => $id,
        ]);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(InspeccionRequest $request , $id)
    {
        if(Inspeccion::where('id_vehiculo', $id)->exists() || !Vehiculo::where('id', $id)->exists()) {
            
            return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Ya se ha realizado la evaluación por Inspección para este vehículo.');
        }
        $data = $request->input('data');

        $inspecciones = [];

        foreach ($data as $item) {
            $inspecciones[] = [
                'id_vehiculo'   => $id,
                'nombre'        => $item['nombre'],
                'caracteristica'=> $item['caracteristica'],
                'tiene'         => $item['tiene'],
                'valoracion'    => $item['valoracion'],
                'observaciones' => $item['observaciones'],
                'created_at'    => now(),
                'updated_at'    => now(),
            ];
            
        }

        // Inserta múltiples registros
        Inspeccion::insert($inspecciones);

        return redirect()->route('resultados.avaluo.continuar', $id)->with('success' , 'Se Creo correstamente la Inspeccion');
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {   
        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('view', $vehiculo);

        $inspecciones = Inspeccion::where('id_vehiculo', $vehiculo->id)->get();

        if($inspecciones){
              return Inertia::render('Registro/update/EditInspeccion', [
                'id' => $id,
                'inspecciones' => $inspecciones,
            ]);
        }
        return redirect()->route('resultados.avaluo.continuar', $id)->with('error', 'No se ha realizado la evaluación por Inspección para este vehículo.');
      
    }

    /**
     * Update the specified resource in storage.
    */
    public function update(InspeccionRequest $request, $id)
    {
        $vehiculo = Vehiculo::findOrFail($id);
        
        // Verificar autorización usando la Policy
        $this->authorize('update', $vehiculo);
        
        $data = $request->input('data');

        foreach ($data as $item) {
      
            $inspeccion = Inspeccion::where('nombre', $item['nombre'])
                                    ->where('caracteristica', $item['caracteristica'])
                                    ->first();

            if ($inspeccion) {
                $inspeccion->update([
                    'nombre'        => $item['nombre'],
                    'caracteristica'=> $item['caracteristica'],
                    'tiene'         => $item['tiene'],
                    'valoracion'    => $item['valoracion'],
                    'observaciones' => $item['observaciones'],
                    'updated_at'    => now(),
                ]);
            } else {
                Inspeccion::create([
                    'id_vehiculo'   => $id,
                    'nombre'        => $item['nombre'],
                    'caracteristica'=> $item['caracteristica'],
                    'tiene'         => $item['tiene'],
                    'valoracion'    => $item['valoracion'],
                    'observaciones' => $item['observaciones'],
                    'created_at'    => now(),
                    'updated_at'    => now(),
                ]);
            }
        }

         return redirect()->route('resultados.avaluo', $vehiculo->id)->with('success', 'Vehículo actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
