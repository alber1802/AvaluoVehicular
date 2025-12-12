<?php

namespace App\Http\Controllers\Registro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Inspeccion;
use App\Models\Vehiculo;
use App\Models\VehiculoImagen;
use App\Models\CondicionGeneral;
use App\Models\MarcaVehiculo;
use App\Models\Avaluo;
use App\Models\Archivo;


use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class AvaluoController extends Controller 
{   
     use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
    
        $vehiculo = Vehiculo::findOrFail($id);

        $this->authorize('view', $vehiculo);

        $marca = MarcaVehiculo::where('id', $vehiculo->id_marca)->first();
        $inspeccion = Inspeccion::where('id_vehiculo', $vehiculo->id)->where('tiene', 1)->get();
        $condicionGeneral = CondicionGeneral::where('id_vehiculo', $vehiculo->id)->first();
        $imagenes = VehiculoImagen::where('id_vehiculo', $vehiculo->id)->get();
        $archivos = Archivo::where('id_vehiculo', $vehiculo->id)->first();

        
        $factor_c = $this->evaluar_inspeccion($vehiculo->id );
        $factor_a = $this->DepreciacionModelo($vehiculo->id);
        $factor_b = $this->DepreciacionKilometraje($vehiculo->id);

        $p = $vehiculo->precio_referencial;

        $factorReposicion = 1.2;

        $valorAvaluo = $p * $factor_c * $factor_a * $factor_b * $factorReposicion;

        $valorResidualVehiuculo = $vehiculo->precio_referencial * 0.107;

        $valorFinal = max($valorAvaluo, $valorResidualVehiuculo);

        


        $avaluo = Avaluo::updateOrCreate(
            ['id_vehiculo' => $vehiculo->id],
            [
                'factor_reposicion' => $factorReposicion,
                'final_estimacion' => $valorFinal,
                'moneda' => '$us',
                'depre_modelo' => $factor_a,
                'depre_kilometraje' => $factor_b,
                'depre_inspeccion' => $factor_c,
            ]
        );

        return Inertia::render('Registro/create/resultado', [
            'vehiculo' => $vehiculo,
            'inspeccion' => $inspeccion,
            'condicionGeneral' => $condicionGeneral,
            'imagenes' => $imagenes,
            'valorFinal' => $valorFinal,
            'factorReposicion' => $factorReposicion,
            'factorModelo' => $factor_a,
            'factorKilometraje' => $factor_b,
            'factorInspeccion' => $factor_c,
            'valorResidual' => $valorResidualVehiuculo,
            'marca' => $marca,
            'archivos' => $archivos,
        ]);
    }

    public function evaluar_inspeccion($id)
    {
         $inspeccion = Inspeccion::where('id_vehiculo', $id)->get();

        // dd($inspeccion);
        $data = $inspeccion->toArray();
        $suma = 0;
        foreach ($data as $item) {
            if($item['tiene'] == 1)
                $suma += $item['valoracion'];
        }
        $resultado = 1- $suma ;
        return $resultado ;
    }
    public function DepreciacionModelo($id ){
        
        $vehiculo = Vehiculo::where('id', $id)->first();
        $marca = MarcaVehiculo::where('id', $vehiculo->id_marca)->first();

        //dd($marca);
        $añoActual = now()->format('Y');
        $añoFabricacion = $vehiculo->año_fabricacion;

        $antiguedad = $añoActual - $añoFabricacion;

        $tasa_k = $marca->tasa_k;
        $valorResidual = $marca->valor_residual;

        

        $depreciacionModelo = max(1-($tasa_k * $antiguedad), $valorResidual);


        return  $depreciacionModelo;
    }
    public function DepreciacionKilometraje($id){
        $vehiculo = Vehiculo::where('id', $id)->first();
        $kilometraje = (int)$vehiculo->kilometraje;

        $depreciacionKilometraje = max(1-(0.000001*$kilometraje), 0.05);

        
        return $depreciacionKilometraje;
    }
    
  
}
