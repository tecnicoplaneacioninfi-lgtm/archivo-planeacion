# ========================================
# SCRIPT RÁPIDO PARA SUBIR CAMBIOS A GIT
# ========================================

Write-Host ""
Write-Host "🔄 Subiendo cambios a GitHub..." -ForegroundColor Cyan
Write-Host ""

# Mostrar estado actual
Write-Host "📋 Estado actual:" -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "➕ Agregando archivos..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Creando commit..." -ForegroundColor Yellow
git commit -m "Actualización del proyecto - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

Write-Host ""
Write-Host "☁️ Subiendo a GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ ¡Cambios subidos exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
