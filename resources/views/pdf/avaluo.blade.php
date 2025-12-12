<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informe de Avalúo - {{ $vehiculo->placa ?? 'N/A' }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Roboto', 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.4;
            color: #0f172a;
            background-color: #e2e8f0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        .a4-page {
            width: 170mm;
            height: 297mm;
            background: white;
            margin: 20px auto;
            padding: 10mm 15mm;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
            position: relative;
            display: flex;
            flex-direction: column;
        }

        /* HEADER OFICIAL */
        .official-header {
            border: 2px solid #0f172a;
            padding: 15px;
            margin-bottom: 30px;
            text-align: center;
        }

        .official-header h1 {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            color: #1e3a8a;
        }

        .official-header .subtitle {
            font-size: 11pt;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .official-header .divider {
            width: 60px;
            height: 2px;
            background: #0f172a;
            margin: 10px auto;
        }

        .official-header .address {
            font-size: 9pt;
            color: #64748b;
        }

        /* TÍTULO PRINCIPAL */
        .main-title-box {
            border: 2px solid #0f172a;
            padding: 20px;
            text-align: center;
            margin: 40px 0;
        }

        .main-title-box h2 {
            font-size: 20pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #0f172a;
            margin-bottom: 5px;
        }

        .main-title-box .subtitle {
            font-size: 11pt;
            color: #64748b;
            font-weight: 500;
        }

        /* SECCIÓN CON TÍTULO */
        .section-header {
            background: #64748b;
            color: white;
            text-align: center;
            font-weight: bold;
            padding: 8px;
            text-transform: uppercase;
            font-size: 10pt;
            margin-bottom: 15px;
            border: 1px solid #0f172a;
        }

        .section-header-blue {
            background: #1e3a8a;
            color: white;
            text-align: center;
            font-weight: bold;
            padding: 10px;
            text-transform: uppercase;
            font-size: 11pt;
            margin-bottom: 20px;
            border: 1px solid #0f172a;
        }

        /* TABLAS TÉCNICAS */
        .tech-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 10pt;
        }

        .tech-table td,
        .tech-table th {
            border: 1px solid #64748b;
            padding: 6px 8px;
        }

        .tech-table th {
            background: #64748b;
            color: white;
            font-weight: bold;
            text-align: center;
        }

        .tech-table .label-cell {
            background: #f1f5f9;
            font-weight: bold;
            width: 30%;
        }

        .tech-table .header-row {
            background: #f1f5f9;
            font-weight: bold;
            text-align: center;
        }

        /* INFO BOX */
        .info-box {
            border: 2px solid #0f172a;
            padding: 20px;
            background: white;
            margin: 20px 0;
        }

        .info-box table {
            width: 100%;
            font-size: 10pt;
        }

        .info-box td {
            padding: 8px 0;
            border-bottom: 1px dotted #cbd5e1;
        }

        .info-box .label {
            font-weight: bold;
            color: #0f172a;
            width: 150px;
        }

        .info-box .value {
            color: #475569;
        }

        /* CHECKBOX */
        .check-box {
            width: 12px;
            height: 12px;
            border: 1px solid #334155;
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
        }

        .check-box.checked {
            background-color: #334155;
            position: relative;
        }

        .check-box.checked::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 6px;
            height: 6px;
            background: white;
        }

        /* RESULTADO FINAL */
        .result-box {
            border: 2px solid #0f172a;
            padding: 20px;
            background: #f8fafc;
            margin: 20px 0;
        }

        .result-box h3 {
            font-size: 14pt;
            font-weight: bold;
            text-align: center;
            color: #1e3a8a;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }

        .result-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 10pt;
        }

        .result-item.final {
            border-top: 2px solid #0f172a;
            margin-top: 10px;
            padding-top: 15px;
        }

        .result-item.final .value {
            font-size: 18pt;
            font-weight: bold;
            color: #1e3a8a;
        }

        /* NOTA AL PIE */
        .note-box {
            padding: 10px;
            border: 1px dotted #64748b;
            background: white;
            font-size: 8pt;
            color: #64748b;
            margin-top: 15px;
        }

        /* FOOTER */
        .page-footer {
            margin-top: auto;
            text-align: center;
            font-size: 9pt;
            color: #64748b;
            padding-top: 10px;
        }

        /* IMÁGENES */
        .images-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 15px;
        }

        .image-item {
            text-align: center;
            border: 1px solid #cbd5e1;
            padding: 10px;
        }

        .image-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border: 1px solid #cbd5e1;
        }

        .image-caption {
            margin-top: 8px;
            font-size: 8pt;
            color: #64748b;
            font-style: italic;
        }

        @media print {
            body {
                background: none;
                margin: 0;
            }
            .a4-page {
                width: 100%;
                height: 100%;
                margin: 0;
                box-shadow: none;
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
    <!-- PÁGINA 1: CARÁTULA -->
    @include('pdf.components.header', [
        'vehiculo' => $vehiculo,
        'marca' => $marca,
        'condicionGeneral' => $condicionGeneral
    ])

    <!-- PÁGINA 2: FICHA TÉCNICA -->
    @include('pdf.components.vehiculo-info', [
        'vehiculo' => $vehiculo,
        'marca' => $marca,
        'condicionGeneral' => $condicionGeneral
    ])

    <!-- PÁGINA 3: INSPECCIÓN -->
    @include('pdf.components.inspeccion', [
        'inspeccion' => $inspeccion
    ])

    <!-- PÁGINA 4: SISTEMAS (si existen) -->
    @if(isset($sistemas) && count($sistemas) > 0)
    @include('pdf.components.sistemas', [
        'sistemas' => $sistemas
    ])
    @endif

    <!-- PÁGINA 5: CÁLCULOS Y RESULTADO -->
    @include('pdf.components.depreciacion', [
        'vehiculo' => $vehiculo,
        'marca' => $marca,
        'factorReposicion' => $factorReposicion,
        'factorModelo' => $factorModelo,
        'factorKilometraje' => $factorKilometraje,
        'factorInspeccion' => $factorInspeccion,
        'valorFinal' => $valorFinal,
        'valorResidual' => $valorResidual
    ])
    @include('pdf.components.resultados',[
        'vehiculo' => $vehiculo,
        'valorFinal' => $valorFinal,
        'valorResidual' => $valorResidual
    ])

    <!-- PÁGINA 6: IMÁGENES -->
    @if(isset($imagenes) && count($imagenes) > 0)
    @include('pdf.components.imagenes', [
        'imagenes' => $imagenes
    ])
    @endif
</body>
</html>
