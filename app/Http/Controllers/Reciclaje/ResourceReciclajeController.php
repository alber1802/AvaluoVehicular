<?php

namespace App\Http\Controllers\Reciclaje;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Vehiculo;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResourceReciclajeController extends Controller
{
    /**
     * Muestra una lista del recurso.
     */
    public function index()
    {
        if(Auth::user()->role == 'admin' ){
            $vehiculos = Vehiculo::onlyTrashed()->get();
        }else{
            $vehiculos = Vehiculo::where('id_evaluador', Auth::user()->id)->onlyTrashed()->get();
        }

        // Obtener lista de usuarios únicos que tienen vehículos eliminados (solo para admin)
        $usuarios = [];
        if(Auth::user()->role == 'admin') {
            $usuarios = $vehiculos->map(function ($v) {
                return [
                    'id' => $v->evaluador->id ?? 0,
                    'name' => $v->evaluador->name ?? 'Sin asignar',
                ];
            })->unique('id')->values()->toArray();
        }

        $vehiculos = $vehiculos->map(function ($vehiculo) {
            // Fecha límite = deleted_at + 30 días
            $fechaLimite = $vehiculo->deleted_at->copy()->addDays(30);
            // Días restantes = diferencia entre fecha límite y hoy
            $diasRestantes = now()->diffInDays($fechaLimite, false);
            // Si es negativo, ya pasó el límite
            $diasRestantes = max(0, (int) $diasRestantes);

            return [
                'id' => $vehiculo->id,
                'entidad' => $vehiculo->entidad ?? 'Sin entidad',
                'marca' => $vehiculo->marca->nombre ?? 'Sin marca',
                'modelo' => $vehiculo->modelo,
                'año_fabricacion' => (string) ($vehiculo->año_fabricacion ?? ''),
                'placa' => $vehiculo->placa,
                'fecha_evaluacion' => $vehiculo->fecha_evaluacion,
                'deleted_at' => $vehiculo->deleted_at->format('Y-m-d'),
                'dias_restantes' => $diasRestantes,
                'id_evaluador' => $vehiculo->id_evaluador,
                'evaluador_nombre' => $vehiculo->evaluador->name ?? 'Sin asignar',
            ];
        });

        return Inertia::render('Reciclaje/indexReciclaje', [
            'vehiculos' => $vehiculos,
            'usuarios' => $usuarios,
        ]);
    }

     public function destroy($id)
    {
        if(Auth::user()->role == 'admin' ){
            $vehiculo = Vehiculo::findOrFail($id);
        }else{
            $vehiculo = Vehiculo::where('id_evaluador', Auth::user()->id)->findOrFail($id);
        }
       
       $vehiculo->condicionGeneral()->delete();
       $vehiculo->inspecciones()->delete();
       $vehiculo->sistemas()->delete();
       $vehiculo->archivos()->delete();
       $vehiculo->imagenes()->delete();
       $vehiculo->avaluo()->delete();
       $vehiculo->delete();
       
        return redirect()->route('dashboard')->with('success', 'Vehículo eliminado correctamente');
    }

    public function restore($id)
    {
        if(Auth::user()->role == 'admin' ){
            $vehiculo = Vehiculo::onlyTrashed()->findOrFail($id);
        }else{
            $vehiculo = Vehiculo::where('id_evaluador', Auth::user()->id)->onlyTrashed()->findOrFail($id);
        }
    
        $vehiculo->condicionGeneral()->restore();
        $vehiculo->inspecciones()->restore();
        $vehiculo->sistemas()->restore();
        $vehiculo->archivos()->restore();
        $vehiculo->imagenes()->restore();
        $vehiculo->avaluo()->restore();
         $vehiculo->restore();
        return redirect()->route('dashboard')->with('success', 'Vehículo restaurado correctamente');
    }

    public function forceDelete($id)
    {
        if(Auth::user()->role != 'admin'){
            return redirect()->route('dashboard')->with('error', 'No tienes permiso para eliminar permanentemente un vehículo');
        }
        $vehiculo = Vehiculo::withTrashed()->findOrFail($id);
        
        $vehiculo->condicionGeneral()->forceDelete();
        $vehiculo->inspecciones()->forceDelete();
        $vehiculo->sistemas()->forceDelete();
        $vehiculo->avaluo()->forceDelete();

        if($vehiculo->archivos()->exists()){
            
            Storage::disk('public')->delete($vehiculo->archivos()->first()->url);

            $vehiculo->archivos()->forceDelete();
        }
        if($vehiculo->imagenes()->exists()){
           foreach ($vehiculo->imagenes()->get() as $imagen) {
               Storage::disk('public')->delete($imagen->url);
           }
           $vehiculo->imagenes()->forceDelete();
        }
        $vehiculo->forceDelete();
        return redirect()->route('dashboard')->with('success', 'Vehículo eliminado permanentemente correctamente');
    }

}
