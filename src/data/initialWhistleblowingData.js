/**
 * Casos y Registros del Canal Ético / Denuncias (ISO 37001 Cl. 8.9 & 8.10)
 * Sistema confidencial de recepción, triaje y tratamiento de incidentes de AUBASA
 */

export const INITIAL_WHISTLEBLOWING_REPORTS = [
  {
    id: 'CASE-2026-001',
    tokenSeguimiento: 'AU-ETH-2026-8942',
    fechaRecepcion: '2026-07-12',
    origen: 'Formulario Web Anónimo',
    tipoDenunciante: 'anonimo', // 'anonimo' | 'identificado'
    categoria: 'Conflicto de Intereses en Licitación',
    procesoAfectado: 'Contratación',
    ubicacion: 'Sede Central - Gerencia de Compras',
    descripcion: 'Se denuncia que uno de los miembros de la Comisión Evaluadora en la Licitación de Señalización y Cámaras de la Autopista BALP es cuñado del apoderado de una de las firmas oferentes preadjudicadas.',
    personasInvolucradas: 'Lic. R. Gómez (Comisión Evaluadora) y Directivos de Señalética Vial S.A.',
    evidenciasAportadas: 'Copia de actas societarias y vínculos de parentesco acreditados en redes sociales.',
    estado: 'en_investigacion', // 'recibida', 'evaluacion_preliminar', 'en_investigacion', 'comite_etica', 'derivacion_penal', 'cerrada'
    prioridad: 'alta', // 'alta', 'media', 'baja'
    oficialACargo: '',
    fechaLimiteInforme: '2026-08-12',
    accionesTomadas: [
      { fecha: '2026-07-13', detalle: 'Admisión del caso y asignación de código confidencial.' },
      { fecha: '2026-07-15', detalle: 'Medida cautelar: Se solicitó la recusación y reemplazo preventivo del funcionario en la Comisión Evaluadora.' },
      { fecha: '2026-07-22', detalle: 'Revisión técnica independiente de las puntuaciones otorgadas en el dictamen.' }
    ],
    conclusionDictamen: 'En proceso de dictamen final. Se acreditó el vínculo de parentesco no declarado.'
  },
  {
    id: 'CASE-2026-002',
    tokenSeguimiento: 'AU-ETH-2026-3105',
    fechaRecepcion: '2026-06-28',
    origen: 'Línea Telefónica 0800',
    tipoDenunciante: 'identificado',
    nombreDenunciante: 'Ing. Supervisor de Traza (Reserva de Identidad)',
    categoria: 'Irregularidad en Ensayos de Calidad de Asfalto',
    procesoAfectado: 'Obras Viales',
    ubicacion: 'Autopista BALP - km 28 (Tramo Quilmes - Berazategui)',
    descripcion: 'El contratista de repavimentación intentó presionar al laboratorista de campo para sustituir testigos calados de asfalto por muestras preparadas previamente en planta.',
    personasInvolucradas: 'Jefe de Obra de la Contratista y Ayudante de Laboratorio',
    evidenciasAportadas: 'Audio de conversación y fotografías de probetas no identificadas en camioneta.',
    estado: 'comite_etica',
    prioridad: 'alta',
    oficialACargo: '',
    fechaLimiteInforme: '2026-07-28',
    accionesTomadas: [
      { fecha: '2026-06-29', detalle: 'Apertura inmediata de expediente confidencial de investigación.' },
      { fecha: '2026-07-02', detalle: 'Auditoría pericial in situ con extracción de 12 nuevos testigos con presencia de escribano.' },
      { fecha: '2026-07-10', detalle: 'Laboratorio de la UNLP confirmó que el tramo no alcanzaba la densidad requerida.' },
      { fecha: '2026-07-18', detalle: 'Elevación de informe al Comité de Ética recomendando rescisión parcial e intimación a rehacer el tramo a costo del contratista.' }
    ],
    conclusionDictamen: 'Falta grave comprobada. Se aplicó penalidad contractual y se suspendió al contratista del Registro por 24 meses.'
  },
  {
    id: 'CASE-2026-003',
    tokenSeguimiento: 'AU-ETH-2026-1188',
    fechaRecepcion: '2026-05-14',
    origen: 'Correo Electrónico Canal Ético',
    tipoDenunciante: 'anonimo',
    categoria: 'Uso Indebido de Fondos Fijos de Sede Central',
    procesoAfectado: 'Pagos',
    ubicacion: 'Sede Central (Tesorería)',
    descripcion: 'Se denunció la presentación reiterada de tickets de combustible de vehículos particulares cargados al fondo fijo de Tesorería.',
    personasInvolucradas: 'Responsable de Caja Chica de Tesorería',
    evidenciasAportadas: 'Listado de patentes de vehículos ajenos a la flota oficial de AUBASA.',
    estado: 'cerrada',
    prioridad: 'media',
    oficialACargo: '',
    fechaLimiteInforme: '2026-06-14',
    accionesTomadas: [
      { fecha: '2026-05-15', detalle: 'Cruce de comprobantes con el sistema contable y registro de flota oficial.' },
      { fecha: '2026-05-20', detalle: 'Se constató el desvío irregular de fondos por un monto menor.' },
      { fecha: '2026-06-01', detalle: 'Se ordenó la restitución del dinero y sanción de suspensión laboral de 15 días.' }
    ],
    conclusionDictamen: 'Caso resuelto con sanción disciplinaria y reintegro total del monto. Se implementó tarjeta prepaga digital para la rendición de caja chica.'
  }
];
