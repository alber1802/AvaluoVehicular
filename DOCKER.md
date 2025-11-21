# Docker para Proyecto Avaluo Vehicular

Este proyecto incluye configuración Docker completa para desplegar la aplicación Laravel + React con SQLite.

## 🚀 Inicio Rápido

### Opción 1: Usando Docker Compose (Recomendado)

```bash
# 1. Construir la imagen
docker-compose build

# 2. Iniciar el contenedor
docker-compose up -d

# 3. Ejecutar migraciones (primera vez)
docker-compose exec app php artisan migrate --force

# 4. Generar APP_KEY (primera vez)
docker-compose exec app php artisan key:generate

# La aplicación estará disponible en: http://localhost:8080
```

### Opción 2: Usando Docker directamente

```bash
# 1. Construir la imagen
docker build -t avaluo-app .

# 2. Ejecutar el contenedor
docker run -d \
  -p 8080:80 \
  -v $(pwd)/database/database.sqlite:/var/www/html/database/database.sqlite \
  -v $(pwd)/storage/logs:/var/www/html/storage/logs \
  --name avaluo-container \
  avaluo-app

# 3. Ejecutar migraciones (primera vez)
docker exec avaluo-container php artisan migrate --force

# 4. Generar APP_KEY (primera vez)
docker exec avaluo-container php artisan key:generate
```

## 📋 Comandos Útiles

### Gestión del Contenedor

```bash
# Ver logs
docker-compose logs -f

# Detener el contenedor
docker-compose down

# Reiniciar el contenedor
docker-compose restart

# Acceder al shell del contenedor
docker-compose exec app sh
```

### Comandos de Laravel dentro del contenedor

```bash
# Ejecutar migraciones
docker-compose exec app php artisan migrate

# Limpiar caché
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan route:clear
docker-compose exec app php artisan view:clear

# Ver logs de Laravel
docker-compose exec app tail -f storage/logs/laravel.log

# Ejecutar comandos Artisan
docker-compose exec app php artisan [comando]
```

## 🏗️ Arquitectura del Dockerfile

El Dockerfile utiliza **multi-stage build** para optimizar el tamaño:

1. **Stage 1 (frontend-builder)**: Compila assets de React/Vite
2. **Stage 2 (composer-builder)**: Instala dependencias PHP
3. **Stage 3 (production)**: Imagen final optimizada

### Servicios incluidos:

- ✅ **PHP 8.2 FPM** - Procesamiento PHP
- ✅ **Nginx** - Servidor web
- ✅ **Supervisor** - Gestión de procesos (PHP-FPM, Nginx, Queue Worker)
- ✅ **SQLite** - Base de datos (persistente via volumen)
- ✅ **Laravel Queue Worker** - Procesamiento de trabajos en segundo plano

## 📦 Volúmenes Persistentes

Los siguientes datos se persisten fuera del contenedor:

- `database/database.sqlite` - Base de datos SQLite
- `storage/logs` - Logs de la aplicación
- `storage/app` - Archivos subidos por usuarios

## 🔧 Variables de Entorno

Puedes personalizar las variables de entorno en `docker-compose.yml`:

```yaml
environment:
  - APP_ENV=production
  - APP_DEBUG=false
  - APP_URL=http://localhost:8080
  - DB_CONNECTION=sqlite
```

## 🔒 Seguridad

- Las dependencias de desarrollo NO se incluyen en la imagen final
- OPcache configurado para máximo rendimiento
- Headers de seguridad configurados en Nginx
- Permisos correctos para directorios de Laravel

## 📊 Monitoreo

### Health Check

```bash
curl http://localhost:8080/health
```

### Ver procesos dentro del contenedor

```bash
docker-compose exec app supervisorctl status
```

## 🐛 Troubleshooting

### Error: "Permission denied" en database.sqlite

```bash
docker-compose exec app chown www-data:www-data /var/www/html/database/database.sqlite
docker-compose exec app chmod 664 /var/www/html/database/database.sqlite
```

### Error: "APP_KEY not set"

```bash
docker-compose exec app php artisan key:generate
```

### Reconstruir la imagen desde cero

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📈 Optimizaciones de Producción

La imagen incluye:

- ✅ OPcache habilitado
- ✅ Config/Route/View cache pre-compilado
- ✅ Autoloader optimizado
- ✅ Compresión Gzip en Nginx
- ✅ Cache de archivos estáticos (1 año)
- ✅ Multi-stage build para imagen ligera

## 🔄 Actualizar la Aplicación

```bash
# 1. Detener el contenedor
docker-compose down

# 2. Actualizar código
git pull

# 3. Reconstruir imagen
docker-compose build

# 4. Iniciar contenedor
docker-compose up -d

# 5. Ejecutar migraciones si hay nuevas
docker-compose exec app php artisan migrate --force

# 6. Limpiar cachés
docker-compose exec app php artisan optimize:clear
```

## 📝 Notas Importantes

- La base de datos SQLite se crea automáticamente en el primer inicio
- El worker de colas está configurado para reiniciarse automáticamente
- Los logs se almacenan en `storage/logs` (persistente)
- El puerto por defecto es `8080`, puedes cambiarlo en `docker-compose.yml`
