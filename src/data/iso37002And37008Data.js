/**
 * TRILOGÍA DE INTEGRIDAD CORPORATIVA AUBASA
 * ISO 37001:2025 (Antisoborno) • ISO 37002:2021 (Whistleblowing) • ISO/TS 37008:2023 (Investigaciones Internas)
 *
 * Alcance Concesión BALP (50 km): Contratación, Pagos y Obras Viales
 */

export const STANDARDS_TRILOGY = [
  {
    id: 'iso37001',
    code: 'ISO 37001:2025',
    title: 'Sistemas de Gestión Antisoborno (SGAS)',
    subtitle: 'Requisitos con orientación para su uso (Segunda Edición)',
    badge: 'Norma Certificable',
    color: 'cyan',
    descripcion: 'Establece los requisitos obligatorios para prevenir, detectar y gestionar sobornos en AUBASA: gobernanza del Directorio, debida diligencia de contratistas (8.2), controles financieros y principio de 4 ojos en pagos (8.3), controles técnicos en obras viales (8.4), información documentada (7.5) y auditorías internas (9.2).',
    enfoqueAubasa: 'Gobernanza antisoborno en licitaciones de señalización/repavimentación, doble firma electrónica bancaria en tesorería y ensayos de calidad de probetas LEMIT/UNLP.'
  },
  {
    id: 'iso37002',
    code: 'UNE-ISO 37002:2021',
    title: 'Sistemas de Gestión de la Denuncia de Irregularidades',
    subtitle: 'Líneas directrices para la implementación del Canal Ético',
    badge: 'Whistleblowing Guidelines',
    color: 'emerald',
    descripcion: 'Proporciona orientación sobre el ciclo completo de gestión de denuncias bajo tres principios rectores: Confianza (Trust), Imparcialidad (Impartiality) y Protección (Protection) contra represalias laborales o contractuales.',
    enfoqueAubasa: 'Línea 0800, portal web cifrado y buzones en estaciones BALP con acuse de recibo en < 7 días y protección blindada al alertador.'
  },
  {
    id: 'iso37008',
    code: 'ISO/TS 37008:2023',
    title: 'Investigaciones Internas en Organizaciones',
    subtitle: 'Directrices para la conducción de investigaciones forenses objetivas',
    badge: 'Internal Investigations',
    color: 'indigo',
    descripcion: 'Directrices técnicas y legales para ejecutar investigaciones internas eficaces, garantizando confidencialidad, objetividad, cadena de custodia digital/física, derecho a defensa y reportes basados en hechos probados.',
    enfoqueAubasa: 'Términos de Referencia (ToR), extracción forense de logs TelePASE, peritajes de asfalto con escribano y dictamen para Comité de Ética/Directorio.'
  }
];

export const ISO37002_PRINCIPLES = [
  {
    id: 'trust',
    title: 'Confianza (Trust)',
    descripcion: 'Garantía de canales accesibles, trazables, con opción de anonimato absoluto o reserva de identidad, y respuesta oportuna formal en un plazo máximo de 7 días hábiles.',
    icono: 'ShieldCheck'
  },
  {
    id: 'impartiality',
    title: 'Imparcialidad (Impartiality)',
    descripcion: 'Tratamiento objetivo y neutral de cada reporte, con recusación obligatoria de cualquier funcionario con conflicto de interés directo o indirecto.',
    icono: 'Scale'
  },
  {
    id: 'protection',
    title: 'Protección (Protection)',
    descripcion: 'Blindaje integral contra cualquier forma de represalia, hostigamiento, traslado compulsivo o perjuicio contractual contra el alertador o los testigos.',
    icono: 'Lock'
  }
];

export const ISO37002_LIFECYCLE_PHASES = [
  {
    fase: 1,
    id: 'recepcion',
    nombre: 'Fase 1: Recepción & Acuse de Recibo',
    norma: 'UNE-ISO 37002 Cl. 8.2',
    plazo: '≤ 7 días hábiles',
    descripcion: 'Recepción del reporte por canal seguro (Web, 0800, Mail o Buzón físico), asignación de Token de Seguimiento criptográfico y emisión del Acuse de Recibo formal.',
    requisitosClave: [
      'Generación de código confidencial único (Token AU-ETH)',
      'Registro en el Libro Matriz Digital de Denuncias (REC-DEN Cl. 7.5)',
      'Acuse formal al alertador confirmando recepción sin divulgar datos'
    ]
  },
  {
    fase: 2,
    id: 'evaluacion',
    nombre: 'Fase 2: Evaluación Preliminar & Triaje',
    norma: 'UNE-ISO 37002 Cl. 8.3',
    plazo: '≤ 15 días hábiles',
    descripcion: 'Análisis de admisibilidad y verosimilitud de los hechos relatados, descarte de conflictos de interés del equipo evaluador y determinación de procedencia.',
    requisitosClave: [
      'Verificación de competencia (AUBASA BALP: Contratación, Pagos, Obras)',
      'Declaración de No Conflicto de Interés del receptor',
      'Dictamen de admisión o archivo motivado',
      'Medidas cautelares preventivas inmediatas si hay riesgo de pérdida de pruebas'
    ]
  },
  {
    fase: 3,
    id: 'tratamiento',
    nombre: 'Fase 3: Tratamiento & Investigación (ISO 37008)',
    norma: 'UNE-ISO 37002 Cl. 8.4 / ISO/TS 37008',
    plazo: '≤ 30 a 60 días hábiles',
    descripcion: 'Ejecución del plan de investigación forense bajo directrices ISO/TS 37008: recopilación probatoria, cadena de custodia y entrevistas.',
    requisitosClave: [
      'Emisión de Términos de Referencia (ToR) firmados',
      'Preservación de registros y logs con hash SHA-256',
      'Entrevistas a testigos e investigados con actas firmadas',
      'Monitoreo activo de medidas de no represalia al alertador'
    ]
  },
  {
    fase: 4,
    id: 'conclusion',
    nombre: 'Fase 4: Conclusión, Reporte & Cierre',
    norma: 'UNE-ISO 37002 Cl. 8.5 / ISO 37001 Cl. 8.10',
    plazo: '≤ 10 días tras informe',
    descripcion: 'Informe final de hechos probados elevado al Comité de Ética y Directorio de AUBASA, aplicación de sanciones, comunicación al alertador y cierre.',
    requisitosClave: [
      'Informe Final de Hechos Probados (Fact-Based Report)',
      'Resolución de Directorio con medidas disciplinarias o contractuales',
      'Comunicación formal de conclusión al alertador',
      'Plan de Acción Correctiva (CAPA Cl. 10.2) para subsanar vulnerabilidades'
    ]
  }
];

export const ISO37008_INVESTIGATION_FRAMEWORK = {
  principios: [
    'Confidencialidad absoluta del expediente y de los involucrados',
    'Legalidad y observancia de garantías constitucionales y laborales',
    'Objetividad estricta basada exclusivamente en evidencias verificables',
    'Proporcionalidad entre la gravedad de los hechos y las medidas investigativas',
    'Presunción de inocencia y derecho inalienable a formular descargo'
  ],
  estructuraExpediente: [
    {
      seccion: '1. Términos de Referencia (ToR)',
      descripcion: 'Mandato formal emitido por el Oficial de Cumplimiento que define el alcance de la investigación, el equipo asignado y los plazos perentorios.'
    },
    {
      seccion: '2. Registro y Cadena de Custodia de Evidencias',
      descripcion: 'Matriz de documentos, archivos digitales, grabaciones y logs con cálculo de hash SHA-256 y constancia de quién los recolectó y custodió.'
    },
    {
      seccion: '3. Actas de Entrevistas Forenses',
      descripcion: 'Declaraciones testimoniales y de personas señaladas, con transcripción fiel, presencia de letrado o veedor, y firma ológrafa o digital.'
    },
    {
      seccion: '4. Informe Final de Hechos Probados (Fact-Based Report)',
      descripcion: 'Documento conclusivo estructurado: Antecedentes, Hechos Acreditados, Hechos Descartados, Matriz de Responsabilidad y Recomendaciones de Remediación.'
    },
    {
      seccion: '5. Plan de Sanciones y Corrección de Procesos (CAPA)',
      descripcion: 'Medidas aplicadas (laborales, contractuales, penales) y ajustes a los controles internos de AUBASA para evitar recurrencias.'
    }
  ]
};
