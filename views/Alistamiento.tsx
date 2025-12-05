import React, { useState, useEffect } from 'react';
import { TRD_DATA } from '../constants';
import type { AlistamientoData, TRDSerie, TRDSubserie } from '../types';
import { alistamientoService } from '../supabase';
import { getCurrentDate, formatDateDisplay } from '../utils';

export const AlistamientoView: React.FC = () => {
    const [formData, setFormData] = useState<Omit<AlistamientoData, 'id' | 'createdAt'>>({
        codigo: '',
        serie: '',
        subserie: '',
        asunto: '',
        checklist: false,
        rotulado: false,
        foliada: false
    });

    const [documentos, setDocumentos] = useState<(AlistamientoData & { id: string })[]>([]);
    const [series, setSeries] = useState<TRDSerie[]>([]);
    const [subseries, setSubseries] = useState<TRDSubserie[]>([]);
    const [loading, setLoading] = useState(false);

    // Load documents on mount
    useEffect(() => {
        loadDocumentos();
    }, []);

    // Update series when codigo changes
    useEffect(() => {
        if (formData.codigo) {
            const codigo = TRD_DATA.find(c => c.id === formData.codigo);
            setSeries(codigo?.series || []);
            setFormData(prev => ({ ...prev, serie: '', subserie: '' }));
            setSubseries([]);
        }
    }, [formData.codigo]);

    // Update subseries when serie changes
    useEffect(() => {
        if (formData.serie) {
            const serie = series.find(s => s.id === formData.serie);
            setSubseries(serie?.subseries || []);
            setFormData(prev => ({ ...prev, subserie: '' }));
        }
    }, [formData.serie, series]);

    const loadDocumentos = async () => {
        try {
            setLoading(true);
            const data = await alistamientoService.getAll();
            setDocumentos(data);
        } catch (error) {
            console.error('Error loading documents:', error);
            alert('Error al cargar documentos. Usando modo sin conexión.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.codigo || !formData.serie || !formData.subserie || !formData.asunto) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }

        try {
            setLoading(true);

            // No incluir createdAt - Supabase lo agrega automáticamente
            await alistamientoService.add(formData);
            await loadDocumentos();

            // Reset form
            setFormData({
                codigo: '',
                serie: '',
                subserie: '',
                asunto: '',
                checklist: false,
                rotulado: false,
                foliada: false
            });

            alert('Documento registrado exitosamente');
        } catch (error) {
            console.error('Error saving document:', error);
            alert('Error al guardar el documento. Verifique la conexión con Supabase.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Está seguro de eliminar este documento?')) return;

        try {
            setLoading(true);
            await alistamientoService.delete(id);
            await loadDocumentos();
            alert('Documento eliminado exitosamente');
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Error al eliminar el documento');
        } finally {
            setLoading(false);
        }
    };

    const handleChecklistToggle = async (id: string, field: 'checklist' | 'rotulado' | 'foliada', currentValue: boolean) => {
        try {
            setLoading(true);
            await alistamientoService.update(id, { [field]: !currentValue });
            await loadDocumentos();
        } catch (error) {
            console.error('Error updating field:', error);
            alert('Error al actualizar el campo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-corporate-blue">
                <h2 className="text-2xl font-bold text-corporate-blue mb-6 flex items-center gap-2">
                    <span className="text-3xl">📁</span>
                    Alistamiento de Documentos
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Código */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Código *
                            </label>
                            <select
                                value={formData.codigo}
                                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                required
                            >
                                <option value="">Seleccione un código</option>
                                {TRD_DATA.map(codigo => (
                                    <option key={codigo.id} value={codigo.id}>
                                        {codigo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Serie */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Serie *
                            </label>
                            <select
                                value={formData.serie}
                                onChange={(e) => setFormData({ ...formData, serie: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                required
                                disabled={!formData.codigo}
                            >
                                <option value="">Seleccione una serie</option>
                                {series.map(serie => (
                                    <option key={serie.id} value={serie.id}>
                                        {serie.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subserie */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Subserie *
                            </label>
                            <select
                                value={formData.subserie}
                                onChange={(e) => setFormData({ ...formData, subserie: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                                required
                                disabled={!formData.serie}
                            >
                                <option value="">Seleccione una subserie</option>
                                {subseries.map(subserie => (
                                    <option key={subserie.id} value={subserie.id}>
                                        {subserie.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Asunto */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Asunto *
                        </label>
                        <textarea
                            value={formData.asunto}
                            onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                            rows={3}
                            placeholder="Describa el asunto del documento"
                            required
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.checklist}
                                onChange={(e) => setFormData({ ...formData, checklist: e.target.checked })}
                                className="w-5 h-5 text-corporate-blue border-gray-300 rounded focus:ring-2 focus:ring-corporate-blue"
                            />
                            <span className="text-sm font-medium text-gray-700">Checklist Completado</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.rotulado}
                                onChange={(e) => setFormData({ ...formData, rotulado: e.target.checked })}
                                className="w-5 h-5 text-corporate-blue border-gray-300 rounded focus:ring-2 focus:ring-corporate-blue"
                            />
                            <span className="text-sm font-medium text-gray-700">Rotulado</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.foliada}
                                onChange={(e) => setFormData({ ...formData, foliada: e.target.checked })}
                                className="w-5 h-5 text-corporate-blue border-gray-300 rounded focus:ring-2 focus:ring-corporate-blue"
                            />
                            <span className="text-sm font-medium text-gray-700">Foliada</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-corporate-blue text-white font-semibold rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-corporate-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Guardando...' : 'Registrar Documento'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Documentos en Alistamiento ({documentos.length})
                </h3>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b-2 border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Código</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Serie</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subserie</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asunto</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Checklist</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Rotulado</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Foliada</th>
                                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documentos.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                        No hay documentos registrados
                                    </td>
                                </tr>
                            ) : (
                                documentos.map((doc) => (
                                    <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">{doc.codigo}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{doc.serie}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{doc.subserie}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{doc.asunto}</td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={doc.checklist}
                                                onChange={() => handleChecklistToggle(doc.id, 'checklist', doc.checklist)}
                                                disabled={loading}
                                                className="w-5 h-5 text-corporate-blue border-gray-300 rounded focus:ring-2 focus:ring-corporate-blue cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={doc.rotulado}
                                                onChange={() => handleChecklistToggle(doc.id, 'rotulado', doc.rotulado)}
                                                disabled={loading}
                                                className="w-5 h-5 text-corporate-blue border-gray-300 rounded focus:ring-2 focus:ring-corporate-blue cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={doc.foliada}
                                                onChange={() => handleChecklistToggle(doc.id, 'foliada', doc.foliada)}
                                                disabled={loading}
                                                className="w-5 h-5 text-corporate-blue border-gray-300 rounded focus:ring-2 focus:ring-corporate-blue cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(doc.id)}
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
        </div>
    );
};
