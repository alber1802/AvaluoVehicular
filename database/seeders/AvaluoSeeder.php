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
            'tasa_k' => 0.04,
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
            'año_fabricacion' => 2020,
            'placa' => '681 - USE',
            'serie_motor' => 'M - VHSV - JDE',
            'chasis' => 'YH50V - 0017247',
            'color' => 'BLANCO',
            'procedencia' => 'Japon',
            'kilometraje' => '235977',
            'precio_referencial' => 8000.00,
            'id_evaluador' => 1, // Asumimos que existe un usuario con id=1
        ]);

        // 3. Insertar el avalúo
        Avaluo::create([
            'id_vehiculo' => $vehiculo->id,
            'factor_reposicion' => 1.2,
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
            // Motor
            ['nombre_sistema' => 'Motor', 'componente' => 'Motor', 'estado' => 'B', 'observaciones' => ''],
            ['nombre_sistema' => 'Motor', 'componente' => 'Presión compresión prom.', 'estado' => 'RR', 'observaciones' => 'No tiene aceite'],
            ['nombre_sistema' => 'Motor', 'componente' => 'Aceite y filtro de aceite', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Motor', 'componente' => 'Turboalimentador', 'estado' => 'NO', 'observaciones' => ''],
            
            // Refrigeración
            ['nombre_sistema' => 'Refrigeración', 'componente' => 'Mangueras de radiador', 'estado' => 'B', 'observaciones' => ''],
            ['nombre_sistema' => 'Refrigeración', 'componente' => 'Correas de ventilador', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Refrigeración', 'componente' => 'Ventilador y tapa radiador', 'estado' => 'RC', 'observaciones' => ''],
            
            // Eléctrico
            ['nombre_sistema' => 'Eléctrico', 'componente' => 'Batería', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Eléctrico', 'componente' => 'Motor de arranque', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Eléctrico', 'componente' => 'Alternador', 'estado' => 'RC', 'observaciones' => 'Adaptado'],
            ['nombre_sistema' => 'Eléctrico', 'componente' => 'Caja de fusibles', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Eléctrico', 'componente' => 'Tablero de instrumentos', 'estado' => 'R', 'observaciones' => 'Velocimetro alterado'],
            
            // Direccionamiento
            ['nombre_sistema' => 'Direccionamiento', 'componente' => 'Hidraulica', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Direccionamiento', 'componente' => 'Electrica', 'estado' => 'NO', 'observaciones' => ''],
            ['nombre_sistema' => 'Direccionamiento', 'componente' => 'Mecanica', 'estado' => 'SI', 'observaciones' => ''],
            ['nombre_sistema' => 'Direccionamiento', 'componente' => 'Muñones de dirección', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Direccionamiento', 'componente' => 'Fugas de aceite', 'estado' => 'NO', 'observaciones' => ''],
            
            // Suspensión
            ['nombre_sistema' => 'Suspensión', 'componente' => 'Amortiguadores', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Suspensión', 'componente' => 'Muñones de suspensión', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Suspensión', 'componente' => 'Espiral y/o muelles tras.', 'estado' => 'RR', 'observaciones' => 'Tijera/ requiere cambio de buje'],
            
            // Transmisión
            ['nombre_sistema' => 'Transmisión', 'componente' => 'Mecanica', 'estado' => 'SI', 'observaciones' => ''],
            ['nombre_sistema' => 'Transmisión', 'componente' => 'Automatica', 'estado' => 'NO', 'observaciones' => ''],
            ['nombre_sistema' => 'Transmisión', 'componente' => 'Secuencial', 'estado' => 'NO', 'observaciones' => ''],
            ['nombre_sistema' => 'Transmisión', 'componente' => 'Aceite', 'estado' => 'RC', 'observaciones' => ''],
            
            // Frenos
            ['nombre_sistema' => 'Frenos', 'componente' => 'Disco posterior', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Discos delanteros', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Balatas traseras', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Frenos', 'componente' => 'Freno de mano', 'estado' => 'RR', 'observaciones' => ''],
            
            // Chasis
            ['nombre_sistema' => 'Chasis', 'componente' => 'Compacto', 'estado' => 'NO', 'observaciones' => ''],
            ['nombre_sistema' => 'Chasis', 'componente' => 'Bastidor', 'estado' => 'R', 'observaciones' => ''],
            
            // Carrocería
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Faroles delanteros', 'estado' => 'RR', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Guiñadores', 'estado' => 'R', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Bocina', 'estado' => 'B', 'observaciones' => ''],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Luces de parada (stop)', 'estado' => 'RR', 'observaciones' => 'No funciona'],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Luz de retro', 'estado' => 'RR', 'observaciones' => ''],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Alarma de retroceso', 'estado' => 'RR', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Cinturones de seguridad', 'estado' => 'RR', 'observaciones' => 'No tiene'],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Espejos retrovisores later.', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Luces de emergencia', 'estado' => 'B', 'observaciones' => ''],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Limpia parabrisas', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Tapicería interior', 'estado' => 'R', 'observaciones' => ''],
            ['nombre_sistema' => 'Carrocería', 'componente' => 'Parabrisas y vidrios lat.', 'estado' => 'R', 'observaciones' => ''],
            
            // Aire acondicionado y otros
            ['nombre_sistema' => 'Aire acondicionado y otros', 'componente' => 'Aire acondicionado', 'estado' => 'NO', 'observaciones' => ''],
            ['nombre_sistema' => 'Aire acondicionado y otros', 'componente' => 'Calefacción', 'estado' => 'R', 'observaciones' => 'Requiere revisión'],
            ['nombre_sistema' => 'Aire acondicionado y otros', 'componente' => 'Radio', 'estado' => 'B', 'observaciones' => ''],
            ['nombre_sistema' => 'Aire acondicionado y otros', 'componente' => 'Llantas', 'estado' => 'RC', 'observaciones' => ''],
            ['nombre_sistema' => 'Aire acondicionado y otros', 'componente' => 'Llanta de repuesto', 'estado' => 'R', 'observaciones' => 'No tiene'],
            
            // Herramientas
            ['nombre_sistema' => 'Herramientas', 'componente' => 'Llave de ruedas y barrote', 'estado' => 'NO', 'observaciones' => ''],
            ['nombre_sistema' => 'Herramientas', 'componente' => 'Gato hidráulico', 'estado' => 'NO', 'observaciones' => ''],
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

        // // 7. Insertar los 'accesorios'
        // $accesorios = [
        //     ['nombre_accesorio' => 'Aire acondicionado', 'tiene' => false, 'observacion' => ''],
        //     ['nombre_accesorio' => 'Calefacción', 'tiene' => false, 'observacion' => 'Requiere revisión'],
        //     ['nombre_accesorio' => 'Herramientas Mtto.', 'tiene' => false, 'observacion' => ''],
        //     ['nombre_accesorio' => 'Llave de ruedas y barrote', 'tiene' => false, 'observacion' => ''],
        //     ['nombre_accesorio' => 'Gata/triangulo', 'tiene' => false, 'observacion' => ''],
        // ];

        // foreach ($accesorios as $accesorio) {
        //     Accesorio::create([
        //         'id_vehiculo' => $vehiculo->id,
        //         'nombre_accesorio' => $accesorio['nombre_accesorio'],
        //         'tiene' => $accesorio['tiene'],
        //         'observacion' => $accesorio['observacion'],
        //     ]);
        // }

        // 8. Insertar todos los factores de depreciación en la tabla 'inspeccion'
        $inspecciones = [
            // Motor Encendido
            ['nombre' => 'Motor Encendido', 'caracteristica' => 'Falla de encendido inicial', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Motor Encendido', 'caracteristica' => 'Mala partida', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Motor Encendido', 'caracteristica' => 'Demora partida', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Motor Encendido', 'caracteristica' => 'El motor se detiene al encender', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Motor Encendido', 'caracteristica' => 'Se suelta el acelerador', 'tiene' => false, 'valoracion' => 0.0250],
            
            // Motor Conducción
            ['nombre' => 'Motor Conducción', 'caracteristica' => 'Falla al acelerar', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Motor Conducción', 'caracteristica' => 'Encendido adelantado/atrasado', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Motor Conducción', 'caracteristica' => 'Pérdida de potencia', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Motor Conducción', 'caracteristica' => 'Humo negro', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Motor Conducción', 'caracteristica' => 'Embrague defectuoso', 'tiene' => false, 'valoracion' => 0.0200],
            
            // Marcha en Vacío
            ['nombre' => 'Marcha en Vacío', 'caracteristica' => 'Marcha en vacío anormal', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Marcha en Vacío', 'caracteristica' => 'Marcha en vacío inestable', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Marcha en Vacío', 'caracteristica' => 'Oscilaciónes', 'tiene' => false, 'valoracion' => 0.0200],
            
            // Indicador CHECK ENGINE en el tablero
            ['nombre' => 'Indicador CHECK ENGINE en el tablero', 'caracteristica' => 'No se enciende', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Indicador CHECK ENGINE en el tablero', 'caracteristica' => 'Siempre encendida', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Indicador CHECK ENGINE en el tablero', 'caracteristica' => 'Ocasionalmente encendida', 'tiene' => false, 'valoracion' => 0.0200],
            
            // Transmisión
            ['nombre' => 'Transmisión', 'caracteristica' => 'Patina el embrague', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Pedal de embrague atascado', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Vibración al partir', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'No entra los cambios', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Se suelta la marcha', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Sonidos en los cambios', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Sonido en el diferencial', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Fugas de aceite', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Transmisión', 'caracteristica' => 'Sonidos en las ruedas al curvar', 'tiene' => false, 'valoracion' => 0.0150],
            
            // Frenos
            ['nombre' => 'Frenos', 'caracteristica' => 'Sonidos al frenar', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Frenos', 'caracteristica' => 'Frenos defectuosos', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Frenos', 'caracteristica' => 'No funciona freno de mano', 'tiene' => false, 'valoracion' => 0.0250],
            ['nombre' => 'Frenos', 'caracteristica' => 'Fuga de líquido', 'tiene' => false, 'valoracion' => 0.0250],
            
            // Suspensión y Carrocería
            ['nombre' => 'Suspensión y Carrocería', 'caracteristica' => 'Sonidos o golpeteo', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Suspensión y Carrocería', 'caracteristica' => 'Rebotes', 'tiene' => false, 'valoracion' => 0.0200],
            ['nombre' => 'Suspensión y Carrocería', 'caracteristica' => 'Suspensión floja', 'tiene' => false, 'valoracion' => 0.0200],
            
            // Dirección
            ['nombre' => 'Dirección', 'caracteristica' => 'Tiende a ir al lado', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'Dirección', 'caracteristica' => 'Suena al curvar', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'Dirección', 'caracteristica' => 'No responde efectivamente', 'tiene' => false, 'valoracion' => 0.0225],
            ['nombre' => 'Dirección', 'caracteristica' => 'Mala distribución', 'tiene' => false, 'valoracion' => 0.0225],
            
            // Electricidad
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan luces delanteras', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan luces direccionales', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan luces de freno', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan luces de retro', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan luces de salón', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan luces de tablero', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan instrumentos del tablero', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Descarga de batería', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Falla bocina', 'tiene' => false, 'valoracion' => 0.0100],
            ['nombre' => 'Electricidad', 'caracteristica' => 'Fallan limpiaparabrisas', 'tiene' => false, 'valoracion' => 0.0100],
            
            // Apariencia Interior y Exterior
            ['nombre' => 'Apariencia Interior y Exterior', 'caracteristica' => 'Tablero', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Apariencia Interior y Exterior', 'caracteristica' => 'Motor', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Apariencia Interior y Exterior', 'caracteristica' => 'Caja de cambios', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Apariencia Interior y Exterior', 'caracteristica' => 'Diferencial', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Apariencia Interior y Exterior', 'caracteristica' => 'Engrasado', 'tiene' => false, 'valoracion' => 0.0150],
            ['nombre' => 'Apariencia Interior y Exterior', 'caracteristica' => 'Lavado', 'tiene' => false, 'valoracion' => 0.0150],
            
            // Accesorios Adicionales
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Llave de ruedas', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Retrovisores', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Alarma de emergencia', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Espejos', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Antena', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Perillas radio', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Tapa de gasolina', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Gata', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Rayones', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Radio', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Encendedor', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Tapacubos', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Extintor', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Herramientas', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Abolladuras', 'tiene' => false, 'valoracion' => 0.0050],
            ['nombre' => 'Accesorios Adicionales', 'caracteristica' => 'Parabrisas', 'tiene' => false, 'valoracion' => 0.0050],
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
