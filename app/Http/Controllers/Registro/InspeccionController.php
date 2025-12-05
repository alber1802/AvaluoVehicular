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

use App\Http\Requests\Registro\InspeccionRequest;

class InspeccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        //dd($id);
        if(Inspeccion::where('id_vehiculo', $id)->exists() || !Vehiculo::where('id', $id)->exists()) {
            return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Ya se ha realizado la evaluación por Inspección para este vehículo.');
        } else {    
         return Inertia::render('Registro/create/evaluacion_inspeccion', [
            'id' => $id,
        ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        $suma = 0;

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
            $suma += $item['valoracion'];
        }

        // Inserta múltiples registros
        Inspeccion::insert($inspecciones);

        return redirect()->route('resultados.avaluo.continuar', $id);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
