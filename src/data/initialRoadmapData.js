/**
 * Hoja de Ruta (Roadmap) de Implementación ISO 37001:2016 en AUBASA
 * Cronograma estratégico de 6 fases hacia la certificación con el organismo acreditado.
 */

export const INITIAL_ROADMAP_PHASES = [
  {
    id: 1,
    fase: 'Fase 1',
    titulo: 'Contexto, Liderazgo y Compromiso Institucional',
    duracion: 'Mes 1 - Mes 2',
    estado: 'completada', // 'completada' | 'en_curso' | 'pendiente'
    progreso: 100,
    clausulasIso: ['Cl. 4.1', 'Cl. 4.2', 'Cl. 4.3', 'Cl. 5.1', 'Cl. 5.2', 'Cl. 5.3'],
    objetivo: 'Establecer las bases de gobernanza antisoborno, delimitar el alcance en AUBASA y designar formalmente la Función de Cumplimiento Antisoborno con reporte directo al Directorio.',
    entregables: [
      { id: 'e1-1', nombre: 'Acta de Directorio aprobando la Política Antisoborno (POL-SGAS-01)', completado: true },
      { id: 'e1-2', nombre: 'Nombramiento formal del Oficial de Cumplimiento Antisoborno con autonomía (Cl. 5.3)', completado: true },
      { id: 'e1-3', nombre: 'Definición y aprobación formal del Alcance (Contratación, Pagos, Obras Viales)', completado: true },
      { id: 'e1-4', nombre: 'Matriz de partes interesadas (Ministerio PBA, usuarios viales, sindicatos, contratistas)', completado: true }
    ],
    responsable: 'Directorio / Asuntos Jurídicos / Oficial de Cumplimiento'
  },
  {
    id: 2,
    fase: 'Fase 2',
    titulo: 'Evaluación y Matriz de Riesgos de Soborno',
    duracion: 'Mes 2 - Mes 3',
    estado: 'en_curso',
    progreso: 75,
    clausulasIso: ['Cl. 4.5', 'Cl. 6.1', 'Cl. 6.2'],
    objetivo: 'Identificar, analizar y evaluar los riesgos de soborno específicos en los procesos de licitaciones, tesorería/pagos e inspección de obras viales, determinando controles preventivos y planes de acción.',
    entregables: [
      { id: 'e2-1', nombre: 'Metodología de Evaluación de Riesgos Antisoborno aprobada', completado: true },
      { id: 'e2-2', nombre: 'Matriz de Riesgos de Soborno en Licitaciones y Contrataciones', completado: true },
      { id: 'e2-3', nombre: 'Matriz de Riesgos en Pagos y Tesorería', completado: true },
      { id: 'e2-4', nombre: 'Matriz de Riesgos en Planificación, Cubicaciones y Certificación de Obras', completado: false },
      { id: 'e2-5', nombre: 'Establecimiento de Objetivos Antisoborno medibles (Cl. 6.2)', completado: true }
    ],
    responsable: 'Oficial de Cumplimiento / Gerentes de Área'
  },
  {
    id: 3,
    fase: 'Fase 3',
    titulo: 'Diseño e Implementación de Controles Operativos',
    duracion: 'Mes 3 - Mes 4',
    estado: 'en_curso',
    progreso: 60,
    clausulasIso: ['Cl. 8.1', 'Cl. 8.3', 'Cl. 8.4', 'Cl. 8.6', 'Cl. 8.7'],
    objetivo: 'Implementar controles financieros de doble firma en pagos y controles no financieros en pliegos de obra y recepción de asfalto/hormigón con laboratorios independientes.',
    entregables: [
      { id: 'e3-1', nombre: 'Protocolo de Controles Financieros y Segregación de Funciones en Tesorería (POE-SGAS-05)', completado: true },
      { id: 'e3-2', nombre: 'Procedimiento de Controles No Financieros en Licitaciones y Obras (POE-SGAS-06)', completado: true },
      { id: 'e3-3', nombre: 'Inclusión de Cláusulas Contractuales Antisoborno tipo en todos los pliegos (CLA-SGAS-01)', completado: true },
      { id: 'e3-4', nombre: 'Reglamento de Regalos, Hospitalidad y Registro Oficial de Obsequios (POL-SGAS-02)', completado: false },
      { id: 'e3-5', nombre: 'Protocolo de doble firma e inspección ciega de testigos de asfalto en traza', completado: false }
    ],
    responsable: 'Administración y Finanzas / Obras / Compras'
  },
  {
    id: 4,
    fase: 'Fase 4',
    titulo: 'Debida Diligencia de Socios Comerciales y Personal Clave',
    duracion: 'Mes 4 - Mes 5',
    estado: 'pendiente',
    progreso: 30,
    clausulasIso: ['Cl. 7.2', 'Cl. 7.3', 'Cl. 8.2'],
    objetivo: 'Ejecutar el proceso de debida diligencia de contratistas de repavimentación, socios comerciales y colaboradores en puestos de riesgo.',
    entregables: [
      { id: 'e4-1', nombre: 'Procedimiento de Debida Diligencia de Terceros aprobado (POE-SGAS-02)', completado: true },
      { id: 'e4-2', nombre: 'Screening de Beneficiarios Finales y PEPs de los 50 principales proveedores', completado: false },
      { id: 'e4-3', nombre: 'Emisión de Dictámenes de Idoneidad y clasificación de riesgo por proveedor', completado: false },
      { id: 'e4-4', nombre: 'Debida diligencia sobre personal en puestos expuestos (Compradores, Tesoreros, Inspectores)', completado: false }
    ],
    responsable: 'Oficial de Cumplimiento / RRHH / Compras'
  },
  {
    id: 5,
    fase: 'Fase 5',
    titulo: 'Capacitación, Canal de Denuncias e Investigaciones',
    duracion: 'Mes 5 - Mes 6',
    estado: 'pendiente',
    progreso: 20,
    clausulasIso: ['Cl. 7.3', 'Cl. 7.4', 'Cl. 8.9', 'Cl. 8.10'],
    objetivo: 'Lanzar el Canal de Denuncias anónimo con protección al denunciante y capacitar al 100% del personal en el alcance y contratistas viales.',
    entregables: [
      { id: 'e5-1', nombre: 'Portal Web y Línea 0800 del Canal Ético con token de seguimiento confidencial', completado: true },
      { id: 'e5-2', nombre: 'Procedimiento de Investigaciones Internas y Régimen Sancionatorio (POE-SGAS-07)', completado: false },
      { id: 'e5-3', nombre: 'Plan de Capacitación y Sensibilización para inspectores viales y personal de Sede Central', completado: false },
      { id: 'e5-4', nombre: 'Campaña de comunicación externa a contratistas y proveedores sobre tolerancia cero', completado: false }
    ],
    responsable: 'Oficial de Cumplimiento / Comunicación / RRHH'
  },
  {
    id: 6,
    fase: 'Fase 6',
    titulo: 'Auditoría Interna, Revisión por la Dirección y Certificación',
    duracion: 'Mes 6 - Mes 7',
    estado: 'pendiente',
    progreso: 0,
    clausulasIso: ['Cl. 9.1', 'Cl. 9.2', 'Cl. 9.3', 'Cl. 9.4', 'Cl. 10.1', 'Cl. 10.2'],
    objetivo: 'Verificar la conformidad del SGAS mediante auditoría interna integral, realizar la Revisión por la Dirección y someter a AUBASA a la Auditoría de Certificación Externa.',
    entregables: [
      { id: 'e6-1', nombre: 'Programa y Plan de Auditoría Interna ISO 37001 ejecutado', completado: false },
      { id: 'e6-2', nombre: 'Informe de Revisión por la Dirección (Cl. 9.3) firmado por el Directorio', completado: false },
      { id: 'e6-3', nombre: 'Cierre formal de No Conformidades y Acciones Correctivas (Cl. 10.2)', completado: false },
      { id: 'e6-4', nombre: 'Auditoría de Certificación Etapa 1 (Documental) con el Organismo Certificador', completado: false },
      { id: 'e6-5', nombre: 'Auditoría de Certificación Etapa 2 (In Situ) y Obtención del Certificado ISO 37001', completado: false }
    ],
    responsable: 'Directorio / Oficial de Cumplimiento / Equipo Auditor'
  }
];
