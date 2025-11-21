#!/bin/bash
# Script de ayuda para gestionar la aplicación Docker

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

# Función para mostrar ayuda
show_help() {
    cat << EOF
🚀 Script de Gestión - Avaluo Vehicular Docker

Uso: ./docker.sh [comando]

Comandos disponibles:

  setup         Configuración inicial (primera vez)
  build         Construir la imagen Docker
  start         Iniciar los contenedores
  stop          Detener los contenedores
  restart       Reiniciar los contenedores
  logs          Ver logs en tiempo real
  shell         Acceder al shell del contenedor
  artisan       Ejecutar comandos artisan (ej: ./docker.sh artisan migrate)
  migrate       Ejecutar migraciones
  fresh         Reiniciar base de datos (¡CUIDADO! Borra todos los datos)
  optimize      Limpiar y optimizar cachés
  status        Ver estado de los contenedores
  rebuild       Reconstruir imagen desde cero
  clean         Limpiar contenedores e imágenes
  help          Mostrar esta ayuda

Ejemplos:
  ./docker.sh setup
  ./docker.sh start
  ./docker.sh artisan make:controller TestController
  ./docker.sh logs

EOF
}

# Verificar si Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        error "Docker no está instalado. Por favor instala Docker primero."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose no está instalado. Por favor instala Docker Compose primero."
        exit 1
    fi
}

# Setup inicial
setup() {
    info "Configurando proyecto por primera vez..."
    
    # Verificar si existe .env.docker
    if [ ! -f .env.docker ]; then
        error "No se encontró .env.docker. Creando desde plantilla..."
        cp .env.example .env.docker
    fi
    
    # Crear base de datos si no existe
    if [ ! -f database/database.sqlite ]; then
        info "Creando base de datos SQLite..."
        touch database/database.sqlite
    fi
    
    # Construir imagen
    info "Construyendo imagen Docker..."
    docker-compose build
    
    # Iniciar contenedores
    info "Iniciando contenedores..."
    docker-compose up -d
    
    # Esperar a que el contenedor esté listo
    info "Esperando a que el contenedor esté listo..."
    sleep 10
    
    # Generar APP_KEY
    info "Generando APP_KEY..."
    docker-compose exec app php artisan key:generate --force
    
    # Ejecutar migraciones
    info "Ejecutando migraciones..."
    docker-compose exec app php artisan migrate --force
    
    success "¡Setup completado! La aplicación está disponible en http://localhost:8080"
}

# Construir imagen
build() {
    info "Construyendo imagen Docker..."
    docker-compose build
    success "Imagen construida exitosamente"
}

# Iniciar contenedores
start() {
    info "Iniciando contenedores..."
    docker-compose up -d
    success "Contenedores iniciados. Aplicación disponible en http://localhost:8080"
}

# Detener contenedores
stop() {
    info "Deteniendo contenedores..."
    docker-compose down
    success "Contenedores detenidos"
}

# Reiniciar contenedores
restart() {
    info "Reiniciando contenedores..."
    docker-compose restart
    success "Contenedores reiniciados"
}

# Ver logs
logs() {
    info "Mostrando logs (Ctrl+C para salir)..."
    docker-compose logs -f
}

# Acceder al shell
shell() {
    info "Accediendo al shell del contenedor..."
    docker-compose exec app sh
}

# Ejecutar comando artisan
artisan() {
    if [ -z "$1" ]; then
        error "Debes especificar un comando artisan"
        echo "Ejemplo: ./docker.sh artisan migrate"
        exit 1
    fi
    
    info "Ejecutando: php artisan $*"
    docker-compose exec app php artisan "$@"
}

# Ejecutar migraciones
migrate() {
    info "Ejecutando migraciones..."
    docker-compose exec app php artisan migrate --force
    success "Migraciones ejecutadas"
}

# Reiniciar base de datos
fresh() {
    warning "¡ADVERTENCIA! Esto borrará todos los datos de la base de datos."
    read -p "¿Estás seguro? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        info "Reiniciando base de datos..."
        docker-compose exec app php artisan migrate:fresh --force
        success "Base de datos reiniciada"
    else
        info "Operación cancelada"
    fi
}

# Optimizar aplicación
optimize() {
    info "Limpiando cachés..."
    docker-compose exec app php artisan optimize:clear
    
    info "Optimizando aplicación..."
    docker-compose exec app php artisan config:cache
    docker-compose exec app php artisan route:cache
    docker-compose exec app php artisan view:cache
    
    success "Aplicación optimizada"
}

# Ver estado
status() {
    info "Estado de los contenedores:"
    docker-compose ps
    echo ""
    info "Procesos dentro del contenedor:"
    docker-compose exec app supervisorctl status
}

# Reconstruir desde cero
rebuild() {
    warning "Reconstruyendo imagen desde cero..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    success "Imagen reconstruida"
}

# Limpiar todo
clean() {
    warning "Esto eliminará contenedores, imágenes y volúmenes."
    read -p "¿Estás seguro? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        info "Limpiando..."
        docker-compose down -v
        docker rmi avaluo-app 2>/dev/null || true
        success "Limpieza completada"
    else
        info "Operación cancelada"
    fi
}

# Main
check_docker

case "${1:-help}" in
    setup)
        setup
        ;;
    build)
        build
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    shell)
        shell
        ;;
    artisan)
        shift
        artisan "$@"
        ;;
    migrate)
        migrate
        ;;
    fresh)
        fresh
        ;;
    optimize)
        optimize
        ;;
    status)
        status
        ;;
    rebuild)
        rebuild
        ;;
    clean)
        clean
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        error "Comando desconocido: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
