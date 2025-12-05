import React, { useState, useEffect } from 'react';
import type { TareaData, PrestamoData } from '../types';
import { tareasService, prestamosService, alistamientoService } from '../supabase';
import { getCurrentDate, getStatusBadgeClass } from '../utils';
import { STAFF_LIST } from '../constants';

export const SeguimientoView: React.FC = () => {
    const [tareas, setTareas] = useState<(TareaData & { id: string })[]>([]);
    const [prestamos, setPrestamos] = useState<(PrestamoData & { id: string })[]>([]);
    const [carpetasDisponibles, setCarpetasDisponibles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const [tareaForm, setTareaForm] = useState<Omit<TareaData, 'id'>>({
        titulo: '',
        fecha: getCurrentDate(),
        estado: 'Pendiente'
    });

    const [prestamoForm, setPrestamoForm] = useState<Omit<PrestamoData, 'id'>>({
        persona: '',
        fecha: getCurrentDate(),
        carpeta: '',
        observaciones: '',
        estado: 'Prestado'
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [tareasData, prestamosData, alistamientoData] = await Promise.all([
                tareasService.getAll(),
                prestamosService.getAll(),
                alistamientoService.getAll()
            ]);
            setTareas(tareasData);
            setPrestamos(prestamosData);

            // Extract unique folder identifiers from alistamiento
            const carpetas = alistamientoData.map(doc =>
                `${doc.subserie} - ${doc.asunto.substring(0, 50)}${doc.asunto.length > 50 ? '...' : ''}`
            );
            setCarpetasDisponibles(carpetas);
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Error al cargar datos. Usando modo sin conexión.');
        } finally {
            setLoading(false);
        }
    };

    // Tareas handlers
    const handleTareaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!tareaForm.titulo) {
            alert('Por favor ingrese un título para la tarea');
            return;
        }

        try {
            setLoading(true);
            await tareasService.add(tareaForm);
            await loadData();
            setTareaForm({ titulo: '', fecha: getCurrentDate(), estado: 'Pendiente' });
            alert('Tarea registrada exitosamente');
        } catch (error) {
            console.error('Error saving tarea:', error);
            alert('Error al guardar la tarea');
        } finally {
            setLoading(false);
        }
    };

    const handleTareaEstadoChange = async (id: string, nuevoEstado: TareaData['estado']) => {
        try {
            setLoading(true);
            await tareasService.update(id, { estado: nuevoEstado });
            await loadData();
        } catch (error) {
            console.error('Error updating tarea:', error);
            alert('Error al actualizar el estado');
        } finally {
            setLoading(false);
        }
    };

    const handleTareaDelete = async (id: string) => {
        if (!confirm('¿Está seguro de eliminar esta tarea?')) return;

        try {
            setLoading(true);
            await tareasService.delete(id);
            await loadData();
            alert('Tarea eliminada exitosamente');
        } catch (error) {
            console.error('Error deleting tarea:', error);
            alert('Error al eliminar la tarea');
        } finally {
            setLoading(false);
        }
    };

    // Préstamos handlers
    const handlePrestamoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prestamoForm.persona || !prestamoForm.carpeta) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            setLoading(true);
            await prestamosService.add(prestamoForm);
            await loadData();
            setPrestamoForm({
                persona: '',
                fecha: getCurrentDate(),
                carpeta: '',
                observaciones: '',
                estado: 'Prestado'
            });
            alert('Préstamo registrado exitosamente');
        } catch (error) {
            console.error('Error saving prestamo:', error);
            alert('Error al guardar el préstamo');
        } finally {
            setLoading(false);
        }
    };

    const handlePrestamoDevolucion = async (id: string) => {
        try {
            setLoading(true);
            await prestamosService.update(id, { estado: 'Devuelto' });
            await loadData();
            alert('Préstamo marcado como devuelto');
        } catch (error) {
            console.error('Error updating prestamo:', error);
            alert('Error al marcar como devuelto');
        } finally {
            setLoading(false);
        }
    };

    const handlePrestamoDelete = async (id: string) => {
        if (!confirm('¿Está seguro de eliminar este préstamo?')) return;

        try {
            setLoading(true);
            await prestamosService.delete(id);
            await loadData();
            alert('Préstamo eliminado exitosamente');
        } catch (error) {
            console.error('Error deleting prestamo:', error);
            alert('Error al eliminar el préstamo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Tareas Section */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
                <h2 className="text-2xl font-bold text-corporate-blue mb-6 flex items-center gap-2">
                    <span className="text-3xl">🔎</span>
                    Seguimiento de Tareas
                </h2>

                <form onSubmit={handleTareaSubmit} className="mb-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Título de la Tarea *
                            </label>
                            <input
                                type="text"
                                value={tareaForm.titulo}
                                onChange={(e) => setTareaForm({ ...tareaForm, titulo: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Descripción de la tarea"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={tareaForm.fecha}
                                onChange={(e) => setTareaForm({ ...tareaForm, fecha: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Agregar Tarea
                        </button>
                    </div>
                </form>

                {/* Tareas Table */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b-2 border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Título</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Estado</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareas.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                                        No hay tareas registradas
                                    </td>
                                </tr>
                            ) : (
                                tareas.map((tarea) => (
                                    <tr key={tarea.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">{tarea.titulo}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{tarea.fecha}</td>
                                        <td className="px-4 py-3 text-center">
                                            <select
                                                value={tarea.estado}
                                                onChange={(e) => handleTareaEstadoChange(tarea.id!, e.target.value as TareaData['estado'])}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(tarea.estado)}`}
                                                disabled={loading}
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En Proceso">En Proceso</option>
                                                <option value="Completado">Completado</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleTareaDelete(tarea.id!)}
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
            </div>

            {/* Préstamos Section */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
                <h2 className="text-2xl font-bold text-corporate-blue mb-6 flex items-center gap-2">
                    <span className="text-3xl">📤</span>
                    Control de Préstamos
                </h2>

                <form onSubmit={handlePrestamoSubmit} className="mb-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Persona *
                            </label>
                            <select
                                value={prestamoForm.persona}
                                onChange={(e) => setPrestamoForm({ ...prestamoForm, persona: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                required
                            >
                                <option value="">Seleccionar persona</option>
                                {STAFF_LIST.map(staff => (
                                    <option key={staff} value={staff}>{staff}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Fecha
                            </label>
                            <input
                                type="date"
                                value={prestamoForm.fecha}
                                onChange={(e) => setPrestamoForm({ ...prestamoForm, fecha: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Carpeta/Documento *
                            </label>
                            <select
                                value={prestamoForm.carpeta}
                                onChange={(e) => setPrestamoForm({ ...prestamoForm, carpeta: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                required
                            >
                                <option value="">Seleccione una carpeta</option>
                                {carpetasDisponibles.map((carpeta, index) => (
                                    <option key={index} value={carpeta}>{carpeta}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Observaciones
                            </label>
                            <input
                                type="text"
                                value={prestamoForm.observaciones}
                                onChange={(e) => setPrestamoForm({ ...prestamoForm, observaciones: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                placeholder="Observaciones adicionales"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Registrar Préstamo
                        </button>
                    </div>
                </form>

                {/* Préstamos Table */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b-2 border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Persona</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Carpeta</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Observaciones</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Estado</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prestamos.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                        No hay préstamos registrados
                                    </td>
                                </tr>
                            ) : (
                                prestamos.map((prestamo) => (
                                    <tr key={prestamo.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700 font-medium">{prestamo.persona}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{prestamo.fecha}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{prestamo.carpeta}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{prestamo.observaciones || '-'}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(prestamo.estado)}`}>
                                                {prestamo.estado}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                {prestamo.estado === 'Prestado' && (
                                                    <>
                                                        <button
                                                            onClick={() => handlePrestamoDevolucion(prestamo.id!)}
                                                            className="text-green-600 hover:text-green-800 font-medium text-sm"
                                                            disabled={loading}
                                                        >
                                                            Devolver
                                                        </button>
                                                        <span className="text-gray-300">|</span>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => handlePrestamoDelete(prestamo.id!)}
                                                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                    disabled={loading}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
