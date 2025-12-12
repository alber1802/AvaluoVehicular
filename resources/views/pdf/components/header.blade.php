<div class="a4-page">
    <!-- HEADER OFICIAL -->
    <header class="official-header">
        <h1>{{ $vehiculo->entidad }}</h1>
        <p class="subtitle">DEPARTAMENTO TÉCNICO / EVALUACIÓN VEHICULAR</p>
        <div class="divider"></div>
        <p class="address">{{ $vehiculo->ubicacion_actual }}</p>
    </header>

    <!-- CONTENIDO CENTRAL -->
    <main style="flex-grow: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 0;">
        <div style="text-align: center; margin-bottom: 60px;">
            <h2 style="font-size: 28pt; font-weight: bold; color: #1e3a8a; text-transform: uppercase; letter-spacing: 2px;">
                Departamento Técnico
            </h2>
            <p style="font-size: 16pt; color: #64748b; text-transform: uppercase; letter-spacing: 3px; margin-top: 15px; border-bottom: 1px solid #cbd5e1; display: inline-block; padding-bottom: 5px;">
                Gestión {{ now()->year }}
            </p>
        </div>

        <!-- TÍTULO PRINCIPAL -->
        <div class="main-title-box">
            <h2>Informe de Avalúo Técnico</h2>
            <p class="subtitle">Documentación Oficial</p>
        </div>
    </main>

    <!-- INFORMACIÓN DEL DOCUMENTO -->
    <footer class="info-box" style="margin-top: auto;">
        <table>
            <tr>
                <td class="label">CÓDIGO Nº:</td>
                <td class="value">AVL-{{ str_pad($vehiculo->id, 4, '0', STR_PAD_LEFT) }}/{{ now()->format('y') }}</td>
            </tr>
            <tr>
                <td class="label">FECHA:</td>
                <td class="value">{{ \Carbon\Carbon::parse($vehiculo->fecha_evaluacion)->isoFormat('DD [de] MMMM [del] YYYY') }}</td>
            </tr>
            <tr>
                <td class="label">VEHÍCULO:</td>
                <td class="value">{{ $marca->nombre }} {{ $vehiculo->modelo }} ({{ $vehiculo->año_fabricacion }})</td>
            </tr>
            <tr>
                <td class="label">PLACA:</td>
                <td class="value">{{ $vehiculo->placa ?? 'N/A' }}</td>
            </tr>
            <tr>
                <td class="label">ESTADO GENERAL:</td>
                <td class="value">{{ strtoupper($condicionGeneral->estado_general) }}</td>
            </tr>
        </table>
    </footer>
</div>
