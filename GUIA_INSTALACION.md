# 🚀 Guía Rápida de Instalación y Configuración

## 📥 Paso 1: Instalar Node.js

### Opción 1: Instalación Manual (Recomendada)
1. Ve a: **https://nodejs.org/**
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador
4. Sigue las instrucciones (acepta todas las opciones por defecto)
5. **Reinicia tu computadora** (importante)

### Opción 2: Verificar si ya está instalado
Abre PowerShell y ejecuta:
```powershell
node --version
npm --version
```

Si ves números de versión, ya está instalado ✅

---

## 📦 Paso 2: Instalar Dependencias del Proyecto

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Navega a la carpeta del proyecto
cd "c:\Users\JSANTOS\Documents\OFICINA ASESORA DE PLANEACION\archivo\WEB ARCHIVO\archivo-planeacion"

# Instala las dependencias
npm install
```

**Tiempo estimado:** 2-5 minutos

---

## 🎮 Paso 3: Ejecutar el Proyecto

### Modo Desarrollo (para trabajar)
```powershell
npm run dev
```

Luego abre tu navegador en: **http://localhost:3000**

### Modo Producción (para desplegar)
```powershell
npm run build
npm run preview
```

---

## 🔄 Paso 4: Subir Cambios a GitHub

### Método 1: Usar el Script Automático
```powershell
# Ejecuta el script de ayuda
.\subir-a-github.ps1
```

### Método 2: Manual
```powershell
# 1. Ver cambios
git status

# 2. Agregar todos los archivos
git add .

# 3. Crear commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push origin main
```

---

## ❓ Solución de Problemas Comunes

### Error: "npm no se reconoce"
**Causa:** Node.js no está instalado o no está en el PATH  
**Solución:** 
1. Instala Node.js desde https://nodejs.org/
2. Reinicia tu computadora
3. Abre una nueva ventana de PowerShell

### Error: "git no se reconoce"
**Causa:** Git no está instalado  
**Solución:** 
1. Descarga Git desde https://git-scm.com/
2. Instala con opciones por defecto
3. Reinicia PowerShell

### Error al ejecutar scripts de PowerShell
**Causa:** Política de ejecución de scripts  
**Solución:**
```powershell
# Ejecuta como Administrador
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "Cannot find module"
**Causa:** Dependencias no instaladas  
**Solución:**
```powershell
# Elimina node_modules y reinstala
Remove-Item -Recurse -Force node_modules
npm install
```

### Error al hacer push a GitHub
**Causa:** Credenciales no configuradas  
**Solución:**
```powershell
# Configura tu usuario de Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

---

## 📚 Comandos Útiles

### Git
```powershell
git status              # Ver estado actual
git log --oneline       # Ver historial
git pull origin main    # Actualizar desde GitHub
git branch              # Ver ramas
```

### NPM
```powershell
npm install             # Instalar dependencias
npm run dev             # Ejecutar en desarrollo
npm run build           # Crear build de producción
npm list                # Ver paquetes instalados
```

### PowerShell
```powershell
cd <ruta>               # Cambiar directorio
ls                      # Listar archivos
pwd                     # Ver directorio actual
Clear-Host              # Limpiar pantalla (o cls)
```

---

## 🎯 Checklist de Verificación

Antes de comenzar a trabajar, verifica:

- [ ] Node.js instalado (`node --version`)
- [ ] NPM instalado (`npm --version`)
- [ ] Git instalado (`git --version`)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Proyecto ejecutándose (`npm run dev`)
- [ ] Git configurado (usuario y email)
- [ ] Conexión a GitHub funcionando (`git push`)

---

## 📞 Recursos Adicionales

- **Node.js:** https://nodejs.org/
- **Git:** https://git-scm.com/
- **GitHub Desktop:** https://desktop.github.com/ (alternativa visual)
- **VS Code:** https://code.visualstudio.com/ (editor recomendado)

---

## 💡 Consejos

1. **Siempre haz `git pull` antes de empezar a trabajar** para tener la última versión
2. **Haz commits frecuentes** con mensajes descriptivos
3. **No subas archivos grandes** (usa .gitignore)
4. **Mantén actualizado Node.js** a la versión LTS
5. **Usa `npm run dev`** para desarrollo, no `npm run build`

---

**¿Necesitas ayuda?** Revisa el archivo `REPORTE_ERRORES.md` para más detalles.
