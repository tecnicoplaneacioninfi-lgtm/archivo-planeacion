import { createClient } from '@supabase/supabase-js';
import type { AlistamientoData, DocumentoData, TareaData, PrestamoData, InventarioData } from './types';

const supabaseUrl = 'https://msdtgthskdwafgoqdnyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZHRndGhza2R3YWZnb3Fkbnl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4ODk5OTEsImV4cCI6MjA4MDQ2NTk5MX0.exCCXeI666BkiT1Xtost7j-Vtulm5IhHsYXtaQPlnrk';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Nombres de tablas
export const TABLES = {
    ALISTAMIENTO: 'alistamiento',
    DOCUMENTOS: 'documentos',
    TAREAS: 'tareas',
    PRESTAMOS: 'prestamos',
    INVENTARIO: 'inventario'
} as const;

// Servicio genérico CRUD para Supabase
export const supabaseService = {
    // Agregar documento
    async add<T extends Record<string, any>>(tableName: string, data: T): Promise<string> {
        try {
            console.log(`✅ Intentando guardar en ${tableName}:`, data);

            const { data: result, error } = await supabase
                .from(tableName)
                .insert([{ ...data, created_at: new Date().toISOString() }])
                .select()
                .single();

            if (error) {
                console.error('❌ ERROR SUPABASE:', error);

                // Mensajes específicos según el tipo de error
                if (error.message.includes('relation') && error.message.includes('does not exist')) {
                    const msg = `⚠️ LA TABLA "${tableName}" NO EXISTE EN SUPABASE\n\n` +
                        `SOLUCIÓN:\n` +
                        `1. Abre: https://app.supabase.com/project/msdtgthskdwafgoqdnyv/sql/new\n` +
                        `2. Copia el script SQL del archivo SOLUCION_RAPIDA.md\n` +
                        `3. Haz click en RUN\n` +
                        `4. Recarga esta página`;
                    console.error(msg);
                    alert(msg);
                } else if (error.message.includes('JWT') || error.message.includes('apikey')) {
                    alert('⚠️ API Key incorrecta. Verifica supabase.ts línea 5');
                } else {
                    alert(`Error al guardar: ${error.message}`);
                }
                throw error;
            }

            console.log(`✅ ¡GUARDADO EXITOSO! ID: ${result.id}`);
            return result.id;
        } catch (error: any) {
            console.error('❌ Error en add():', error);
            throw error;
        }
    },

    // Obtener todos los documentos
    async getAll<T>(tableName: string): Promise<(T & { id: string })[]> {
        try {
            console.log(`📥 Cargando ${tableName}...`);
            const { data, error } = await supabase
                .from(tableName)
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('❌ Error cargando:', error);
                return [];
            }

            console.log(`✅ Cargados ${data?.length || 0} registros`);
            return (data || []) as (T & { id: string })[];
        } catch (error: any) {
            console.error('❌ Error en getAll():', error);
            return [];
        }
    },

    // Actualizar documento
    async update<T>(tableName: string, id: string, data: Partial<T>): Promise<void> {
        try {
            console.log(`🔄 Actualizando ${id} en ${tableName}:`, data);
            const { error } = await supabase
                .from(tableName)
                .update(data)
                .eq('id', id);

            if (error) {
                console.error('❌ Error actualizando:', error);
                alert(`Error al actualizar: ${error.message}`);
                throw error;
            }

            console.log('✅ Actualizado exitosamente');
        } catch (error: any) {
            console.error('❌ Error en update():', error);
            throw error;
        }
    },

    // Eliminar documento
    async delete(tableName: string, id: string): Promise<void> {
        try {
            console.log(`🗑️ Eliminando ${id} de ${tableName}`);
            const { error } = await supabase
                .from(tableName)
                .delete()
                .eq('id', id);

            if (error) {
                console.error('❌ Error eliminando:', error);
                alert(`Error al eliminar: ${error.message}`);
                throw error;
            }

            console.log('✅ Eliminado exitosamente');
        } catch (error: any) {
            console.error('❌ Error en delete():', error);
            throw error;
        }
    }
};

// Servicios específicos para cada tabla
export const alistamientoService = {
    add: (data: Omit<AlistamientoData, 'id' | 'createdAt'>) => supabaseService.add(TABLES.ALISTAMIENTO, data),
    getAll: () => supabaseService.getAll<AlistamientoData>(TABLES.ALISTAMIENTO),
    update: (id: string, data: Partial<AlistamientoData>) => supabaseService.update(TABLES.ALISTAMIENTO, id, data),
    delete: (id: string) => supabaseService.delete(TABLES.ALISTAMIENTO, id)
};

export const documentosService = {
    add: (data: Omit<DocumentoData, 'id' | 'createdAt'>) => supabaseService.add(TABLES.DOCUMENTOS, data),
    getAll: () => supabaseService.getAll<DocumentoData>(TABLES.DOCUMENTOS),
    update: (id: string, data: Partial<DocumentoData>) => supabaseService.update(TABLES.DOCUMENTOS, id, data),
    delete: (id: string) => supabaseService.delete(TABLES.DOCUMENTOS, id)
};

export const tareasService = {
    add: (data: Omit<TareaData, 'id'>) => supabaseService.add(TABLES.TAREAS, data),
    getAll: () => supabaseService.getAll<TareaData>(TABLES.TAREAS),
    update: (id: string, data: Partial<TareaData>) => supabaseService.update(TABLES.TAREAS, id, data),
    delete: (id: string) => supabaseService.delete(TABLES.TAREAS, id)
};

export const prestamosService = {
    add: (data: Omit<PrestamoData, 'id'>) => supabaseService.add(TABLES.PRESTAMOS, data),
    getAll: () => supabaseService.getAll<PrestamoData>(TABLES.PRESTAMOS),
    update: (id: string, data: Partial<PrestamoData>) => supabaseService.update(TABLES.PRESTAMOS, id, data),
    delete: (id: string) => supabaseService.delete(TABLES.PRESTAMOS, id)
};

export const inventarioService = {
    add: (data: Omit<InventarioData, 'id'>) => supabaseService.add(TABLES.INVENTARIO, data),
    getAll: () => supabaseService.getAll<InventarioData>(TABLES.INVENTARIO),
    update: (id: string, data: Partial<InventarioData>) => supabaseService.update(TABLES.INVENTARIO, id, data),
    delete: (id: string) => supabaseService.delete(TABLES.INVENTARIO, id)
};
