#!/bin/sh
set -e

echo "🚀 Iniciando aplicación Avaluo Vehicular..."

# Esperar un momento para asegurar que los servicios estén listos
sleep 2

# Verificar si existe la base de datos, si no, crearla
if [ ! -f /var/www/html/database/database.sqlite ]; then
    echo "📦 Creando base de datos SQLite..."
    touch /var/www/html/database/database.sqlite
    chown www-data:www-data /var/www/html/database/database.sqlite
    chmod 664 /var/www/html/database/database.sqlite
fi

# Verificar permisos
echo "🔒 Configurando permisos..."
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database

# Ejecutar migraciones si APP_ENV es production y AUTO_MIGRATE está habilitado
if [ "$AUTO_MIGRATE" = "true" ]; then
    echo "🔄 Ejecutando migraciones..."
    php artisan migrate --force
fi

# Limpiar y optimizar cachés
echo "🧹 Optimizando aplicación..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Aplicación lista!"

# Iniciar supervisor
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
