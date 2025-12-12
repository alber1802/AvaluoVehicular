@php
    $imagenesPorPagina = 2;
    $totalImagenes = count($imagenes);
    $paginasNecesarias = ceil($totalImagenes / $imagenesPorPagina);
@endphp

@for($pagina = 0; $pagina < $paginasNecesarias; $pagina++)
    <div class="a4-page">
        <div class="section-header">
            Registro Fotográfico del Vehículo {{ $pagina > 0 ? '(continuación)' : '' }}
        </div>

        <div class="images-grid">
            @php
                $inicio = $pagina * $imagenesPorPagina;
                $fin = min($inicio + $imagenesPorPagina, $totalImagenes);
            @endphp

            @for($i = $inicio; $i < $fin; $i++)
                @php
                    $imagen = $imagenes[$i];
                @endphp
                <div class="image-item">
                    <img src="{{ public_path('storage/' . $imagen->url) }}" alt="{{ $imagen->lado }}
                    " style="max-width: 100%; max-height: 250px; object-fit: contain; width: auto;">
                    <div class="image-caption">
                        <strong>{{ strtoupper($imagen->lado) }}</strong>
                        @if($imagen->descripcion)
                            <br>{{ $imagen->descripcion }}
                        @endif
                        @if($imagen->fecha)
                            <br><span style="font-size: 7pt;">{{ \Carbon\Carbon::parse($imagen->fecha)->format('d/m/Y') }}</span>
                        @endif
                    </div>
                </div>
            @endfor
        </div>
        
        @if($pagina == $paginasNecesarias - 1)
            <div style="background: #f8fafc; padding: 12px; border: 1px solid #cbd5e1; margin-top: 20px; text-align: center;">
                <span style="font-size: 9pt; color: #64748b;">
                    Total de imágenes registradas: <strong>{{ $totalImagenes }}</strong>
                </span>
            </div>
        @endif
    </div>

    @if($pagina < $paginasNecesarias - 1)
        <div class="page-break"></div>
    @endif
@endfor
