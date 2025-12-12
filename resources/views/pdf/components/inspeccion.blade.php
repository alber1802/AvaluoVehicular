@php
    // Agrupar inspecciones por nombre
    $inspeccionesAgrupadas = collect($inspeccion)->groupBy('nombre');
    $totalItems = count($inspeccion);
    $itemsPorPagina = 50; // Ajustable según necesidad
    $paginaActual = 0;
    $itemsEnPagina = 0;
@endphp

@foreach($inspeccionesAgrupadas as $nombreComponente => $caracteristicas)
    @foreach($caracteristicas as $index => $item)
        @if($itemsEnPagina == 0)
            @if($paginaActual > 0)
                </tbody>
            </table>
            <div class="note-box">
                <strong>LEYENDA:</strong> CP = Con Problema, OK = Normal/Sin Problema
            </div>
        </div>
        <div class="page-break"></div>
            @endif
            
            <div class="a4-page">
                <div class="section-header">
                    Evaluación de Inspección Visual {{ $paginaActual > 0 ? '(continuación)' : '' }}
                </div>

                <table class="tech-table" style="font-size: 9pt;">
                    <thead>
                        <tr>
                            <th style="width: 25%;">COMPONENTE</th>
                            <th style="width: 30%;">CARACTERÍSTICA</th>
                            <th style="width: 15%;">ESTADO</th>
                            <th style="width: 15%;">DEPRECIACIÓN</th>
                            <th style="width: 15%;">OBSERVACIONES</th>
                        </tr>
                    </thead>
                    <tbody>
            @php
                $paginaActual++;
            @endphp
        @endif

        <tr>
            @if($index === 0)
                <td rowspan="{{ count($caracteristicas) }}" style="font-weight: bold; background: #f8fafc; vertical-align: top;">
                    {{ strtoupper($nombreComponente) }}
                </td>
            @endif
            <td>{{ ucfirst($item->caracteristica) }}</td>
            <td style="text-align: center;">
                @if($item->tiene == 1)
                    <span class="check-box checked"></span> CP
                @else
                    <span class="check-box"></span> OK
                @endif
            </td>
            <td style="text-align: center;">
                @if($item->tiene == 1)
                    {{ number_format($item->valoracion * 100, 2) }}%
                @else
                    0.00%
                @endif
            </td>
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
    $totalDepreciacion = 0;
    $itemsConProblema = 0;
    foreach($inspeccion as $item) {
        if($item->tiene == 1) {
            $itemsConProblema++;
            $totalDepreciacion += $item->valoracion;
        }
    }
@endphp

<div style="background: #f8fafc; padding: 15px; border: 1px solid #cbd5e1; margin-top: 20px;">
    <table style="width: 100%; font-size: 10pt;">
        <tr>
            <td style="width: 33%; text-align: center;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">Total Items</div>
                <div style="font-size: 16pt; font-weight: bold; color: #1e3a8a;">{{ $totalItems }}</div>
            </td>
            <td style="width: 33%; text-align: center; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">Con Problema</div>
                <div style="font-size: 16pt; font-weight: bold; color: #dc2626;">{{ $itemsConProblema }}</div>
            </td>
            <td style="width: 33%; text-align: center;">
                <div style="font-weight: bold; color: #64748b; font-size: 9pt;">Depreciación Total</div>
                <div style="font-size: 16pt; font-weight: bold; color: #ea580c;">{{ number_format($totalDepreciacion * 100, 2) }}%</div>
            </td>
        </tr>
    </table>
</div>

<div class="note-box">
    <strong>LEYENDA:</strong> CP = Con Problema, OK = Normal/Sin Problema
</div>
</div>

<div class="page-break"></div>
@endif
