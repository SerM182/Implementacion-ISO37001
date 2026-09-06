/**
 * Registros Obligatorios de Evidencias de Cumplimiento SGAS
 * Norma ISO 37001:2016 — Cláusula 7.5 (Información Documentada)
 * Contexto Operativo: AUBASA (Contratación, Pagos y Obras Viales)
 */

export const RECORD_CATEGORIES = [
  {
    id: 'capacitacion',
    nombre: 'Capacitación e Inducciones Antisoborno',
    shortName: 'Capacitación',
    clausulaIso: 'Cl. 7.2 & 7.3',
    pilarAubasa: 'Recursos Humanos y Cultura',
    descripcion: 'Talleres, inducciones y evaluaciones de eficacia de formación ética y antisoborno para personal de peajes, compras, inspectores y directivos.',
    color: 'cyan',
    iconName: 'GraduationCap'
  },
  {
    id: 'conflicto_interes',
    nombre: 'Declaraciones Juradas de Conflicto de Interés',
    shortName: 'Conflictos de Interés',
    clausulaIso: 'Cl. 7.2',
    pilarAubasa: 'Gobernanza y Licitaciones',
    descripcion: 'Declaraciones juradas anuales y extraordinarias de directores, integrantes de comisiones evaluadoras de ofertas e inspectores técnicos.',
    color: 'emerald',
    iconName: 'UserCheck'
  },
  {
    id: 'regalos',
    nombre: 'Registro de Regalos, Hospitalidad e Invitaciones',
    shortName: 'Regalos y Hospitalidad',
    clausulaIso: 'Cl. 8.7',
    pilarAubasa: 'Relaciones con Terceros',
    descripcion: 'Declaraciones obligatorias de presentes, atenciones comerciales, invitaciones a congresos y patrocinios de contratistas o proveedores viales.',
    color: 'amber',
    iconName: 'Gift'
  },
  {
    id: 'auditoria',
    nombre: 'Auditorías Internas y Revisiones de la Dirección',
    shortName: 'Auditorías Internas',
    clausulaIso: 'Cl. 9.2 & 9.3',
    pilarAubasa: 'Evaluación del Desempeño',
    descripcion: 'Informes de auditorías programadas, informes semestrales del Oficial de Cumplimiento y actas de revisión del Directorio.',
    color: 'blue',
    iconName: 'FileSearch'
  },
  {
    id: 'no_conformidad',
    nombre: 'No Conformidades y Acciones Correctivas',
    shortName: 'No Conformidades (CAPA)',
    clausulaIso: 'Cl. 10.1 & 10.2',
    pilarAubasa: 'Mejora Continua',
    descripcion: 'Reporte y tratamiento de desvíos, análisis de causa raíz (5 Porqués), planes de acción correctiva y verificación de cierre eficaz.',
    color: 'rose',
    iconName: 'AlertOctagon'
  },
  {
    id: 'integridad_terceros',
    nombre: 'Pactos de Integridad y Compromisos Contractuales',
    shortName: 'Pactos de Integridad',
    clausulaIso: 'Cl. 8.6',
    pilarAubasa: 'Contratación y Compras',
    descripcion: 'Declaraciones juradas anticorrupción y pactos de integridad firmados por oferentes y contratistas en pliegos de obra y provisión.',
    color: 'purple',
    iconName: 'Handshake'
  },
  {
    id: 'controles_financieros',
    nombre: 'Controles Financieros y Doble Firma en Pagos a Proveedores',
    shortName: 'Controles en Pagos (4 Ojos)',
    clausulaIso: 'Cl. 8.3',
    pilarAubasa: 'Pagos y Tesorería',
    descripcion: 'Validación previa de desembolsos, principio de 4 ojos (doble firma electrónica en transferencias), orden cronológico FIFO y conciliación bancaria oficial.',
    color: 'teal',
    iconName: 'Receipt'
  },
  {
    id: 'ensayo_asfalto',
    nombre: 'Ensayos Técnicos e Inspección de Obras Viales',
    shortName: 'Ensayos de Obra',
    clausulaIso: 'Cl. 8.4',
    pilarAubasa: 'Planificación y Ejecución de Obras',
    descripcion: 'Ensayos de calado de testigos de asfalto, control de espesores y densidad emitidos por laboratorios universitarios independientes (LEMIT/UNLP).',
    color: 'orange',
    iconName: 'HardHat'
  },
  {
    id: 'evaluacion_riesgo',
    nombre: 'Evaluación y Matriz de Riesgos de Soborno',
    shortName: 'Matriz de Riesgos',
    clausulaIso: 'Cl. 4.5 & 6.1',
    pilarAubasa: 'Gobernanza y Gestión de Riesgos',
    descripcion: 'Metodología aprobada, talleres anuales de identificación, matriz inherente/residual y planes de tratamiento de los escenarios de soborno en licitaciones, tesorería y obras viales.',
    color: 'red',
    iconName: 'ShieldAlert'
  },
  {
    id: 'debida_diligencia',
    nombre: 'Debida Diligencia de Socios Comerciales y Contratistas',
    shortName: 'Debida Diligencia',
    clausulaIso: 'Cl. 8.2',
    pilarAubasa: 'Contratación y Compras',
    descripcion: 'Dictámenes de idoneidad ética, screening PEP/UBO, cuestionarios de integridad y reevaluaciones periódicas de oferentes, UTEs y proveedores de peaje y tecnología.',
    color: 'indigo',
    iconName: 'SearchCheck'
  },
  {
    id: 'canal_etico',
    nombre: 'Denuncias y Planteamiento de Inquietudes (Canal Ético)',
    shortName: 'Canal Ético',
    clausulaIso: 'Cl. 8.9',
    pilarAubasa: 'Integridad y Cultura',
    descripcion: 'Registro de denuncias recibidas por portal cifrado, línea 0800 y correo, con triaje de admisibilidad, confidencialidad y seguimiento con token de caso.',
    color: 'sky',
    iconName: 'Megaphone'
  },
  {
    id: 'investigacion',
    nombre: 'Investigaciones Internas de Soborno y Medidas Disciplinarias',
    shortName: 'Investigaciones',
    clausulaIso: 'Cl. 8.10',
    pilarAubasa: 'Canal Ético y Sanciones',
    descripcion: 'Expedientes de investigación, cadena de custodia SHA-256, dictámenes conclusivos, sanciones laborales/contractuales y denuncias penales derivadas a Fiscalía.',
    color: 'fuchsia',
    iconName: 'Gavel'
  },
  {
    id: 'objetivos',
    nombre: 'Objetivos Antisoborno y Planificación para Lograrlos',
    shortName: 'Objetivos y Metas',
    clausulaIso: 'Cl. 6.2',
    pilarAubasa: 'Planificación Estratégica',
    descripcion: 'Objetivos medibles del SGAS, indicadores (KPIs), metas anuales y seguimiento del grado de cumplimiento por proceso.',
    color: 'lime',
    iconName: 'Target'
  },
  {
    id: 'comunicacion',
    nombre: 'Comunicación Interna y Externa del SGAS',
    shortName: 'Comunicación',
    clausulaIso: 'Cl. 7.4',
    pilarAubasa: 'Apoyo y Cultura',
    descripcion: 'Campañas de difusión de la política antisoborno, cartelería en peajes y obradores, comunicaciones a contratistas y demás partes interesadas.',
    color: 'violet',
    iconName: 'Send'
  },
  {
    id: 'revision_cumplimiento',
    nombre: 'Revisión por la Función de Cumplimiento Antisoborno',
    shortName: 'Revisión Cumplimiento',
    clausulaIso: 'Cl. 9.4',
    pilarAubasa: 'Evaluación del Desempeño',
    descripcion: 'Informes semestrales del Oficial de Cumplimiento sobre la idoneidad, adecuación y eficacia del SGAS con recomendaciones elevadas al Directorio.',
    color: 'pink',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'seguimiento_medicion',
    nombre: 'Seguimiento, Medición, Análisis y Evaluación del Desempeño',
    shortName: 'KPIs & Medición',
    clausulaIso: 'Cl. 9.1',
    pilarAubasa: 'Evaluación del Desempeño',
    descripcion: 'Tablero de indicadores del SGAS, encuestas de clima ético, benchmarking y análisis de tendencias de denuncias y efectividad de controles.',
    color: 'yellow',
    iconName: 'TrendingUp'
  }
];

export const INITIAL_RECORDS_DATA = [
  // ==========================================
  // 1. CAPACITACIÓN E INDUCCIONES (CL. 7.2 & 7.3)
  // ==========================================
  {
    id: 'REC-CAP-2026-001',
    tipoRegistro: 'capacitacion',
    clausulaIso: 'Cl. 7.2 & 7.3',
    titulo: 'Taller de Dilemas Éticos y Línea de Denuncias para Supervisores y Cajeros de Peaje',
    fecha: '2026-08-14',
    areaUbicacion: 'Centro de Capacitación Hudson / Estaciones Dock Sud y Hudson',
    responsable: 'Oficial de Cumplimiento (Dr. M. Valenzuela) & Gerencia de RRHH',
    estadoVerificacion: 'verificado', // 'verificado', 'en_revision', 'observado', 'no_conforme'
    resumenEvidencia: 'Capacitación intensiva sobre identificación de ofrecimientos indebidos en cabinas, protocolo ante billetes/dádivas de usuarios y uso confidencial del canal ético. Asistencia del 94% de supervisores.',
    documentosAdjuntos: [
      { nombre: 'Acta_Asistencia_Firmada_Peajes_2026.pdf', formato: 'PDF', hash: 'SHA256:8f4c2e91a0b5c1' },
      { nombre: 'Evaluacion_Eficacia_Resultados.xlsx', formato: 'XLSX', hash: 'SHA256:1a7b3c9d8e4f50' },
      { nombre: 'Material_Didactico_Dilemas_Peaje.pdf', formato: 'PDF', hash: 'SHA256:9c8d7e6f5a4b3c' }
    ],
    metadatosEspecificos: {
      asistentesConvocados: 85,
      asistentesEfectivos: 80,
      porcentajeAsistencia: 94.1,
      calificacionPromedio: 9.2,
      horasCatedra: 4,
      modalidad: 'Presencial / Teórico-Práctico'
    }
  },
  {
    id: 'REC-CAP-2026-002',
    tipoRegistro: 'capacitacion',
    clausulaIso: 'Cl. 7.2 & 7.3',
    titulo: 'Seminario de Pliegos Transparentes y Prevención de Cartelización para Compras y Obras',
    fecha: '2026-07-22',
    areaUbicacion: 'Sede Central AUBASA — Gerencia de Compras e Infraestructura',
    responsable: 'Asesoría Externa en Compliance & Asuntos Jurídicos',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Formación técnica en redacción de especificaciones neutrales (sin direccionamiento de marcas) y detección de banderas rojas en licitaciones conforme directrices de la CNDC y Ley 27.401.',
    documentosAdjuntos: [
      { nombre: 'Registro_Firmas_Compras_Obras_Jul2026.pdf', formato: 'PDF', hash: 'SHA256:5b6a7c8d9e0f1a' },
      { nombre: 'Test_Evaluativo_AntiCartelizacion.pdf', formato: 'PDF', hash: 'SHA256:3d2e1f0a9b8c7d' }
    ],
    metadatosEspecificos: {
      asistentesConvocados: 28,
      asistentesEfectivos: 28,
      porcentajeAsistencia: 100,
      calificacionPromedio: 9.6,
      horasCatedra: 6,
      modalidad: 'Híbrida'
    }
  },

  // ==========================================
  // 2. CONFLICTO DE INTERÉS (CL. 7.2)
  // ==========================================
  {
    id: 'REC-CDI-2026-001',
    tipoRegistro: 'conflicto_interes',
    clausulaIso: 'Cl. 7.2',
    titulo: 'Declaración Jurada Anual de Intereses y Vínculos Societarios — Directorio y Gerentes',
    fecha: '2026-06-30',
    areaUbicacion: 'Oficina de Integridad y Secretaría del Directorio',
    responsable: 'Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Recepción del 100% de las DDJJ de Directores Titulares, Suplentes y Gerentes de Primera Línea. Se detectó una vinculación societaria preexistente en 1 director que derivó en acta de abstención.',
    documentosAdjuntos: [
      { nombre: 'Legajo_DDJJ_Directorio_2026_Reservado.pdf', formato: 'PDF', hash: 'SHA256:7c8b9a0d1e2f3a' },
      { nombre: 'Dictamen_Abstencion_Dir_04.pdf', formato: 'PDF', hash: 'SHA256:4a5b6c7d8e9f0a' }
    ],
    metadatosEspecificos: {
      declarante: 'Ing. Carlos Mendoza (Director)',
      cargo: 'Director Vocal / Miembro Comisión de Obras',
      tipoDeclaracion: 'Anual Obligatoria',
      declaraConflicto: true,
      medidaMitigacion: 'Abstención expresa y voto inhibido en toda licitación vinculada a obras viales en el tramo Quilmes - Berazategui de la Autopista BALP.'
    }
  },
  {
    id: 'REC-CDI-2026-002',
    tipoRegistro: 'conflicto_interes',
    clausulaIso: 'Cl. 7.2',
    titulo: 'Declaración de No Conflicto para Comisión Evaluadora — Licitación LP-2026-08 (TelePASE)',
    fecha: '2026-08-05',
    areaUbicacion: 'Comisión Evaluadora de Ofertas de Tecnología Vial',
    responsable: 'Presidente de Comisión Evaluadora',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Los 3 miembros técnicos de la comisión suscribieron la declaración previa a la apertura de ofertas confirmando no poseer relación familiar, laboral ni comercial con los 4 oferentes.',
    documentosAdjuntos: [
      { nombre: 'Acta_No_Conflicto_LP_2026_08.pdf', formato: 'PDF', hash: 'SHA256:1f2e3d4c5b6a70' }
    ],
    metadatosEspecificos: {
      declarante: 'Comisión Evaluadora (Ing. F. Benítez, Lic. S. Gómez, Abog. R. Ponce)',
      cargo: 'Miembros Comisión Evaluadora LP-2026-08',
      tipoDeclaracion: 'Por Proceso Licitatorio',
      declaraConflicto: false,
      medidaMitigacion: 'No requerida. Se ratifica libre competencia e imparcialidad técnica.'
    }
  },

  // ==========================================
  // 3. REGALOS, HOSPITALIDAD Y ATENCIONES (CL. 8.7)
  // ==========================================
  {
    id: 'REC-REG-2026-001',
    tipoRegistro: 'regalos',
    clausulaIso: 'Cl. 8.7',
    titulo: 'Declaración de Oferta de Hospitalidad y Pasajes a Congreso Internacional de Pavimentos',
    fecha: '2026-08-10',
    areaUbicacion: 'Gerencia de Obras e Infraestructura',
    responsable: 'Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'La empresa constructora vial oferente "VialSur S.A." ofreció costear pasajes aéreos y hotel en Brasil para 2 ingenieros de AUBASA. Conforme política POL-SGAS-02, fue formalmente RECHAZADO.',
    documentosAdjuntos: [
      { nombre: 'Formulario_Declaracion_Regalo_REG01.pdf', formato: 'PDF', hash: 'SHA256:8a7b6c5d4e3f21' },
      { nombre: 'Nota_Rechazo_Oficial_VialSur.pdf', formato: 'PDF', hash: 'SHA256:2b3c4d5e6f7a80' }
    ],
    metadatosEspecificos: {
      origen: 'VialSur Construcciones Viales S.A. (Oferente activo)',
      destinatario: 'Ing. Supervisor de Obras Autopista BALP',
      descripcionRegalo: '2 Paquetes de viaje, alojamiento y entradas al Congreso Ibero-Latinoamericano del Asfalto',
      valorEstimadoUSD: 3200,
      decision: 'Rechazado y Notificado formalmente',
      aprobadoPorOficialCumplimiento: false
    }
  },
  {
    id: 'REC-REG-2026-002',
    tipoRegistro: 'regalos',
    clausulaIso: 'Cl. 8.7',
    titulo: 'Presente Institucional Protocolar — Placa Conmemorativa Aniversario Concesión',
    fecha: '2026-05-18',
    areaUbicacion: 'Presidencia de AUBASA',
    responsable: 'Oficial de Cumplimiento / Secretaría General',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Recepción de placa conmemorativa de madera y bronce entregada por la Asociación Argentina de Carreteras en acto institucional. Registrada como patrimonio de la empresa en sala de reuniones.',
    documentosAdjuntos: [
      { nombre: 'Acta_Recepcion_Patrimonio_AUBASA.pdf', formato: 'PDF', hash: 'SHA256:9f8e7d6c5b4a30' }
    ],
    metadatosEspecificos: {
      origen: 'Asociación Argentina de Carreteras',
      destinatario: 'Directorio de AUBASA',
      descripcionRegalo: 'Placa conmemorativa de madera con grabado institucional',
      valorEstimadoUSD: 45,
      decision: 'Aceptado como Bien Patrimonial Institucional',
      aprobadoPorOficialCumplimiento: true
    }
  },

  // ==========================================
  // 4. AUDITORÍAS INTERNAS Y REVISIONES (CL. 9.2 & 9.3)
  // ==========================================
  {
    id: 'REC-AUD-2026-001',
    tipoRegistro: 'auditoria',
    clausulaIso: 'Cl. 9.2 & 9.3',
    titulo: 'Informe de Auditoría Interna Semestral del SGAS — Procesos de Contratación y Pagos',
    fecha: '2026-08-01',
    areaUbicacion: 'Gerencia de Auditoría Interna y Procesos',
    responsable: 'Auditor Líder ISO 37001 (Cr. Diego Soria)',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Evaluación de 42 expedientes de pago y 15 licitaciones. Se determinó un cumplimiento normativo del 86%. Se formularon 2 hallazgos menores sobre archivo de minutas de comisiones evaluadoras.',
    documentosAdjuntos: [
      { nombre: 'Informe_Auditoria_Interna_SGAS_2026_S1.pdf', formato: 'PDF', hash: 'SHA256:4d5e6f7a8b9c01' },
      { nombre: 'Matriz_Hallazgos_Recomendaciones.xlsx', formato: 'XLSX', hash: 'SHA256:7a8b9c0d1e2f34' }
    ],
    metadatosEspecificos: {
      tipoAuditoria: 'Auditoría Interna Ordinaria Programada',
      equipoAuditor: 'Cr. Diego Soria (Líder), Lic. Paula Méndez',
      alcanceProcesos: 'Contrataciones directas, Certificados de Obra, Fondos Fijos',
      hallazgosTotales: 3,
      observacionesMayores: 0,
      observacionesMenores: 2,
      oportunidadesMejora: 1,
      dictamenFinal: 'Satisfactorio con Observaciones Menores'
    }
  },
  {
    id: 'REC-AUD-2026-002',
    tipoRegistro: 'auditoria',
    clausulaIso: 'Cl. 9.2 & 9.3',
    titulo: 'Acta de Revisión por la Dirección del Sistema de Gestión Antisoborno (Cl. 9.3)',
    fecha: '2026-07-15',
    areaUbicacion: 'Sala de Directorio AUBASA',
    responsable: 'Directorio y Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'El Directorio analizó los resultados de la matriz de riesgos, denuncias recibidas, debida diligencia de contratistas de la traza y aprobó el presupuesto anual para equipamiento de laboratorios viales.',
    documentosAdjuntos: [
      { nombre: 'Acta_Directorio_Revision_SGAS_Jul2026.pdf', formato: 'PDF', hash: 'SHA256:6e7f8a9b0c1d2e' }
    ],
    metadatosEspecificos: {
      tipoAuditoria: 'Revisión por la Alta Dirección y Órgano de Gobierno',
      equipoAuditor: 'Directorio en Pleno, Gerente General, Oficial de Cumplimiento',
      alcanceProcesos: 'Todo el alcance del SGAS (Contratación, Pagos, Obras)',
      hallazgosTotales: 0,
      observacionesMayores: 0,
      observacionesMenores: 0,
      oportunidadesMejora: 4,
      dictamenFinal: 'Aprobado y Ratificado'
    }
  },

  // ==========================================
  // 5. NO CONFORMIDADES Y ACCIONES CORRECTIVAS (CL. 10.1 & 10.2)
  // ==========================================
  {
    id: 'REC-CAPA-2026-001',
    tipoRegistro: 'no_conformidad',
    clausulaIso: 'Cl. 10.1 & 10.2',
    titulo: 'Acción Correctiva por Fraccionamiento Reiterado de Compras de Pintura Termoplástica',
    fecha: '2026-07-28',
    areaUbicacion: 'Departamento de Mantenimiento y Señalización Vial',
    responsable: 'Gerente de Compras & Oficial de Cumplimiento',
    estadoVerificacion: 'en_revision',
    resumenEvidencia: 'Se identificaron 3 órdenes de compra consecutivas en 45 días al mismo proveedor de pintura sin concurso formal. Causa raíz: Falta de consolidación semestral en el Plan Anual de Compras.',
    documentosAdjuntos: [
      { nombre: 'Informe_CAPA_2026_001_5Porques.pdf', formato: 'PDF', hash: 'SHA256:1a2b3c4d5e6f7a' },
      { nombre: 'Regla_Bloqueo_ERP_Configuracion.png', formato: 'JPG', hash: 'SHA256:8b9c0d1e2f3a4b' }
    ],
    metadatosEspecificos: {
      origenHallazgo: 'Auditoría Interna de Pagos',
      analisisCausaRaiz: 'Planificación reactiva de stock en base de mantenimiento Berazategui.',
      accionInmediata: 'Cancelación de la 4ta orden y unificación en licitación privada pública.',
      planAccionCorrectiva: 'Implementación de control automático en ERP que bloquea órdenes al mismo CUIT > $15M acumulados en 90 días.',
      fechaCompromisoCierre: '2026-10-15',
      eficaciaVerificada: false
    }
  },
  {
    id: 'REC-CAPA-2026-002',
    tipoRegistro: 'no_conformidad',
    clausulaIso: 'Cl. 10.1 & 10.2',
    titulo: 'Acción Correctiva por Falta de Declaración Jurada de Beneficiario Final en Subcontratista',
    fecha: '2026-06-12',
    areaUbicacion: 'Mesa de Entradas y Registro de Proveedores',
    responsable: 'Jefe de Registro de Proveedores',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Subcontratista de bacheo inició tareas con legajo incompleto. Se suspendió la emisión del certificado de pago hasta la regularización registral y presentación de DDJJ PEPs.',
    documentosAdjuntos: [
      { nombre: 'Cierre_CAPA_002_Legajo_Subcontratista.pdf', formato: 'PDF', hash: 'SHA256:3c4d5e6f7a8b9c' }
    ],
    metadatosEspecificos: {
      origenHallazgo: 'Control de Debida Diligencia Previo al Pago',
      analisisCausaRaiz: 'Ingreso directo autorizado verbalmente por inspección de obra sin validación de compliance.',
      accionInmediata: 'Retención transitoria de pago hasta completar screening.',
      planAccionCorrectiva: 'Inclusión de check de compliance obligatorio como requisito previo de acceso físico a traza.',
      fechaCompromisoCierre: '2026-07-01',
      eficaciaVerificada: true
    }
  },

  // ==========================================
  // 6. PACTOS DE INTEGRIDAD Y COMPROMISOS (CL. 8.6)
  // ==========================================
  {
    id: 'REC-PAC-2026-001',
    tipoRegistro: 'integridad_terceros',
    clausulaIso: 'Cl. 8.6',
    titulo: 'Pacto de Integridad y Cláusula Antisoborno — Licitación Pavimentación Autopista BALP Km 21-38',
    fecha: '2026-07-10',
    areaUbicacion: 'Gerencia de Asuntos Jurídicos / Licitaciones',
    responsable: 'Comisión Evaluadora y Representante Legal Contratista',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Firma formal del Pacto de Integridad por parte del consorcio adjudicatario "UTE Pavimentos Bonaerenses", aceptando auditorías forenses inopinadas, libre acceso a libros y rescisión sin indemnización ante soborno.',
    documentosAdjuntos: [
      { nombre: 'Pacto_Integridad_Firmado_UTE_BALP.pdf', formato: 'PDF', hash: 'SHA256:2d3e4f5a6b7c8d' },
      { nombre: 'Poder_Representacion_Legal_Acreditado.pdf', formato: 'PDF', hash: 'SHA256:5e6f7a8b9c0d1e' }
    ],
    metadatosEspecificos: {
      razonSocialContratista: 'UTE Pavimentos Bonaerenses (Decavial - Coarco)',
      cuit: '30-71889922-4',
      numeroLicitacion: 'LP-2026-004 (Repavimentación Calzada Ascendente BALP)',
      fechaFirmaPacto: '2026-07-10',
      clausulasAceptadas: true,
      auditoriaTerceroAceptada: true,
      canalDenunciasAceptado: true
    }
  },
  {
    id: 'REC-PAC-2026-002',
    tipoRegistro: 'integridad_terceros',
    clausulaIso: 'Cl. 8.6',
    titulo: 'Compromiso Antisoborno y Código de Conducta de Proveedores — Provisión de Fibra Óptica',
    fecha: '2026-08-02',
    areaUbicacion: 'Gerencia de Compras y Contrataciones',
    responsable: 'Gerente de Compras',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Adhesión plena al Código de Conducta de Terceros de AUBASA por parte del adjudicatario del tendido de telecomunicaciones para la Autopista BsAs-La Plata.',
    documentosAdjuntos: [
      { nombre: 'Adhesion_Codigo_Conducta_TelcoVial.pdf', formato: 'PDF', hash: 'SHA256:7f8a9b0c1d2e3f' }
    ],
    metadatosEspecificos: {
      razonSocialContratista: 'TelcoVial Comunicaciones S.R.L.',
      cuit: '30-65432198-7',
      numeroLicitacion: 'CD-2026-089 (Ampliación Red Anillo Óptico)',
      fechaFirmaPacto: '2026-08-02',
      clausulasAceptadas: true,
      auditoriaTerceroAceptada: true,
      canalDenunciasAceptado: true
    }
  },

  // ==========================================
  // 7. CONTROLES FINANCIEROS Y DOBLE FIRMA (CL. 8.3)
  // ==========================================
  {
    id: 'REC-FIN-2026-001',
    tipoRegistro: 'controles_financieros',
    clausulaIso: 'Cl. 8.3',
    titulo: 'Orden de Pago y Transferencia Bancaria con Doble Firma Electrónica — Certificado de Obra N° 3',
    fecha: '2026-08-19',
    areaUbicacion: 'Gerencia de Finanzas y Tesorería Central (AUBASA)',
    responsable: 'Gerencia de Finanzas / Tesorería (Principio de 4 Ojos)',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Validación previa de desembolso por $48.500.000 ARS. Verificación de CAE fiscal en AFIP, informe de debida diligencia vigente y aprobación con token de doble factor (Gerente de Finanzas y Director Ejecutivo).',
    documentosAdjuntos: [
      { nombre: 'Orden_Pago_OP-2026-0894_Firmada.pdf', formato: 'PDF', hash: 'SHA256:9a0b1c2d3e4f5a' },
      { nombre: 'Comprobante_Transferencia_Interbanking_DobleFirma.pdf', formato: 'PDF', hash: 'SHA256:4b5c6d7e8f9a0b' }
    ],
    metadatosEspecificos: {
      proveedorBeneficiario: 'Vial Construcciones del Atlántico S.A.',
      montoTransferidoARS: 48500000,
      expedientePago: 'EXP-BALP-2026-0894',
      verificacionDobleFirma: 'Aprobada (Token 1: Finanzas / Token 2: Directorio)',
      conciliacionBancaria: 'Conforme Sin Observaciones'
    }
  },
  {
    id: 'REC-FIN-2026-002',
    tipoRegistro: 'controles_financieros',
    clausulaIso: 'Cl. 8.3',
    titulo: 'Conciliación Bancaria Mensual y Control de Prelación FIFO en Pagos a Proveedores',
    fecha: '2026-07-31',
    areaUbicacion: 'Tesorería Central y Control de Gestión (AUBASA)',
    responsable: 'Jefatura de Tesorería y Contabilidad',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Cotejo integral de extractos bancarios de cuentas oficiales contra registro de órdenes de pago devengadas. Verificación del cumplimiento del orden de prelación cronológico sin pagos preferenciales indebidos.',
    documentosAdjuntos: [
      { nombre: 'Conciliacion_Bancaria_Julio2026.pdf', formato: 'PDF', hash: 'SHA256:6c7d8e9f0a1b2c' }
    ],
    metadatosEspecificos: {
      proveedorBeneficiario: 'Múltiples Contratistas y Proveedores de BALP',
      montoTransferidoARS: 142000000,
      expedientePago: 'CONC-BANC-2026-07',
      verificacionDobleFirma: '100% Transferencias Bancarias Auditadas',
      conciliacionBancaria: 'Conforme Sin Observaciones'
    }
  },

  // ==========================================
  // 8. ENSAYOS TÉCNICOS E INSPECCIÓN DE OBRAS (CL. 8.4)
  // ==========================================
  {
    id: 'REC-ENS-2026-001',
    tipoRegistro: 'ensayo_asfalto',
    clausulaIso: 'Cl. 8.4',
    titulo: 'Certificado de Ensayo de Calado de Testigos y Densidad Marshall — Autopista BALP Km 21-38',
    fecha: '2026-08-25',
    areaUbicacion: 'Laboratorio de Ensayos LEMIT / CIC - UNLP (La Plata)',
    responsable: 'Ing. Perito de Laboratorio LEMIT / Inspector de Obra AUBASA',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Extracción georreferenciada de 12 probetas cilíndricas sobre la carpeta asfáltica con polímeros. Espesor promedio medido: 6.2 cm (exigido por pliego: 6.0 cm). Densidad compactada: 98.4%.',
    documentosAdjuntos: [
      { nombre: 'Informe_Ensayo_LEMIT_UNLP_Certificado_1142.pdf', formato: 'PDF', hash: 'SHA256:1d2e3f4a5b6c7d' },
      { nombre: 'Fotos_Extraccion_Geolocalizada_GPS.pdf', formato: 'PDF', hash: 'SHA256:8e9f0a1b2c3d4e' }
    ],
    metadatosEspecificos: {
      obraTramo: 'Repavimentación Calzada Ascendente Autopista BALP (Tramo Quilmes - Berazategui)',
      contratistaEjecutor: 'Vial Construcciones del Atlántico S.A.',
      progresivaKm: 'Km 21.0 a Km 38.0',
      tipoEnsayo: 'Calado de Testigos Cilíndricos y Estabilidad Marshall',
      laboratorioInterviniente: 'LEMIT - CIC PBA / Universidad Nacional de La Plata',
      espesorPliegoCm: 6.0,
      espesorMedidoPromedioCm: 6.2,
      resultado: 'Conforme Pliego Técnico — Aprobado para Certificación'
    }
  },
  {
    id: 'REC-ENS-2026-002',
    tipoRegistro: 'ensayo_asfalto',
    clausulaIso: 'Cl. 8.4',
    titulo: 'Ensayo de Rigidez y Fisuración de Hormigón — Ampliación Tercer Carril Au BsAs-La Plata',
    fecha: '2026-08-11',
    areaUbicacion: 'Autopista BsAs - La Plata Km 24 (Tramo Quilmes - Hudson)',
    responsable: 'Laboratorio de Estructuras Viales / Dirección de Obras',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Ensayo de compresión a los 28 días de losetas de hormigón H-30. Resistencia promedio alcanzada: 34.2 MPa (superior al mínimo de 30 MPa). Certificación de avance liberada.',
    documentosAdjuntos: [
      { nombre: 'Reporte_Compresion_Hormigon_H30_Km24.pdf', formato: 'PDF', hash: 'SHA256:3a4b5c6d7e8f9a' }
    ],
    metadatosEspecificos: {
      obraTramo: 'Tercer Carril Autopista Buenos Aires - La Plata',
      contratistaEjecutor: 'Construcciones Viales del Plata S.A.',
      progresivaKm: 'Km 24.200 a Km 26.800',
      tipoEnsayo: 'Rotura por Compresión Simple a 28 días (Probetas IRAM 1534)',
      laboratorioInterviniente: 'Laboratorio de Materiales Facultad de Ingeniería UBA',
      espesorPliegoCm: 22.0,
      espesorMedidoPromedioCm: 22.4,
      resultado: 'Conforme Pliego Técnico — Resistencia Óptima'
    }
  },

  // ==========================================
  // 9. EVALUACIÓN DE RIESGOS DE SOBORNO (CL. 4.5 & 6.1)
  // ==========================================
  {
    id: 'REC-RIE-2026-001',
    tipoRegistro: 'evaluacion_riesgo',
    clausulaIso: 'Cl. 4.5 & 6.1',
    titulo: 'Acta de Taller Anual de Evaluación de Riesgos de Soborno — Licitaciones y Contrataciones',
    fecha: '2026-03-14',
    areaUbicacion: 'Sede Central AUBASA — Sala de Compras y Contrataciones',
    responsable: 'Oficial de Cumplimiento & Gerencia de Compras',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Taller interdisciplinario con Líderes de Proceso para la calibración de la Matriz de Riesgos de Soborno. Se revisaron 24 escenarios de licitaciones, se ponderó probabilidad e impacto (escala 5x5) y se validaron controles preventivos existentes.',
    documentosAdjuntos: [
      { nombre: 'Acta_Taller_Riesgos_Licitaciones_2026.pdf', formato: 'PDF', hash: 'SHA256:1c2d3e4f5a6b7c' },
      { nombre: 'Matriz_Riesgos_Contrataciones_Rev5.xlsx', formato: 'XLSX', hash: 'SHA256:9a8b7c6d5e4f30' }
    ],
    metadatosEspecificos: {
      metodologia: 'ISO 31000 / Matriz 5x5',
      escenariosIdentificados: 24,
      riesgosCriticos: 3,
      riesgoResidual: 'Medio (controlado)',
      proximaRevision: '2027-03-15'
    }
  },
  {
    id: 'REC-RIE-2026-002',
    tipoRegistro: 'evaluacion_riesgo',
    clausulaIso: 'Cl. 4.5 & 6.1',
    titulo: 'Matriz de Riesgos de Soborno en Pagos y Desembolsos a Contratistas de BALP',
    fecha: '2026-04-02',
    areaUbicacion: 'Gerencia de Finanzas y Tesorería Central (AUBASA)',
    responsable: 'Gerencia de Administración y Finanzas & Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Identificación de escenarios de riesgo en pagos a contratistas y proveedores, transferencias bancarias y emisión de cheques. Se incorporaron controles preventivos de doble firma electrónica (4 ojos) y verificación de prelación cronológica.',
    documentosAdjuntos: [
      { nombre: 'Matriz_Riesgos_Pagos_Contratistas.xlsx', formato: 'XLSX', hash: 'SHA256:2d3e4f5a6b7c8d' }
    ],
    metadatosEspecificos: {
      metodologia: 'ISO 31000 / Matriz 5x5',
      escenariosIdentificados: 12,
      riesgosCriticos: 1,
      riesgoResidual: 'Bajo (control detectivo)',
      proximaRevision: '2026-10-01'
    }
  },

  // ==========================================
  // 10. DEBIDA DILIGENCIA DE TERCEROS (CL. 8.2)
  // ==========================================
  {
    id: 'REC-DIL-2026-001',
    tipoRegistro: 'debida_diligencia',
    clausulaIso: 'Cl. 8.2',
    titulo: 'Dictamen de Idoneidad y Aptitud Ética — Vial Construcciones del Atlántico S.A.',
    fecha: '2026-07-11',
    areaUbicacion: 'Oficina de Cumplimiento — Registro de Proveedores',
    responsable: 'Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Debida diligencia estándar completada previo a la firma del Pacto de Integridad de la licitación LP-2026-004. Verificación de beneficiarios finales (UBO), screening en listas restrictivas y evaluación del Programa de Integridad de la contratista vial.',
    documentosAdjuntos: [
      { nombre: 'Dictamen_DD_Vial_Atlantico.pdf', formato: 'PDF', hash: 'SHA256:5a6b7c8d9e0f1a' },
      { nombre: 'Cuestionario_Integridad_Firmado.pdf', formato: 'PDF', hash: 'SHA256:7c8d9e0a1b2c3d' }
    ],
    metadatosEspecificos: {
      razonSocial: 'Vial Construcciones del Atlántico S.A.',
      cuit: '30-68945231-8',
      puntajeDD: 95,
      nivelRiesgo: 'Bajo',
      screeningPEP: 'Sin coincidencias',
      decision: 'Aprobado — Cláusula reforzada de auditoría'
    }
  },
  {
    id: 'REC-DIL-2026-002',
    tipoRegistro: 'debida_diligencia',
    clausulaIso: 'Cl. 8.2',
    titulo: 'Dictamen de Debida Diligencia Intensificada — Áridos y Pavimentos del Sur UTE (PEP detectado)',
    fecha: '2026-08-02',
    areaUbicacion: 'Oficina de Cumplimiento — Registro de Proveedores',
    responsable: 'Oficial de Cumplimiento',
    estadoVerificacion: 'en_revision',
    resumenEvidencia: 'Screening de la UTE oferente reveló que un socio (20%) reviste carácter de Persona Expuesta Políticamente municipal. Se activó debida diligencia intensificada (Enhanced DD) con verificación documental ampliada y se condicionó la adjudicación a autorización expresa del Directorio.',
    documentosAdjuntos: [
      { nombre: 'Informe_EnhancedDD_AridosDelSur.pdf', formato: 'PDF', hash: 'SHA256:6b7c8d9e0f1a2b' }
    ],
    metadatosEspecificos: {
      razonSocial: 'Áridos y Pavimentos del Sur UTE',
      cuit: '30-71890456-4',
      puntajeDD: 55,
      nivelRiesgo: 'Alto',
      screeningPEP: 'Coincidencia PEP (Director Vialidad Municipal)',
      decision: 'Elevación a Directorio — Autorización expresa requerida'
    }
  },

  // ==========================================
  // 11. CANAL ÉTICO / DENUNCIAS (CL. 8.9)
  // ==========================================
  {
    id: 'REC-CAN-2026-001',
    tipoRegistro: 'canal_etico',
    clausulaIso: 'Cl. 8.9',
    titulo: 'Denuncia Registrada CASO-2026-014 — Presunto Cobro Indebido en Peaje Dock Sud',
    fecha: '2026-08-09',
    areaUbicacion: 'Canal Ético — Portal Web Cifrado',
    responsable: 'Oficial de Cumplimiento (Triaje de Admisibilidad)',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Denuncia anónima con token de seguimiento sobre presunto cobro sin emisión de ticket en turno nocturno. Admitida en triaje (plazo 5 días hábiles), se asignó código cifrado CASO-2026-014 y se derivó a investigación preliminar.',
    documentosAdjuntos: [
      { nombre: 'Ficha_Triaje_CASO_2026_014.pdf', formato: 'PDF', hash: 'SHA256:1a2b3c4d5e6f7a' }
    ],
    metadatosEspecificos: {
      numeroCaso: 'CASO-2026-014',
      canalRecepcion: 'Portal Web cifrado (token)',
      anonima: true,
      estadoTriage: 'Admisible',
      plazoAdmisibilidad: '5 días hábiles'
    }
  },
  {
    id: 'REC-CAN-2026-002',
    tipoRegistro: 'canal_etico',
    clausulaIso: 'Cl. 8.9',
    titulo: 'Denuncia Registrada CASO-2026-018 — Direccionamiento de Pliego en Licitación de Pintura Termoplástica',
    fecha: '2026-08-18',
    areaUbicacion: 'Canal Ético — Línea 0800-INTEGRIDAD',
    responsable: 'Oficial de Cumplimiento (Triaje de Admisibilidad)',
    estadoVerificacion: 'en_revision',
    resumenEvidencia: 'Denuncia de un oferente sobre presunta especificación técnica direccionada en el pliego LP-2026-012. En etapa de admisibilidad; se solicitó ampliación de información al denunciante bajo reserva de identidad.',
    documentosAdjuntos: [
      { nombre: 'Ficha_Triaje_CASO_2026_018.pdf', formato: 'PDF', hash: 'SHA256:3c4d5e6f7a8b9c' }
    ],
    metadatosEspecificos: {
      numeroCaso: 'CASO-2026-018',
      canalRecepcion: 'Línea 0800-INTEGRIDAD',
      anonima: false,
      estadoTriage: 'En análisis (ampliación solicitada)',
      plazoAdmisibilidad: '5 días hábiles'
    }
  },

  // ==========================================
  // 12. INVESTIGACIONES INTERNAS (CL. 8.10)
  // ==========================================
  {
    id: 'REC-INV-2026-001',
    tipoRegistro: 'investigacion',
    clausulaIso: 'Cl. 8.10',
    titulo: 'Informe Conclusivo de Investigación — Soborno a Inspector de Obras Tramo Quilmes BALP',
    fecha: '2026-07-20',
    areaUbicacion: 'Oficina de Cumplimiento — Expediente Reservado',
    responsable: 'Oficial de Cumplimiento & Comité de Integridad',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Investigación interna confirmó cobro indebido de un inspector de obra para certificar volúmenes ficticios de bacheo. Se preservó cadena de custodia SHA-256 de correos y registros, se dictaminó despido con causa y se radicó denuncia penal.',
    documentosAdjuntos: [
      { nombre: 'Informe_Conclusivo_CASO_2026_009.pdf', formato: 'PDF', hash: 'SHA256:4a5b6c7d8e9f0a' },
      { nombre: 'Acta_Cadena_Custodia_Evidencias.pdf', formato: 'PDF', hash: 'SHA256:8b9c0d1e2f3a4b' }
    ],
    metadatosEspecificos: {
      numeroCaso: 'CASO-2026-009',
      conclusion: 'Soborno comprobado',
      medidaDisciplinaria: 'Despido con causa + rescisión de contrato',
      denunciaPenal: true,
      cadenaCustodia: 'Hash SHA-256 preservado'
    }
  },
  {
    id: 'REC-INV-2026-002',
    tipoRegistro: 'investigacion',
    clausulaIso: 'Cl. 8.10',
    titulo: 'Expediente de Investigación CASO-2026-007 — Archivo Fundado por Falta de Mérito',
    fecha: '2026-06-05',
    areaUbicacion: 'Oficina de Cumplimiento — Expediente Reservado',
    responsable: 'Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Denuncia sobre presunta filtración del presupuesto oficial que, tras auditoría contable y entrevistas, no pudo ser corroborada con evidencia documental. Se dispuso el archivo fundado del expediente con recomendación de fortalecer el control de acceso al sistema de pliegos.',
    documentosAdjuntos: [
      { nombre: 'Dictamen_Archivo_CASO_2026_007.pdf', formato: 'PDF', hash: 'SHA256:6c7d8e9f0a1b2c' }
    ],
    metadatosEspecificos: {
      numeroCaso: 'CASO-2026-007',
      conclusion: 'Falta de mérito (archivo fundado)',
      medidaDisciplinaria: 'Ninguna — recomendación de control de accesos',
      denunciaPenal: false,
      cadenaCustodia: 'Hash SHA-256 preservado'
    }
  },

  // ==========================================
  // 13. OBJETIVOS Y PLANIFICACIÓN (CL. 6.2)
  // ==========================================
  {
    id: 'REC-OBJ-2026-001',
    tipoRegistro: 'objetivos',
    clausulaIso: 'Cl. 6.2',
    titulo: 'Objetivo Antisoborno 2026 — 100% de contratos y pliegos con cláusula antisoborno (CLA-SGAS-01)',
    fecha: '2026-01-15',
    areaUbicacion: 'Asuntos Jurídicos — Gestión de Pliegos',
    responsable: 'Oficial de Cumplimiento & Asuntos Jurídicos',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Seguimiento del indicador de cobertura de cláusula antisoborno en pliegos y órdenes de compra. Cierre Q2 en 96% (4 contrataciones directas pendientes de adenda), con plan de acción para alcanzar el 100% en Q3.',
    documentosAdjuntos: [
      { nombre: 'Tablero_Objetivos_SGAS_Q2_2026.xlsx', formato: 'XLSX', hash: 'SHA256:9d0e1f2a3b4c5d' }
    ],
    metadatosEspecificos: {
      objetivo: '100% de contratos con cláusula antisoborno',
      indicadorKpi: '% pliegos con CLA-SGAS-01',
      metaAnual: '100%',
      valorActual: '96%',
      estado: 'En cumplimiento'
    }
  },
  {
    id: 'REC-OBJ-2026-002',
    tipoRegistro: 'objetivos',
    clausulaIso: 'Cl. 6.2',
    titulo: 'Objetivo Antisoborno 2026 — 95% del personal en puestos de riesgo capacitado en antisoborno',
    fecha: '2026-01-15',
    areaUbicacion: 'Recursos Humanos — Capacitación',
    responsable: 'Gerencia de RRHH & Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Meta de cobertura de formación anual en puestos expuestos (cajeros, compradores, tesoreros, inspectores). Cierre Q2 en 90%, con módulos virtuales programados para cuadrillas de mantenimiento de la traza BALP en Q3.',
    documentosAdjuntos: [
      { nombre: 'Indicador_Capacitacion_Puestos_Riesgo.pdf', formato: 'PDF', hash: 'SHA256:0e1f2a3b4c5d6e' }
    ],
    metadatosEspecificos: {
      objetivo: '95% de personal de riesgo capacitado',
      indicadorKpi: '% colaboradores certificados',
      metaAnual: '95%',
      valorActual: '90%',
      estado: 'En cumplimiento'
    }
  },

  // ==========================================
  // 14. COMUNICACIÓN DEL SGAS (CL. 7.4)
  // ==========================================
  {
    id: 'REC-COM-2026-001',
    tipoRegistro: 'comunicacion',
    clausulaIso: 'Cl. 7.4',
    titulo: 'Campaña de Difusión de la Política Antisoborno en Estaciones de Peaje BALP',
    fecha: '2026-05-06',
    areaUbicacion: 'Comunicaciones — Estaciones Dock Sud, Hudson y Troncales BALP',
    responsable: 'Gerencia de Comunicación & Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Instalación de cartelería de tolerancia cero y vías del Canal Ético en cabinas de peaje, oficinas de atención y obradores BALP. Distribución de folletería impresa y publicación en intranet corporativa.',
    documentosAdjuntos: [
      { nombre: 'Registro_Distribucion_Materiales_Peajes.pdf', formato: 'PDF', hash: 'SHA256:1f2a3b4c5d6e7f' },
      { nombre: 'Arte_Carteleria_ToleranciaCero.pdf', formato: 'PDF', hash: 'SHA256:8c9d0e1f2a3b4c' }
    ],
    metadatosEspecificos: {
      canal: 'Cartelería en peajes, intranet y folletería',
      audiencia: 'Personal de peaje y usuarios viales',
      alcance: 'Estaciones Troncales Dock Sud y Hudson + Obradores BALP',
      medioVerificacion: 'Acta de distribución firmada por supervisores',
      fechaVigencia: '2026-05-06 a 2026-12-31'
    }
  },
  {
    id: 'REC-COM-2026-002',
    tipoRegistro: 'comunicacion',
    clausulaIso: 'Cl. 7.4',
    titulo: 'Comunicación Externa a Contratistas — Carta de Tolerancia Cero y Código de Conducta de Terceros',
    fecha: '2026-04-22',
    areaUbicacion: 'Compras y Contrataciones — Registro de Proveedores',
    responsable: 'Gerente de Compras & Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Envío masivo de carta de adhesión a la Política Antisoborno y Código de Conducta de Terceros a los 50 principales proveedores y contratistas viales, con acuse de recepción digital.',
    documentosAdjuntos: [
      { nombre: 'Carta_ToleranciaCero_Contratistas.pdf', formato: 'PDF', hash: 'SHA256:5c6d7e8f9a0b1c' },
      { nombre: 'Acuses_Recepcion_50_Proveedores.xlsx', formato: 'XLSX', hash: 'SHA256:2b3c4d5e6f7a8b' }
    ],
    metadatosEspecificos: {
      canal: 'Correo institucional con acuse',
      audiencia: 'Contratistas y proveedores viales',
      alcance: '50 principales proveedores',
      medioVerificacion: 'Acuse de recepción digital',
      fechaVigencia: '2026-04-22 en adelante'
    }
  },

  // ==========================================
  // 15. REVISIÓN POR LA FUNCIÓN DE CUMPLIMIENTO (CL. 9.4)
  // ==========================================
  {
    id: 'REC-REV-2026-001',
    tipoRegistro: 'revision_cumplimiento',
    clausulaIso: 'Cl. 9.4',
    titulo: 'Informe Semestral del Oficial de Cumplimiento sobre la Eficacia del SGAS — 1er Semestre 2026',
    fecha: '2026-07-05',
    areaUbicacion: 'Oficina de Cumplimiento — Reporte al Directorio',
    responsable: 'Oficial de Cumplimiento Antisoborno',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Revisión de la función de cumplimiento sobre idoneidad, adecuación y eficacia del SGAS. Conclusión: sistema eficaz con 5 recomendaciones de mejora, incluyendo refuerzo de screening en subcontratistas y automatización de bloqueos en ERP.',
    documentosAdjuntos: [
      { nombre: 'Informe_Cumplimiento_S1_2026_Reservado.pdf', formato: 'PDF', hash: 'SHA256:3a4b5c6d7e8f9a' }
    ],
    metadatosEspecificos: {
      periodo: '1er Semestre 2026',
      conclusionGeneral: 'SGAS eficaz con recomendaciones',
      recomendaciones: 5,
      presentadoADirectorio: true,
      recursosSolicitados: 'Ampliación de equipo de cumplimiento (1 analista)'
    }
  },
  {
    id: 'REC-REV-2026-002',
    tipoRegistro: 'revision_cumplimiento',
    clausulaIso: 'Cl. 9.4',
    titulo: 'Informe del Oficial de Cumplimiento sobre Denuncias y Tendencias del Canal Ético — Anual 2025',
    fecha: '2026-02-20',
    areaUbicacion: 'Oficina de Cumplimiento — Reporte al Directorio',
    responsable: 'Oficial de Cumplimiento Antisoborno',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Análisis consolidado de denuncias recibidas, tiempos de triaje, resultados de investigaciones y medidas disciplinarias aplicadas durante 2025, con propuesta de plan anual 2026 del Canal Ético.',
    documentosAdjuntos: [
      { nombre: 'Informe_Cumplimiento_Anual_2025.pdf', formato: 'PDF', hash: 'SHA256:7e8f9a0b1c2d3e' }
    ],
    metadatosEspecificos: {
      periodo: 'Anual 2025',
      conclusionGeneral: 'Canal Ético operativo; mejora de difusión requerida',
      recomendaciones: 3,
      presentadoADirectorio: true,
      recursosSolicitados: 'Ninguno adicional'
    }
  },

  // ==========================================
  // 16. SEGUIMIENTO, MEDICIÓN Y EVALUACIÓN (CL. 9.1)
  // ==========================================
  {
    id: 'REC-KPI-2026-001',
    tipoRegistro: 'seguimiento_medicion',
    clausulaIso: 'Cl. 9.1',
    titulo: 'Informe Trimestral de Indicadores del SGAS — Q2 2026',
    fecha: '2026-07-10',
    areaUbicacion: 'Oficina de Cumplimiento — Tablero de KPIs',
    responsable: 'Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Monitoreo de 12 KPIs del SGAS: cobertura de cláusulas (96%), personal capacitado (90%), pagos con doble firma y conciliación previa (100%), dictámenes DD emitidos (82%). Tendencia de denuncias estable, efectividad de controles en alza.',
    documentosAdjuntos: [
      { nombre: 'Tablero_KPIs_SGAS_Q2_2026.xlsx', formato: 'XLSX', hash: 'SHA256:1d2e3f4a5b6c7d' }
    ],
    metadatosEspecificos: {
      periodo: 'Q2 2026',
      kpisMonitoreados: 12,
      tendenciaDenuncias: 'Estable',
      efectividadControles: 'En alza (89%)',
      accionesDerivadas: 'Refuerzo de DD en subcontratistas'
    }
  },
  {
    id: 'REC-KPI-2026-002',
    tipoRegistro: 'seguimiento_medicion',
    clausulaIso: 'Cl. 9.1',
    titulo: 'Encuesta Anual de Clima Ético y Percepción de Integridad — Resultados 2026',
    fecha: '2026-06-18',
    areaUbicacion: 'Recursos Humanos — Encuesta de Clima',
    responsable: 'Gerencia de RRHH & Oficial de Cumplimiento',
    estadoVerificacion: 'verificado',
    resumenEvidencia: 'Encuesta anónima a 680 colaboradores. Índice de confianza en el Canal Ético: 78% (+6 pts vs 2025). 91% declara conocer la política antisoborno. Puntos de mejora: visibilidad de sanciones y capacitación en turnos nocturnos.',
    documentosAdjuntos: [
      { nombre: 'Resultados_Encuesta_Clima_Etico_2026.pdf', formato: 'PDF', hash: 'SHA256:4c5d6e7f8a9b0c' }
    ],
    metadatosEspecificos: {
      periodo: 'Anual 2026',
      kpisMonitoreados: 8,
      tendenciaDenuncias: 'Confianza en alza',
      efectividadControles: 'Percepción positiva',
      accionesDerivadas: 'Plan de comunicación para turnos nocturnos'
    }
  }
];
