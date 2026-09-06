/**
 * Motor Semántico y de Inferencia del Asistente Especialista ISO 37001 AUBASA
 */

import {
  ISO_37001_CLAUSES_GUIDE,
  LEGAL_FRAMEWORK_ARGENTINA,
  DECISION_TREES,
  HIGHWAY_COMPLIANCE_SCENARIOS
} from '../data/complianceKnowledgeBase.js';
import { AUBASA_CONTEXT } from '../data/aubasaContext.js';

export function queryComplianceAdvisor(userQuery) {
  if (!userQuery || typeof userQuery !== 'string') {
    return {
      respuesta: 'Por favor, ingrese una consulta sobre la norma ISO 37001, la Ley 27.401 o los procesos de AUBASA (Contratación, Pagos, Obras Viales).',
      clausulasRelacionadas: [],
      referenciasLegales: [],
      accionesRecomendadas: []
    };
  }

  const queryClean = userQuery.toLowerCase().trim();

  // 1. Verificar coincidencia con Escenarios Prácticos de Autopistas
  for (const scenario of HIGHWAY_COMPLIANCE_SCENARIOS) {
    const titleMatch = scenario.titulo.toLowerCase().split(' ').some(w => w.length > 4 && queryClean.includes(w));
    const descMatch = scenario.dilema.toLowerCase().includes(queryClean) || queryClean.includes(scenario.categoria.toLowerCase());

    if (titleMatch || (descMatch && queryClean.length > 5)) {
      return {
        tipo: 'escenario_practico',
        titulo: scenario.titulo,
        categoria: scenario.categoria,
        respuesta: `**Resolución Técnica para AUBASA:**\n${scenario.resolucionTecnica}\n\n**Riesgo Específico Evitado:** ${scenario.riesgoMitigado}`,
        clausulaIso: scenario.clausulaIso,
        marcoLegal: scenario.marcoLegal,
        accionesRecomendadas: [
          'Aplicar protocolo oficial inmediato en el área operativa.',
          'Notificar fehacientemente al Oficial de Cumplimiento.',
          'Incorporar el antecedente en el Registro de Hallazgos.'
        ]
      };
    }
  }

  // 2. Coincidencia por Palabras Clave Temáticas
  // Regalos / Hospitalidad / Dádivas
  if (queryClean.includes('regalo') || queryClean.includes('hospitalidad') || queryClean.includes('obsequio') || queryClean.includes('cena') || queryClean.includes('viaje')) {
    const cl87 = ISO_37001_CLAUSES_GUIDE['8.7'];
    return {
      tipo: 'normativo',
      titulo: 'Tratamiento de Regalos, Hospitalidad y Donaciones (Cl. 8.7)',
      respuesta: `**Directiva de AUBASA (POL-SGAS-02 & Cl. 8.7):**\n\n1. **Prohibición General:** Ningún colaborador puede solicitar ni recibir obsequios, viajes o favores de contratistas o proveedores.\n2. **Excepción Estricta:** Solo se admiten artículos de cortesía institucional con logo y valor inferior a **$50 USD** (fuera de periodos de licitación o certificación).\n3. **Prohibición Absoluta:** Efectivo, tarjetas de regalo, combustible, o viajes/alojamiento están terminantemente prohibidos bajo apercibimiento de despido con causa y denuncia penal (Ley 27.401 y Art. 256 CP).`,
      clausulasRelacionadas: ['ISO 37001 Cl. 8.7', 'Ley 27.401 Art. 7'],
      accionesRecomendadas: [
        'Rechazar el obsequio y devolverlo formalmente con nota de cumplimiento.',
        'Declarar el ofrecimiento en el Libro de Registro de Regalos dentro de las 48 hs.',
        'Notificar al Oficial de Cumplimiento si hubo insistencia.'
      ]
    };
  }

  // Calados / Asfalto / Ensayos de laboratorio / Obras viales
  if (queryClean.includes('calado') || queryClean.includes('asfalto') || queryClean.includes('hormigón') || queryClean.includes('hormigon') || queryClean.includes('ensayo') || queryClean.includes('laboratorio') || queryClean.includes('espesor') || queryClean.includes('densidad') || queryClean.includes('obrador')) {
    const cl84 = ISO_37001_CLAUSES_GUIDE['8.4'];
    return {
      tipo: 'operativo_obras',
      titulo: 'Controles No Financieros en Calidad de Obras Viales (Cl. 8.4)',
      respuesta: `**Protocolo Técnico de Calados y Mezcla Asfáltica (POE-SGAS-06):**\n\n- **Extracción de Muestras:** Debe realizarse in situ con presencia del inspector de AUBASA y representante técnico del contratista.\n- **Ensayo Ciego:** Las probetas deben identificarse con precinto y código QR ciego que oculte la razón social del contratista.\n- **Tercería Universitaria:** Se remitirán al laboratorio certificado de la UNLP o LEMIT.\n- **Certificación:** Si los testigos no alcanzan el espesor o la densidad exigida en pliego, queda terminantemente prohibido visar el certificado mensual de obra. La aprobación irregular constituye delito tipificado en Ley 6021 y Ley 27.401.`,
      clausulasRelacionadas: ['ISO 37001 Cl. 8.4 (Controles No Financieros)', 'Ley Provincial 6021 Art. 45'],
      accionesRecomendadas: [
        'Bloquear preventivamente la emisión del certificado de avance en el sistema.',
        'Ordenar contramuestra ciega con escribano público.',
        'Intimar al contratista a rehacer el tramo a su exclusivo costo.'
      ]
    };
  }

  // Compras directas / Fraccionamiento / Licitaciones / Pliegos
  if (queryClean.includes('fraccionamiento') || queryClean.includes('compra directa') || queryClean.includes('licitacion') || queryClean.includes('licitación') || queryClean.includes('pliego') || queryClean.includes('oferente') || queryClean.includes('proveedor')) {
    return {
      tipo: 'contratacion',
      titulo: 'Controles Antisoborno en Contrataciones y Licitaciones (Cl. 8.2 & 8.4)',
      respuesta: `**Reglas Anticorrupción en Contrataciones de AUBASA:**\n\n1. **Prohibición de Fraccionamiento:** Se prohíbe dividir artificialmente contrataciones para eludir los montos límite de licitaciones públicas.\n2. **Especificaciones Neutrales:** Los pliegos no pueden contener marcas registradas encubiertas ni fórmulas que solo un oferente pueda cumplir.\n3. **Debida Diligencia Obligatoria:** Todo oferente debe completar el screening PEP, UBO y evaluación de 15 puntos antes de la preadjudicación.\n4. **Cláusula Anticorrupción:** Es obligatorio incluir la cláusula CLA-SGAS-01 con facultad de rescisión automática por cohecho.`,
      clausulasRelacionadas: ['ISO 37001 Cl. 8.2 & 8.6', 'Ley 27.401 Art. 9'],
      accionesRecomendadas: [
        'Exigir Dictamen de Debida Diligencia al Oficial de Cumplimiento.',
        'Requerir Declaración Jurada de Ausencia de Conflicto de Intereses a la Comisión Evaluadora.',
        'Publicar pliegos en la web institucional para libre concurrencia.'
      ]
    };
  }

  // Doble firma / Pagos / Tesorería / Fondo Fijo
  if (queryClean.includes('pago') || queryClean.includes('tesoreria') || queryClean.includes('tesorería') || queryClean.includes('firma') || queryClean.includes('fondo fijo') || queryClean.includes('caja chica') || queryClean.includes('transferencia')) {
    return {
      tipo: 'controles_financieros',
      titulo: 'Protocolo de Pagos y Fondos Fijos en Sede Central (Cl. 8.3)',
      respuesta: `**Controles Financieros de AUBASA (POE-SGAS-05):**\n\n1. **Segregación de Funciones:** Ninguna persona puede solicitar, aprobar y liberar una transferencia simultáneamente (Principio de 4 Ojos).\n2. **Doble Firma Bancaria:** Toda transferencia requiere dos aprobaciones jerárquicas en la plataforma de banca electrónica.\n3. **Cuentas Bancarias:** Pagos únicamente a cuentas oficiales del CUIT adjudicatario en Argentina (prohibición de cuentas de terceros u offshore).\n4. **Fondo Fijo de Sede Central:** Rendición semanal con factura fiscal a nombre de AUBASA. Prohibido pagar atenciones o gastos personales.`,
      clausulasRelacionadas: ['ISO 37001 Cl. 8.3 (Controles Financieros)', 'Código Penal Art. 265'],
      accionesRecomendadas: [
        'Verificar la correlatividad del orden de pago (criterio FIFO).',
        'Validar certificado de obra con firma de inspección antes del desembolso.',
        'Auditoría digital mensual de comprobantes de fondo fijo.'
      ]
    };
  }

  // Denuncias / Canal Ético / Represalias / Whistleblowing
  if (queryClean.includes('denuncia') || queryClean.includes('canal etico') || queryClean.includes('canal ético') || queryClean.includes('represalia') || queryClean.includes('0800') || queryClean.includes('anonim')) {
    return {
      tipo: 'canal_etico',
      titulo: 'Planteamiento de Inquietudes y Protección al Denunciante (Cl. 8.9 & 8.10)',
      respuesta: `**Mecanismo de Denuncias Seguras de AUBASA (POE-SGAS-07):**\n\n- **Canales Habilitados:** Formulario web con cifrado y token anónimo, línea 0800-INTEGRIDAD y casilla confidencial.\n- **Garantía de No Represalias:** Protección absoluta frente a traslados, despidos o discriminación laboral para denunciantes de buena fe.\n- **Plazos:** Triaje preliminar en máx 5 días hábiles; informe conclusivo en máx 30 días corridos.\n- **Independencia:** El Oficial de Cumplimiento tiene acceso irrestricto y reporte directo al Directorio.`,
      clausulasRelacionadas: ['ISO 37001 Cl. 8.9 & 8.10', 'Ley 27.401 Art. 7 inc. III'],
      accionesRecomendadas: [
        'Utilizar el módulo de Canal Ético para generar un token confidencial.',
        'Adjuntar documentación respaldatoria (audios, fotos, comprobantes).',
        'El Oficial de Cumplimiento iniciará el expediente bajo estricta reserva.'
      ]
    };
  }

  // Búsqueda por cláusula ISO directa (ej: "clausula 5.2", "requisito 8.2", "4.5")
  for (const [key, val] of Object.entries(ISO_37001_CLAUSES_GUIDE)) {
    if (queryClean.includes(key) || queryClean.includes(val.nombre.toLowerCase())) {
      return {
        tipo: 'clausula_iso',
        titulo: `ISO 37001 Cláusula ${key}: ${val.nombre}`,
        respuesta: `**Objetivo y Requisitos Normativos:**\n${val.descripcion}\n\n**Implementación Específica en AUBASA:**\n${val.aplicacionAubasa}`,
        clausulaIso: key,
        evidenciasTipicas: val.evidenciasTipicas,
        accionesRecomendadas: [
          'Verificar la existencia del documento controlado asociado.',
          'Revisar el estado de conformidad en el módulo de Gap Analysis.',
          'Asegurar que los registros cuenten con firmas autorizadas.'
        ]
      };
    }
  }

  // Respuesta General Inteligente
  return {
    tipo: 'general',
    titulo: 'Asesoría en Sistema de Gestión Antisoborno (SGAS AUBASA)',
    respuesta: `AUBASA implementa la norma **ISO 37001:2016** con integración a la **Ley Nacional 27.401** y la **Ley Provincial 6021 de Obras Públicas** en tres áreas neurálgicas:\n\n1. **Contratación:** Licitaciones públicas con especificaciones neutrales, comisiones evaluadoras independientes y debida diligencia de contratistas (Cl. 8.2 & 8.4).\n2. **Pagos y Finanzas:** Segregación de funciones, doble firma bancaria y control de fondos fijos en Sede Central (Cl. 8.3).\n3. **Obras Viales:** Inspección técnica en traza, ensayos ciegos de laboratorio de asfalto y hormigón en universidades y cubicación in situ (Cl. 8.4).\n\nPuede consultar sobre casos puntuales, árboles de decisión ética o el procedimiento para cada requisito normativo.`,
    clausulasRelacionadas: ['ISO 37001 (Cl. 4 a 10)', 'Ley 27.401'],
    accionesRecomendadas: [
      'Explorar la Matriz de Riesgos para conocer los puntos críticos de control.',
      'Evaluar a un contratista en el módulo de Debida Diligencia.',
      'Consultar los Árboles de Decisión para dilemas éticos específicos.'
    ]
  };
}

export function runDecisionTreeStep(treeId, stepId, optionValue) {
  const tree = DECISION_TREES.find(t => t.id === treeId);
  if (!tree) return null;

  const currentStep = tree.pasos.find(s => s.id === stepId);
  if (!currentStep) return null;

  const selectedOption = currentStep.opciones.find(o => o.valor === optionValue);
  if (!selectedOption) return null;

  if (selectedOption.siguientePaso) {
    const nextStep = tree.pasos.find(s => s.id === selectedOption.siguientePaso);
    return {
      tree,
      currentStep: nextStep,
      isFinished: false
    };
  } else if (selectedOption.dictamen) {
    return {
      tree,
      isFinished: true,
      dictamen: selectedOption.dictamen,
      accion: selectedOption.accion,
      severidad: selectedOption.severidad
    };
  }

  return null;
}
