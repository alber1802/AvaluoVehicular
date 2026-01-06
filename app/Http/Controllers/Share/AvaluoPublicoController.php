<?php

namespace App\Http\Controllers\Share;

use App\Http\Controllers\Controller;

use App\Models\Avaluo;
use App\Models\AvaluoCompartido;    
use App\Models\Vehiculo;
use App\Models\MarcaVehiculo;
use App\Models\Inspeccion;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AvaluoPublicoController extends Controller
{
   
    public function verPublico(string $token)
    {
        $compartido = AvaluoCompartido::where('token', $token)->first();

        if (!$compartido) {
            abort(404, 'Avalúo no encontrado o enlace inválido');
        }

        if (!in_array($compartido->estado, ['activo', 'renovado'])) {
            abort(403, 'Este enlace ya no está disponible');
        }
        if ($compartido->fecha_fin && $compartido->fecha_fin->isPast()) {

            if($compartido->estado === 'activo' || $compartido->estado === 'renovado')
            {
                $compartido->update(['estado' => 'vencido']);
            }
            abort(403, 'Este enlace ha expirado');
        }

        $compartido->increment('contador_vistas');

        $avaluo = Avaluo::with([
            'vehiculo.marca',
            'vehiculo.imagenes',
            'vehiculo.condicionGeneral',
            'vehiculo.inspecciones',
            'vehiculo.archivos'
        ])->findOrFail($compartido->avaluo_id);

        $vehiculo = $avaluo->vehiculo;

        $factor_c = $this->evaluar_inspeccion($vehiculo->id );
        $factor_a = $this->DepreciacionModelo($vehiculo->id);
        $factor_b = $this->DepreciacionKilometraje($vehiculo->id);

        $p = $vehiculo->precio_referencial;

        $factorReposicion = 1.2;

        $valorAvaluo = $p * $factor_c * $factor_a * $factor_b * $factorReposicion;

        $valorResidualVehiuculo = $vehiculo->precio_referencial * 0.107;

        $valorFinal = max($valorAvaluo, $valorResidualVehiuculo);

        return Inertia::render('Compartido/VistoPublicoAvaluo/AvaluoPublic', [
            'vehiculo' => $vehiculo,
            'condicionGeneral' => $vehiculo->condicionGeneral,
            'inspeccion' => $vehiculo->inspecciones,
            'imagenes' => $vehiculo->imagenes,
            'archivos' => $avaluo->archivo,
            'marca' => $vehiculo->marca,
            'valorFinal' => $valorFinal,
            'factorReposicion' => $factorReposicion,
            'factorModelo' => $factor_a,
            'factorKilometraje' => $factor_b,
            'factorInspeccion' => $factor_c,
            'valorResidual' => $valorResidualVehiuculo,
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
