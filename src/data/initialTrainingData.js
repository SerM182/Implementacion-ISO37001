/**
 * Plan Anual de Capacitación, Catálogo de Cursos y Simulador de Evaluación Antisoborno
 * SGAS ISO 37001:2025 - AUTOPISTAS DE BUENOS AIRES S.A. (AUBASA)
 */

export const TRAINING_PLAN_OVERVIEW = {
  anio: 2026,
  titulo: 'Programa Anual de Capacitación y Sensibilización Antisoborno',
  metaCobertura: 95, // 95% del personal alcanzado por el SGAS
  totalColaboradores: 440,
  horasPlanificadasTotal: 2200,
  estadoGlobal: 'en_ejecucion',
  frecuencia: 'Anual obligatoria + Inducción en nuevos ingresos',
  areasAlcanzadas: [
    { nombre: 'Planificación y Obras Viales', personal: 140, horasRequeridas: 6, progreso: 82 },
    { nombre: 'Compras, Licitaciones y Legal', personal: 95, horasRequeridas: 6, progreso: 94 },
    { nombre: 'Tesorería y Administración', personal: 110, horasRequeridas: 4, progreso: 90 },
    { nombre: 'Directorio y Gerencia General', personal: 15, horasRequeridas: 4, progreso: 100 },
    { nombre: 'Contratistas y Terceros Críticos', personal: 80, horasRequeridas: 3, progreso: 75 }
  ]
};

export const COURSES_CATALOG = [
  {
    id: 'CUR-01',
    codigo: 'CAP-SGAS-01',
    titulo: 'Inducción General Antisoborno & Código de Ética AUBASA',
    rolDestinatario: 'Todo el Personal (Obligatorio)',
    audiencia: 'Todos los colaboradores de AUBASA y personal tercerizado',
    duracionHoras: 2,
    clausulaIso: 'Cl. 7.2 & 7.3',
    categoria: 'Gobernanza y Cultura Ética',
    nivel: 'Fundamental',
    descripcion: 'Fundamentos de la Norma ISO 37001:2025, Ley 27.401, política de tolerancia cero al soborno y uso del Canal Ético en AUBASA.',
    modulos: [
      {
        numero: 1,
        titulo: 'Introducción al SGAS y Marco Legal (Ley 27.401)',
        puntosClave: [
          'Qué es el soborno: promesa, ofrecimiento o aceptación de ventaja indebida directa o indirecta.',
          'Responsabilidad penal de las personas jurídicas y sanciones aplicables a la empresa y directivos.',
          'Política institucional de Tolerancia Cero en los 50 km de la Concesión BALP.'
        ],
        casoEstudio: 'Un empleado administrativo es contactado por un gestor que ofrece agilizar un trámite ante un organismo público provincial a cambio de un "honorario especial". Conforme la Política POL-SGAS-01, este pago de facilitación está terminantemente prohibido.',
        alertaAntisoborno: 'Los pagos informales nunca son gastos operativos legítimos, cualquiera sea su denominación.'
      },
      {
        numero: 2,
        titulo: 'Canal Ético y Garantía de No Represalias (Cl. 8.9)',
        puntosClave: [
          'Vías de denuncia seguras: Formulario web con token cifrado, 0800-INTEGRIDAD y canal.etico@aubasa.com.ar.',
          'Confidencialidad absoluta y opción de denuncia 100% anónima.',
          'Prohibición estricta de cualquier represalia laboral o personal contra el denunciante de buena fe.'
        ],
        casoEstudio: 'Un operario observa que un superior autoriza el paso sin cobro de camiones de una empresa constructora particular. Puede denunciar de forma segura y anónima en el Canal Ético con plena protección laboral.',
        alertaAntisoborno: 'Tomar represalias contra un denunciante constituye falta gravísima con despido justificado inmediato.'
      }
    ]
  },
  {
    id: 'CUR-02',
    codigo: 'CAP-SGAS-02',
    titulo: 'Controles Financieros y Segregación de Funciones en Pagos a Proveedores',
    rolDestinatario: 'Tesorería, Cuentas a Pagar, Finanzas y Contabilidad',
    audiencia: 'Personal involucrado en emisión de órdenes de pago, validación de facturas y transferencias bancarias',
    duracionHoras: 4,
    clausulaIso: 'Cl. 8.3 & 7.3',
    categoria: 'Controles Financieros y Operativos',
    nivel: 'Operativo Especializado',
    descripcion: 'Controles de desembolsos a contratistas, principio de 4 ojos (doble firma electrónica), orden cronológico FIFO y prevención de sobornos para agilizar o alterar pagos.',
    modulos: [
      {
        numero: 1,
        titulo: 'Circuito de Pagos y Principio de 4 Ojos (Cl. 8.3)',
        puntosClave: [
          'Doble firma electrónica mancomunada con token bancario obligatoria para toda transferencia.',
          'Verificación de CBU y titularidad de cuenta contra el padrón de debida diligencia.',
          'Respeto estricto del orden cronológico FIFO de facturas aprobadas sin favoritismos.'
        ],
        casoEstudio: 'Un contratista de señalización vial ofrece una comisión al operador de tesorería para adelantar el cobro de una factura antes del plazo FIFO estipulado. El operador debe rechazar la propuesta y reportarla inmediatamente al Canal Ético.',
        alertaAntisoborno: 'Cobrar o prometer pagos para alterar el orden cronológico o agilizar transferencias constituye delito de soborno y cohecho activo/pasivo.'
      },
      {
        numero: 2,
        titulo: 'Validación de Comprobantes y Conciliaciones Bancarias (Cl. 8.3)',
        puntosClave: [
          'Cotejo estricto de facturas electrónicas AFIP/ARBA con el certificado de obra o remito conformado.',
          'Prohibición absoluta de desembolsos en efectivo o cheques al portador a contratistas.',
          'Auditoría y conciliación bancaria mensual automatizada de todos los desembolsos de BALP.'
        ],
        casoEstudio: 'Tesorería recibe una solicitud de cambio de CBU bancario por correo electrónico para el pago de una certificación de repavimentación. El protocolo exige validación presencial/telefónica oficial y ratificación de Debida Diligencia antes de transferir.',
        alertaAntisoborno: 'Transferir fondos a cuentas no homologadas o sin debida diligencia previa expone a la empresa a fraude y desvío de fondos.'
      }
    ]
  },
  {
    id: 'CUR-03',
    codigo: 'CAP-SGAS-03',
    titulo: 'Transparencia en Licitaciones, Compras y Pliegos Viales',
    rolDestinatario: 'Compras, Licitaciones, Asuntos Jurídicos y Comisiones',
    audiencia: 'Personal involucrado en adquisiciones, pliegos de bases y comisiones de adjudicación',
    duracionHoras: 6,
    clausulaIso: 'Cl. 8.2, 8.4 & 8.6',
    categoria: 'Contrataciones Públicas y Pliegos',
    nivel: 'Avanzado',
    descripcion: 'Diseño de pliegos sin direccionamiento, evaluación a ciegas de ofertas, screening de debida diligencia e inserción de cláusulas anticorrupción.',
    modulos: [
      {
        numero: 1,
        titulo: 'Diseño Neutral de Pliegos y Prohibición de Especificaciones Dirigidas',
        puntosClave: [
          'Prohibición de marcas comerciales o patentes exclusivas en especificaciones técnicas de insumos viales.',
          'Publicidad obligatoria de llamados a licitación y apertura pública de sobres.',
          'Plazo mínimo de 3 días para observaciones e impugnaciones ciudadanas.'
        ],
        casoEstudio: 'Un proveedor de pintura termoplástica para señalización solicita que el pliego exija una certificación extranjera que solo su firma posee en Argentina. La Comisión de Compras debe rechazar el pedido para garantizar la libre concurrencia.',
        alertaAntisoborno: 'El direccionamiento de pliegos configura el delito de negociaciones incompatibles con la función pública.'
      },
      {
        numero: 2,
        titulo: 'Debida Diligencia de Oferentes y Cláusulas Contractuales (Cl. 8.2 & 8.6)',
        puntosClave: [
          'Screening de Beneficiario Final (UBO), PEP y antecedentes penales de directivos.',
          'Inserción obligatoria de la Cláusula Vigésimo Primera de Rescisión por Soborno.',
          'Facultad de auditoría de libros y canteras del contratista.'
        ],
        casoEstudio: 'En una licitación para repavimentación en la traza BALP (Quilmes - Hudson), el oferente mejor puntuado tiene como accionista a la cónyuge de un funcionario de Vialidad. Se exige dictamen especial de cumplimiento y abstención formal.',
        alertaAntisoborno: 'Nunca adjudicar contratos a empresas sin verificación previa de integridad completada.'
      }
    ]
  },
  {
    id: 'CUR-04',
    codigo: 'CAP-SGAS-04',
    titulo: 'Inspección de Obras Viales, Calidad de Asfalto y Prevención de Cohecho',
    rolDestinatario: 'Inspectores Viales, Obras Civiles y Laboratorio',
    audiencia: 'Inspectores de obra en traza, directores técnicos y personal de control de calidad',
    duracionHoras: 6,
    clausulaIso: 'Cl. 8.4 & 8.7',
    categoria: 'Inspección de Obra y Calidad',
    nivel: 'Técnico Especializado',
    descripcion: 'Ensayos ciegos de probetas de asfalto con LEMIT/UNLP, medición in situ de espesores y rechazo absoluto de dádivas u hospitalidad de empresas constructoras.',
    modulos: [
      {
        numero: 1,
        titulo: 'Control Físico-Técnico y Ensayos de Calado de Asfalto',
        puntosClave: [
          'Extracción conjunta obligatoria de testigos cilíndricos en presencia del inspector y la empresa.',
          'Rotulación ciega con código QR sin nombre de la contratista.',
          'Remisión directa a laboratorios universitarios acreditados (LEMIT / UNLP / UBA).'
        ],
        casoEstudio: 'En la obra de repavimentación del Tramo Hudson-La Plata, el calado de probetas arroja un espesor de 4.2 cm frente a los 5.0 cm exigidos por el pliego. El inspector debe rechazar el certificado de obra y no puede convalidar el pago.',
        alertaAntisoborno: 'Firmar certificados de obra con volúmenes o calidades adulteradas constituye falsedad ideológica y cohecho.'
      },
      {
        numero: 2,
        titulo: 'Relación con Contratistas y Política de Regalos en Obradores (Cl. 8.7)',
        puntosClave: [
          'Prohibición de recibir almuerzos, asados, vehículos de apoyo o estadías de contratistas.',
          'Inspecciones independientes con transporte y recursos propios provistos por AUBASA.',
          'Reporte inmediato de cualquier intento de soborno u ofrecimiento en el obrador.'
        ],
        casoEstudio: 'El jefe de obra de una constructora ofrece al inspector de AUBASA el uso de una camioneta 4x4 de la empresa para sus traslados particulares. El inspector debe rechazar la oferta y declararlo formalmente en el libro de regalos.',
        alertaAntisoborno: 'Aceptar bienes o servicios de un contratista fiscalizado compromete irremediablemente la imparcialidad del inspector.'
      }
    ]
  },
  {
    id: 'CUR-05',
    codigo: 'CAP-SGAS-05',
    titulo: 'Investigación de Denuncias, Confidencialidad y Gestión del Canal Ético',
    rolDestinatario: 'Oficial de Cumplimiento y Comité de Integridad',
    audiencia: 'Equipo de cumplimiento, auditores internos y miembros del Comité de Integridad',
    duracionHoras: 8,
    clausulaIso: 'Cl. 8.9, 8.10 & 9.2',
    categoria: 'Investigaciones y Auditoría Forense',
    nivel: 'Especialista',
    descripcion: 'Metodología de triaje, custodia de cadena de evidencias digitales, entrevistas de investigación y protocolos de denuncia judicial.',
    modulos: [
      {
        numero: 1,
        titulo: 'Triaje y Valoración Preliminar de Denuncias',
        puntosClave: [
          'Plazo perentorio de 5 días hábiles para el análisis de admisibilidad y verosimilitud.',
          'Desestimación fundada de denuncias manifiestamente infundadas o de índole estrictamente laboral.',
          'Asignación de código de caso cifrado para resguardar la identidad del denunciante.'
        ],
        casoEstudio: 'Ingresa una denuncia anónima aportando copias de chats de WhatsApp donde un supervisor exige un porcentaje a un proveedor de servicios de grúa. Cumplimiento admite el caso e inicia investigación preliminar reservada.',
        alertaAntisoborno: 'La filtración de la identidad de un denunciante anónimo es motivo de despido y responsabilidad penal.'
      },
      {
        numero: 2,
        titulo: 'Técnicas de Auditoría Forense y Dictamen Conclusivo',
        puntosClave: [
          'Relevamiento no invasivo de registros informáticos y transacciones bancarias.',
          'Preservación de cadena de custodia con Hash SHA-256 de archivos y correos.',
          'Dictamen final al Directorio y preparación de denuncia penal ante la Fiscalía de Delitos Complejos.'
        ],
        casoEstudio: 'Finalizada la investigación con evidencia documental fehaciente, el Oficial de Cumplimiento presenta el informe reservado al Directorio recomendando el despido justificado y la presentación judicial inmediata.',
        alertaAntisoborno: 'Todo hecho de soborno comprobado en una empresa pública debe ser denunciado obligatoriamente a la justicia.'
      }
    ]
  },
  {
    id: 'CUR-06',
    codigo: 'CAP-SGAS-06',
    titulo: 'Debida Diligencia de Socios de Negocios y Evaluación de Riesgo PEP',
    rolDestinatario: 'Directorio, Gerencias y Comisión de Adjudicaciones',
    audiencia: 'Directorio, Gerencia General, Gerencia de Administración y Comisión de Contrataciones',
    duracionHoras: 4,
    clausulaIso: 'Cl. 8.2 & 7.2',
    categoria: 'Gobernanza y Terceros',
    nivel: 'Directivo / Estratégico',
    descripcion: 'Análisis de riesgo en Uniones Transitorias de Empresas (UTE), beneficiarios finales ocultos y mitigación de conflictos de interés directivos.',
    modulos: [
      {
        numero: 1,
        titulo: 'Identificación de Personas Expuestas Políticamente y UTEs',
        puntosClave: [
          'Resolución UIF 35/2023 sobre Personas Expuestas Políticamente y allegados cercanos.',
          'Debida diligencia sobre cada una de las empresas integrantes de una UTE vial.',
          'Verificación de beneficiarios finales humanos detrás de sociedades por acciones.'
        ],
        casoEstudio: 'Una UTE oferente para la ampliación del tercer carril de la Autopista La Plata posee un socio con el 20% perteneciente a un ex funcionario del área de transporte. Se requiere dictamen fundado del Oficial de Cumplimiento y aprobación expresa por Directorio.',
        alertaAntisoborno: 'La figura de UTE no exime a ninguna de las socias de la debida diligencia individual estricta.'
      },
      {
        numero: 2,
        titulo: 'Declaraciones Juradas Directivas y Abstención (Cl. 7.2)',
        puntosClave: [
          'DDJJ anual de bienes y participaciones societarias del Directorio de AUBASA.',
          'Deber de abstención inmediata ante cualquier interés cruzado con contratistas viales.',
          'Registro auditable de excusaciones en el Libro de Actas de Directorio.'
        ],
        casoEstudio: 'Un director de AUBASA detecta que un primo hermano es socio en una empresa subcontratista de iluminación vial. Debe formular su abstención formal en el acta de Directorio y retirarse de la votación.',
        alertaAntisoborno: 'Votar o intervenir en la contratación de un familiar directo es delito de conflicto de intereses.'
      }
    ]
  },
  {
    id: 'CUR-07',
    codigo: 'CAP-SGAS-07',
    titulo: 'Prevención de Fraude Financiero y Desvío de Fondos en Obras Viales',
    rolDestinatario: 'Tesorería, Administración, Finanzas y Auditoría Interna',
    audiencia: 'Personal responsable de la gestión de tesorería, control presupuestario y cuentas a pagar',
    duracionHoras: 4,
    clausulaIso: 'Cl. 8.3 & Ley 27.401',
    categoria: 'Controles Financieros y Operativos',
    nivel: 'Operativo Especializado',
    descripcion: 'Señales de alerta de soborno en la cadena de pagos, transferencias atípicas, facturación apócrifa y control de integridad en cuentas bancarias de proveedores.',
    modulos: [
      {
        numero: 1,
        titulo: 'Señales de Alerta (Red Flags) en Pagos y Facturación',
        puntosClave: [
          'Identificación de solicitudes de pago con premura injustificada o sin respaldo documental.',
          'Detección de inconsistencias entre orden de compra, remito de insumos y factura AFIP.',
          'Reporte inmediato de intentos de pago a cuentas radicadas en jurisdicciones no declaradas o a nombre de terceros.'
        ],
        casoEstudio: 'Se presenta una factura de un proveedor de iluminación que solicita el pago a la cuenta personal de un apoderado en lugar de la cuenta jurídica registrada en el legajo de debida diligencia. Tesorería bloquea el pago preventivamente.',
        alertaAntisoborno: 'Efectuar pagos a cuentas no verificadas constituye un desvío grave de los controles financieros Cl. 8.3.'
      },
      {
        numero: 2,
        titulo: 'Integridad y Trazabilidad Bancaria (Cl. 8.3)',
        puntosClave: [
          'Conciliación bancaria diaria con registros contables automatizados.',
          'Control de segregación estricta entre emisor de la orden de pago y autorizantes bancarios.',
          'Auditoría periódica del padrón de CBU y certificados de cumplimiento fiscal.'
        ],
        casoEstudio: 'Auditoría Interna realiza una revisión aleatoria sobre 50 transferencias de obra vial y valida la concordancia total entre el informe del laboratorio LEMIT/UNLP, el certificado aprobado y los autorizantes del token bancario.',
        alertaAntisoborno: 'Todo pago efectuado sin el correspondiente certificado de calidad y doble firma electrónica es causal de sumario y auditoría forense.'
      }
    ]
  },
  {
    id: 'CUR-08',
    codigo: 'CAP-SGAS-08',
    titulo: 'Inducción Antisoborno para Contratistas y Proveedores',
    rolDestinatario: 'Contratistas, UTEs y Proveedores de AUBASA',
    audiencia: 'Oferentes, adjudicatarios, subcontratistas y su personal clave en obra',
    duracionHoras: 3,
    clausulaIso: 'Cl. 8.2 & 8.6',
    categoria: 'Gobernanza y Terceros',
    nivel: 'Fundamental',
    descripcion: 'Adhesión al Código de Conducta de Terceros, cláusulas anticorrupción, facultad de auditoría de AUBASA y consecuencias del soborno en la ejecución de contratos viales.',
    modulos: [
      {
        numero: 1,
        titulo: 'Código de Conducta de Terceros y Cláusulas Contractuales (Cl. 8.6)',
        puntosClave: [
          'Alcance de la Cláusula Vigésimo Primera de rescisión por soborno (CLA-SGAS-01).',
          'Prohibición de ofrecer dádivas, viajes o beneficios a inspectores y personal de AUBASA.',
          'Facultad de AUBASA de auditar libros, remitos de cantera y registros de subcontratación.'
        ],
        casoEstudio: 'Un subcontratista ofrece al inspector de AUBASA el uso de una camioneta 4x4 para traslados. La empresa titular debe rechazar la conducta, reportarla y recordar al subcontratista la cláusula antisoborno.',
        alertaAntisoborno: 'El soborno cometido por un subcontratista compromete y puede rescindir el contrato principal con pérdida de garantía.'
      },
      {
        numero: 2,
        titulo: 'Debida Diligencia y Beneficiario Final (Cl. 8.2)',
        puntosClave: [
          'Obligación de declarar beneficiarios finales (UBO) y personas expuestas políticamente (PEP).',
          'Actualización del Cuestionario de Integridad ante cambios societarios.',
          'Consecuencias de ocultar vínculos con funcionarios públicos.'
        ],
        casoEstudio: 'Una UTE modifica su composición societaria incorporando un socio sin informar a AUBASA. Detectado el cambio, se suspende la certificación de pago hasta regularizar la debida diligencia.',
        alertaAntisoborno: 'Ocultar un beneficiario final o un vínculo PEP configura incumplimiento grave y rescisión contractual.'
      }
    ]
  },
  {
    id: 'CUR-09',
    codigo: 'CAP-SGAS-09',
    titulo: 'Auditoría Interna del SGAS y Revisión por la Dirección',
    rolDestinatario: 'Auditores Internos y Oficial de Cumplimiento',
    audiencia: 'Equipo de Auditoría Interna, auditores líderes ISO 37001 y responsables de proceso',
    duracionHoras: 6,
    clausulaIso: 'Cl. 9.2 & 9.3',
    categoria: 'Investigaciones y Auditoría Forense',
    nivel: 'Especialista',
    descripcion: 'Planificación del programa anual de auditoría antisoborno, técnicas de muestreo documental, independencia del auditor y preparación de la Revisión por la Dirección.',
    modulos: [
      {
        numero: 1,
        titulo: 'Programa Anual de Auditoría y Muestreo Basado en Riesgo (Cl. 9.2)',
        puntosClave: [
          'Cobertura mínima anual de todos los procesos del SGAS.',
          'Independencia: un auditor no audita su propio trabajo.',
          'Muestreo ampliado en procesos de alto riesgo (contrataciones, obras y tesorería).'
        ],
        casoEstudio: 'Al auditar 42 expedientes de pago, el equipo detecta 3 hallazgos sobre archivo de minutas de comisiones evaluadoras. Se formulan observaciones menores con plan de acción correctiva.',
        alertaAntisoborno: 'El auditor que omite deliberadamente un hallazgo relevante compromete la validez de la certificación ISO 37001.'
      },
      {
        numero: 2,
        titulo: 'Revisión por la Dirección y Decisiones de Mejora (Cl. 9.3)',
        puntosClave: [
          'Orden del día obligatorio: riesgos, denuncias, auditorías, no conformidades y recursos.',
          'Frecuencia mínima semestral del Directorio.',
          'Salidas de la revisión: decisiones de mejora, cambios en el SGAS y asignación de recursos.'
        ],
        casoEstudio: 'El Directorio analiza la matriz de riesgos y aprueba el presupuesto para equipamiento de laboratorios viales, dejando constancia en acta firmada.',
        alertaAntisoborno: 'La Revisión por la Dirección no puede delegarse; es responsabilidad indelegable del máximo nivel de gobierno de AUBASA.'
      }
    ]
  },
  {
    id: 'CUR-10',
    codigo: 'CAP-SGAS-10',
    titulo: 'Liderazgo Ético y Tone from the Top para Directorio y Gerencias',
    rolDestinatario: 'Directorio, Gerencia General y Gerencias de Primera Línea',
    audiencia: 'Miembros del Directorio, Presidencia y Gerentes de Área de AUBASA',
    duracionHoras: 4,
    clausulaIso: 'Cl. 5.1 & 5.2',
    categoria: 'Gobernanza y Cultura Ética',
    nivel: 'Directivo / Estratégico',
    descripcion: 'Responsabilidades indelegables del órgano de gobierno, liderazgo con el ejemplo y obligaciones de la alta dirección en la asignación de recursos y la cultura antisoborno.',
    modulos: [
      {
        numero: 1,
        titulo: 'Responsabilidades Indelegables del Órgano de Gobierno (Cl. 5.1)',
        puntosClave: [
          'Aprobación y comunicación de la Política Antisoborno (POL-SGAS-01).',
          'Asignación de recursos suficientes y adecuados para el SGAS.',
          'Designación y respaldo de la Función de Cumplimiento con independencia jerárquica (Cl. 5.3).'
        ],
        casoEstudio: 'Un director propone reducir el presupuesto de la Oficina de Cumplimiento. El Directorio evalúa que ello comprometería la eficacia del SGAS y decide mantener los recursos, dejando constancia en acta.',
        alertaAntisoborno: 'El compromiso del máximo nivel de gobierno es el requisito previo de cualquier sistema antisoborno eficaz.'
      },
      {
        numero: 2,
        titulo: 'Liderazgo con el Ejemplo y Cultura de Integridad',
        puntosClave: [
          'Coherencia entre el discurso y las decisiones cotidianas de la alta dirección.',
          'Tolerancia cero efectiva: las sanciones se aplican sin distinción jerárquica.',
          'Promoción de una cultura donde consultar e informar es valorado.'
        ],
        casoEstudio: 'La Gerencia General comunica personalmente la política antisoborno en el acto de apertura de sobres de una licitación, reforzando la transparencia del proceso.',
        alertaAntisoborno: 'Un liderazgo que ignora las señales de alerta legitima el soborno en el resto de la organización.'
      }
    ]
  }
];

export const SITUATIONAL_QUIZ_QUESTIONS = [
  {
    id: 'Q1',
    cursoId: 'CUR-01',
    moduloRef: 1,
    clausulaIso: 'Cl. 5.2 & 8.7',
    pregunta: 'Un contratista que realiza obras de bacheo en la Autopista BALP (km 15 - Bernal) le envía a la oficina del inspector vial una caja con vinos de alta gama valorada en USD 180 como "atención de fin de año". ¿Cuál es el proceder obligatorio según las normas del SGAS de AUBASA?',
    opciones: [
      { id: 'a', texto: 'Aceptar el obsequio y compartirlo con los demás compañeros del área técnica.' },
      { id: 'b', texto: 'Rechazarlo o declararlo formalmente ante el Oficial de Cumplimiento dentro de las 48 hs para su devolución formal o donación institucional, ya que supera el umbral de USD 50 y proviene de un contratista bajo fiscalización.' },
      { id: 'c', texto: 'Aceptarlo siempre que no se mencione en el libro de obra ni en los certificados de pago.' },
      { id: 'd', texto: 'Aceptarlo si el contratista ya terminó el 50% de la obra con buen rendimiento.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'Conforme la Política POL-SGAS-02 y la Cláusula 8.7 de la ISO 37001, los obsequios que superan USD 50 o que provienen de contratistas fiscalizados deben ser rechazados o declarados para su devolución o donación institucional para preservar la imparcialidad.'
  },
  {
    id: 'Q2',
    cursoId: 'CUR-02',
    moduloRef: 1,
    clausulaIso: 'Cl. 8.3',
    pregunta: 'En Tesorería, un proveedor le ofrece a la persona responsable de emitir la orden de pago $15.000 ARS en efectivo "por izquierda" para que su factura se pague antes que las demás, salteando el orden cronológico (FIFO). ¿Qué debe hacer el responsable?',
    opciones: [
      { id: 'a', texto: 'Cobrar el dinero y adelantar el pago, ya que igualmente le corresponde cobrar tarde o temprano.' },
      { id: 'b', texto: 'Rechazar de forma rotunda el dinero extra, mantener el orden cronológico reglamentario y reportar el intento de soborno al Oficial de Cumplimiento.' },
      { id: 'c', texto: 'Cobrar el dinero y guardarlo para entregarlo "por las dudas" si alguien pregunta más adelante.' },
      { id: 'd', texto: 'Aceptar el dinero una sola vez si hay mucha demora en los pagos ese mes.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'El pago indebido para alterar el orden cronológico de pagos constituye soborno activo/pasivo. El responsable debe rechazarlo, mantener el criterio FIFO reglamentario y notificar la irregularidad.'
  },
  {
    id: 'Q3',
    cursoId: 'CUR-04',
    moduloRef: 1,
    clausulaIso: 'Cl. 8.4',
    pregunta: 'Durante la fiscalización de la repavimentación en la Autopista BsAs-La Plata, los ensayos de laboratorio de calado de probetas arrojan que la carpeta asfáltica tiene 4.3 cm de espesor en lugar de los 5.0 cm exigidos por el pliego de licitación. El contratista pide que el inspector "dé el visto bueno provisional" prometiendo compensarlo en el tramo siguiente. ¿Qué debe hacer el inspector?',
    opciones: [
      { id: 'a', texto: 'Aprobar el certificado porque 4.3 cm es casi similar a 5.0 cm.' },
      { id: 'b', texto: 'Bloquear inmediatamente la certificación de obra en el sistema, emitir el informe técnico de no conformidad y exigir el fresado y reasfaltado a exclusivo costo del contratista.' },
      { id: 'c', texto: 'Cobrarle una multa informal en efectivo para los gastos de laboratorio.' },
      { id: 'd', texto: 'Dejarlo a criterio del chofer de la empresa constructora.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'La Cláusula 8.4 exige controles no financieros estrictos. Avalar una calidad inferior a la licitada constituye fraude y cohecho técnico. Se debe bloquear el pago y exigir la reparación total del tramo conforme pliego.'
  },
  {
    id: 'Q4',
    cursoId: 'CUR-03',
    moduloRef: 2,
    clausulaIso: 'Cl. 7.2 & 8.2',
    pregunta: 'Un integrante de la Comisión Evaluadora de Ofertas de AUBASA descubre que uno de los oferentes de la licitación para la provisión de mezcla asfáltica pertenece a su hermano. ¿Cuál es su deber ético y normativo?',
    opciones: [
      { id: 'a', texto: 'Continuar en la comisión pero calificar a su hermano con un puntaje muy bajo para no levantar sospechas.' },
      { id: 'b', texto: 'Declarar inmediatamente el conflicto de interés por escrito ante el Oficial de Cumplimiento, abstenerse de intervenir en la evaluación y solicitar su reemplazo formal.' },
      { id: 'c', texto: 'No decir nada si el hermano presentó la oferta más económica del mercado.' },
      { id: 'd', texto: 'Pedirle a su hermano que cambie la razón social de la empresa.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'El POE-SGAS-03 y la Cláusula 7.2 exigen la declaración obligatoria y abstención inmediata ante cualquier conflicto de intereses con oferentes o contratistas para garantizar la total transparencia del proceso licitatorio.'
  },
  {
    id: 'Q5',
    cursoId: 'CUR-01',
    moduloRef: 2,
    clausulaIso: 'Cl. 8.9 & 8.10',
    pregunta: 'Un empleado de AUBASA sospecha razonablemente que se están realizando pagos irregulares en Tesorería, pero teme sufrir despidos o traslados si realiza la denuncia. ¿Qué garantías le brinda el SGAS ISO 37001 de AUBASA?',
    opciones: [
      { id: 'a', texto: 'Ninguna, porque las denuncias siempre se hacen con copia al jefe directo.' },
      { id: 'b', texto: 'Garantía absoluta de confidencialidad o anonimato a través del Canal Ético y política de tolerancia cero a represalias, siendo causal de despido inmediato sancionar a quien denuncie de buena fe.' },
      { id: 'c', texto: 'Solo protección si aporta pruebas certificadas ante escribano público.' },
      { id: 'd', texto: 'Protección únicamente si la denuncia involucra a montos millonarios en dólares.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'La Cláusula 8.9 y la política institucional POL-SGAS-03 protegen al denunciante de buena fe con anonimato cifrado y prohibición estricta de cualquier represalia laboral o personal.'
  },
  {
    id: 'Q6',
    cursoId: 'CUR-07',
    moduloRef: 1,
    clausulaIso: 'Cl. 8.3 & Ley 25.246',
    pregunta: 'Un proveedor menor solicita reiteradamente ser pagado en efectivo, fraccionando sus facturas para quedar por debajo del monto que exige transferencia bancaria, sin justificación comercial aparente. ¿Cuál es el proceder correcto del personal de Tesorería según las normas antisoborno y de prevención de lavado de AUBASA?',
    opciones: [
      { id: 'a', texto: 'Ignorar el patrón porque no es tarea de Tesorería evaluar la actividad comercial de los proveedores.' },
      { id: 'b', texto: 'Reportar el patrón inusual de fraccionamiento y pagos en efectivo al Oficial de Cumplimiento como operación sospechosa, sin alertar al proveedor, conforme la Ley 25.246 y la Cl. 8.3.' },
      { id: 'c', texto: 'Acceder al pago en efectivo para no perder al proveedor.' },
      { id: 'd', texto: 'Registrar los pagos sin factura para agilizar el trámite.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'Los pagos en efectivo reiterados y el fraccionamiento de facturas sin trazabilidad pueden constituir señales de alerta de lavado de activos. El personal debe reportar la operación inusual al Oficial de Cumplimiento (sujeto obligado UIF) sin alertar al proveedor.'
  },
  {
    id: 'Q7',
    cursoId: 'CUR-08',
    moduloRef: 1,
    clausulaIso: 'Cl. 8.6 & 8.2',
    pregunta: 'Un contratista de bacheo le propone a un inspector de AUBASA "arreglar" el remito de áridos para facturar menos material del realmente utilizado, ofreciendo repartir la diferencia en efectivo. ¿Qué debe hacer el inspector?',
    opciones: [
      { id: 'a', texto: 'Aceptar la propuesta para agilizar la obra y no generar demoras.' },
      { id: 'b', texto: 'Rechazar terminantemente la oferta, reportar el hecho al Canal Ético y al Oficial de Cumplimiento, y dejar constancia en el libro de obra; la empresa queda expuesta a rescisión contractual (CLA-SGAS-01).' },
      { id: 'c', texto: 'Aceptar solo si el monto no supera los USD 50.' },
      { id: 'd', texto: 'Consultar con el jefe de obra del contratista antes de decidir.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'Alterar remitos o certificaciones configura fraude y soborno. La Cláusula 8.6 y CLA-SGAS-01 facultan a AUBASA a rescindir el contrato y aplicar penalidades e inhabilitación.'
  },
  {
    id: 'Q8',
    cursoId: 'CUR-09',
    moduloRef: 1,
    clausulaIso: 'Cl. 9.2',
    pregunta: 'Durante una auditoría interna, un auditor detecta una debilidad grave en la segregación de funciones de pagos, pero el gerente de finanzas le pide que la omita "para no retrasar la certificación ISO". ¿Qué debe hacer el auditor?',
    opciones: [
      { id: 'a', texto: 'Omitir el hallazgo para no perjudicar el proceso de certificación.' },
      { id: 'b', texto: 'Registrarlo como observación menor para minimizar el impacto.' },
      { id: 'c', texto: 'Documentar el hallazgo como no conformidad con total independencia y reportarlo conforme el programa de auditoría (Cl. 9.2), sin ceder a presiones.' },
      { id: 'd', texto: 'Aceptar la sugerencia del gerente a cambio de que lo corrija informalmente.' }
    ],
    respuestaCorrecta: 2,
    explicacion: 'La independencia del auditor es esencial. Ocultar o minimizar un hallazgo relevante compromete la validez del SGAS y la futura certificación ISO 37001.'
  },
  {
    id: 'Q9',
    cursoId: 'CUR-10',
    moduloRef: 2,
    clausulaIso: 'Cl. 5.1 & 5.2',
    pregunta: 'Un director de AUBASA minimiza la política antisoborno en una reunión y sugiere "no perseguir" a un contratista influyente que entregó dádivas, argumentando razones comerciales. ¿Cuál es la conducta correcta?',
    opciones: [
      { id: 'a', texto: 'Seguir la sugerencia del director para no dañar la relación comercial.' },
      { id: 'b', texto: 'Recordar que la tolerancia cero y el liderazgo con el ejemplo (Cl. 5.1) son indelegables, y que corresponde investigar y aplicar las sanciones sin distinción jerárquica.' },
      { id: 'c', texto: 'Postergar el tratamiento del caso hasta después de la licitación.' },
      { id: 'd', texto: 'Transferir la decisión al contratista para que "arregle" la situación directamente.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'El compromiso del órgano de gobierno es el pilar del SGAS. Aplicar la política sin excepciones, sin importar la influencia del tercero, es responsabilidad indelegable del Directorio.'
  },
  {
    id: 'Q10',
    cursoId: 'CUR-06',
    moduloRef: 1,
    clausulaIso: 'Cl. 8.2',
    pregunta: 'Durante la debida diligencia de una UTE oferente, se descubre que un socio minoritario (20%) es un ex funcionario del área de transporte provincial, y la UTE no lo había declarado. ¿Qué corresponde hacer?',
    opciones: [
      { id: 'a', texto: 'Continuar con la adjudicación porque el funcionario ya no está en ejercicio.' },
      { id: 'b', texto: 'Tratarlo como PEP, exigir la declaración completa del beneficiario final, requerir dictamen especial del Oficial de Cumplimiento y elevar la decisión al Directorio (Cl. 8.2).' },
      { id: 'c', texto: 'Pedir a la UTE que modifique su composición societaria en silencio.' },
      { id: 'd', texto: 'Descartar la oferta sin documentar los motivos.' }
    ],
    respuestaCorrecta: 1,
    explicacion: 'La presencia de una PEP no declarada obliga a debida diligencia intensificada, dictamen fundado y autorización expresa del máximo nivel de gobierno antes de contratar.'
  }
];

export const INITIAL_COLLABORATORS_PROGRESS = [
  {
    id: 'COL-001',
    nombre: '(a designar)',
    legajo: 'LEG-1042',
    area: 'Oficina de Cumplimiento',
    cargo: 'Oficial de Cumplimiento Antisoborno',
    cursosCompletados: ['CUR-01', 'CUR-02', 'CUR-03', 'CUR-04', 'CUR-05', 'CUR-06'],
    calificacionPromedio: 98,
    horasAcumuladas: 30,
    estadoCertificacion: 'certificado',
    fechaUltimaCertificacion: '2026-02-15'
  },
  {
    id: 'COL-002',
    nombre: 'Gómez, Laura',
    legajo: 'LEG-2104',
    area: 'Compras, Licitaciones y Contrataciones',
    cargo: 'Jefa de Compras y Contrataciones',
    cursosCompletados: ['CUR-01', 'CUR-02'],
    calificacionPromedio: 92,
    horasAcumuladas: 6,
    estadoCertificacion: 'certificado',
    fechaUltimaCertificacion: '2026-02-28'
  },
  {
    id: 'COL-003',
    nombre: 'Herrera, Carlos',
    legajo: 'LEG-3088',
    area: 'Obras Viales e Inspección',
    cargo: 'Inspector Técnico de Calzada (Tramo Hudson-La Plata)',
    cursosCompletados: ['CUR-01', 'CUR-04'],
    calificacionPromedio: 90,
    horasAcumuladas: 8,
    estadoCertificacion: 'certificado',
    fechaUltimaCertificacion: '2026-02-20'
  },
  {
    id: 'COL-004',
    nombre: 'Pérez, Mariana',
    legajo: 'LEG-4150',
    area: 'Compras y Licitaciones',
    cargo: 'Analista Principal de Pliegos y Contrataciones',
    cursosCompletados: ['CUR-01', 'CUR-03'],
    calificacionPromedio: 95,
    horasAcumuladas: 8,
    estadoCertificacion: 'certificado',
    fechaUltimaCertificacion: '2026-02-22'
  }
];
