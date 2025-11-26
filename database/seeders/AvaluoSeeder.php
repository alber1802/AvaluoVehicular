<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\MarcaVehiculo;
use App\Models\Vehiculo;
use App\Models\Avaluo;
use App\Models\CondicionGeneral;
use App\Models\Sistema;
use App\Models\Accesorio;
use App\Models\Inspeccion;

class AvaluoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Crear marca de vehículo Toyota
        $marcaToyota = MarcaVehiculo::create([
            'nombre' => 'Toyota',
            'tasa_k' => 0.05,
            'valor_residual' => 0.10,
        ]);

        // 2. Insertar los datos principales del vehículo
        $vehiculo = Vehiculo::create([
            'entidad' => 'DIRCABI',
            'fecha_evaluacion' => '2016-09-10',
            'ubicacion_actual' => 'Barrio Mejillones N° 55',
            'tipo_vehiculo' => 'Vagoneta',
            'tipo_combustible' => 'Gasolina',
            'id_marca' => $marcaToyota->id,
            'modelo' => 'Hiace',
            'año_fabricacion' => 1984,
            'placa' => '681 - USE',
            'serie_motor' => 'M - VHSV - JDE',
            'chasis' => 'YH50V - 0017247',
            'color' => 'BLANCO',
            'procedencia' => 'Japon',
            'kilometraje' => 'ALTERADO',
            'precio_referencial' => 8000.00,
            'id_evaluador' => 1, // Asumimos que existe un usuario con id=1
        ]);

        // 3. Insertar el avalúo
        Avaluo::create([
            'id_vehiculo' => $vehiculo->id,
            'factor_reposicion' => 8000.00,
            'final_estimacion' => 8000.00,
            'moneda' => '$us',
            'depre_modelo' => 0.15,
            'depre_kilometraje' => 0.10,
            'depre_inspeccion' => 0.20,
        ]);

        // 4. Insertar la condición general
        CondicionGeneral::create([
            'id_vehiculo' => $vehiculo->id,
            'estado_operativo' => 'Operable',
            'estado_general' => 'Bueno',
        ]);

        // 5. Insertar el detalle de la inspección de 'Fugas de aceite'
        Inspeccion::create([
            'id_vehiculo' => $vehiculo->id,
            'nombre' => 'Fugas de aceite',
            'caracteristica' => 'Motor',
            'tiene' => true,
            'valoracion' => null,
            'observaciones' => null,
        ]);

        // 6. Insertar todos los componentes de 'sistemas'
        $sistemas = [
            ['nombre_sistema' => 'Motor', 'componente' => 'Presión compresión prom.', 'estado' => 'RR', 'observaciones' => 'No tiene aceite'],
            ['nombre_sistema' => 'Motor', 'componente' => 'CORREA ALIMENTADOR', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Refrigeracion', 'componente' => 'Radiador', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Refrigeracion', 'componente' => 'Mangueras de radiador', 'estado' => 'B', 'observaciones' => ''],
            ['nombre_sistema' => 'Refrigeracion', 'componente' => 'Correas de ventilador', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Refrigeracion', 'componente' => 'Bomba de agua-tapa radiador', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Electrico', 'componente' => 'Bateria', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Electrico', 'componente' => 'Motor de arranque', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Electrico', 'componente' => 'Alternador', 'estado' => 'RC', 'observaciones' => 'Adaptado'],
            ['nombre_sistema' => 'Electrico', 'componente' => 'Caja de fusibles', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Electrico', 'componente' => 'Tablero de instrumentos', 'estado' => 'R', 'observaciones' => 'Velocimetro alterado'],
            ['nombre_sistema' => 'Direccion', 'componente' => 'Cremallera', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Direccion', 'componente' => 'Bomba de aceite', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Suspension', 'componente' => 'Amortiguadores', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Suspension', 'componente' => 'Muelles/ ballestas', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Suspension', 'componente' => 'Espir./rotulas/muñes. tras.', 'estado' => 'RR', 'observaciones' => 'Tijera/ requiere cambio de buje'],
            ['nombre_sistema' => 'Transmision', 'componente' => 'Caja', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Transmision', 'componente' => 'Aceite', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Bomba', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Discos/delantero', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Balatas/delantera', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Tambores/posterior', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Balatas/posterior', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Freno de mano', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Chasis', 'componente' => 'Bastidor', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Pintura', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Parachoque/delantero', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Guiñadores', 'estado' => 'R', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Stop', 'estado' => 'RR', 'observaciones' => 'No funciona'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Luces de parada (stop)', 'estado' => 'RR', 'observaciones' => 'No funciona'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Faroles del.', 'estado' => 'RR', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Alarma de retroceso', 'estado' => 'RR', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Cinturones de seguridad', 'estado' => 'RR', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Espejos retrovisores later.', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Chapa de puerta', 'estado' => 'R', 'observaciones' => 'No funciona'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Limpia parabrisas', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Vidrios (laterales)', 'estado' => 'RC', 'observaciones' => 'Vidrio lateral derecho delantero dañado'],
            ['nombre_sistema' => 'Carroceria', 'componente' => 'Parabrisas y vidrios lat.', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Llantas', 'componente' => 'Llantas', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Llantas', 'componente' => 'Llanta de repuesto', 'estado' => 'R', 'observaciones' => 'No tiene'],
        ];

        foreach ($sistemas as $sistema) {
            Sistema::create([
                'id_vehiculo' => $vehiculo->id,
                'nombre_sistema' => $sistema['nombre_sistema'],
                'componente' => $sistema['componente'],
                'estado' => $sistema['estado'],
                'observaciones' => $sistema['observaciones'],
            ]);
        }

        // 7. Insertar los 'accesorios'
        $accesorios = [
            ['nombre_accesorio' => 'Aire acondicionado', 'tiene' => false, 'observacion' => ''],
            ['nombre_accesorio' => 'Calefacción', 'tiene' => false, 'observacion' => 'Requiere revisión'],
            ['nombre_accesorio' => 'Herramientas Mtto.', 'tiene' => false, 'observacion' => ''],
            ['nombre_accesorio' => 'Llave de ruedas y barrote', 'tiene' => false, 'observacion' => ''],
            ['nombre_accesorio' => 'Gata/triangulo', 'tiene' => false, 'observacion' => ''],
        ];

        foreach ($accesorios as $accesorio) {
            Accesorio::create([
                'id_vehiculo' => $vehiculo->id,
                'nombre_accesorio' => $accesorio['nombre_accesorio'],
                'tiene' => $accesorio['tiene'],
                'observacion' => $accesorio['observacion'],
            ]);
        }

        // 8. Insertar todos los factores de depreciación en la tabla 'inspeccion'
        $inspecciones = [
            ['nombre' => 'MOTOR ENCENDIDO', 'caracteristica' => 'Falla de encendido inicial', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'MOTOR ENCENDIDO', 'caracteristica' => 'Bujía partida', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'MOTOR ENCENDIDO', 'caracteristica' => 'Bobina partida', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'MOTOR ENCENDIDO', 'caracteristica' => 'Se suelta el acelerador', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'MOTOR ENCENDIDO', 'caracteristica' => 'Falla de aceleración', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'MOTOR CONDUCCION', 'caracteristica' => 'Encendido adelantado/atrasado', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'MOTOR CONDUCCION', 'caracteristica' => 'Pérdida de potencia', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'MOTOR CONDUCCION', 'caracteristica' => 'Humo negro', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'MARCHA EN VACIO', 'caracteristica' => 'Embrague defectuoso', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'MARCHA EN VACIO', 'caracteristica' => 'Marcha en vacío anormal', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'MARCHA EN VACIO', 'caracteristica' => 'Marcha en vacío inestable', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'MARCHA EN VACIO', 'caracteristica' => 'Oscilaciones', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'Indicador CHECK ENGINE en el tablero', 'caracteristica' => 'Siempre encendida', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'Indicador CHECK ENGINE en el tablero', 'caracteristica' => 'Ocasionalmente encendida', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'Indicador CHECK ENGINE en el tablero', 'caracteristica' => 'Apagada', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Patina el embrague', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Pedal de embrague atascado', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Vibración al partir', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'No entra los cambios', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Se suelta la marcha', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Sonidos en los cambios', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Sonidos en el diferencial', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Sonidos en las ruedas al curvar', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'TRANSMISIÓN', 'caracteristica' => 'Fugas de aceite', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'FRENOS', 'caracteristica' => 'Sonidos al frenar', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'FRENOS', 'caracteristica' => 'Frenos defectuosos', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'FRENOS', 'caracteristica' => 'No funciona freno de mano', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'FRENOS', 'caracteristica' => 'Fugas de líquido', 'tiene' => false, 'valoracion' => 0.025],
            ['nombre' => 'SUSPENSIÓN Y CARROCERIA', 'caracteristica' => 'Sonidos o golpeteo', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'SUSPENSIÓN Y CARROCERIA', 'caracteristica' => 'Rebotes', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'SUSPENSIÓN Y CARROCERIA', 'caracteristica' => 'Suspensión floja', 'tiene' => false, 'valoracion' => 0.02],
            ['nombre' => 'SUSPENSIÓN Y CARROCERIA', 'caracteristica' => 'Tiende a ir al lado', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'DIRECCIÓN', 'caracteristica' => 'Duro al curvar', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'DIRECCIÓN', 'caracteristica' => 'No responde efectivamente', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'DIRECCIÓN', 'caracteristica' => 'Mala distribución', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'DIRECCIÓN', 'caracteristica' => 'Fugas de aceite', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Fallan luces delanteras', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Fallan luces direccionales', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Fallan luces de freno', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Fallan luces de retro', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Fallan luces de salón', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Fallan luces de tablero', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Falla instrumentos del tablero', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Descarga de batería', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Falla bocina', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'ELECTRICIDAD', 'caracteristica' => 'Falla limpiaparabrisas', 'tiene' => false, 'valoracion' => 0.01],
            ['nombre' => 'APARIENCIA INTERIOR EXTERIOR', 'caracteristica' => 'Tablero', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'APARIENCIA INTERIOR EXTERIOR', 'caracteristica' => 'Motor', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'APARIENCIA INTERIOR EXTERIOR', 'caracteristica' => 'Caja de cambios', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'APARIENCIA INTERIOR EXTERIOR', 'caracteristica' => 'Diferencial', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'APARIENCIA INTERIOR EXTERIOR', 'caracteristica' => 'Engrasado', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'APARIENCIA INTERIOR EXTERIOR', 'caracteristica' => 'Lavado', 'tiene' => false, 'valoracion' => 0.015],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Llave de ruedas', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Retrovisores', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Llanta de emergencia', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Espejos', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Antena', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Equipo radio', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Tapa de gasolina', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Gata', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Cinturones', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Radio', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Encendedor', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Ceniceros', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Extintor', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Herramientas', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Tapa cubos', 'tiene' => false, 'valoracion' => 0.005],
            ['nombre' => 'ACCESORIOS Y ADICIONALES', 'caracteristica' => 'Parabrisas', 'tiene' => false, 'valoracion' => 0.005],
        ];

        foreach ($inspecciones as $inspeccion) {
            Inspeccion::create([
                'id_vehiculo' => $vehiculo->id,
                'nombre' => $inspeccion['nombre'],
                'caracteristica' => $inspeccion['caracteristica'],
                'tiene' => $inspeccion['tiene'],
                'valoracion' => $inspeccion['valoracion'],
                'observaciones' => null,
            ]);
        }
    }
}
