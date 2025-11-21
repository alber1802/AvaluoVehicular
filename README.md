# 🚗 Sistema de Avalúo Vehicular

Sistema web para realizar avalúos técnicos de vehículos, desarrollado con Laravel 12 y React 19.

## 📋 Características

- ✅ Registro completo de vehículos
- ✅ Evaluación mecánica detallada
- ✅ Inspección visual
- ✅ Carga de imágenes
- ✅ Generación de reportes de avalúo
- ✅ Gestión de usuarios con autenticación 2FA
- ✅ Modo oscuro
- ✅ Diseño responsive

## 🛠️ Stack Tecnológico

### Backend
- Laravel 12
- PHP 8.2+
- SQLite
- Laravel Fortify (Autenticación)

### Frontend
- React 19
- TypeScript
- Inertia.js
- TailwindCSS 4.0
- Radix UI
- Vite 7

## 🚀 Instalación y Uso

### Opción 1: Con Docker (Recomendado)

#### Windows (PowerShell)

```powershell
# 1. Configuración inicial (solo primera vez)
.\docker.ps1 setup

# 2. Iniciar la aplicación
.\docker.ps1 start

# La aplicación estará disponible en: http://localhost:8080
```

#### Linux/Mac (Bash)

```bash
# 1. Dar permisos de ejecución al script
chmod +x docker.sh

# 2. Configuración inicial (solo primera vez)
./docker.sh setup

# 3. Iniciar la aplicación
./docker.sh start

# La aplicación estará disponible en: http://localhost:8080
```

#### Comandos útiles de Docker

```bash
# Ver logs en tiempo real
.\docker.ps1 logs          # Windows
./docker.sh logs           # Linux/Mac

# Detener la aplicación
.\docker.ps1 stop

# Reiniciar la aplicación
.\docker.ps1 restart

# Ejecutar migraciones
.\docker.ps1 migrate

# Acceder al shell del contenedor
.\docker.ps1 shell

# Ver estado de los servicios
.\docker.ps1 status

# Ejecutar comandos artisan
.\docker.ps1 artisan make:controller MiControlador
```

Ver [DOCKER.md](DOCKER.md) para documentación completa de Docker.

---

### Opción 2: Instalación Local (Sin Docker)

#### Requisitos
- PHP 8.2 o superior
- Composer
- Node.js 20 o superior
- SQLite

#### Pasos

```bash
# 1. Instalar dependencias de PHP
composer install

# 2. Instalar dependencias de Node.js
npm install

# 3. Copiar archivo de configuración
cp .env.example .env

# 4. Generar clave de aplicación
php artisan key:generate

# 5. Crear base de datos SQLite
touch database/database.sqlite

# 6. Ejecutar migraciones
php artisan migrate

# 7. Compilar assets (desarrollo)
npm run dev

# En otra terminal, iniciar servidor
php artisan serve
```

La aplicación estará disponible en: http://localhost:8000

#### Desarrollo

```bash
# Iniciar todo (servidor + queue + vite)
composer dev

# Solo frontend
npm run dev

# Linter
npm run lint

# Formatear código
npm run format

# Tests
php artisan test
```

## 📁 Estructura del Proyecto

```
Avaluo/
├── app/
│   ├── Http/Controllers/
│   │   ├── Registro/          # Controladores de avalúo
│   │   └── User/              # Gestión de usuarios
│   └── Models/
├── database/
│   ├── migrations/
│   └── database.sqlite
├── resources/
│   ├── js/
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── components/        # Componentes reutilizables
│   │   └── layouts/           # Layouts
│   └── css/
├── routes/
│   └── web.php
├── docker/                     # Configuración Docker
├── Dockerfile
├── docker-compose.yml
└── docker.ps1 / docker.sh     # Scripts de gestión
```

## 🔧 Configuración

### Variables de Entorno

Edita el archivo `.env` (local) o `.env.docker` (Docker) para configurar:

- `APP_NAME`: Nombre de la aplicación
- `APP_URL`: URL de la aplicación
- `APP_LOCALE`: Idioma (es/en)
- `DB_CONNECTION`: sqlite (por defecto)

## 📝 Uso del Sistema

### 1. Registro de Usuario
- Accede a `/register` para crear una cuenta
- Configura autenticación de dos factores (opcional)

### 2. Crear Avalúo
1. Navega a "Registro" → "Crear Avalúo"
2. Completa la información del vehículo
3. Selecciona el tipo de evaluación (Mecánica/Inspección)
4. Completa los formularios de evaluación
5. Sube imágenes del vehículo
6. Revisa y genera el reporte

### 3. Ver Resultados
- Accede a "Resultados" para ver avalúos completados
- Edita o descarga reportes según necesites

## 🐛 Troubleshooting

### Docker

```bash
# Ver logs de errores
.\docker.ps1 logs

# Reiniciar contenedores
.\docker.ps1 restart

# Reconstruir imagen
.\docker.ps1 rebuild

# Limpiar todo y empezar de nuevo
.\docker.ps1 clean
.\docker.ps1 setup
```

### Local

```bash
# Limpiar cachés
php artisan optimize:clear

# Regenerar archivos de configuración
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Permisos (Linux/Mac)
chmod -R 775 storage bootstrap/cache
```

## 📚 Documentación Adicional

- [Documentación de Docker](DOCKER.md) - Guía completa de Docker
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Inertia.js Documentation](https://inertiajs.com)

## 👨‍💻 Desarrollo

### Estructura de Código

- **Backend (Laravel)**: Sigue el patrón MVC
- **Frontend (React)**: Componentes funcionales con TypeScript
- **Estilos**: TailwindCSS con sistema de diseño consistente
- **Routing**: Inertia.js para SPA sin API

### Convenciones

- TypeScript estricto
- ESLint + Prettier configurados
- Componentes reutilizables en `resources/js/components`
- Páginas en `resources/js/pages`

## 🔒 Seguridad

- Autenticación con Laravel Fortify
- 2FA opcional
- CSRF protection
- XSS protection
- SQL injection protection (Eloquent ORM)

## 📄 Licencia

MIT License

## 🤝 Contribuir

Este es un proyecto de grado. Para contribuciones, por favor contacta al autor.

---

**Desarrollado como Proyecto de Grado** 🎓
