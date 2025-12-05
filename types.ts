export interface AlistamientoData {
  id?: string;
  codigo: string;
  serie: string;
  subserie: string;
  asunto: string;
  checklist: boolean;
  rotulado: boolean;
  foliada: boolean;
  createdAt: Date;
}

export interface DocumentoData extends AlistamientoData {
  // Inherits structure, potentially adds specific document metadata
  tipoDocumento?: string;
}

export interface TareaData {
  id?: string;
  titulo: string;
  fecha: string;
  estado: 'Pendiente' | 'En Proceso' | 'Completado';
}

export interface PrestamoData {
  id?: string;
  persona: string;
  fecha: string;
  carpeta: string; // ID or Name of folder
  observaciones: string;
  estado: 'Prestado' | 'Devuelto';
}

export interface InventarioData {
  id?: string;
  nombre_archivo: string;
  ubicacion: string;
  caja: string;
  carpeta: string;
  descripcion: string;
  fecha_ingreso: string;
}

// TRD Structure
export interface TRDSubserie {
  id: string;
  nombre: string;
}

export interface TRDSerie {
  id: string;
  nombre: string;
  subseries: TRDSubserie[];
}

export interface TRDCodigo {
  id: string;
  nombre: string; // The code itself, e.g., "100"
  series: TRDSerie[];
}