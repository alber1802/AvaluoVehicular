# Dockerfile para Laravel + React (Inertia.js) con SQLite
# Multi-stage build para optimizar el tamaño de la imagen

# ============================================
# Stage 1: Build Frontend Assets
# ============================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY components.json ./
COPY eslint.config.js ./
COPY .prettierrc ./
COPY .prettierignore ./

# Instalar dependencias de npm
RUN npm ci --prefer-offline --no-audit

# Copiar código fuente del frontend
COPY resources ./resources
COPY public ./public

# Build de producción
RUN npm run build

# ============================================
# Stage 2: PHP Dependencies
# ============================================
FROM composer:2.7 AS composer-builder

WORKDIR /app

# Copiar archivos de dependencias de Composer
COPY composer.json composer.lock ./

# Instalar dependencias de producción (sin dev)
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader

# ============================================
# Stage 3: Production Image
# ============================================
FROM php:8.2-fpm-alpine

# Instalar extensiones de PHP necesarias y herramientas del sistema
RUN apk add --no-cache \
    sqlite \
    sqlite-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    unzip \
    git \
    curl \
    nginx \
    supervisor \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_sqlite \
    gd \
    bcmath \
    opcache

# Configurar OPcache para producción
RUN { \
    echo 'opcache.enable=1'; \
    echo 'opcache.memory_consumption=256'; \
    echo 'opcache.interned_strings_buffer=16'; \
    echo 'opcache.max_accelerated_files=10000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.validate_timestamps=0'; \
    } > /usr/local/etc/php/conf.d/opcache.ini

# Configurar PHP
RUN { \
    echo 'upload_max_filesize=20M'; \
    echo 'post_max_size=20M'; \
    echo 'memory_limit=256M'; \
    echo 'max_execution_time=300'; \
    } > /usr/local/etc/php/conf.d/uploads.ini

WORKDIR /var/www/html

# Copiar dependencias de Composer desde el builder
COPY --from=composer-builder /app/vendor ./vendor

# Copiar código de la aplicación
COPY . .

# Copiar assets compilados desde el frontend builder
COPY --from=frontend-builder /app/public/build ./public/build

# Crear directorios necesarios y establecer permisos
RUN mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    database \
    && touch database/database.sqlite \
    && chown -R www-data:www-data \
    storage \
    bootstrap/cache \
    database \
    && chmod -R 775 \
    storage \
    bootstrap/cache \
    database

# Copiar configuración de Nginx
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# Copiar configuración de Supervisor
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copiar script de entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Optimizar Laravel (se ejecutará también en entrypoint)
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Exponer puerto 80
EXPOSE 80

# Usar entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
