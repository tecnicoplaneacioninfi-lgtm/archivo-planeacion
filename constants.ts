import { TRDCodigo } from './types';

export const STAFF_LIST = [
  "ANDRES LAMPREA",
  "LINDA KATHERINE",
  "MARITZA MACHADO",
  "KATHERIN CRUZ",
  "PAOLA OYOLA",
  "MANUELA GOMEZ",
  "JORGE ROJAS",
  "OTROS"
];

// TRD Data estructurada según requerimiento
export const TRD_DATA: TRDCodigo[] = [
  {
    id: "102",
    nombre: "102 - OFICINA ASESORA DE PLANEACIÓN",
    series: [
      {
        id: "102.2",
        nombre: "102.2 - ACTAS",
        subseries: [
          { id: "102.2.10", nombre: "102.2.10 - Actas Comité Gestión Ambiental" },
          { id: "102.2.11", nombre: "102.2.11 - Comité de Investigación" },
          { id: "102.2.15", nombre: "102.2.15 - Innovación y Gestión del Conocimiento" },
          { id: "102.2.xx", nombre: "102.2.xx - Comité Institucional Gestión y Desempeño" }
        ]
      },
      {
        id: "102.8",
        nombre: "102.8 - CIRCULARES",
        subseries: [
          { id: "102.8.1", nombre: "102.8.1 - Circulares Informativas" }
        ]
      },
      {
        id: "102.11",
        nombre: "102.11 - CONCEPTOS",
        subseries: [
          { id: "102.11.1", nombre: "102.11.1 - Conceptos de Viabilidad" }
        ]
      },
      {
        id: "102.18",
        nombre: "102.18 - DERECHOS DE PETICIÓN",
        subseries: [
          { id: "102.18.0", nombre: "102.18 - Derechos de Petición (General)" }
        ]
      },
      {
        id: "102.29",
        nombre: "102.29 - INDICADORES",
        subseries: [
          { id: "102.29.1", nombre: "102.29.1 - Indicadores Gestión por Procesos" }
        ]
      },
      {
        id: "102.30",
        nombre: "102.30 - INFORMES",
        subseries: [
          { id: "102.30.3", nombre: "102.30.3 - Informes Organismos de Control" },
          { id: "102.30.4", nombre: "102.30.4 - Otros organismos" },
          { id: "102.30.6", nombre: "102.30.6 - Seguimiento MIPG" },
          { id: "102.30.13", nombre: "102.30.13 - Auditorías Internas SIG" },
          { id: "102.30.17", nombre: "102.30.17 - Comité Institucional" },
          { id: "102.30.25", nombre: "102.30.25 - Indicadores Gestión" },
          { id: "102.30.26", nombre: "102.30.26 - Seguimiento Riesgos" },
          { id: "102.30.34", nombre: "102.30.34 - SIG" },
          { id: "102.30.37", nombre: "102.30.37 - Informes Internos" },
          { id: "102.30.40", nombre: "102.30.40 - Rendición de Cuentas" }
        ]
      },
      {
        id: "102.37",
        nombre: "102.37 - MANUALES",
        subseries: [
          { id: "102.37.4", nombre: "102.37.4 - Manual Gestión Ambiental" },
          { id: "102.37.17", nombre: "102.37.17 - Manual SIG" }
        ]
      },
      {
        id: "102.38",
        nombre: "102.38 - MAPAS DE RIESGOS",
        subseries: [
          { id: "102.38.0", nombre: "102.38 - Mapas de Riesgos (General)" }
        ]
      },
      {
        id: "102.41",
        nombre: "102.41 - PLANES",
        subseries: [
          { id: "102.41.7", nombre: "102.41.7 - Acción" },
          { id: "102.41.17", nombre: "102.41.17 - Mejoramiento" },
          { id: "102.41.27", nombre: "102.41.27 - Estratégicos" },
          { id: "102.41.29", nombre: "102.41.29 - Operativos" }
        ]
      },
      {
        id: "102.49",
        nombre: "102.49 - PROGRAMAS",
        subseries: [
          { id: "102.49.8", nombre: "102.49.8 - SIG MIPG" },
          { id: "102.49.9", nombre: "102.49.9 - SIG INTEGRA" }
        ]
      },
      {
        id: "102.52",
        nombre: "102.52 - REGLAMENTOS",
        subseries: [
          { id: "102.52.1", nombre: "102.52.1 - Rendición de cuentas" }
        ]
      }
    ]
  }
];