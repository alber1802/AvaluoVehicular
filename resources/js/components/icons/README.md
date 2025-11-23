# Iconos Personalizados

Esta carpeta contiene iconos SVG personalizados que se pueden usar en la aplicación.

## Estructura

Cada icono debe ser un componente React que acepte `SVGProps<SVGSVGElement>` como props.

## Cómo agregar un nuevo icono

1. **Crear el archivo del icono** en esta carpeta con el nombre del icono (por ejemplo, `MiIcono.tsx`)

```tsx
import { type SVGProps } from 'react';

export function MiIcono(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            {...props}
        >
            {/* Tu SVG path aquí */}
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="..."
            />
        </svg>
    );
}
```

2. **Exportar el icono** en `index.ts`:

```tsx
export { RecycleIcon } from './Recycle';
export { MiIcono } from './MiIcono';
```

3. **Usar el icono** en tu código:

```tsx
import { MiIcono } from '@/components/icons';

// En un NavItem
const navItems: NavItem[] = [
    {
        title: 'Mi Item',
        href: '/ruta',
        icon: MiIcono,
    },
];

// O directamente en JSX
<MiIcono className="w-5 h-5 text-blue-500" />
```

## Iconos disponibles

- **RecycleIcon**: Icono de papelera/reciclaje (basura)

## Notas

- Los iconos personalizados son compatibles con los iconos de `lucide-react`
- Puedes pasar cualquier prop de SVG (className, style, onClick, etc.)
- El tamaño por defecto es `h-6 w-6` pero se puede sobrescribir con className
