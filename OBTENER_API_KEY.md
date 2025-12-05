# 🔑 CÓMO OBTENER TU API KEY DE SUPABASE

## Paso 1: Ve a tu proyecto Supabase

Abre este link:
https://app.supabase.com/project/msdtgthskdwafgoqdnyv/settings/api

## Paso 2: Copia la API Key correcta

En la página verás dos keys:

1. **Project URL** - Ya la tenemos: `https://msdtgthskdwafgoqdnyv.supabase.co`
2. **anon public** - Esta es la que necesitas copiar

## Paso 3: Reemplaza en supabase.ts

Abre el archivo `supabase.ts` y en la línea 5, reemplaza la key actual con la que copiaste.

Debe verse así:

```typescript
const supabaseKey = 'TU_KEY_AQUI'; // La que copiaste
```

## Paso 4: Guarda y recarga

1. Guarda el archivo (Ctrl+S)
2. Recarga la página del navegador
3. Intenta guardar de nuevo

---

## ⚡ ALTERNATIVA RÁPIDA:

Si no puedes acceder a Supabase Dashboard, dime y te ayudo a crear un nuevo proyecto.
