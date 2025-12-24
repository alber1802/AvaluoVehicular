# 🔔 Configuración del Sistema de Notificaciones Toast

Este documento explica cómo configurar y usar el componente `Toast` para mostrar notificaciones en la aplicación.

---

## 📁 Archivos Involucrados

| Archivo | Propósito |
|---------|-----------|
| `resources/js/components/Toast.tsx` | Componente de notificación |
| `resources/css/app.css` | Animaciones CSS del Toast |
| `app/Http/Middleware/HandleInertiaRequests.php` | Compartir flash messages con el frontend |

---

## 1️⃣ Configurar el Middleware (Backend)

En `app/Http/Middleware/HandleInertiaRequests.php`, agregar los flash messages en el método `share()`:

```php
public function share(Request $request): array
{
    return [
        ...parent::share($request),
        // ... otras props compartidas ...
        
        // Flash messages para notificaciones
        'flash' => [
            'success' => fn () => $request->session()->get('success'),
            'error' => fn () => $request->session()->get('error'),
            'warning' => fn () => $request->session()->get('warning'),
            'info' => fn () => $request->session()->get('info'),
        ],
    ];
}
```

---

## 2️⃣ Enviar Notificaciones desde el Controlador

En cualquier controlador PHP, usar `->with()` al hacer redirect:

```php
// Mensaje de éxito
return redirect()->route('ruta.nombre', $id)->with('success', 'Operación exitosa');

// Mensaje de error
return redirect()->route('ruta.nombre', $id)->with('error', 'Ocurrió un error');

// Mensaje de advertencia
return redirect()->route('ruta.nombre', $id)->with('warning', 'Atención requerida');

// Mensaje informativo
return redirect()->route('ruta.nombre', $id)->with('info', 'Información importante');
```

---

## 3️⃣ Recibir y Mostrar el Toast en el Componente React

### Importaciones necesarias

```tsx
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Toast from '@/components/Toast';
```

### Definir tipos para los flash messages

```tsx
interface PageProps {
    flash: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
}
```

### Implementación en el componente

```tsx
export default function MiComponente() {
    // Obtener flash messages de Inertia
    const { flash } = usePage<PageProps>().props;
    
    // Estados para controlar el Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

    // Detectar cuando llega un flash message
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        }
        if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
        if (flash?.warning) {
            setToastMessage(flash.warning);
            setToastType('warning');
            setShowToast(true);
        }
        if (flash?.info) {
            setToastMessage(flash.info);
            setToastType('info');
            setShowToast(true);
        }
    }, [flash]);

    return (
        <div>
            {/* El Toast DEBE estar dentro del return */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
            
            {/* Resto del contenido */}
        </div>
    );
}
```

---

## 4️⃣ Uso Manual del Toast (sin flash messages)

También puedes mostrar el Toast manualmente sin usar flash messages:

```tsx
const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');
const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

// Función para mostrar toast
const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
};

// Ejemplo de uso en un handler
const handleSubmit = () => {
    router.post(route('mi.ruta'), data, {
        onSuccess: () => {
            showNotification('✅ Guardado correctamente', 'success');
        },
        onError: () => {
            showNotification('❌ Error al guardar', 'error');
        }
    });
};
```

---

## 5️⃣ Props del Componente Toast

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `message` | `string` | **requerido** | Texto del mensaje |
| `type` | `'success' \| 'error' \| 'warning' \| 'info'` | `'success'` | Tipo de notificación |
| `duration` | `number` | `4000` | Milisegundos antes de auto-cerrarse |
| `onClose` | `() => void` | opcional | Callback al cerrar |

---

## 6️⃣ Estilos del Toast

### Colores por tipo

| Tipo | Borde | Icono | Barra de progreso |
|------|-------|-------|-------------------|
| `success` | `border-green-500` | `text-green-400` | `bg-green-500` |
| `error` | `border-red-500` | `text-red-400` | `bg-red-500` |
| `warning` | `border-yellow-500` | `text-yellow-400` | `bg-yellow-500` |
| `info` | `border-[#00AEEF]` | `text-[#00AEEF]` | `bg-[#00AEEF]` |

### Características visuales

- **Fondo**: `#0A2540` (azul oscuro)
- **Posición**: Centro superior de la pantalla
- **Texto**: Blanco para máximo contraste
- **Animación**: Aparece desde arriba (fade-in-down)
- **Responsive**: Ancho 90% en móvil, max-width en desktop

---

## 7️⃣ Animaciones CSS Requeridas

Las siguientes animaciones deben estar en `resources/css/app.css`:

```css
/* Toast Animations */
@keyframes fade-in-down {
    from {
        transform: translateX(-50%) translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
}

@keyframes fade-out-up {
    from {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
    }
    to {
        transform: translateX(-50%) translateY(-20px);
        opacity: 0;
    }
}

@keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
}

.animate-fade-in-down {
    animation: fade-in-down 0.3s ease-out;
}

.animate-fade-out-up {
    animation: fade-out-up 0.3s ease-in;
}

.animate-progress {
    animation: progress linear;
}
```

---

## 📊 Flujo Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│  1. BACKEND (Controlador Laravel)                                   │
│     return redirect()->route('...')->with('success', 'Mensaje');    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  2. MIDDLEWARE (HandleInertiaRequests.php)                          │
│     'flash' => ['success' => $request->session()->get('success')]   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  3. FRONTEND (Componente React)                                     │
│     const { flash } = usePage().props;                              │
│     useEffect(() => { if(flash.success) setShowToast(true) })       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  4. TOAST VISIBLE                                                   │
│     Se muestra la notificación en pantalla                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Páginas que ya usan el Toast

| Archivo | Ubicación |
|---------|-----------|
| `EditDatosVehiculo.tsx` | `resources/js/pages/Registro/update/` |
| `EditImagenes.tsx` | `resources/js/pages/Registro/update/` |
| `EditInspeccion.tsx` | `resources/js/pages/Registro/update/` |
| `EditMecanica.tsx` | `resources/js/pages/Registro/update/` |
