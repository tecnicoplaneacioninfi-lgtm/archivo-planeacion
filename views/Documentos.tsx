import React, { useState, useEffect } from 'react';
import type { AlistamientoData } from '../types';
import { alistamientoService } from '../supabase';
import { formatDateDisplay, exportToExcel, filterBySearch } from '../utils';

export const DocumentosView: React.FC = () => {
    const [documentos, setDocumentos] = useState<(AlistamientoData & { id: string })[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadDocumentos();
    }, []);

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

    const handleExport = () => {
        const dataToExport = filteredDocumentos.map(doc => ({
            Código: doc.codigo,
            Serie: doc.serie,
            Subserie: doc.subserie,
            Asunto: doc.asunto,
            Checklist: doc.checklist ? 'Sí' : 'No',
            Rotulado: doc.rotulado ? 'Sí' : 'No',
            Foliada: doc.foliada ? 'Sí' : 'No',
            Fecha: doc.createdAt ? formatDateDisplay(doc.createdAt) : 'N/A'
        }));

        exportToExcel(dataToExport, `documentos_${new Date().getTime()}`);
    };

    const filteredDocumentos = filterBySearch(documentos, searchTerm);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-corporate-green">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-corporate-blue flex items-center gap-2">
                        <span className="text-3xl">📄</span>
                        Gestión de Documentos
                    </h2>

                    <button
                        onClick={handleExport}
                        disabled={documentos.length === 0 || loading}
                        className="px-4 py-2 bg-corporate-green text-white font-semibold rounded-lg hover:bg-corporate-darkGreen focus:outline-none focus:ring-2 focus:ring-corporate-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        📥 Exportar a Excel
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Buscar documentos
                    </label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por código, serie, subserie, asunto..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-corporate-blue focus:border-transparent"
                    />
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-sm text-blue-600 font-semibold">Total Documentos</div>
                        <div className="text-2xl font-bold text-blue-700">{documentos.length}</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="text-sm text-green-600 font-semibold">Con Checklist</div>
                        <div className="text-2xl font-bold text-green-700">
                            {documentos.filter(d => d.checklist).length}
                        </div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="text-sm text-purple-600 font-semibold">Rotulados</div>
                        <div className="text-2xl font-bold text-purple-700">
                            {documentos.filter(d => d.rotulado).length}
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="text-sm text-orange-600 font-semibold">Foliados</div>
                        <div className="text-2xl font-bold text-orange-700">
                            {documentos.filter(d => d.foliada).length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Documentos Registrados ({filteredDocumentos.length})
                </h3>

                {loading ? (
                    <div className="text-center py-8 text-gray-500">
                        Cargando documentos...
                    </div>
                ) : (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b-2 border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Código</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Serie</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subserie</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Asunto</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Estado</th>
                                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDocumentos.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            {searchTerm ? 'No se encontraron documentos con ese criterio de búsqueda' : 'No hay documentos registrados'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDocumentos.map((doc) => (
                                        <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{doc.codigo}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{doc.serie}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700">{doc.subserie}</td>
                                            <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={doc.asunto}>
                                                {doc.asunto}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${doc.checklist ? 'bg-green-500' : 'bg-gray-300'}`} title="Checklist"></span>
                                                    <span className={`w-2 h-2 rounded-full ${doc.rotulado ? 'bg-green-500' : 'bg-gray-300'}`} title="Rotulado"></span>
                                                    <span className={`w-2 h-2 rounded-full ${doc.foliada ? 'bg-green-500' : 'bg-gray-300'}`} title="Foliada"></span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                        title="Ver detalles"
                                                    >
                                                        Ver
                                                    </button>
                                                    <span className="text-gray-300">|</span>
                                                    <button
                                                        onClick={() => handleDelete(doc.id)}
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
                )}
            </div>
        </div>
    );
};
