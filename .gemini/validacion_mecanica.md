# Validación y Procesamiento de Evaluación Mecánica

## 📋 Resumen

Se ha implementado un sistema completo de validación y procesamiento de datos para la evaluación mecánica de vehículos, con protección contra inyección SQL y validación exhaustiva de datos.

## 🔒 Protección contra Inyección SQL

### En MecanicaRequest.php

Las validaciones implementadas protegen contra inyección SQL de las siguientes formas:

1. **Validación de tipos**: Todos los campos se validan como `string`, evitando inyección de código
2. **Límites de longitud**: Se establecen límites máximos (`max:255`, `max:1000`)
3. **Valores permitidos**: El campo `estado` solo acepta valores específicos: `B`, `R`, `RC`, `RR`, `SI`, `NO`
4. **Estructura de datos**: Se valida que la estructura sea exactamente un array de sistemas con componentes

### Reglas de Validación

```php
'sistemas' => ['required', 'array', 'min:1'],
'sistemas.*.nombre_sistema' => ['required', 'string', 'max:255'],
'sistemas.*.componentes' => ['required', 'array', 'min:1'],
'sistemas.*.componentes.*.componente' => ['required', 'string', 'max:255'],
'sistemas.*.componentes.*.estado' => ['nullable', 'string', 'max:10', 'in:B,R,RC,RR,SI,NO'],
'sistemas.*.componentes.*.observaciones' => ['nullable', 'string', 'max:1000'],
```

### Validación Personalizada

Además, se valida que cada componente tenga al menos `estado` O `observaciones`:

```php
public function withValidator($validator)
{
    $validator->after(function ($validator) {
        // Valida que cada componente tenga estado o observaciones
        // No pueden ser ambos null/vacíos
    });
}
```

## 🎯 Procesamiento en MecanicaController.php

### Estructura de Datos Procesados

El controller transforma los datos validados en registros listos para insertar:

```php
$registrosMecanica[] = [
    'id_vehiculo' => $id,              // ID del vehículo (de la ruta)
    'nombre_sistema' => $nombreSistema, // Ej: "Motor", "Frenos"
    'componente' => $componente,        // Ej: "Batería", "Discos delanteros"
    'estado' => $estado ?? null,        // B, R, RC, RR, SI, NO o null
    'observaciones' => $obs ?? null,    // Texto o null
    'created_at' => now(),
    'updated_at' => now(),
];
```

### Ejemplo de Datos Procesados

**Entrada (JSON del frontend):**
```json
{
  "sistemas": [
    {
      "nombre_sistema": "Motor",
      "componentes": [
        {
          "componente": "Batería",
          "estado": "B",
          "observaciones": null
        },
        {
          "componente": "Aceite",
          "estado": null,
          "observaciones": "Necesita cambio"
        }
      ]
    }
  ]
}
```

**Salida (Array para DB):**
```php
[
    [
        'id_vehiculo' => 123,
        'nombre_sistema' => 'Motor',
        'componente' => 'Batería',
        'estado' => 'B',
        'observaciones' => null,
        'created_at' => '2025-12-01 16:12:00',
        'updated_at' => '2025-12-01 16:12:00',
    ],
    [
        'id_vehiculo' => 123,
        'nombre_sistema' => 'Motor',
        'componente' => 'Aceite',
        'estado' => null,
        'observaciones' => 'Necesita cambio',
        'created_at' => '2025-12-01 16:12:00',
        'updated_at' => '2025-12-01 16:12:00',
    ]
]
```

## 🗄️ Inserción en Base de Datos

Para insertar los datos, descomenta en el controller:

```php
// Opción 1: Usando Query Builder
DB::table('evaluacion_mecanica')->insert($registrosMecanica);

// Opción 2: Usando Modelo Eloquent
EvaluacionMecanica::insert($registrosMecanica);
```

### Estructura de Tabla Requerida

```sql
CREATE TABLE evaluacion_mecanica (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_vehiculo BIGINT UNSIGNED NOT NULL,
    nombre_sistema VARCHAR(255) NOT NULL,
    componente VARCHAR(255) NOT NULL,
    estado VARCHAR(10) NULL,
    observaciones TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id)
);
```

## ✅ Beneficios de Seguridad

1. **Prevención de SQL Injection**: Laravel escapa automáticamente los valores
2. **Validación de tipos**: Solo se aceptan strings donde corresponde
3. **Valores limitados**: El estado solo acepta valores predefinidos
4. **Sanitización automática**: Laravel limpia los datos antes de insertarlos
5. **Prepared Statements**: Laravel usa prepared statements internamente

## 🔄 Flujo Completo

1. **Frontend** → Envía JSON con estructura `{ sistemas: [...] }`
2. **MecanicaRequest** → Valida estructura, tipos, longitudes y valores
3. **MecanicaController** → Procesa y transforma datos
4. **Base de Datos** → Inserta registros de forma segura

## 📝 Mensajes de Error Personalizados

Todos los errores de validación tienen mensajes en español:
- "Debe enviar al menos un sistema de inspección"
- "El estado debe ser uno de: B, R, RC, RR, SI, NO"
- "El componente debe tener al menos un estado o una observación"
- etc.
