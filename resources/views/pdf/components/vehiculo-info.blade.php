<div class="a4-page">
    <div class="section-header">
        Ficha de Evaluación Técnica Vehicular
    </div>

    <!-- DATOS GENERALES -->
    <table class="tech-table">
        <tr>
            <td class="label-cell">ENTIDAD</td>
            <td colspan="3" style="font-weight: bold; text-align: center;">{{ strtoupper($vehiculo->entidad) }}</td>
        </tr>
        <tr>
            <td class="label-cell">FECHA</td>
            <td>{{ \Carbon\Carbon::parse($vehiculo->fecha_evaluacion)->format('d/m/Y') }}</td>
            <td class="label-cell">UBICACIÓN</td>
            <td>{{ $vehiculo->ubicacion_actual }}</td>
        </tr>
    </table>

    <!-- INFORMACIÓN DEL VEHÍCULO -->
    <table class="tech-table">
        <tr class="header-row">
            <td colspan="4">DATOS GENERALES</td>
        </tr>
        <tr>
            <td class="label-cell">MARCA</td>
            <td>{{ $marca->nombre }}</td>
            <td class="label-cell">AÑO</td>
            <td>{{ $vehiculo->año_fabricacion }}</td>
        </tr>
        <tr>
            <td class="label-cell">MODELO</td>
            <td>{{ $vehiculo->modelo }}</td>
            <td class="label-cell">PLACA</td>
            <td>{{ $vehiculo->placa ?? 'N/A' }}</td>
        </tr>
        <tr>
            <td class="label-cell">CHASIS</td>
            <td>{{ $vehiculo->chasis ?? 'N/A' }}</td>
            <td class="label-cell">KILOMETRAJE</td>
            <td>{{ number_format($vehiculo->kilometraje) }} Km</td>
        </tr>
        <tr>
            <td class="label-cell">SERIE MOTOR</td>
            <td>{{ $vehiculo->serie_motor ?? 'N/A' }}</td>
            <td class="label-cell">COLOR</td>
            <td>{{ ucfirst($vehiculo->color) }}</td>
        </tr>
        <tr>
            <td class="label-cell">TIPO VEHÍCULO</td>
            <td>{{ ucfirst($vehiculo->tipo_vehiculo) }}</td>
            <td class="label-cell">COMBUSTIBLE</td>
            <td>{{ ucfirst($vehiculo->tipo_combustible) }}</td>
        </tr>
        <tr>
            <td class="label-cell">PROCEDENCIA</td>
            <td>{{ ucfirst($vehiculo->procedencia) }}</td>
            <td class="label-cell">PRECIO REF.</td>
            <td>${{ number_format($vehiculo->precio_referencial, 2) }}</td>
        </tr>
    </table>

    <!-- CONDICIÓN GENERAL -->
    <table class="tech-table">
        <tr class="header-row">
            <td colspan="4">CONDICIÓN GENERAL</td>
        </tr>
        <tr>
            <td class="label-cell">ESTADO GENERAL</td>
            <td>
                @if($condicionGeneral->estado_general === 'Excelente')
                    <span class=""></span> Excelente
            
                @endif
                &nbsp;&nbsp;
                @if($condicionGeneral->estado_general === 'Bueno')
                    <span class=""></span> Bueno
            
                @endif
                &nbsp;&nbsp;
                @if($condicionGeneral->estado_general === 'Regular')
                    <span class=""></span> Regular
           
                @endif
                &nbsp;&nbsp;
                @if($condicionGeneral->estado_general === 'Malo')
                    <span class=""></span> Malo
                
                @endif
            </td>
            <td class="label-cell">ESTADO OPERATIVO</td>
            <td>{{ str_replace(',', ', ', ucwords($condicionGeneral->estado_operativo)) }}</td>
        </tr>
        @if($condicionGeneral->observaciones)
        <tr>
            <td class="label-cell">OBSERVACIONES</td>
            <td colspan="3">{{ $condicionGeneral->observaciones }}</td>
        </tr>
        @endif
    </table>

  
</div>
