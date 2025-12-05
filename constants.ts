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
    id: "103",
    nombre: "103 - OFICINA ASESORA DE PLANEACIÓN",
    series: [
      {
        id: "103.2",
        nombre: "103.2 - ACTAS",
        subseries: [
          { id: "103.2.10", nombre: "103.2.10 - Actas Comité Gestión Ambiental" },
          { id: "103.2.11", nombre: "103.2.11 - Actas de Comité de Investigació, Innovación y Gestión del Conocimiento" },
          { id: "103.2.15", nombre: "103.2.15 - Actas Comité Institucional de Gestión y Desempeño" },
        ]
      },
      {
        id: "103.8",
        nombre: "103.8 - CIRCULARES",
        subseries: [
          { id: "103.8.1", nombre: "103.8.1 - Circulares Informativas" }
        ]
      },
      {
        id: "103.11",
        nombre: "103.11 - CONCEPTOS",
        subseries: [
          { id: "103.11.1", nombre: "103.11.1 - Conceptos Viabilidad Financiera y Económica de los Proyectos" }
        ]
      },
      {
        id: "103.18",
        nombre: "103.18 - DERECHOS DE PETICIÓN",
      },
      {
        id: "103.29",
        nombre: "103.29 - INDICADORES",
        subseries: [
          { id: "103.29.1", nombre: "103.29.1 - Indicadores Gestión por Procesos" }
        ]
      },
      {
        id: "103.30",
        nombre: "103.30 - INFORMES",
        subseries: [
          { id: "103.30.3", nombre: "103.30.3 - Informes Organismos de Control y vigilancia" },
          { id: "103.30.4", nombre: "103.30.4 - Informes a Otros organismos del estado" },
          { id: "103.30.6", nombre: "103.30.6 - Informes anuales de seguimiento al modelo integrado de planeacion y control.MIPG" },
          { id: "103.30.13", nombre: "103.30.13 - Informes de Auditorías Internas SIG" },
          { id: "103.30.17", nombre: "103.30.17 - Informes de Comité Institucional de Gestión y Desempeño" },
          { id: "103.30.25", nombre: "103.30.25 - Informes de Indicadores de Gestión" },
          { id: "103.30.26", nombre: "103.30.26 - Informes de Seguimiento de Riesgos" },
          { id: "103.30.34", nombre: "103.30.34 - Informes de SIG" },
          { id: "103.30.37", nombre: "103.30.37 - Informes Internos de gestión y resultados" },
          { id: "103.30.40", nombre: "103.30.40 - Informes de Rendición de Cuentas a la ciudadania" }
        ]
      },
      {
        id: "103.37",
        nombre: "103.37 - MANUALES",
        subseries: [
          { id: "103.37.4", nombre: "103.37.4 - Manual Gestión Ambiental" },
          { id: "103.37.17", nombre: "103.37.17 - Manual del SIG" }
        ]
      },
      {
        id: "103.38",
        nombre: "103.38 - MAPAS DE RIESGOS",
      },
      {
        id: "103.41",
        nombre: "103.41 - PLANES",
        subseries: [
          { id: "103.41.7", nombre: "103.41.7 - Plan de Acción Institucional" },
          { id: "103.41.17", nombre: "103.41.17 - Plan de Mejoramiento Institucional " },
          { id: "103.41.27", nombre: "103.41.27 - Plan Estratégicos Institucionales" },
          { id: "103.41.29", nombre: "103.41.29 - Plan Operativos anuales" }
        ]
      },
      {
        id: "103.49",
        nombre: "103.49 - PROGRAMAS",
        subseries: [
          { id: "103.49.8", nombre: "103.49.8 - Programa SIG MIPG" },
          { id: "103.49.9", nombre: "103.49.9 - Programa SIG INTEGRA" }
        ]
      },
      {
        id: "103.52",
        nombre: "103.52 - REGLAMENTOS",
        subseries: [
          { id: "103.52.1", nombre: "103.52.1 - Reglamentos Internos para la Realización de la Rendición de Cuentas" }
        ]
      }
    ]
  }
];