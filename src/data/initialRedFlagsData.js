/**
 * Catálogo de Alertas Tempranas ("Red Flags") en Concesiones Viales y AUBASA
 * Indicadores clave de riesgo de soborno, colusión y fraude
 */

export const RED_FLAGS_CATALOG = [
  // CATEGORÍA 1: LICITACIONES Y CONTRATACIONES
  {
    id: 'RF-CON-01',
    categoria: 'Licitaciones y Contrataciones',
    alerta: 'Especificaciones técnicas excesivamente restrictivas o con marcas registradas encubiertas',
    descripcion: 'El pliego describe dimensiones, fórmulas o patentes exclusivas que solo un proveedor del mercado puede cumplir, descalificando a competidores.',
    severidad: 'alta', // 'alta', 'media', 'baja'
    proceso: 'Contratación',
    medidaInmediata: 'Revisión obligatoria del pliego por una comisión técnica independiente y apertura a parámetros de desempeño funcional.'
  },
  {
    id: 'RF-CON-02',
    categoria: 'Licitaciones y Contrataciones',
    alerta: 'Ofertas de competidores con errores tipográficos idénticos o mismos domicilios fiscales',
    descripcion: 'Indicio claro de oferta de cobertura o acuerdo colusorio donde un mismo grupo redacta las ofertas de supuestos competidores.',
    severidad: 'alta',
    proceso: 'Contratación',
    medidaInmediata: 'Descalificación preventiva, suspensión cautelar de proveedores e informe de colusión a la CNDC y Asuntos Jurídicos.'
  },
  {
    id: 'RF-CON-03',
    categoria: 'Licitaciones y Contrataciones',
    alerta: 'Descalificación sistemática de ofertas más económicas por formalismos menores',
    descripcion: 'La comisión evaluadora rechaza la oferta de menor precio alegando errores no sustanciales (falta de foliado o copias simples) para adjudicar a una firma más cara.',
    severidad: 'alta',
    proceso: 'Contratación',
    medidaInmediata: 'Intimación de subsanación de defectos formales no esenciales y auditoría del dictamen de preadjudicación.'
  },
  {
    id: 'RF-CON-04',
    categoria: 'Licitaciones y Contrataciones',
    alerta: 'Multiplicidad de compras directas por montos inmediatamente inferiores al límite licitatorio',
    descripcion: 'Fraccionamiento deliberado del objeto contractual para eludir el control de la licitación pública.',
    severidad: 'alta',
    proceso: 'Contratación',
    medidaInmediata: 'Bloqueo automático en sistema ERP y sumario administrativo a la jefatura de compras requirente.'
  },
  {
    id: 'RF-CON-05',
    categoria: 'Licitaciones y Contrataciones',
    alerta: 'Plazos irrazonablemente breves para la presentación de ofertas complejas',
    descripcion: 'Se otorga un plazo mínimo (ej: 48 horas) para cotizar obras o suministros complejos, favoreciendo al proveedor que ya conocía el pliego de antemano.',
    severidad: 'media',
    proceso: 'Contratación',
    medidaInmediata: 'Prórroga obligatoria de la fecha de apertura de ofertas por un plazo no menor a 15 días hábiles.'
  },

  // CATEGORÍA 2: PAGOS Y TESORERÍA
  {
    id: 'RF-PAG-01',
    categoria: 'Pagos y Tesorería',
    alerta: 'Facturación correlativa exclusiva de un proveedor hacia AUBASA durante todo el año',
    descripcion: 'Proveedor que emite facturas numeradas sucesivamente solo a AUBASA, indicando dependencia absoluta o posible empresa fantasma sin otros clientes.',
    severidad: 'alta',
    proceso: 'Pagos',
    medidaInmediata: 'Inspección física del domicilio comercial y exigencia de acreditación de nómina de personal y maquinaria.'
  },
  {
    id: 'RF-PAG-02',
    categoria: 'Pagos y Tesorería',
    alerta: 'Solicitud de pago a cuentas bancarias de terceros o en paraísos fiscales',
    descripcion: 'El contratista solicita desviar la transferencia a una cuenta radicada en una jurisdicción offshore o a nombre de un cesionario no declarado.',
    severidad: 'alta',
    proceso: 'Pagos',
    medidaInmediata: 'Rechazo terminante de la transferencia. Los pagos solo se realizan a la cuenta bancaria oficial del CUIT contratante en Argentina.'
  },
  {
    id: 'RF-PAG-03',
    categoria: 'Pagos y Tesorería',
    alerta: 'Alteración del orden cronológico de pagos sin resolución fundada de liquidez',
    descripcion: 'Se abonan facturas recientes de un contratista específico mientras se postergan facturas más antiguas de otros proveedores sin motivo técnico.',
    severidad: 'media',
    proceso: 'Pagos',
    medidaInmediata: 'Auditoría inmediata del listado de tesorería y restablecimiento del criterio FIFO (Primero en entrar, primero en pagar).'
  },
  {
    id: 'RF-PAG-04',
    categoria: 'Pagos y Tesorería',
    alerta: 'Rendiciones de gastos de caja chica en peajes con comprobantes no fiscales o descripciones genéricas',
    descripcion: 'Comprobantes manuscritos por "gastos varios" o atenciones a funcionarios de municipios por donde pasa la traza vial.',
    severidad: 'media',
    proceso: 'Pagos',
    medidaInmediata: 'Desestimación del reintegro, reposición del dinero por el responsable del peaje e inspección sorpresiva.'
  },

  // CATEGORÍA 3: OBRAS VIALES E INSPECCIÓN TÉCNICA
  {
    id: 'RF-OBR-01',
    categoria: 'Obras Viales e Inspección',
    alerta: 'Certificados de avance de obra firmados sin protocolo de ensayos de laboratorio de asfalto/hormigón',
    descripcion: 'La inspección avala el avance físico mensual sin contar con los ensayos de calado que certifiquen el espesor y la densidad requeridos.',
    severidad: 'alta',
    proceso: 'Obras Viales',
    medidaInmediata: 'Retención preventiva del pago del certificado y realización de calados ciegos con laboratorio universitario.'
  },
  {
    id: 'RF-OBR-02',
    categoria: 'Obras Viales e Inspección',
    alerta: 'Aprobación de adicionales de obra que modifican sustancialmente el balance económico del contrato',
    descripcion: 'Aumento desproporcionado en ítems de alto margen (ej: movimiento de suelos o asfalto) y supresión de ítems de bajo margen.',
    severidad: 'alta',
    proceso: 'Obras Viales',
    medidaInmediata: 'Suspensión de la modificación y peritaje técnico de la Comisión de Obras de AUBASA.'
  },
  {
    id: 'RF-OBR-03',
    categoria: 'Obras Viales e Inspección',
    alerta: 'Vínculos de amistad íntima o visitas extralaborales entre inspectores de obra y directivos del contratista',
    descripcion: 'Inspectores que comparten reuniones sociales, viajes o traslados en vehículos provistos por la empresa constructora contratista.',
    severidad: 'media',
    proceso: 'Obras Viales',
    medidaInmediata: 'Rotación inmediata del inspector de obra y sumario para verificar imparcialidad de los certificados emitidos.'
  },
  {
    id: 'RF-OBR-04',
    categoria: 'Obras Viales e Inspección',
    alerta: 'Justificación recurrente de demoras en obras con partes meteorológicos que contradicen registros oficiales',
    descripcion: 'Se argumentan días de lluvia para no aplicar multas por mora, pero los datos del Servicio Meteorológico Nacional muestran días despejados.',
    severidad: 'media',
    proceso: 'Obras Viales',
    medidaInmediata: 'Validación satelital cruzada y cómputo estricto de días de mora para aplicar multas contractuales.'
  }
];
