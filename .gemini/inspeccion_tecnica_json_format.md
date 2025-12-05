# Formato JSON de Inspección Técnica

## Estructura del JSON enviado

El componente `InspeccionTecnica.tsx` ahora envía los datos en el siguiente formato:

```json
{
  "sistemas": [
    {
      "nombre_sistema": "MOTOR",
      "componentes": [
        {
          "componente": "Presión compresión prom.",
          "estado": "B",
          "observaciones": null
        },
        {
          "componente": "Aceite y filtro de aceite",
          "estado": null,
          "observaciones": "Necesita cambio urgente"
        },
        {
          "componente": "TURBOALIMENTADOR",
          "estado": "R",
          "observaciones": "Presenta fugas menores"
        }
      ]
    },
    {
      "nombre_sistema": "ELÉCTRICO",
      "componentes": [
        {
          "componente": "Batería",
          "estado": "B",
          "observaciones": null
        },
        {
          "componente": "Alternador",
          "estado": "RC",
          "observaciones": null
        }
      ]
    }
  ]
}
```

## Validaciones implementadas

1. **Validación de campos**: Cada componente DEBE tener al menos uno de los siguientes:
   - `estado` (no vacío)
   - `observaciones` (no vacío)
   
   No pueden ser ambos `null` o vacíos.

2. **Mensajes de error**:
   - Error general en la parte superior del formulario
   - Errores individuales debajo de cada campo con problema
   - Los campos con error se resaltan en rojo

3. **Comportamiento**:
   - Si un componente tiene solo `estado`, `observaciones` será `null`
   - Si un componente tiene solo `observaciones`, `estado` será `null`
   - Si un componente tiene ambos, ambos se envían con sus valores
   - Los componentes que no se tocan no se incluyen en el JSON final

## Ejemplo de uso en el componente padre

```tsx
<InspeccionTecnica
  onSubmit={(data) => {
    console.log(data);
    // data.sistemas es un array de sistemas
    // Cada sistema tiene nombre_sistema y un array de componentes
  }}
  onCancel={() => {
    // Manejar cancelación
  }}
/>
```
