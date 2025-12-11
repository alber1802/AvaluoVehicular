<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use App\Http\Requests\Registro\MecanicaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\Sistema;
use App\Models\Vehiculo;



class MecanicaController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        if(Sistema::where('id_vehiculo', $id)->exists() || !Vehiculo::where('id', $id)->exists()) {
            return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Ya se ha realizado la evaluación mecánica para este vehículo.');
        } else {    
            return Inertia::render('Registro/create/evaluacion_mecanica', [
                'id' => $id,
            ]);
        }
    }

    /**
     * Ruta para la evaluacion mecanica 
     */
    public function create()
    {
        //
    }

    /**
     * Ruta para la evaluacion mecanica 
     */
    public function store(MecanicaRequest $request, $id)
    {

        if(Sistema::where('id_vehiculo', $id)->exists() || !Vehiculo::where('id', $id)->exists()){
            return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Ya se ha realizado la evaluación mecánica para este vehículo.');
        }
        // Los datos ya vienen validados por MecanicaRequest
        $datosValidados = $request->validated();

        //dd($datosValidados);
        
        // Array para almacenar todos los registros a insertar
        $registrosMecanica = [];
        
        // Procesar cada sistema
        foreach ($datosValidados['sistemas'] as $sistema) {
            $nombreSistema = $sistema['nombre_sistema'];
            
            // Procesar cada componente del sistema
            foreach ($sistema['componentes'] as $componente) {
                $registrosMecanica[] = [
                    'id_vehiculo' => $id,
                    'nombre_sistema' => $nombreSistema,
                    'componente' => $componente['componente'],
                    'estado' => $componente['estado'] ?? null,
                    'observaciones' => $componente['observaciones'] ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }
        
        Sistema::insert($registrosMecanica);

        return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Evaluación mecánica guardada correctamente.');
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
    public function edit($id)
    {
        $evaluacion_mecanicas = Sistema::where('id_vehiculo', $id)->get();
       // dd($evaluacion_mecanicas);

        if($evaluacion_mecanicas){
                return Inertia::render('Registro/update/EditMecanica', [
                'id' => $id,
                'evaluacion_mecanica' => $evaluacion_mecanicas,
            ]);
        }

        return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'Evaluación mecánica editada correctamente.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MecanicaRequest $request,  $id)
    {
        if(!Vehiculo::where('id', $id)->exists()){
            return redirect()->route('resultados.avaluo.continuar', $id)->with('success', 'El vehículo no existe.');
        }
        // Los datos ya vienen validados por MecanicaRequest
        $datosValidados = $request->validated();

        //dd($datosValidados);
        
        // Array para almacenar todos los registros a insertar
     
        
        // Procesar cada sistema
        foreach ($datosValidados['sistemas'] as $sistema) {
            $nombreSistema = $sistema['nombre_sistema'];
            
            // Procesar cada componente del sistema
            foreach ($sistema['componentes'] as $componente) {

                $registro = Sistema::where('id_vehiculo', $id)
                            ->where('nombre_sistema', $nombreSistema)
                            ->where('componente', $componente['componente'])->first();
                if($registro){
                    $registro->update([
                        'estado' => $componente['estado'] ?? null,
                        'observaciones' => $componente['observaciones'] ?? null,
                        'updated_at' => now(),
                    ]);
                }else{
                    Sistema::create([
                        'id_vehiculo' => $id,
                        'nombre_sistema' => $nombreSistema,
                        'componente' => $componente['componente'],
                        'estado' => $componente['estado'] ?? null,
                        'observaciones' => $componente['observaciones'] ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }
        

        return back()->with('success', 'Evaluación mecánica guardada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
