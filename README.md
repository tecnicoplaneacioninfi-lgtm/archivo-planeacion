# Sistema de Gestión Documental - Oficina de Planeación

## 🚀 Configuración de Supabase

### Paso 1: Obtener tu API Key

1. Ve a [Supabase Dashboard](https://app.supabase.com/)
2. Selecciona tu proyecto: `archivo-de-planeacion`
3. Ve a **Settings** → **API**
4. Copia el **anon/public key**

### Paso 2: Configurar la API Key

Abre el archivo `supabase.ts` y reemplaza la línea 5:

```typescript
const supabaseKey = 'TU_API_KEY_AQUI';
```

### Paso 3: Crear las Tablas

En Supabase, ve a **SQL Editor** y ejecuta este script:

```sql
-- Tabla Alistamiento
CREATE TABLE alistamiento (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  serie TEXT NOT NULL,
  subserie TEXT NOT NULL,
  asunto TEXT NOT NULL,
  checklist BOOLEAN DEFAULT false,
  rotulado BOOLEAN DEFAULT false,
  foliada BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Documentos
CREATE TABLE documentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL,
  serie TEXT NOT NULL,
  subserie TEXT NOT NULL,
  asunto TEXT NOT NULL,
  checklist BOOLEAN DEFAULT false,
  rotulado BOOLEAN DEFAULT false,
  foliada BOOLEAN DEFAULT false,
  tipo_documento TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Tareas
CREATE TABLE tareas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  fecha TEXT NOT NULL,
  estado TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Préstamos
CREATE TABLE prestamos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  persona TEXT NOT NULL,
  fecha TEXT NOT NULL,
  carpeta TEXT NOT NULL,
  observaciones TEXT,
  estado TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla Inventario
CREATE TABLE inventario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_archivo TEXT NOT NULL,
  ubicacion TEXT NOT NULL,
  caja TEXT NOT NULL,
  carpeta TEXT,
  descripcion TEXT,
  fecha_ingreso TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE alistamiento ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestamos ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (permitir todo para desarrollo)
CREATE POLICY "Enable all for alistamiento" ON alistamiento FOR ALL USING (true);
CREATE POLICY "Enable all for documentos" ON documentos FOR ALL USING (true);
CREATE POLICY "Enable all for tareas" ON tareas FOR ALL USING (true);
CREATE POLICY "Enable all for prestamos" ON prestamos FOR ALL USING (true);
CREATE POLICY "Enable all for inventario" ON inventario FOR ALL USING (true);
```

## ✅ ¡Listo! Ahora puedes usar la aplicación

## 📋 Funcionalidades

### 1. Alistamiento
- ✅ Registrar documentos nuevos
- ✅ **Editar checklist después de guardar** (click en los checkboxes)
- ✅ Modificar rotulado y foliada en cualquier momento
- ✅ Organizar por TRD

### 2. Documentos
- ✅ Ver todos los documentos
- ✅ Exportar a Excel
- ✅ Buscar documentos
- ✅ Estadísticas visuales

### 3. Seguimiento
- ✅ Gestionar tareas con estados
- ✅ Control de préstamos
- ✅ **Selector automático de carpetas** desde Alistamiento

### 4. Inventario
- ✅ Registrar ubicación física
- ✅ Exportar inventario a Excel
- ✅ Buscar por ubicación/caja

### 5. Normatividad
- ✅ Chat con asistente (sin necesidad de API externa)
- ✅ Consultas sobre Acuerdo 594/2000
- ✅ Respuestas instantáneas

## 🔧 Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 💡 Ventajas de Supabase vs Firebase

✅ **Más simple** - No necesita configuración compleja de reglas
✅ **Más rápido** - Respuestas instantáneas
✅ **SQL directo** - Puedes hacer consultas SQL cuando necesites
✅ **Gratis** - Plan gratuito muy generoso
✅ **Sin errores de permisos** - Configuración más clara

## 🐛 Solución de Problemas

### No se guardan los datos

1. Verifica que copiaste bien la API key en `supabase.ts`
2. Asegúrate de haber creado las tablas (Paso 3)
3. Revisa la consola del navegador (F12) para ver los logs

### Ver los logs

Abre la consola del navegador (F12) y busca:
- ✅ `Guardando en...` - Intentando guardar
- ✅ `Guardado exitoso!` - Se guardó correctamente
- ❌ `Error guardando` - Hubo un problema

## 📝 Notas

- Todos los datos se guardan en Supabase (PostgreSQL)
- Los checkboxes en Alistamiento son editables después de guardar
- El chat de Normatividad funciona sin APIs externas
- Exportación a Excel disponible en Documentos e Inventario
