/**
 * Motor de Scoring y Categorización de Debida Diligencia de Proveedores (ISO 37001 Cl. 8.2)
 * Criterio ponderado de 100 puntos y screening PEP para AUBASA
 */

import { DUE_DILIGENCE_CRITERIA } from '../data/initialDueDiligenceData.js';

export function calculateDueDiligenceScore(answers = {}, criteriaList = DUE_DILIGENCE_CRITERIA) {
  let totalScore = 0;
  let maxPossibleScore = 0;
  const dimensionResults = [];
  let isPEP = false;
  let hasInhabilitacion = false;

  criteriaList.forEach(crit => {
    let dimensionScore = 0;
    let dimensionMax = 0;

    crit.preguntas.forEach(q => {
      dimensionMax += q.puntos;
      maxPossibleScore += q.puntos;

      const isCompliant = !!answers[q.id];
      if (isCompliant) {
        dimensionScore += q.puntos;
        totalScore += q.puntos;
      } else {
        // Detectar alertas críticas
        if (q.id === 'q2_1') isPEP = true; // No cumplió "ninguno es PEP" -> es PEP
        if (q.id === 'q3_1' || q.id === 'q3_2') hasInhabilitacion = true;
      }
    });

    dimensionResults.push({
      dimension: crit.dimension,
      score: dimensionScore,
      max: dimensionMax,
      percentage: Math.round((dimensionScore / dimensionMax) * 100)
    });
  });

  // Determinar Nivel de Riesgo y Tipo de Debida Diligencia
  let nivelRiesgo = 'bajo';
  let tipoDD = 'Simplificada';
  let dictamenSugerido = '';
  let requiereAprobacionDirectorio = false;
  let vigenciaMeses = 24;

  if (isPEP || hasInhabilitacion || totalScore < 65) {
    nivelRiesgo = 'alto';
    tipoDD = 'Intensificada (Enhanced DD)';
    requiereAprobacionDirectorio = true;
    vigenciaMeses = 6;
    if (isPEP) {
      dictamenSugerido = 'RIESGO ALTO POR IDENTIFICACIÓN DE PERSONA EXPUESTA POLÍTICAMENTE (PEP). Requiere elevación y dictamen especial aprobado por Directorio con medidas reforzadas de auditoría.';
    } else if (hasInhabilitacion) {
      dictamenSugerido = 'RECHAZADO / RIESGO CRÍTICO. Se identificaron antecedentes penales o sanciones activas. No apto para contratar.';
    } else {
      dictamenSugerido = 'RIESGO ALTO POR BAJO CUMPLIMIENTO DOCUMENTAL (<65 pts). Requiere subsanación técnica y plan de integridad antes de adjudicación.';
    }
  } else if (totalScore < 85) {
    nivelRiesgo = 'medio';
    tipoDD = 'Estándar';
    requiereAprobacionDirectorio = false;
    vigenciaMeses = 12;
    dictamenSugerido = 'PROVEEDOR APTO CON MONITOREO. Inserción de cláusulas contractuales reforzadas de auditoría contable y revisión a los 12 meses.';
  } else {
    nivelRiesgo = 'bajo';
    tipoDD = 'Simplificada';
    requiereAprobacionDirectorio = false;
    vigenciaMeses = 24;
    dictamenSugerido = 'PROVEEDOR APTO. Estructura transparente, sin antecedentes adversos y programa de integridad compatible.';
  }

  return {
    totalScore,
    maxPossibleScore,
    percentage: Math.round((totalScore / maxPossibleScore) * 100),
    dimensionResults,
    nivelRiesgo,
    tipoDD,
    requiereAprobacionDirectorio,
    vigenciaMeses,
    dictamenSugerido,
    isPEP,
    hasInhabilitacion
  };
}
