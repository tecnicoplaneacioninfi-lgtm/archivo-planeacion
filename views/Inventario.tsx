import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import type { InventarioData } from '../types';
import { inventarioService } from '../supabase';
import { getCurrentDate, filterBySearch, exportToExcel } from '../utils';

export const InventarioView: React.FC = () => {
    const [inventario, setInventario] = useState<(InventarioData & { id: string })[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<Omit<InventarioData, 'id'>>({
        nombre_archivo: '',
        ubicacion: '',
        caja: '',
        carpeta: '',
        descripcion: '',
        fecha_ingreso: getCurrentDate()
    });

    useEffect(() => {
        loadInventario();
    }, []);

    const loadInventario = async () => {
        try {
            setLoading(true);
            const data = await inventarioService.getAll();
            setInventario(data);
        } catch (error) {
            console.error('Error loading inventory:', error);
            alert('Error al cargar inventario. Usando modo sin conexión.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.nombre_archivo || !formData.ubicacion || !formData.caja) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            setLoading(true);
            await inventarioService.add(formData);
            await loadInventario();

            // Reset form
            setFormData({
                nombre_archivo: '',
                ubicacion: '',
                caja: '',
                carpeta: '',
                descripcion: '',
                fecha_ingreso: getCurrentDate()
            });

            alert('Registro de inventario agregado exitosamente');
        } catch (error) {
            console.error('Error saving inventory:', error);
            alert('Error al guardar el registro');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Está seguro de eliminar este registro?')) return;

        try {
            setLoading(true);
            await inventarioService.delete(id);
            await loadInventario();
            alert('Registro eliminado exitosamente');
        } catch (error) {
            console.error('Error deleting inventory:', error);
            alert('Error al eliminar el registro');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setLoading(true);
            const reader = new FileReader();
            reader.onload = async (evt) => {
                try {
                    const bstr = evt.target?.result;
                    const wb = XLSX.read(bstr, { type: 'binary' });
                    const wsname = wb.SheetNames[0];
                    const ws = wb.Sheets[wsname];
                    const data = XLSX.utils.sheet_to_json(ws);

                    console.log('Datos importados:', data);

                    let count = 0;
                    for (const row of data as any[]) {
                        // Map Excel columns to DB fields
                        // Assumes Excel headers: Nombre Archivo, Ubicacion, Caja, Carpeta, Descripcion, Fecha Ingreso
                        const newItem: Omit<InventarioData, 'id'> = {
                            nombre_archivo: row['Nombre Archivo'] || row['nombre_archivo'] || row['Nombre'] || '',
                            ubicacion: row['Ubicación'] || row['Ubicacion'] || row['ubicacion'] || '',
                            caja: row['Caja'] || row['caja'] || '',
                            carpeta: row['Carpeta'] || row['carpeta'] || '',
                            descripcion: row['Descripción'] || row['Descripcion'] || row['descripcion'] || '',
                            fecha_ingreso: row['Fecha Ingreso'] || row['Fecha'] || row['fecha_ingreso'] || getCurrentDate()
                        };

                        if (newItem.nombre_archivo && newItem.ubicacion) {
                            await inventarioService.add(newItem);
                            count++;
                        }
                    }

                    await loadInventario();
                    alert(`Se importaron ${count} registros exitosamente`);
                } catch (error) {
                    console.error('Error parsing Excel:', error);
                    alert('Error al procesar el archivo Excel');
                }
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir el archivo');
        } finally {
            setLoading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleExport = () => {
        const dataToExport = filteredInventario.map(item => ({
            'Nombre Archivo': item.nombre_archivo,
            'Ubicación': item.ubicacion,
            'Caja': item.caja,
            'Carpeta': item.carpeta,
            'Descripción': item.descripcion,
            'Fecha Ingreso': item.fecha_ingreso
        }));

        exportToExcel(dataToExport, `inventario_${new Date().getTime()}`);
    };

    const filteredInventario = filterBySearch(inventario, searchTerm);

    // Group by ubicacion for stats
    const ubicaciones = [...new Set(inventario.map(item => item.ubicacion))];
    const cajas = [...new Set(inventario.map(item => item.caja))];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-corporate-blue flex items-center gap-2">
                        <span className="text-3xl">📦</span>
                        Inventario de Archivo
                    </h2>

                    <button
                        onClick={handleExport}
                        disabled={inventario.length === 0 || loading}
                        className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        📥 Exportar Inventario
                    </button>

                    <div className="relative">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="excel-upload"
                            disabled={loading}
                        />
                        <label
                            htmlFor="excel-upload"
                            className={`px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 cursor-pointer transition-all flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span>📤</span> Importar Excel
                        </label>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="text-sm text-purple-600 font-semibold">Total Registros</div>
                        <div className="text-2xl font-bold text-purple-700">{inventario.length}</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-sm text-blue-600 font-semibold">Ubicaciones</div>
                        <div className="text-2xl font-bold text-blue-700">{ubicaciones.length}</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="text-sm text-green-600 font-semibold">Cajas</div>
                        <div className="text-2xl font-bold text-green-700">{cajas.length}</div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Agregar Nuevo Registro</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre del Archivo *
                            </label>
                            <input
                                type="text"
                                value={formData.nombre_archivo}
                                onChange={(e) => setFormData({ ...formData, nombre_archivo: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Ej: Actas 2024"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Ubicación *
                            </label>
                            <input
                                type="text"
                                value={formData.ubicacion}
                                onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Ej: Estante A, Nivel 2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Caja *
                            </label>
                            <input
                                type="text"
                                value={formData.caja}
                                onChange={(e) => setFormData({ ...formData, caja: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Ej: Caja 001"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Carpeta
                            </label>
                            <input
                                type="text"
                                value={formData.carpeta}
                                onChange={(e) => setFormData({ ...formData, carpeta: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Ej: Carpeta A"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Fecha de Ingreso
                            </label>
                            <input
                                type="date"
                                value={formData.fecha_ingreso}
                                onChange={(e) => setFormData({ ...formData, fecha_ingreso: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Descripción
                            </label>
                            <input
                                type="text"
                                value={formData.descripcion}
                                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Descripción breve"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Guardando...' : 'Agregar Registro'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Search and Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Buscar en inventario
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nombre, ubicación, caja, carpeta..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                    />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Registros de Inventario ({filteredInventario.length})
                </h3>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">
                        Cargando inventario...
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b-2 border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nombre Archivo</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ubicación</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Caja</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Carpeta</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha Ingreso</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInventario.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            {searchTerm ? 'No se encontraron registros con ese criterio de búsqueda' : 'No hay registros en el inventario'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredInventario.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{item.nombre_archivo}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.ubicacion}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                                    {item.caja}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.carpeta || '-'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={item.descripcion}>
                                                {item.descripcion || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{item.fecha_ingreso}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => handleDelete(item.id!)}
                                                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                    disabled={loading}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
