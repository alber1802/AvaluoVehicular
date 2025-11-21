# Script de ayuda para gestionar la aplicación Docker en Windows
# Uso: .\docker.ps1 [comando]

param(
    [Parameter(Position=0)]
    [string]$Command = "help",
    
    [Parameter(Position=1, ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

# Colores para output
function Write-Info {
    param([string]$Message)
    Write-Host "ℹ $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "✓ $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠ $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "✗ $Message" -ForegroundColor Red
}

# Función para mostrar ayuda
function Show-Help {
    Write-Host @"
🚀 Script de Gestión - Avaluo Vehicular Docker

Uso: .\docker.ps1 [comando]

Comandos disponibles:

  setup         Configuración inicial (primera vez)
  build         Construir la imagen Docker
  start         Iniciar los contenedores
  stop          Detener los contenedores
  restart       Reiniciar los contenedores
  logs          Ver logs en tiempo real
  shell         Acceder al shell del contenedor
  artisan       Ejecutar comandos artisan (ej: .\docker.ps1 artisan migrate)
  migrate       Ejecutar migraciones
  fresh         Reiniciar base de datos (¡CUIDADO! Borra todos los datos)
  optimize      Limpiar y optimizar cachés
  status        Ver estado de los contenedores
  rebuild       Reconstruir imagen desde cero
  clean         Limpiar contenedores e imágenes
  help          Mostrar esta ayuda

Ejemplos:
  .\docker.ps1 setup
  .\docker.ps1 start
  .\docker.ps1 artisan make:controller TestController
  .\docker.ps1 logs

"@
}

# Verificar si Docker está instalado
function Test-Docker {
    if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
        Write-Error "Docker no está instalado. Por favor instala Docker Desktop primero."
        exit 1
    }
    
    if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
        Write-Error "Docker Compose no está instalado. Por favor instala Docker Desktop primero."
        exit 1
    }
}

# Setup inicial
function Invoke-Setup {
    Write-Info "Configurando proyecto por primera vez..."
    
    # Verificar si existe .env.docker
    if (-not (Test-Path .env.docker)) {
        Write-Warning "No se encontró .env.docker. Creando desde plantilla..."
        Copy-Item .env.example .env.docker
    }
    
    # Crear base de datos si no existe
    if (-not (Test-Path database\database.sqlite)) {
        Write-Info "Creando base de datos SQLite..."
        New-Item -ItemType File -Path database\database.sqlite -Force | Out-Null
    }
    
    # Construir imagen
    Write-Info "Construyendo imagen Docker..."
    docker-compose build
    
    # Iniciar contenedores
    Write-Info "Iniciando contenedores..."
    docker-compose up -d
    
    # Esperar a que el contenedor esté listo
    Write-Info "Esperando a que el contenedor esté listo..."
    Start-Sleep -Seconds 10
    
    # Generar APP_KEY
    Write-Info "Generando APP_KEY..."
    docker-compose exec app php artisan key:generate --force
    
    # Ejecutar migraciones
    Write-Info "Ejecutando migraciones..."
    docker-compose exec app php artisan migrate --force
    
    Write-Success "¡Setup completado! La aplicación está disponible en http://localhost:8080"
}

# Construir imagen
function Invoke-Build {
    Write-Info "Construyendo imagen Docker..."
    docker-compose build
    Write-Success "Imagen construida exitosamente"
}

# Iniciar contenedores
function Invoke-Start {
    Write-Info "Iniciando contenedores..."
    docker-compose up -d
    Write-Success "Contenedores iniciados. Aplicación disponible en http://localhost:8080"
}

# Detener contenedores
function Invoke-Stop {
    Write-Info "Deteniendo contenedores..."
    docker-compose down
    Write-Success "Contenedores detenidos"
}

# Reiniciar contenedores
function Invoke-Restart {
    Write-Info "Reiniciando contenedores..."
    docker-compose restart
    Write-Success "Contenedores reiniciados"
}

# Ver logs
function Invoke-Logs {
    Write-Info "Mostrando logs (Ctrl+C para salir)..."
    docker-compose logs -f
}

# Acceder al shell
function Invoke-Shell {
    Write-Info "Accediendo al shell del contenedor..."
    docker-compose exec app sh
}

# Ejecutar comando artisan
function Invoke-Artisan {
    if ($Args.Count -eq 0) {
        Write-Error "Debes especificar un comando artisan"
        Write-Host "Ejemplo: .\docker.ps1 artisan migrate"
        exit 1
    }
    
    $artisanCmd = $Args -join " "
    Write-Info "Ejecutando: php artisan $artisanCmd"
    docker-compose exec app php artisan $artisanCmd
}

# Ejecutar migraciones
function Invoke-Migrate {
    Write-Info "Ejecutando migraciones..."
    docker-compose exec app php artisan migrate --force
    Write-Success "Migraciones ejecutadas"
}

# Reiniciar base de datos
function Invoke-Fresh {
    Write-Warning "¡ADVERTENCIA! Esto borrará todos los datos de la base de datos."
    $confirmation = Read-Host "¿Estás seguro? (y/N)"
    if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
        Write-Info "Reiniciando base de datos..."
        docker-compose exec app php artisan migrate:fresh --force
        Write-Success "Base de datos reiniciada"
    } else {
        Write-Info "Operación cancelada"
    }
}

# Optimizar aplicación
function Invoke-Optimize {
    Write-Info "Limpiando cachés..."
    docker-compose exec app php artisan optimize:clear
    
    Write-Info "Optimizando aplicación..."
    docker-compose exec app php artisan config:cache
    docker-compose exec app php artisan route:cache
    docker-compose exec app php artisan view:cache
    
    Write-Success "Aplicación optimizada"
}

# Ver estado
function Invoke-Status {
    Write-Info "Estado de los contenedores:"
    docker-compose ps
    Write-Host ""
    Write-Info "Procesos dentro del contenedor:"
    docker-compose exec app supervisorctl status
}

# Reconstruir desde cero
function Invoke-Rebuild {
    Write-Warning "Reconstruyendo imagen desde cero..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    Write-Success "Imagen reconstruida"
}

# Limpiar todo
function Invoke-Clean {
    Write-Warning "Esto eliminará contenedores, imágenes y volúmenes."
    $confirmation = Read-Host "¿Estás seguro? (y/N)"
    if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
        Write-Info "Limpiando..."
        docker-compose down -v
        docker rmi avaluo-app 2>$null
        Write-Success "Limpieza completada"
    } else {
        Write-Info "Operación cancelada"
    }
}

# Main
Test-Docker

switch ($Command.ToLower()) {
    "setup" { Invoke-Setup }
    "build" { Invoke-Build }
    "start" { Invoke-Start }
    "stop" { Invoke-Stop }
    "restart" { Invoke-Restart }
    "logs" { Invoke-Logs }
    "shell" { Invoke-Shell }
    "artisan" { Invoke-Artisan }
    "migrate" { Invoke-Migrate }
    "fresh" { Invoke-Fresh }
    "optimize" { Invoke-Optimize }
    "status" { Invoke-Status }
    "rebuild" { Invoke-Rebuild }
    "clean" { Invoke-Clean }
    "help" { Show-Help }
    default {
        Write-Error "Comando desconocido: $Command"
        Write-Host ""
        Show-Help
        exit 1
    }
}
