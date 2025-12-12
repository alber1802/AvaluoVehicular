@php
    // Agrupar sistemas por nombre_sistema
    $sistemasAgrupados = collect($sistemas)->groupBy('nombre_sistema');
    $totalItems = count($sistemas);
    $itemsPorPagina = 70; // Ajustable según necesidad
    $paginaActual = 0;
    $itemsEnPagina = 0;
@endphp

@foreach($sistemasAgrupados as $nombreSistema => $componentes)
    @foreach($componentes as $index => $item)
        @if($itemsEnPagina == 0)
            @if($paginaActual > 0)
                </tbody>
            </table>
            <div class="note-box">
                <strong>LEYENDA:</strong> B = Bueno, R = Regular, RC = Requiere Cambio, RR = Requiere Reparación, SI/NO = Disponibilidad
            </div>
        </div>
        <div class="page-break"></div>
            @endif
            
            <div class="a4-page">
                <div class="section-header">
                    Evaluación de Sistemas Mecánicos {{ $paginaActual > 0 ? '(continuación)' : '' }}
                </div>

                <table class="tech-table" style="font-size: 9pt;">
                    <thead>
                        <tr>
                            <th style="width: 25%;">SISTEMA</th>
                            <th style="width: 35%;">COMPONENTE</th>
                            <th style="width: 15%;">ESTADO</th>
                            <th style="width: 25%;">OBSERVACIONES</th>
                        </tr>
                    </thead>
                    <tbody>
            @php
                $paginaActual++;
            @endphp
        @endif

        <tr>
            @if($index === 0)
                <td rowspan="{{ count($componentes) }}" style="font-weight: bold; background: #f8fafc; vertical-align: top;">
                    {{ strtoupper($nombreSistema) }}
                </td>
            @endif
            <td>{{ ucfirst($item->componente) }}</td>
            <td>{{ $item->estado }}</td>
            <td style="font-size: 8pt; color: #64748b;">
                {{ $item->observaciones ?? '-' }}
            </td>
        </tr>

        @php
            $itemsEnPagina++;
            if($itemsEnPagina >= $itemsPorPagina) {
                $itemsEnPagina = 0;
            }
        @endphp
    @endforeach
@endforeach

@if($itemsEnPagina > 0)
    </tbody>
</table>

<!-- RESUMEN (solo en la última página) -->
@php
    $estadosConteo = [
        'B' => 0,
        'R' => 0,
        'RC' => 0,
        'RR' => 0,
        'SI' => 0,
        'NO' => 0,
    ];
    foreach($sistemas as $item) {
        if(isset($estadosConteo[$item->estado])) {
            $estadosConteo[$item->estado]++;
        }
    }
    $itemsConProblema = $estadosConteo['RC'] + $estadosConteo['RR'];
    $itemsBuenos = $estadosConteo['B'] + $estadosConteo['SI'];
@endphp

<div style="background: #f8fafc; padding: 15px; border: 1px solid #cbd5e1; margin-top: 20px;">
    <table style="width: 100%; font-size: 10pt;">
        <tr>
            <td style="width: 25%; text-align: center;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">Total Componentes</div>
                <div style="font-size: 16pt; font-weight: bold; color: #1e3a8a;">{{ $totalItems }}</div>
            </td>
            <td style="width: 25%; text-align: center; border-left: 1px solid #cbd5e1;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">En Buen Estado</div>
                <div style="font-size: 16pt; font-weight: bold; color: #16a34a;">{{ $itemsBuenos }}</div>
            </td>
            <td style="width: 25%; text-align: center; border-left: 1px solid #cbd5e1;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">Regulares</div>
                <div style="font-size: 16pt; font-weight: bold; color: #ca8a04;">{{ $estadosConteo['R'] }}</div>
            </td>
            <td style="width: 25%; text-align: center; border-left: 1px solid #cbd5e1;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">Req. Atención</div>
                <div style="font-size: 16pt; font-weight: bold; color: #dc2626;">{{ $itemsConProblema }}</div>
            </td>
        </tr>
    </table>
</div>

<div class="note-box">
    <strong>LEYENDA:</strong> B = Bueno, R = Regular, RC = Requiere Cambio, RR = Requiere Reparación, SI/NO = Disponibilidad
</div>
</div>

<div class="page-break"></div>
@endif
