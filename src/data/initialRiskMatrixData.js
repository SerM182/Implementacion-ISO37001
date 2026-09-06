/**
 * Matriz Inicial de Riesgos de Soborno para AUBASA
 * Norma ISO 37001:2025 — Cláusulas 4.5 y 6.1
 * Alcance: Contratación, Pagos, Planificación y Ejecución de Obras Viales
 */

export const INITIAL_RISK_ITEMS = [
  // ==========================================
  // PILAR 1: CONTRATACIÓN Y COMPRAS
  // ==========================================
  {
    id: 'RS-CON-01',
    proceso: 'Contratación',
    subproceso: 'Elaboración de Pliegos Técnicos',
    riesgo: 'Direccionamiento de especificaciones técnicas en pliegos de licitación de maquinaria vial y equipos de planta asfáltica para favorecer a un fabricante específico.',
    descripcionEvento: 'Un funcionario de compras o asesor técnico redacta cláusulas del pliego que exigen patentes o dimensiones que solo un oferente del mercado posee, a cambio de una promesa de dádiva.',
    probabilidad: 2, // 1: Baja, 2: Media, 3: Alta
    impacto: 3,       // 1: Leve, 2: Moderado, 3: Crítico
    // Inherent Risk = P x I = 6 (Alto)
    controlesExistentes: [
      'Revisión legal estándar de pliegos por Asuntos Jurídicos.',
      'Período de observaciones públicas y consultas sin reserva de identidad en web de AUBASA.'
    ],
    efectividadControles: 'moderado', // fuerte (0.3), moderado (0.6), debil (1.0)
    // Residual Risk = ceil(6 * 0.6) = 4 (Medio)
    planTratamiento: 'Implementación de pliegos modelo con parámetros funcionales abiertos (no marcas ni patentes exclusivas); dictamen de no direccionamiento obligatorio por comisión técnica de 3 ingenieros.',
    responsable: 'Gerente de Compras / Oficial de Cumplimiento',
    plazo: '2026-11-30',
    estado: 'en_tratamiento', // 'controlado', 'en_tratamiento', 'critico'
    clausulaIso: 'Cl. 8.4'
  },
  {
    id: 'RS-CON-02',
    proceso: 'Contratación',
    subproceso: 'Licitaciones de Obras Viales',
    riesgo: 'Acuerdos colusorios (cartelización) y reparto de tramos entre empresas contratistas de pavimentación en la traza BALP.',
    descripcionEvento: 'Constructoras viales acuerdan turnarse las ofertas ganadoras en obras de la Autopista Buenos Aires - La Plata (km 0 a 50), presentando ofertas de cobertura con precios artificialmente elevados.',
    probabilidad: 3,
    impacto: 3,
    // Inherent Risk = 9 (Crítico)
    controlesExistentes: [
      'Apertura de ofertas en acto público.',
      'Control de solvencia y registro nacional de constructores.'
    ],
    efectividadControles: 'debil',
    // Residual Risk = ceil(9 * 1.0) = 9 (Crítico)
    planTratamiento: 'Aplicación obligatoria de algoritmo de detección de patrones colusorios (cruce de precios unitarios, domicilios e IPs); declaración jurada de ofertas independientes y reporte preventivo a la CNDC.',
    responsable: 'Comisión Evaluadora de Ofertas / Oficial de Cumplimiento',
    plazo: '2026-10-15',
    estado: 'critico',
    clausulaIso: 'Cl. 8.2 & 8.4'
  },
  {
    id: 'RS-CON-03',
    proceso: 'Contratación',
    subproceso: 'Contrataciones Directas Menores',
    riesgo: 'Fraccionamiento deliberado de órdenes de compra de insumos viales y pintura termoplástica para eludir el régimen de licitación pública.',
    descripcionEvento: 'Se dividen compras continuas en múltiples órdenes menores al tope de compra directa para asignarlas discrecionalmente a un proveedor afín.',
    probabilidad: 3,
    impacto: 2,
    // Inherent = 6
    controlesExistentes: [
      'Aprobación por Gerente de Administración.',
      'Límite montos en sistema contable.'
    ],
    efectividadControles: 'moderado',
    // Residual = 4
    planTratamiento: 'Consolidación semestral de necesidades de compras en el Plan Anual de Compras y bloqueo informático en el ERP de compras reiteradas al mismo CUIT en un período menor a 90 días.',
    responsable: 'Gerencia de Compras y Contrataciones',
    plazo: '2026-12-15',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.4'
  },
  {
    id: 'RS-CON-04',
    proceso: 'Contratación',
    subproceso: 'Evaluación de Ofertas',
    riesgo: 'Filtración indebida del presupuesto oficial y de las ofertas económicas de competidores antes de la apertura oficial de sobres.',
    descripcionEvento: 'Personal interno con acceso al expediente digital o físico adelanta información confidencial a un oferente a cambio de una comisión ilícita.',
    probabilidad: 2,
    impacto: 3,
    // Inherent = 6
    controlesExistentes: [
      'Expediente bajo custodia en oficina de compras.',
      'Acceso con usuario y clave.'
    ],
    efectividadControles: 'moderado',
    // Residual = 4
    planTratamiento: 'Implementación de plataforma de licitaciones con encriptación de ofertas de extremo a extremo y apertura simultánea de ofertas mediante doble clave criptográfica en presencia de escribano público.',
    responsable: 'Sistemas / Asuntos Jurídicos',
    plazo: '2026-11-15',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.4'
  },

  // ==========================================
  // PILAR 2: PAGOS Y CONTROLES FINANCIEROS
  // ==========================================
  {
    id: 'RS-PAG-01',
    proceso: 'Pagos',
    subproceso: 'Tesorería y Desembolsos',
    riesgo: 'Exigencia o aceptación de sobornos ("retornos") por parte de personal de pagos para acelerar la liquidación de facturas y certificados de obra.',
    descripcionEvento: 'Personal de tesorería demora arbitrariamente las transferencias a contratistas que no acceden al pago de comisiones indebidas.',
    probabilidad: 2,
    impacto: 3,
    // Inherent = 6
    controlesExistentes: [
      'Listado de pagos semanales aprobado por Finanzas.',
      'Transferencias mediante banca electrónica corporativa.'
    ],
    efectividadControles: 'moderado',
    // Residual = 4
    planTratamiento: 'Automatización del orden cronológico estricto de pago en el ERP (FIFO) visible en portal de proveedores; auditoría mensual de fechas de vencimiento vs fecha efectiva de transferencia.',
    responsable: 'Gerencia de Administración y Finanzas / Auditoría Interna',
    plazo: '2026-10-30',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.3'
  },
  {
    id: 'RS-PAG-02',
    proceso: 'Pagos',
    subproceso: 'Redeterminación de Precios de Obra',
    riesgo: 'Alteración fraudulenta de las fórmulas de redeterminación de precios (Decreto 367/17) para liquidar sobreprecios indebidos al contratista vial.',
    descripcionEvento: 'Se incorporan índices de ponderación desactualizados o se modifican coeficientes de insumos clave (asfalto, gasoil) para aumentar artificialmente el monto redeterminado a cambio de un soborno.',
    probabilidad: 2,
    impacto: 3,
    // Inherent = 6
    controlesExistentes: [
      'Cálculo elaborado por el área de redeterminaciones.',
      'Dictamen contable previo al pago.'
    ],
    efectividadControles: 'moderado',
    // Residual = 4
    planTratamiento: 'Validación automatizada de índices con conexión directa a bases del INDEC y DPE; doble firma técnica de la Dirección de Obras y la Asesoría Contable con trazabilidad pública.',
    responsable: 'Dirección Técnica / Gerencia de Finanzas',
    plazo: '2026-12-01',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.3 & Cl. 8.4'
  },
  {
    id: 'RS-PAG-03',
    proceso: 'Pagos',
    subproceso: 'Respaldo Documental y Oportunidad de Pago',
    riesgo: 'Liberación de órdenes de pago sin respaldo documental completo (factura, remito, certificado de obra) o fuera del circuito de aprobación estándar, encubriendo un pago indebido.',
    descripcionEvento: 'Aprobación de transferencias bancarias con comprobantes incompletos, no fiscales o cargados fuera de plazo, sin la verificación previa exigida por el procedimiento de pagos.',
    probabilidad: 2,
    impacto: 2,
    // Inherent = 4
    controlesExistentes: [
      'Checklist de respaldo documental obligatorio previo a la liberación del pago.',
      'Validación fiscal AFIP/ARBA de cada comprobante antes del desembolso.'
    ],
    efectividadControles: 'fuerte', // (0.3)
    // Residual = ceil(4 * 0.3) = 2 (Bajo)
    planTratamiento: 'Bloqueo automático en el sistema de pagos de toda orden que no tenga adjunta la documentación de respaldo completa y validada, con conciliación mensual automática.',
    responsable: 'Tesorería / Gerencia de Finanzas',
    plazo: '2026-11-01',
    estado: 'controlado',
    clausulaIso: 'Cl. 8.3'
  },
  {
    id: 'RS-PAG-04',
    proceso: 'Pagos',
    subproceso: 'Liquidación a Subcontratistas',
    riesgo: 'Pago de facturas a sociedades fantasma o empresas proveedoras sin sustancia económica real (facturas apócrifas AFIP).',
    descripcionEvento: 'Ingreso y liquidación de facturas emitidas por firmas sin capacidad operativa ni empleados para simular servicios viales y extraer fondos ilícitos.',
    probabilidad: 2,
    impacto: 3,
    // Inherent = 6
    controlesExistentes: [
      'Verificación manual de CUIT activo en AFIP.',
      'Control de remitos por mesa de entradas.'
    ],
    efectividadControles: 'moderado',
    // Residual = 4
    planTratamiento: 'Screening fiscal automatizado contra la base de Usinas de Facturas Apócrifas de AFIP y validación de solvencia técnica previa a la emisión de la orden de pago en el ERP.',
    responsable: 'Contabilidad y Finanzas / Oficial de Cumplimiento',
    plazo: '2026-10-30',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.2 & Cl. 8.3'
  },

  // ==========================================
  // PILAR 3: PLANIFICACIÓN Y EJECUCIÓN DE OBRAS
  // ==========================================
  {
    id: 'RS-OBR-01',
    proceso: 'Obras Viales',
    subproceso: 'Inspección de Obra y Ensayos de Calidad',
    riesgo: 'Soborno al inspector de obra de AUBASA para aprobar calidades de asfalto inferiores a los pliegos (menor espesor o menor contenido de polímeros).',
    descripcionEvento: 'La empresa constructora coloca una capa de rodamiento de 4 cm en lugar de los 6 cm contratados y soborna a la inspección para falsear los reportes de calado de testigos.',
    probabilidad: 3,
    impacto: 3,
    // Inherent = 9 (Crítico)
    controlesExistentes: [
      'Libro de comunicaciones de obra en sitio.',
      'Presencia de inspector de obra durante la colocación de la mezcla.'
    ],
    efectividadControles: 'debil',
    // Residual = 9 (Crítico)
    planTratamiento: 'Extracción de probetas y testigos calados con georreferenciación satelital (GPS) y remisión de muestras a laboratorios de universidades nacionales (UNLP / UBA) con código ciego de trazabilidad.',
    responsable: 'Gerencia de Obras e Infraestructura / Laboratorio de Control',
    plazo: '2026-10-20',
    estado: 'critico',
    clausulaIso: 'Cl. 8.4 & Cl. 8.5'
  },
  {
    id: 'RS-OBR-02',
    proceso: 'Obras Viales',
    subproceso: 'Certificación Mensual de Avance de Obra',
    riesgo: 'Emisión de certificados de obra con volúmenes de movimiento de suelos, bacheo o fresado superiores a los realmente ejecutados en la traza.',
    descripcionEvento: 'El inspector y el contratista inflan los cómputos métricos mensuales para generar pagos anticipados indebidos a favor de la empresa vial.',
    probabilidad: 3,
    impacto: 3,
    // Inherent = 9 (Crítico)
    controlesExistentes: [
      'Firma del certificado por inspector y representante técnico del contratista.',
      'Visado por la Dirección de Obras.'
    ],
    efectividadControles: 'moderado',
    // Residual = 6 (Alto)
    planTratamiento: 'Relevamiento topográfico mediante drones con fotogrametría digital antes y después del bacheo/pavimentación; cruce obligatorio con remitos de pesaje de báscula de cantera.',
    responsable: 'Gerente de Obras / Dirección Técnica Vial',
    plazo: '2026-11-20',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.4'
  },
  {
    id: 'RS-OBR-03',
    proceso: 'Obras Viales',
    subproceso: 'Adicionales de Obra y Modificaciones de Proyecto',
    riesgo: 'Aprobación injustificada de "adicionales de obra" o ítems imprevistos para compensar ofertas inicialmente bajas con márgenes extraordinarios.',
    descripcionEvento: 'El contratista gana la licitación con oferta a la baja y luego soborna a la inspección para justificar "vicios ocultos del terreno" que duplican el costo de la obra.',
    probabilidad: 2,
    impacto: 3,
    // Inherent = 6
    controlesExistentes: [
      'Límite legal del 20% de adicionales conforme Ley 6021.',
      'Aprobación por Directorio de AUBASA.'
    ],
    efectividadControles: 'moderado',
    // Residual = 4
    planTratamiento: 'Dictamen técnico pericial obligatorio de una comisión de expertos independientes para cualquier adicional superior al 5% del monto contractual original.',
    responsable: 'Directorio / Gerencia de Obras / Asuntos Jurídicos',
    plazo: '2026-12-10',
    estado: 'en_tratamiento',
    clausulaIso: 'Cl. 8.4'
  },
  {
    id: 'RS-OBR-04',
    proceso: 'Obras Viales',
    subproceso: 'Prórrogas de Plazo y Exención de Multas',
    riesgo: 'Otorgamiento de prórrogas de plazo ficticias alegando "condiciones climáticas desfavorables" para eximir al contratista de multas por mora.',
    descripcionEvento: 'Se fraguan partes meteorológicos con complicidad de la inspección para justificar meses de retraso en la repavimentación de la Autopista sin aplicar las penalidades de contrato.',
    probabilidad: 2,
    impacto: 2,
    // Inherent = 4
    controlesExistentes: [
      'Registro de libro de obra.',
      'Informes mensuales de avance físico.'
    ],
    efectividadControles: 'fuerte',
    // Residual = 2 (Bajo)
    planTratamiento: 'Cruce automático con registros de estaciones meteorológicas oficiales del SMN y verificación de cámaras de monitoreo vial de AUBASA para validar días de lluvia real.',
    responsable: 'Gerencia de Obras / Centro de Control de Tránsito',
    plazo: '2026-11-15',
    estado: 'controlado',
    clausulaIso: 'Cl. 8.4'
  }
];

export const INITIAL_RISK_MATRIX = INITIAL_RISK_ITEMS;

