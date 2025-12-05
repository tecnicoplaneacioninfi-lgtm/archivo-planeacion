# 🚨 SOLUCIÓN RÁPIDA - No se guardan los datos

## El problema es que las tablas NO existen en Supabase

### ✅ SOLUCIÓN EN 3 PASOS:

## Paso 1: Ve a Supabase SQL Editor

1. Abre: https://app.supabase.com/project/msdtgthskdwafgoqdnyv/sql/new
2. Verás un editor SQL

## Paso 2: Copia y pega este código completo:

```sql
-- Eliminar tablas si existen (para empezar limpio)
DROP TABLE IF EXISTS alistamiento CASCADE;
DROP TABLE IF EXISTS documentos CASCADE;
DROP TABLE IF EXISTS tareas CASCADE;
DROP TABLE IF EXISTS prestamos CASCADE;
DROP TABLE IF EXISTS inventario CASCADE;

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

-- Tabla Documentos (copia de alistamiento para el módulo de documentos)
CREATE TABLE documentos (
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

-- Habilitar acceso público (para desarrollo)
ALTER TABLE alistamiento ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestamos ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventario ENABLE ROW LEVEL SECURITY;

-- Permitir TODO (lectura y escritura)
CREATE POLICY "Permitir todo en alistamiento" ON alistamiento FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en documentos" ON documentos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en tareas" ON tareas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en prestamos" ON prestamos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo en inventario" ON inventario FOR ALL USING (true) WITH CHECK (true);
```

## Paso 3: Ejecutar

1. Haz click en el botón **"RUN"** (abajo a la derecha)
2. Deberías ver "Success. No rows returned"

## ✅ Ahora recarga tu aplicación y prueba de nuevo

Abre la consola del navegador (F12) y verás:
- ✅ `Guardando en...`
- ✅ `Guardado exitoso!`

---

## 🔍 Si aún no funciona:

Abre la consola del navegador (F12) y envíame una captura de los errores que aparecen.
