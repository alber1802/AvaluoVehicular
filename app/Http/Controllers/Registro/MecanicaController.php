<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class MecanicaController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
       
         return Inertia::render('Registro/create/evaluacion_mecanica');
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
    public function store(Request $request)
    {
        // Obtener todos los datos
        $datosInspeccion = $request->all();
        
        // Validar que venga al menos un componente
        if (empty($datosInspeccion)) {
            return back()->withErrors(['error' => 'Debe completar al menos un componente de la inspección.']);
        }

       
        // Array para almacenar los datos validados
        $sistemasValidados = [];
        $errores = [];

        // Iterar sobre cada componente recibido
        foreach ($datosInspeccion as $nombreComponente => $datos) {
            // Validar que el estado no esté vacío (campo obligatorio)
            if (empty($datos['estado'])) {
                $errores[] = "El componente '{$nombreComponente}' debe tener un estado seleccionado.";
               
                continue;
            }

           

            // Preparar datos para inserción
            $sistemasValidados[] = [
                'nombre_sistema' => $datos['nombre_sistema'] ?? null,
                'componente' => $datos['componente'] ?? $nombreComponente,
                'estado' => $datos['estado'],
                'observaciones' => $datos['observaciones'] ?? null,
                // 'id_vehiculo' => $idVehiculo, // Aquí irá el ID del vehículo cuando lo tengas
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        // dd([
        //     'mensaje' => 'Datos validados correctamente',
        //     'total_componentes' => count($sistemasValidados),
        //     'datos' => $sistemasValidados
        // ]);

        // Si hay errores, regresar con los mensajes
        
        if (!empty($errores)) {
            return back()->withErrors(['validacion' => $errores])->withInput();
           
        }

        // Si no hay datos validados, retornar error
        if (empty($sistemasValidados)) {
            return back()->withErrors(['error' => 'No se pudo validar ningún componente.']);
        }

        // Simulación: Aquí iría la inserción masiva a la base de datos
        // DB::table('sistemas')->insert($sistemasValidados);
        // O con el modelo: Sistema::insert($sistemasValidados);

        // Por ahora, mostrar los datos validados para verificar
       
        // Cuando esté listo, redirigir con mensaje de éxito
        // return redirect()->route('registro.success')->with('success', 'Evaluación mecánica guardada correctamente.');
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
