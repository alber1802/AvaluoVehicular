<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Mccarlosen\LaravelMpdf\Facades\LaravelMpdf;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Storage;

use App\Models\Vehiculo;
use App\Models\MarcaVehiculo;
use App\Models\Inspeccion;
use App\Models\Sistema;
use App\Models\CondicionGeneral;
use App\Models\VehiculoImagen;
use App\Models\Avaluo;
use App\Models\Archivo;

class ArchivoControler extends Controller
{
    use AuthorizesRequests;

    /**
     * Genera el PDF del reporte de avalúo
     */
    public function generarPdf($id)
    {
        // Buscar el vehículo y verificar autorización
        $vehiculo = Vehiculo::findOrFail($id);
        $this->authorize('view', $vehiculo);

        if(!VehiculoImagen::where('id_vehiculo', $id)->exists()){
            return back()->with('error','Faltan las imagenes del vehiculo para generar el reporte');
        }

        // Obtener todos los datos necesarios
        $marca = MarcaVehiculo::where('id', $vehiculo->id_marca)->firstOrFail();
        $condicionGeneral = CondicionGeneral::where('id_vehiculo', $id)->firstOrFail();
        $inspeccion = Inspeccion::where('id_vehiculo', $id)->where('tiene', 1)->get();
        $sistemas = Sistema::where('id_vehiculo', $id)->get();
        $imagenes = VehiculoImagen::where('id_vehiculo', $id)->get();
        $avaluo = Avaluo::where('id_vehiculo', $id)->first();

        // Si no existe avalúo, calcularlo
        if (!$avaluo) {
            // Calcular factores de depreciación
            $factorInspeccion = $this->calcularFactorInspeccion($id);
            $factorModelo = $this->calcularFactorModelo($vehiculo, $marca);
            $factorKilometraje = $this->calcularFactorKilometraje($vehiculo);
            $factorReposicion = 1.2;

            // Calcular valor final
            $valorCalculado = $vehiculo->precio_referencial * $factorInspeccion * $factorModelo * $factorKilometraje * $factorReposicion;
            $valorResidual = $vehiculo->precio_referencial * $marca->valor_residual;
            $valorFinal = max($valorCalculado, $valorResidual);
        } else {
            // Usar valores del avalúo existente
            $factorReposicion = $avaluo->factor_reposicion;
            $factorModelo = $avaluo->depre_modelo;
            $factorKilometraje = $avaluo->depre_kilometraje;
            $factorInspeccion = $avaluo->depre_inspeccion;
            $valorFinal = $avaluo->final_estimacion;
            $valorResidual = $vehiculo->precio_referencial * $marca->valor_residual;
        }

        // Preparar datos para la vista
        $data = [
            'vehiculo' => $vehiculo,
            'marca' => $marca,
            'condicionGeneral' => $condicionGeneral,
            'inspeccion' => $inspeccion,
            'sistemas' => $sistemas,
            'imagenes' => $imagenes,
            'factorReposicion' => $factorReposicion,
            'factorModelo' => $factorModelo,
            'factorKilometraje' => $factorKilometraje,
            'factorInspeccion' => $factorInspeccion,
            'valorFinal' => $valorFinal,
            'valorResidual' => $valorResidual,
        ];

        // Generar PDF
        $pdf = LaravelMpdf::loadHtml(view('pdf.avaluo', $data));
    
        // Nombre del archivo
        $nombreArchivo = 'Avaluo_' . ($vehiculo->placa ?? $vehiculo->id) . '_' . now()->format('Ymd_His') . '.pdf';
         $rutaPdf = 'pdfReportes/' . $nombreArchivo;

        $archivo = Archivo::where('id_vehiculo', $id)->first();
        if($archivo) {
            if($archivo->url != null) {
                Storage::disk('public')->delete($archivo->url);            
            }
            Storage::disk('public')->put($rutaPdf, $pdf->output());

            $archivo->update([
                'url' => $rutaPdf,
                'tipo_archivo' => 'pdf',
                'fecha' => now()->format('Y-m-d'),
                'updated_at' => now(),
            ]);

           
        }else {
            Storage::disk('public')->put($rutaPdf, $pdf->output());
             Archivo::create([
                 'id_vehiculo' => $id,
                 'url' => $rutaPdf,
                 'tipo_archivo' => 'pdf',
                 'fecha' => now()->format('Y-m-d'),
                 'created_at' => now(),
                 'updated_at' => now(),
             ]);   
        }
       
        return back()->with('success','Reporte generado exitosamente '.$nombreArchivo);
    }

    /**
     * Calcula el factor de depreciación por inspección
     */
    private function calcularFactorInspeccion($idVehiculo)
    {
        $inspeccion = Inspeccion::where('id_vehiculo', $idVehiculo)->get();
        $suma = 0;
        
        foreach ($inspeccion as $item) {
            if ($item->tiene == 1) {
                $suma += $item->valoracion;
            }
        }
        
        return 1 - $suma;
    }

    /**
     * Calcula el factor de depreciación por modelo (antigüedad)
     */
    private function calcularFactorModelo($vehiculo, $marca)
    {
        $añoActual = now()->year;
        $añoFabricacion = $vehiculo->año_fabricacion;
        $antiguedad = $añoActual - $añoFabricacion;
        
        $depreciacionModelo = max(1 - ($marca->tasa_k * $antiguedad), $marca->valor_residual);
        
        return $depreciacionModelo;
    }

    /**
     * Calcula el factor de depreciación por kilometraje
     */
    private function calcularFactorKilometraje($vehiculo)
    {
        $kilometraje = (int) $vehiculo->kilometraje;
        $depreciacionKilometraje = max(1 - (0.000001 * $kilometraje), 0.05);
        
        return $depreciacionKilometraje;
    }

//quitar esto despues 
    // public function vista($id){
    //     // Buscar el vehículo y verificar autorización
    //     $vehiculo = Vehiculo::findOrFail($id);
    //     $this->authorize('view', $vehiculo);

    //     // Obtener todos los datos necesarios
    //     $marca = MarcaVehiculo::where('id', $vehiculo->id_marca)->firstOrFail();
    //     $condicionGeneral = CondicionGeneral::where('id_vehiculo', $id)->firstOrFail();
    //     $inspeccion = Inspeccion::where('id_vehiculo', $id)->get();
    //     $sistemas = Sistema::where('id_vehiculo', $id)->get();
    //     $imagenes = VehiculoImagen::where('id_vehiculo', $id)->get();
    //     $avaluo = Avaluo::where('id_vehiculo', $id)->first();

    //     // Si no existe avalúo, calcularlo
    //     if (!$avaluo) {
    //         // Calcular factores de depreciación
    //         $factorInspeccion = $this->calcularFactorInspeccion($id);
    //         $factorModelo = $this->calcularFactorModelo($vehiculo, $marca);
    //         $factorKilometraje = $this->calcularFactorKilometraje($vehiculo);
    //         $factorReposicion = 1.2;

    //         // Calcular valor final
    //         $valorCalculado = $vehiculo->precio_referencial * $factorInspeccion * $factorModelo * $factorKilometraje * $factorReposicion;
    //         $valorResidual = $vehiculo->precio_referencial * $marca->valor_residual;
    //         $valorFinal = max($valorCalculado, $valorResidual);
    //     } else {
    //         // Usar valores del avalúo existente
    //         $factorReposicion = $avaluo->factor_reposicion;
    //         $factorModelo = $avaluo->depre_modelo;
    //         $factorKilometraje = $avaluo->depre_kilometraje;
    //         $factorInspeccion = $avaluo->depre_inspeccion;
    //         $valorFinal = $avaluo->final_estimacion;
    //         $valorResidual = $vehiculo->precio_referencial * $marca->valor_residual;
    //     }
        
    //     $pdf = LaravelMpdf::loadHtml(view('pdf.avaluo', compact('vehiculo','marca',
    //                             'condicionGeneral','inspeccion','sistemas','imagenes','factorReposicion',
    //                             'factorModelo','factorKilometraje','factorInspeccion','valorFinal',
    //                             'valorResidual')));

    //     //$pdf->setPaper('A4', 'portrait'); 
    //     // Otros formatos comunes: 'letter', 'legal', 'A3', 'A5', 'tabloid', etc. La orientación puede ser 'portrait' 
    //     // o 'landscape'.

    //     return $pdf->stream();

    //     // return view ('pdf.avaluo', compact('vehiculo','marca',
    //     //                         'condicionGeneral','inspeccion','sistemas','imagenes','factorReposicion',
    //     //                         'factorModelo','factorKilometraje','factorInspeccion','valorFinal',
    //     //                         'valorResidual'));
    // }
}
