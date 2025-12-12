# 📄 Sistema de Generación de Reportes PDF - Avalúo de Vehículos

## 📋 Descripción

Sistema completo para generar reportes profesionales en PDF de avalúos de vehículos, incluyendo:
- Carátula profesional con degradado
- Información completa del vehículo
- Resultados de inspección visual
- Evaluación de sistemas mecánicos
- Cálculos detallados de depreciación
- Galería de imágenes del vehículo
- Valor final del avalúo

## 🗂️ Estructura de Archivos

```
resources/views/pdf/
├── avaluo.blade.php                    # Plantilla principal
└── components/
    ├── header.blade.php                # Portada del reporte
    ├── vehiculo-info.blade.php         # Información del vehículo
    ├── inspeccion.blade.php            # Tabla de inspección visual
    ├── sistemas.blade.php              # Tabla de sistemas mecánicos
    ├── depreciacion.blade.php          # Cálculos de depreciación
    ├── imagenes.blade.php              # Galería de imágenes
    └── footer.blade.php                # Pie de página
```

## 🚀 Uso

### Desde el Controlador

```php
use App\Http\Controllers\ArchivoControler;

// Generar PDF para un vehículo específico
$controller = new ArchivoControler();
return $controller->generarPdf($vehiculoId);
```

### Desde una Ruta

La ruta ya está configurada en `routes/web.php`:

```php
Route::get('/archivos/generarPdf/{id}', [ArchivoControler::class, 'generarPdf'])
    ->name('archivos.generarPdf');
```

### Desde el Frontend (React/Inertia)

```typescript
// En resultado.tsx o cualquier componente
const handleGenerarPDF = () => {
    window.location.href = route('archivos.generarPdf', { id: vehiculo.id });
};

// O usando Inertia
import { router } from '@inertiajs/react';

const handleGenerarPDF = () => {
    router.visit(route('archivos.generarPdf', { id: vehiculo.id }));
};
```

### Ejemplo de botón en React

```tsx
<Button
    onClick={() => window.location.href = route('archivos.generarPdf', { id: vehiculo.id })}
    className="bg-[#00AEEF] hover:bg-[#00AEEF]/90"
>
    <FileDown className="h-4 w-4 mr-2" />
    Descargar PDF
</Button>
```

## 📊 Datos Incluidos en el Reporte

### 1. Portada
- Marca y modelo del vehículo
- Placa
- Tipo de vehículo
- Entidad
- Fecha de evaluación
- Ubicación
- Estado general

### 2. Información del Vehículo
- **Datos Generales**: Tipo, combustible, marca, modelo, año, color
- **Identificación**: Placa, chasis, serie del motor, procedencia
- **Condición General**: Kilometraje, precio referencial, estado operativo, observaciones

### 3. Inspección Visual
- Tabla completa de componentes inspeccionados
- Estado de cada característica
- Porcentaje de depreciación por ítem
- Observaciones
- Resumen de items con problemas

### 4. Sistemas Mecánicos (si aplica)
- Tabla de sistemas evaluados
- Componentes por sistema
- Estado de cada componente
- Observaciones técnicas

### 5. Cálculos de Depreciación
- Factor de reposición
- Factor por modelo (antigüedad)
- Factor por kilometraje
- Factor por inspección
- Fórmula de cálculo detallada
- Valor residual
- **Valor final del avalúo**

### 6. Galería de Imágenes
- Todas las imágenes del vehículo
- Ubicación de cada foto
- Descripción
- Fecha de captura

## 🎨 Características de Diseño

- **Colores corporativos**: Uso del color #00AEEF (azul corporativo)
- **Tipografía profesional**: Arial/Helvetica para legibilidad
- **Layout responsive**: Grid system para organización
- **Badges de estado**: Indicadores visuales de condición
- **Tablas estilizadas**: Fácil lectura de datos
- **Portada atractiva**: Degradado profesional
- **Paginación automática**: Saltos de página estratégicos

## ⚙️ Configuración del PDF

El PDF se genera con las siguientes configuraciones:

```php
$pdf->setPaper('letter', 'portrait');           // Tamaño carta, orientación vertical
$pdf->setOption('isHtml5ParserEnabled', true);  // Soporte HTML5
$pdf->setOption('isRemoteEnabled', true);       // Permite imágenes remotas
```

## 🔒 Seguridad

- **Autorización**: Usa `VehiculoPolicy` para verificar permisos
- **Validación**: Verifica que el vehículo existe (`findOrFail`)
- **Middleware**: Requiere autenticación (`auth`, `verified`)

## 📝 Notas Importantes

1. **Imágenes**: Las imágenes deben estar en `storage/app/public/vehiculos/`
2. **Enlace simbólico**: Asegúrate de tener el enlace simbólico creado:
   ```bash
   php artisan storage:link
   ```
3. **DomPDF**: El paquete `barryvdh/laravel-dompdf` debe estar instalado
4. **Permisos**: El usuario debe tener permisos para ver el vehículo

## 🐛 Troubleshooting

### Las imágenes no se muestran
```bash
# Crear enlace simbólico
php artisan storage:link

# Verificar permisos
chmod -R 755 storage/app/public
```

### Error de memoria
```php
// En config/dompdf.php o directamente en el controlador
ini_set('memory_limit', '256M');
```

### Fuentes no se cargan
```php
// Usar fuentes del sistema
$pdf->setOption('defaultFont', 'Arial');
```

## 📦 Dependencias

- Laravel 10+
- barryvdh/laravel-dompdf
- PHP 8.1+

## 🔄 Flujo de Generación

1. Usuario solicita PDF desde el frontend
2. Ruta recibe ID del vehículo
3. Controlador verifica autorización
4. Se obtienen todos los datos relacionados
5. Se calculan factores de depreciación (si no existen)
6. Se renderiza la vista Blade con los datos
7. DomPDF convierte HTML a PDF
8. Se descarga/muestra el archivo

## 💡 Ejemplo Completo

```php
// En resultado.tsx
const handleDescargarPDF = () => {
    // Opción 1: Descarga directa
    window.location.href = route('archivos.generarPdf', { id: vehiculo.id });
    
    // Opción 2: Abrir en nueva pestaña
    window.open(route('archivos.generarPdf', { id: vehiculo.id }), '_blank');
};

<Button onClick={handleDescargarPDF}>
    Descargar Reporte PDF
</Button>
```

## 📞 Soporte

Para cualquier problema o mejora, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024
