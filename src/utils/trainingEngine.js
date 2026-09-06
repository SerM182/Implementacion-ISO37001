/**
 * Motor de Cálculo, Evaluación de Eficacia y Generación de Certificados SGAS ISO 37001 (Cl. 7.2 & 7.3)
 * AUBASA - Autopistas de Buenos Aires S.A.
 */

/**
 * Calcula las métricas consolidadas del Plan Anual de Capacitación
 */
export function calculateTrainingMetrics(trainingPlan, coursesCatalog, collaborators) {
  const totalEmployees = trainingPlan.totalColaboradores || 860;
  const plannedHours = trainingPlan.horasPlanificadasTotal || 4300;

  // Total horas acumuladas en colaboradores activos
  const totalCompletedHours = collaborators.reduce((acc, c) => acc + (c.horasAcumuladas || 0), 0);

  // Promedio de calificación
  const avgScore = collaborators.length > 0
    ? Math.round(collaborators.reduce((acc, c) => acc + (c.calificacionPromedio || 0), 0) / collaborators.length)
    : 0;

  // Promedio ponderado del progreso por áreas
  const areas = trainingPlan.areasAlcanzadas || [];
  const globalProgress = areas.length > 0
    ? Math.round(areas.reduce((acc, a) => acc + (a.progreso || 0), 0) / areas.length)
    : 85;

  const totalCertifiedCollabs = collaborators.filter(c => c.estadoCertificacion === 'certificado').length;

  return {
    totalEmployees,
    plannedHours,
    totalCompletedHours,
    avgScore,
    globalProgress,
    totalCourses: coursesCatalog.length,
    totalCertifiedCollabs,
    targetCoverage: trainingPlan.metaCobertura || 95,
    areasCoverage: areas
  };
}

/**
 * Evalúa las respuestas del examen situacional
 * @param {Array} questions - Banco de preguntas seleccionadas
 * @param {Object} userAnswers - Mapeo { questionId: selectedOptionIndex }
 * @returns {Object} Resultado con puntaje, estado y desglose pedagógico
 */
export function evaluateQuizAnswers(questions, userAnswers) {
  if (!questions || questions.length === 0) {
    return {
      score: 0,
      totalQuestions: 0,
      correctCount: 0,
      isPassed: false,
      breakdown: []
    };
  }

  let correctCount = 0;
  const breakdown = questions.map((q) => {
    const selected = userAnswers[q.id];
    const isCorrect = selected !== undefined && Number(selected) === Number(q.respuestaCorrecta);
    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      pregunta: q.pregunta,
      clausulaIso: q.clausulaIso,
      selectedAnswerIndex: selected,
      correctAnswerIndex: q.respuestaCorrecta,
      isCorrect,
      explicacion: q.explicacion,
      selectedText: selected !== undefined ? q.opciones[selected]?.texto : 'Sin responder',
      correctText: q.opciones[q.respuestaCorrecta]?.texto
    };
  });

  const score = Math.round((correctCount / questions.length) * 100);
  const isPassed = score >= 80;

  return {
    score,
    totalQuestions: questions.length,
    correctCount,
    incorrectCount: questions.length - correctCount,
    isPassed,
    breakdown,
    feedbackGeneral: isPassed
      ? '¡Felicitaciones! Has demostrado una sólida comprensión de las políticas y controles antisoborno de AUBASA conforme a la Norma ISO 37001:2025.'
      : 'No se ha alcanzado el umbral mínimo de aprobación (80%). Se sugiere repasar los módulos del curso y volver a intentar la evaluación.'
  };
}

/**
 * Genera un Hash simulado SHA-256 para trazabilidad criptográfica
 */
export function generateCertificateHash(courseId, collaboratorLegajo, dateStr) {
  const raw = `AUBASA-ISO37001-${courseId}-${collaboratorLegajo}-${dateStr}-${Math.random().toString(36).substring(2, 9)}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256:4f8a${hex}9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e`;
}

/**
 * Crea la estructura oficial del Certificado ISO 37001
 */
export function buildCertificateData({ course, collaboratorName, collaboratorDni, collaboratorLegajo, collaboratorArea, score }) {
  const dateStr = new Date().toISOString().split('T')[0];
  const certId = `CERT-SGAS-${course.codigo || '37001'}-${Math.floor(1000 + Math.random() * 9000)}`;
  const hash = generateCertificateHash(course.id, collaboratorLegajo || 'LEG-TEMP', dateStr);

  return {
    id: certId,
    courseId: course.id,
    codigoCurso: course.codigo,
    tituloCurso: course.titulo,
    clausulaIso: course.clausulaIso || 'Cl. 7.2 & 7.3',
    duracionHoras: course.duracionHoras || 2,
    nombreColaborador: collaboratorName || 'Colaborador AUBASA',
    dni: collaboratorDni || 'DNI Registrado',
    legajo: collaboratorLegajo || 'LEG-AUBASA',
    area: collaboratorArea || 'Operaciones Viales',
    fechaEmision: dateStr,
    fechaExpiracion: `${parseInt(dateStr.split('-')[0], 10) + 1}-${dateStr.split('-')[1]}-${dateStr.split('-')[2]}`, // 1 año de vigencia
    calificacion: score,
    hashSha256: hash,
    estado: 'valido',
    entidadEmisora: 'Autopistas de Buenos Aires S.A. (AUBASA) - Oficina de Cumplimiento e Integridad',
    firmantes: [
      { cargo: 'Oficial de Cumplimiento Antisoborno (Cl. 5.3)', nombre: '' },
      { cargo: 'Gerencia de Recursos Humanos y Capacitación', nombre: '' }
    ]
  };
}

/**
 * Convierte un certificado de capacitación en un Registro Evidenciable para la Cl. 7.5
 */
export function convertCertificateToRecord(certificate) {
  return {
    id: `REG-7.5-CAP-${certificate.id.replace('CERT-SGAS-', '')}`,
    codigo: `REG-CAP-${certificate.codigoCurso}-${new Date().getFullYear()}`,
    clausulaIso: certificate.clausulaIso || 'Cl. 7.2 & 7.3',
    titulo: `Certificado de Capacitación: ${certificate.tituloCurso} - ${certificate.nombreColaborador}`,
    tipoDocumento: 'Certificado de Competencia / Evidencia de Formación',
    fecha: certificate.fechaEmision,
    responsable: 'Oficial de Cumplimiento & RRHH',
    areaUbicacion: certificate.area,
    estadoVerificacion: 'verificado',
    nivelConfidencialidad: 'interno',
    retencionAnios: 10,
    hashSha256: certificate.hashSha256,
    observaciones: `Aprobado con ${certificate.calificacion}% de eficacia. Validez hasta ${certificate.fechaExpiracion}. Registro oficial de cumplimiento de competencia ISO 37001.`
  };
}
