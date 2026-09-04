/**
 * Base de Conocimiento Experta en ISO 37001:2016 y Marco Normativo Argentino
 * Especializada en Concesiones Viales y AUBASA (Contratación, Pagos, Obras)
 */

export const COMPLIANCE_KNOWLEDGE_BASE = {
  normas: {
    iso37001: {
      nombre: 'ISO 37001:2016 — Sistemas de Gestión Antisoborno',
      descripcion: 'Estándar internacional que especifica los requisitos y proporciona una guía para establecer, implementar, mantener, revisar y mejorar un sistema de gestión antisoborno.',
      clausulasClave: [
        {
          numero: '4.5',
          titulo: 'Evaluación del Riesgo de Soborno',
          requisito: 'La organización debe evaluar regularmente el riesgo de soborno inherente y residual en sus procesos clave, considerando la naturaleza del sector, el tamaño, la ubicación y las transacciones de alto valor.',
          aplicacionAubasa: 'Obligatorio evaluar por separado: Licitaciones de obras viales, redeterminaciones de precios, pagos a subcontratistas, fondos fijos de estaciones de peaje y certificaciones de inspectores en traza.',
          evidenciasTipicas: ['Matriz de Riesgos SGAS aprobada', 'Informes semestrales de revisión de riesgos', 'Criterios de valoración 3x3 documentados']
        },
        {
          numero: '5.2',
          titulo: 'Política Antisoborno',
          requisito: 'La alta dirección debe establecer y mantener una política que prohíba el soborno, exija el cumplimiento de leyes antisoborno, sea apropiada al propósito, incluya el compromiso de mejora continua y garantice la autoridad independiente de la función de cumplimiento.',
          aplicacionAubasa: 'Aprobada por Directorio de AUBASA, de difusión pública y obligatoria para todos los contratistas que ingresen a la traza.',
          evidenciasTipicas: ['Acta de Directorio de aprobación de la Política', 'Publicación en sitio web oficial y cartelería en estaciones de peaje', 'Constancias de acuse de recibo de empleados']
        },
        {
          numero: '5.3',
          titulo: 'Roles, Responsabilidades y Autoridades — Función de Cumplimiento',
          requisito: 'Debe asignarse una Función de Cumplimiento Antisoborno con competencia, posición, autoridad e independencia adecuadas, con acceso directo y sin restricciones al órgano de gobierno (Directorio).',
          aplicacionAubasa: 'El Oficial de Cumplimiento de AUBASA debe emitir dictámenes vinculantes en contrataciones de alto riesgo y reportar trimestralmente al Directorio.',
          evidenciasTipicas: ['Designación formal del Oficial de Cumplimiento por Directorio', 'Términos de referencia con independencia operativa', 'Informes periódicos elevados al Directorio']
        },
        {
          numero: '8.2',
          titulo: 'Debida Diligencia (Due Diligence)',
          requisito: 'Evaluar el alcance, la escala y la naturaleza del riesgo de soborno en relación con proyectos específicos, transacciones, socios comerciales y personal en puestos sensibles.',
          aplicacionAubasa: 'Screening obligatorio de UTEs, constructoras de asfalto, proveedores de telepeaje y proveedores con contratos superiores a los umbrales de contratación directa.',
          evidenciasTipicas: ['Cuestionarios de debida diligencia completados', 'Certificados y dictámenes de screening PEP/UBO', 'Informes comerciales y antecedentes penales de directivos']
        },
        {
          numero: '8.3',
          titulo: 'Controles Financieros',
          requisito: 'Implementar controles financieros que reduzcan el riesgo de soborno (segregación de funciones, doble firma, auditoría previa al desembolso, conciliaciones bancarias).',
          aplicacionAubasa: 'Doble firma en transferencias bancarias a contratistas de obra, prohibición total de pagos en efectivo fuera de fondos fijos estrictamente reglamentados en peajes, validación fiscal AFIP/ARBA previa al pago.',
          evidenciasTipicas: ['Matriz de firmas y autorizaciones bancarias', 'Procedimiento de pago a contratistas de obra', 'Arqueos y rendiciones de fondos fijos de peajes']
        },
        {
          numero: '8.4',
          titulo: 'Controles No Financieros',
          requisito: 'Implementar controles no financieros en compras, operaciones, comercial, legal y obras (licitaciones transparentes, comisiones de al menos 2 personas, especificaciones no direccionadas, ensayos de calidad independientes).',
          aplicacionAubasa: 'Comisión evaluadora de al menos 3 miembros con declaraciones de no conflicto de interés; ensayos de densidad de mezcla asfáltica realizados por laboratorios externos certificados; protocolos de cómputo métrico in situ.',
          evidenciasTipicas: ['Actas de apertura y dictámenes de comisiones evaluadoras', 'Protocolos de ensayos de laboratorio de asfalto y hormigón', 'Informes de inspección de obra en traza con geolocalización']
        },
        {
          numero: '8.6',
          titulo: 'Compromisos Antisoborno Contractuales',
          requisito: 'Exigir que los socios comerciales se comprometan a prevenir el soborno y facultar a la organización para rescindir el contrato si el socio incurre en soborno.',
          aplicacionAubasa: 'Cláusula anticorrupción obligatoria en el 100% de los pliegos de AUBASA con rescisión automática sin indemnización y aplicación de penalidades de la Ley 27.401.',
          evidenciasTipicas: ['Pliegos de licitación con cláusula tipo CLA-SGAS-01', 'Contratos de obra vial firmados con cláusula resolutoria expresa', 'Declaraciones juradas de integridad suscriptas por oferentes']
        },
        {
          numero: '8.7',
          titulo: 'Regalos, Hospitalidad, Donaciones y Beneficios Similares',
          requisito: 'Procedimiento formal para prevenir la oferta, suministro o aceptación de regalos o atenciones que puedan ser percibidos como soborno.',
          aplicacionAubasa: 'Prohibición absoluta a inspectores de obra y personal de compras de recibir regalos de contratistas en proceso licitatorio o de ejecución. Registro público de obsequios institucionales de valor inferior a 50 USD.',
          evidenciasTipicas: ['Libro/Registro institucional de obsequios y atenciones', 'Comunicaciones internas de prohibición de regalos en fin de año', 'Comprobantes de donación o rechazo de obsequios fuera de norma']
        },
        {
          numero: '8.9',
          titulo: 'Planteamiento de Inquietudes (Canal Ético / Whistleblowing)',
          requisito: 'Establecer procedimientos que permitan denunciar de buena fe o sobre la base de una sospecha razonable, garantizando confidencialidad y protección contra represalias.',
          aplicacionAubasa: 'Canal digital y telefónico 0800 anónimo gestionado por la Función de Cumplimiento, con protocolo formal de protección al denunciante.',
          evidenciasTipicas: ['Portal web de denuncias con token de seguimiento', 'Protocolo de protección al denunciante y política de no represalias', 'Registros de recepción con fecha y hora preservando anonimato']
        },
        {
          numero: '8.10',
          titulo: 'Investigación y Tratamiento del Soborno',
          requisito: 'Investigar toda sospecha de soborno con personal independiente, cooperar con autoridades judiciales y adoptar medidas disciplinarias y correctivas inmediatas.',
          aplicacionAubasa: 'Plazo máximo de 30 días para informe preliminar de auditoría interna de compliance y derivación inmediata a la Justicia Penal si hay indicios tipificados en la Ley 27.401.',
          evidenciasTipicas: ['Protocolo formal de investigación interna', 'Expedientes de investigación foliados y confidenciales', 'Dictámenes del Comité de Ética y denuncias penales formuladas']
        },
        {
          numero: '4.1',
          titulo: 'Comprensión de la Organización y de su Contexto',
          requisito: 'Determinar las cuestiones externas e internas pertinentes al propósito del SGAS y que afectan su capacidad para lograr los resultados previstos.',
          aplicacionAubasa: 'Análisis del marco legal de concesiones viales provinciales, el Ministerio de Infraestructura PBA como órgano de supervisión y los riesgos propios del manejo de efectivo en peajes y de la certificación de obras.',
          evidenciasTipicas: ['Análisis FODA antisoborno', 'Mapeo del marco regulatorio provincial y nacional', 'Contexto institucional del Manual del SGAS (MAN-SGAS-01)']
        },
        {
          numero: '4.2',
          titulo: 'Necesidades y Expectativas de las Partes Interesadas',
          requisito: 'Identificar las partes interesadas pertinentes al SGAS y sus requisitos.',
          aplicacionAubasa: 'Ministerio de Infraestructura PBA, usuarios viales, contratistas y UTEs, sindicatos del sector vial y organismos de control provinciales.',
          evidenciasTipicas: ['Matriz de partes interesadas', 'Requisitos de integridad exigidos a contratistas', 'Compromisos con organismos de supervisión']
        },
        {
          numero: '4.3',
          titulo: 'Determinación del Alcance del SGAS',
          requisito: 'Definir los límites y la aplicabilidad del sistema de gestión antisoborno.',
          aplicacionAubasa: 'El alcance comprende Contratación y Abastecimiento, Pagos y Tesorería, y Planificación y Ejecución de Obras Viales en la Concesión Autopista Buenos Aires - La Plata (BALP - 50 km).',
          evidenciasTipicas: ['Documento de alcance aprobado por Directorio', 'Acta de Directorio de aprobación del alcance']
        },
        {
          numero: '5.1',
          titulo: 'Liderazgo y Compromiso',
          requisito: 'El órgano de gobierno y la alta dirección deben demostrar liderazgo y compromiso con el SGAS, asignando recursos y promoviendo una cultura antisoborno.',
          aplicacionAubasa: 'El Directorio de AUBASA aprueba las políticas, designa la Función de Cumplimiento, asigna presupuesto y participa en las revisiones semestrales del sistema.',
          evidenciasTipicas: ['Actas de Directorio sobre compliance', 'Presupuesto asignado a la Oficina de Cumplimiento', 'Comunicaciones de la alta dirección sobre tolerancia cero']
        },
        {
          numero: '6.1',
          titulo: 'Acciones para Abordar Riesgos y Oportunidades',
          requisito: 'Planificar acciones para abordar los riesgos de soborno evaluados, integrarlas a los procesos y evaluar su eficacia.',
          aplicacionAubasa: 'Planes de tratamiento de la Matriz de Riesgos con responsable y plazo, priorizando licitaciones, fondos fijos de peajes y certificación de obras.',
          evidenciasTipicas: ['Planes de tratamiento de riesgos', 'Matriz de Riesgos de Soborno (Cl. 4.5)', 'Seguimiento de eficacia de controles']
        },
        {
          numero: '6.2',
          titulo: 'Objetivos Antisoborno y Planificación para Lograrlos',
          requisito: 'Establecer objetivos medibles y coherentes con la política antisoborno, y planificar cómo alcanzarlos.',
          aplicacionAubasa: '100% de pliegos con cláusula antisoborno, 95% del personal de riesgo capacitado, 100% de contratistas críticos con debida diligencia vigente y 100% de pagos a proveedores con doble firma electrónica.',
          evidenciasTipicas: ['Tablero de Objetivos y KPIs del SGAS', 'Informes trimestrales de avance (Cl. 9.1)', 'Actas de cierre anual de objetivos']
        },
        {
          numero: '7.2',
          titulo: 'Competencia y Debida Diligencia del Personal',
          requisito: 'Garantizar la competencia del personal y aplicar debida diligencia en la selección y promoción de quienes ocupan puestos expuestos al riesgo de soborno.',
          aplicacionAubasa: 'Debida diligencia y declaraciones juradas de compradores, tesoreros, cajeros, inspectores de obra y miembros de comisiones evaluadoras.',
          evidenciasTipicas: ['Legajos de debida diligencia del personal', 'Declaraciones Juradas de Conflicto de Interés', 'Registros de competencia y certificaciones']
        },
        {
          numero: '7.3',
          titulo: 'Toma de Conciencia y Formación',
          requisito: 'Asegurar que las personas tomen conciencia de la política antisoborno y se capaciten de forma adecuada y periódica.',
          aplicacionAubasa: 'Programa anual de capacitación por roles (cajeros, inspectores, compras, directivos y contratistas), con evaluación de eficacia y certificación.',
          evidenciasTipicas: ['Plan anual de capacitación', 'Actas de asistencia y evaluaciones', 'Certificados individuales de formación']
        },
        {
          numero: '7.4',
          titulo: 'Comunicación',
          requisito: 'Determinar las comunicaciones internas y externas pertinentes al SGAS, incluyendo qué, cuándo, a quién y cómo comunicar.',
          aplicacionAubasa: 'Difusión de la política en peajes y obradores, carta de adhesión a contratistas y publicación de resultados del SGAS a partes interesadas.',
          evidenciasTipicas: ['Campañas de difusión y cartelería', 'Acuses de comunicación a contratistas', 'Registro de comunicaciones del SGAS']
        },
        {
          numero: '7.5',
          titulo: 'Información Documentada',
          requisito: 'Crear, actualizar y controlar la información documentada del SGAS, conservando los registros como evidencia de conformidad.',
          aplicacionAubasa: 'Codificación documental (MAN, POL, POE, CLA, REG), control de cambios, trazabilidad criptográfica SHA-256 y retención mínima de 10 años.',
          evidenciasTipicas: ['Maestro de documentos controlados', 'Registros y evidencias de cumplimiento', 'Listado de registros auditables']
        },
        {
          numero: '8.1',
          titulo: 'Planificación y Control Operacional',
          requisito: 'Planificar, implementar y controlar los procesos necesarios para cumplir los requisitos y gestionar los riesgos de soborno.',
          aplicacionAubasa: 'Controles operacionales documentados en los POEs del SGAS y monitoreados por indicadores de desempeño.',
          evidenciasTipicas: ['POEs del SGAS aprobados', 'Controles operacionales implementados', 'Registros de ejecución de procesos']
        },
        {
          numero: '8.5',
          titulo: 'Implementación de Controles por Organizaciones Controladas y Socios de Negocio',
          requisito: 'Extender los controles antisoborno a entidades controladas y socios de negocio cuando corresponda.',
          aplicacionAubasa: 'Código de Conducta de Terceros, cláusulas anticorrupción en subcontratos y auditoría de la cadena de subcontratación de obras viales.',
          evidenciasTipicas: ['Código de Conducta de Terceros', 'Cláusulas anticorrupción en subcontratos', 'Registros de auditoría a subcontratistas']
        },
        {
          numero: '8.8',
          titulo: 'Gestión de la Insuficiencia de Controles Antisoborno',
          requisito: 'Cuando un control no pueda implementarse o resulte insuficiente, adoptar medidas alternativas y gestionar el riesgo residual.',
          aplicacionAubasa: 'Controles compensatorios transitorios (doble autorización manual ante fallas del ERP) y planes de remediación con plazo máximo de 45 días.',
          evidenciasTipicas: ['Fichas de insuficiencia de control', 'Planes de remediación', 'Verificación de eficacia posterior']
        },
        {
          numero: '9.1',
          titulo: 'Seguimiento, Medición, Análisis y Evaluación',
          requisito: 'Determinar qué se debe seguir y medir, los métodos y cuándo, para evaluar el desempeño y la eficacia del SGAS.',
          aplicacionAubasa: 'Tablero trimestral de KPIs, encuesta anual de clima ético y análisis de tendencias de denuncias y controles.',
          evidenciasTipicas: ['Informes de indicadores del SGAS', 'Encuestas de clima ético', 'Análisis de tendencias']
        },
        {
          numero: '9.2',
          titulo: 'Auditoría Interna',
          requisito: 'Realizar auditorías internas a intervalos planificados para verificar la conformidad con ISO 37001 y la eficacia del SGAS.',
          aplicacionAubasa: 'Programa anual de auditoría con enfoque en riesgos, auditores independientes y muestreo ampliado en contrataciones y obras.',
          evidenciasTipicas: ['Programa y plan de auditoría interna', 'Informes de auditoría', 'Calificación de auditores internos']
        },
        {
          numero: '9.3',
          titulo: 'Revisión por la Dirección',
          requisito: 'La alta dirección debe revisar el SGAS a intervalos planificados para asegurar su conveniencia, adecuación y eficacia continuas.',
          aplicacionAubasa: 'Sesión semestral del Directorio para analizar riesgos, denuncias, auditorías, no conformidades y asignación de recursos.',
          evidenciasTipicas: ['Actas de Revisión por la Dirección', 'Decisiones de mejora y asignación de recursos']
        },
        {
          numero: '9.4',
          titulo: 'Revisión por la Función de Cumplimiento Antisoborno',
          requisito: 'La Función de Cumplimiento debe revisar el SGAS periódicamente para evaluar su idoneidad, adecuación y eficacia.',
          aplicacionAubasa: 'Informe semestral del Oficial de Cumplimiento con recomendaciones elevadas al Directorio.',
          evidenciasTipicas: ['Informes del Oficial de Cumplimiento', 'Recomendaciones de mejora al Directorio']
        },
        {
          numero: '10.1',
          titulo: 'No Conformidad y Acción Correctiva',
          requisito: 'Reaccionar ante no conformidades, corregirlas, analizar la causa raíz e implementar acciones para eliminar la causa.',
          aplicacionAubasa: 'Metodología de los 5 Porqués, acciones correctivas con plazo máximo de 45 días y verificación de eficacia a los 60 días.',
          evidenciasTipicas: ['Fichas de No Conformidad y Acción Correctiva', 'Análisis de causa raíz', 'Verificación de eficacia']
        },
        {
          numero: '10.2',
          titulo: 'Mejora Continua',
          requisito: 'Mejorar continuamente la conveniencia, adecuación y eficacia del SGAS.',
          aplicacionAubasa: 'Ciclo de mejora alimentado por auditorías, denuncias, indicadores y revisiones del sistema.',
          evidenciasTipicas: ['Planes de mejora', 'Lecciones aprendidas', 'Actualizaciones del SGAS']
        }
      ]
    },
    ley27401: {
      nombre: 'Ley 27.401 — Responsabilidad Penal de las Personas Jurídicas (Argentina)',
      articulosClave: [
        {
          articulo: 'Art. 1',
          titulo: 'Delitos Comprendidos',
          descripcion: 'Cohecho y tráfico de influencias (Arts. 256, 258 Cód. Penal), Negociaciones incompatibles con la función pública (Art. 265), Concusión (Art. 268), Enriquecimiento ilícito (Arts. 268(1) y (2)), Balances e informes falsos (Art. 300 bis).'
        },
        {
          articulo: 'Art. 7',
          titulo: 'Contenido del Programa de Integridad',
          descripcion: 'Exige código de conducta, reglas para interactuar con el sector público (Ministerio PBA), debida diligencia de terceros, canales de denuncia y capacitación periódica.'
        },
        {
          articulo: 'Art. 9',
          titulo: 'Exención de Pena',
          descripcion: 'La empresa puede quedar exenta de pena si denunció espontáneamente el delito, implementó un programa de integridad adecuado antes del hecho y devolvió el beneficio indebido.'
        },
        {
          articulo: 'Art. 24',
          titulo: 'Contrataciones con el Estado',
          descripcion: 'Exigencia obligatoria de contar con un Programa de Integridad adecuado para contratar con el Estado Nacional o Provincial en licitaciones de gran envergadura.'
        }
      ]
    },
    ley6021: {
      nombre: 'Ley 6021 (Provincia de Buenos Aires) — Régimen de Obras Públicas',
      aspectosViales: [
        'Licitaciones públicas de obra vial: publicación en Boletín Oficial y sistema de doble sobre (Técnico y Económico).',
        'Certificados de obra: emisión mensual con carácter de documento público, sujetos a verificación de cómputo in situ.',
        'Redeterminación de precios (Decreto 367/17): fórmulas polinómicas auditadas con índices INDEC/DPE para evitar sobreprecios encubiertos.',
        'Recepciones provisoria y definitiva: verificación técnica con ensayos destructivos y plazo de garantía para liberación de fondos de reparo.'
      ]
    }
  },

  arbolesDecision: [
    {
      id: 'tree-regalos',
      titulo: 'Árbol de Decisión: Aceptación de Regalos, Invitaciones y Viajes (Cl. 8.7)',
      descripcion: 'Guía paso a paso para determinar si un obsequio, almuerzo de trabajo o invitación de un proveedor/contratista vial puede ser aceptado legalmente.',
      pasos: [
        {
          paso: 1,
          pregunta: '¿El emisor del obsequio o invitación es un proveedor/contratista que está participando en una licitación activa o tiene pendiente una certificación de obra o pago en AUBASA?',
          opciones: [
            { texto: 'SÍ (Participa en licitación activa o trámite de pago/obra pendiente)', resultado: 'PROHIBIDO DE FORMA ABSOLUTA. Viola la Cláusula 8.7 de ISO 37001 y Ley 25.188. Debe rechazarse de inmediato y registrar el incidente en el Canal Ético.', tipo: 'prohibido' },
            { texto: 'NO (Es una relación comercial ordinaria sin procesos licitatorios o certificaciones abiertas)', siguientePaso: 2 }
          ]
        },
        {
          paso: 2,
          pregunta: '¿El obsequio consiste en dinero en efectivo, transferencias, tarjetas de regalo, vales de compra o criptoactivos?',
          opciones: [
            { texto: 'SÍ (Dinero en efectivo o equivalente dinerario)', resultado: 'PROHIBIDO TOTALMENTE. Constituye indicio grave de soborno bajo Art. 256 del Cód. Penal. Denuncia obligatoria al Oficial de Cumplimiento.', tipo: 'prohibido' },
            { texto: 'NO (Es un objeto físico institucional, calendario, libreta, o invitación a evento técnico)', siguientePaso: 3 }
          ]
        },
        {
          paso: 3,
          pregunta: '¿El valor estimado del objeto es inferior a $50 USD (o equivalente en ARS) y contiene logo visible de la empresa como material promocional/cortesía usual?',
          opciones: [
            { texto: 'SÍ (Merchandising institucional < 50 USD)', resultado: 'ACEPTABLE. Puede ser recibido. Si supera los $20 USD, debe registrarse en el Libro Oficial de Obsequios de la Gerencia de Cumplimiento.', tipo: 'aceptable' },
            { texto: 'NO (Supera los $50 USD o es una invitación a viaje/alojamiento)', resultado: 'REQUIERE DICTAMEN PREVIO Y AUTORIZACIÓN EXPRESA. Los viajes o capacitaciones ofrecidos por contratistas deben ser evaluados por el Oficial de Cumplimiento y aprobados por el Directorio si resultan de estricto interés institucional de AUBASA.', tipo: 'condicionado' }
          ]
        }
      ]
    },
    {
      id: 'tree-obra-discrepancia',
      titulo: 'Árbol de Decisión: Discrepancia Técnica en Certificación de Obra Vial (Cl. 8.4)',
      descripcion: 'Protocolo de acción ante discrepancias en espesores de asfalto, resistencia de hormigón o volúmenes certificados.',
      pasos: [
        {
          paso: 1,
          pregunta: '¿La discrepancia detectada afecta la calidad estructural o el volumen físico de obra certificado (ej: menor espesor de carpeta asfáltica en Autopista o RP 2)?',
          opciones: [
            { texto: 'SÍ (Espesor menor o ensayos de densidad fuera de tolerancia IRAM)', siguientePaso: 2 },
            { texto: 'NO (Es un error formal o administrativo de cálculo de redeterminación)', resultado: 'DEVOLUCIÓN ADMINISTRATIVA. Rectificar la memoria de cálculo conforme Decreto 367/17 y reingresar el certificado para firma.', tipo: 'aceptable' }
          ]
        },
        {
          paso: 2,
          pregunta: '¿El contratista solicita "aprobar el certificado provisionalmente" a cambio de compensar en el siguiente tramo o insinúa beneficios personales al inspector?',
          opciones: [
            { texto: 'SÍ (Insinuación de dádiva, compensación futura no contractual o presión indebida)', resultado: 'ACTIVACIÓN INMEDIATA DE PROTOCOLO DE ALERTA ROJA. Rechazo inmediato del certificado, suspensión de pagos al contratista y reporte de bandera roja al Oficial de Cumplimiento para sumario.', tipo: 'prohibido' },
            { texto: 'NO (El contratista solicita contraprueba de laboratorio)', siguientePaso: 3 }
          ]
        },
        {
          paso: 3,
          pregunta: '¿Se cuenta con contraprueba efectuada por el Laboratorio Central de AUBASA o laboratorio universitario independiente?',
          opciones: [
            { texto: 'SÍ (Laboratorio confirma incumplimiento técnico)', resultado: 'RECHAZO DEFINITIVO Y DESCUENTO. Aplicar deducción de metros cúbicos, intimar al fresado y re-ejecución a costo del contratista con penalidad de Ley 6021.', tipo: 'condicionado' },
            { texto: 'NO (Aún no se extrajeron testigos testigos ciegos)', resultado: 'EXTRACCIÓN DE TESTIGOS CIEGOS. Realizar calado de probetas en presencia conjunta de Inspección y Contratista bajo cadena de custodia.', tipo: 'aceptable' }
          ]
        }
      ]
    },
    {
      id: 'tree-compra-directa',
      titulo: 'Árbol de Decisión: Justificación de Compra Directa por Urgencia (Cl. 8.4 & Ley 13.981)',
      descripcion: 'Evaluación de legitimidad ante pedidos de contratación directa por supuesta emergencia vial.',
      pasos: [
        {
          paso: 1,
          pregunta: '¿La contratación obedece a un siniestro imprevisto (ej: colapso de puente, socavamiento de calzada por temporal) que pone en riesgo inminente la vida de los usuarios?',
          opciones: [
            { texto: 'SÍ (Emergencia vial sobreviniente acreditada con informe técnico y pericial)', siguientePaso: 2 },
            { texto: 'NO (Es una necesidad recurrente como pintura, repuestos de peaje o desmalezamiento que no se licitó a tiempo)', resultado: 'IMPROCEDENTE COMO URGENCIA. Debe canalizarse mediante Licitación Pública o Concurso de Precios. El fraccionamiento o invocar falsa urgencia constituye riesgo de soborno e irregularidad penal.', tipo: 'prohibido' }
          ]
        },
        {
          paso: 2,
          pregunta: '¿Se solicitó cotización a un mínimo de 3 proveedores del rubro y se verificó que no existan vínculos societarios entre ellos?',
          opciones: [
            { texto: 'SÍ (Cotejo de al menos 3 cotizaciones con DD básica de no colusión)', resultado: 'CONTRATACIÓN DE EMERGENCIA AUTORIZADA. Requiere resolución fundada del Directorio y posterior publicación en el portal de transparencia de AUBASA dentro de los 10 días.', tipo: 'aceptable' },
            { texto: 'NO (Se pretende adjudicar directamente a un único proveedor predeterminado)', resultado: 'OBSERVACIÓN DE CUMPLIMIENTO. Salvo que exista exclusividad técnica demostrada fehacientemente (patente única), es obligatorio cursar pedido a 3 oferentes registrados.', tipo: 'condicionado' }
          ]
        }
      ]
    }
  ],

  escenariosFrecuentes: [
    {
      id: 'esc-01',
      categoria: 'Obras Viales',
      titulo: 'Patrocinio de viaje a congreso vial por parte de contratista de pavimentación',
      situacion: 'Una empresa contratista a cargo de la repavimentación de la RP 2 ofrece cubrir los pasajes y estadía en Europa para 2 inspectores de obra de AUBASA con el fin de "conocer una nueva planta de asfalto tibio".',
      evaluacion: 'RIESGO ALTO DE SOBORNO ENCUBIERTO (ISO 37001 Cl. 8.7 y Ley 25.188).',
      dictamen: 'El patrocinio debe ser RECHAZADO. Si AUBASA considera que la capacitación es estratégica para la empresa, los gastos de pasajes y viáticos deben ser cubiertos exclusivamente con el presupuesto institucional de AUBASA, nunca por una empresa bajo su supervisión contractual.',
      clausulas: ['Cl. 8.7 (Regalos y Hospitalidad)', 'Cl. 7.2 (Competencia)', 'Art. 256 Cód. Penal (Cohecho Pasivo)']
    },
    {
      id: 'esc-02',
      categoria: 'Pagos y Tesorería',
      titulo: 'Solicitud de pronto pago de certificados con descuento informal',
      situacion: 'Un proveedor de barreras de peaje y sensores ópticos solicita a Tesorería que adelante el pago de facturas pendientes de cobro sin respetar el orden cronológico de vencimientos.',
      evaluacion: 'RIESGO CRÍTICO DE EXTORSIÓN O RETORNO (ISO 37001 Cl. 8.3).',
      dictamen: 'Los pagos deben ejecutarse estrictamente según el listado cronológico de obligaciones exigibles validado por el sistema ERP y con doble autorización bancaria. Cualquier alteración de prioridades sin justificación de liquidez auditada por la Gerencia de Finanzas es una Bandera Roja pasible de sumario.',
      clausulas: ['Cl. 8.3 (Controles Financieros)', 'Art. 265 Cód. Penal (Negociaciones Incompatibles)']
    },
    {
      id: 'esc-03',
      categoria: 'Contratación',
      titulo: 'Oferentes en licitación con mismos apoderados o direcciones fiscales',
      situacion: 'En la licitación para la modernización de cabinas de peaje de Hudson y Dock Sud, se presentan 2 empresas cuyas memorias sociales indican el mismo domicilio legal y el mismo contador certificante.',
      evaluacion: 'INDICIOS CLAROS DE CARTELIZACIÓN Y OFERTA SIMULADA (ISO 37001 Cl. 8.4 y Ley 27.401).',
      dictamen: 'La Comisión Evaluadora debe descalificar a ambas ofertas por colusión, suspender preventivamente a las firmas del Registro de Proveedores de AUBASA e informar de inmediato al Oficial de Cumplimiento para formular la denuncia ante la Comisión Nacional de Defensa de la Competencia (CNDC).',
      clausulas: ['Cl. 8.2 (Debida Diligencia)', 'Cl. 8.4 (Controles No Financieros)', 'Ley 27.401 Art. 7']
    },
    {
      id: 'esc-04',
      categoria: 'Obras Viales',
      titulo: 'Redeterminación de precios con índices de variación no reglamentarios',
      situacion: 'Un contratista presenta una solicitud de redeterminación de precios por la obra del Tercer Carril de la Autopista BsAs-La Plata aplicando índices de inflación privada en lugar de los índices oficiales del INDEC previstos en el Decreto 367/17.',
      evaluacion: 'RIESGO DE PERJUICIO PATRIMONIAL Y FRAUDE EN LA LIQUIDACIÓN (ISO 37001 Cl. 8.3 & Cl. 8.4).',
      dictamen: 'Rechazo in limine del cálculo. Toda redeterminación debe ser calculada y auditada por la Dirección Técnica de AUBASA utilizando exclusivamente las series estadísticas estipuladas en el pliego y refrendada por la Asesoría Contable.',
      clausulas: ['Cl. 8.3 (Controles Financieros)', 'Decreto 367/17 PBA', 'Ley Prov. 6021']
    },
    {
      id: 'esc-05',
      categoria: 'Debida Diligencia',
      titulo: 'Subcontratista de bacheo cuyo socio mayoritario es Persona Expuesta Políticamente (PEP)',
      situacion: 'La contratista principal de obras en la RP 11 subcontrata el transporte de áridos a una firma cuyo socio gerente es familiar directo de un funcionario ministerial de la Provincia.',
      evaluacion: 'CONFLICTO DE INTERESES Y RIESGO DE TRÁFICO DE INFLUENCIAS (ISO 37001 Cl. 8.2 & Cl. 8.5).',
      dictamen: 'Se debe activar el proceso de Debida Diligencia Intensificada (Enhanced DD). El contratista principal debe declarar formalmente la cadena de subcontratación y el Oficial de Cumplimiento debe emitir dictamen previo verificando que los precios del subcontrato estén a valores de mercado y no existan desvíos de fondos.',
      clausulas: ['Cl. 8.2 (Debida Diligencia)', 'Cl. 8.5 (Organizaciones Controladas y Socios)', 'UIF Res. 35/2023']
    }
  ]
};

// Exportaciones individuales para compatibilidad modular
export const ISO_37001_CLAUSES_GUIDE = COMPLIANCE_KNOWLEDGE_BASE.normas.iso37001.clausulasClave.reduce((acc, item) => {
  acc[item.numero] = {
    nombre: item.titulo,
    descripcion: item.requisito,
    aplicacionAubasa: item.aplicacionAubasa,
    evidenciasTipicas: item.evidenciasTipicas || []
  };
  return acc;
}, {});

export const LEGAL_FRAMEWORK_ARGENTINA = COMPLIANCE_KNOWLEDGE_BASE.normas;

export const DECISION_TREES = COMPLIANCE_KNOWLEDGE_BASE.arbolesDecision;

export const HIGHWAY_COMPLIANCE_SCENARIOS = COMPLIANCE_KNOWLEDGE_BASE.escenariosFrecuentes.map(item => ({
  id: item.id,
  categoria: item.categoria,
  titulo: item.titulo,
  dilema: item.situacion,
  resolucionTecnica: item.dictamen,
  riesgoMitigado: item.evaluacion,
  clausulaIso: item.clausulas?.[0] || 'ISO 37001',
  marcoLegal: item.clausulas?.[1] || 'Ley 27.401'
}));

