<div class="a4-page">
    <div class="section-header">
        Análisis de Depreciación
    </div>

    <!-- FACTORES DE DEPRECIACIÓN -->
    <table class="tech-table">
        <tr class="header-row">
            <td colspan="4">FACTORES DE CÁLCULO</td>
        </tr>
        <tr>
            <td class="label-cell" style="width: 30%;">FACTOR DE REPOSICIÓN</td>
            <td style="width: 20%;">{{ number_format($factorReposicion * 100, 2) }}%</td>
            <td class="label-cell" style="width: 30%;">FACTOR POR MODELO</td>
            <td style="width: 20%;">{{ number_format($factorModelo * 100, 2) }}%</td>
        </tr>
        <tr>
            <td class="label-cell">FACTOR POR KILOMETRAJE</td>
            <td>{{ number_format($factorKilometraje * 100, 2) }}%</td>
            <td class="label-cell">FACTOR POR INSPECCIÓN</td>
            <td>{{ number_format($factorInspeccion * 100, 2) }}%</td>
        </tr>
    </table>

    <!-- DETALLE DE CÁLCULO -->
    <table class="tech-table">
        <tr class="header-row">
            <td colspan="2">DETALLE DEL CÁLCULO</td>
        </tr>
        <tr>
            <td class="label-cell">Precio Base (Nuevo)</td>
            <td style="font-family: 'Courier New', monospace; font-weight: bold;">${{ number_format($vehiculo->precio_referencial, 2) }}</td>
        </tr>
        <tr>
            <td class="label-cell">Factor de Reposición</td>
            <td>
                <span>Tasa: {{ number_format($marca->tasa_k * 100, 2) }}% por año</span>
                <span style="float: right; font-weight: bold;">× {{ number_format($factorReposicion, 4) }}</span>
            </td>
        </tr>
        <tr>
            <td class="label-cell">Factor por Modelo (Antigüedad)</td>
            <td>
                <span>Año fabricación: {{ $vehiculo->año_fabricacion }}</span>
                <span style="float: right; font-weight: bold;">× {{ number_format($factorModelo, 4) }}</span>
            </td>
        </tr>
        <tr>
            <td class="label-cell">Factor por Kilometraje</td>
            <td>
                <span>Kilometraje: {{ number_format($vehiculo->kilometraje) }} Km</span>
                <span style="float: right; font-weight: bold;">× {{ number_format($factorKilometraje, 4) }}</span>
            </td>
        </tr>
        <tr>
            <td class="label-cell">Factor por Inspección Visual</td>
            <td>
                <span>Según evaluación técnica</span>
                <span style="float: right; font-weight: bold;">× {{ number_format($factorInspeccion, 4) }}</span>
            </td>
        </tr>
    </table>

    <!-- FÓRMULA DE CÁLCULO -->
    <div style="background: #f1f5f9; padding: 15px; border: 1px solid #cbd5e1; margin: 15px 0; text-align: center;">
        <div style="font-size: 9pt; color: #64748b; margin-bottom: 8px;">FÓRMULA DE CÁLCULO</div>
        <div style="font-family: 'Courier New', monospace; font-size: 10pt; font-weight: bold;">
            Valor = Precio Base × F.Reposición × F.Modelo × F.Kilometraje × F.Inspección
        </div>
        <div style="font-family: 'Courier New', monospace; font-size: 10pt; margin-top: 10px; color: #475569;">
            ${{ number_format($vehiculo->precio_referencial, 2) }} × {{ number_format($factorReposicion, 4) }} × {{ number_format($factorModelo, 4) }} × {{ number_format($factorKilometraje, 4) }} × {{ number_format($factorInspeccion, 4) }}
        </div>
        <div style="font-size: 14pt; font-weight: bold; color: #1e3a8a; margin-top: 10px;">
            = ${{ number_format($vehiculo->precio_referencial * $factorReposicion * $factorModelo * $factorKilometraje * $factorInspeccion, 2) }}
        </div>
    </div>

    <!-- VALORES DE REFERENCIA -->
    <table class="tech-table">
        <tr class="header-row">
            <td colspan="2">VALORES DE REFERENCIA</td>
        </tr>
        <tr>
            <td class="label-cell">Marca del Vehículo</td>
            <td>{{ $marca->nombre }}</td>
        </tr>
        <tr>
            <td class="label-cell">Tasa de Depreciación (K)</td>
            <td>{{ number_format($marca->tasa_k * 100, 2) }}% anual</td>
        </tr>
        <tr>
            <td class="label-cell">Valor Residual Mínimo</td>
            <td style="font-family: 'Courier New', monospace; font-weight: bold;">${{ number_format($valorResidual, 2) }} ({{ number_format($marca->valor_residual * 100, 0) }}% del valor base)</td>
        </tr>
    </table>

    <div class="note-box">
        <strong>NOTA:</strong> Los factores de depreciación se calculan siguiendo metodologías técnicas de valuación vehicular. 
        El valor residual representa el mínimo valor que puede alcanzar el vehículo según la marca {{ $marca->nombre }}.
    </div>
</div>

<div class="page-break"></div>
