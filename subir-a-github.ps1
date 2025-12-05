# Script de Ayuda para Git
# Ejecuta este script después de instalar Node.js

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SCRIPT DE AYUDA - GIT Y GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
Write-Host "1. Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "   ✓ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "   ✓ NPM: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Node.js NO está instalado" -ForegroundColor Red
    Write-Host "   → Descarga desde: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Presiona cualquier tecla para salir..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""

# Verificar estado de Git
Write-Host "2. Verificando estado de Git..." -ForegroundColor Yellow
git status

Write-Host ""

# Preguntar si desea continuar
Write-Host "¿Deseas subir los cambios a GitHub? (S/N): " -ForegroundColor Cyan -NoNewline
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s") {
    Write-Host ""
    Write-Host "3. Agregando archivos..." -ForegroundColor Yellow
    git add .
    
    Write-Host ""
    Write-Host "4. Ingresa el mensaje del commit: " -ForegroundColor Cyan -NoNewline
    $mensaje = Read-Host
    
    if ([string]::IsNullOrWhiteSpace($mensaje)) {
        $mensaje = "Actualización de archivos - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    Write-Host ""
    Write-Host "5. Creando commit..." -ForegroundColor Yellow
    git commit -m "$mensaje"
    
    Write-Host ""
    Write-Host "6. Subiendo cambios a GitHub..." -ForegroundColor Yellow
    git push origin main
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ CAMBIOS SUBIDOS EXITOSAMENTE" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Operación cancelada." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
