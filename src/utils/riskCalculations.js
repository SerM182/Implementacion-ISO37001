/**
 * Motor de cálculos para la Matriz de Riesgos Antisoborno ISO 37001 (Cl. 4.5 & 6.1)
 * Escala 3x3 (Probabilidad x Impacto) adaptada a AUBASA
 */

export function calculateInherentRisk(probabilidad, impacto) {
  const p = parseInt(probabilidad) || 1;
  const i = parseInt(impacto) || 1;
  const score = p * i;
  let nivel = 'bajo';

  if (score >= 9) nivel = 'crítico';
  else if (score >= 6) nivel = 'alto';
  else if (score >= 3) nivel = 'medio';
  else nivel = 'bajo';

  return { score, nivel, p, i };
}

export function calculateResidualRisk(inherentScore, efectividadControl) {
  const inh = parseInt(inherentScore) || 1;
  let factor = 1.0;

  switch (efectividadControl?.toLowerCase()) {
    case 'alta':
      factor = 0.35; // Reduce fuertemente el riesgo
      break;
    case 'media':
      factor = 0.65; // Reduce moderadamente
      break;
    case 'baja':
    case 'ninguna':
    default:
      factor = 1.0;
      break;
  }

  const residualScore = Math.max(1, Math.round(inh * factor));
  let nivelResidual = 'bajo';

  if (residualScore >= 6) nivelResidual = 'crítico';
  else if (residualScore >= 4) nivelResidual = 'alto';
  else if (residualScore >= 2) nivelResidual = 'medio';
  else nivelResidual = 'bajo';

  return {
    score: residualScore,
    nivel: nivelResidual
  };
}

export function computeRiskStatistics(risksList = []) {
  const total = risksList.length;
  if (total === 0) {
    return {
      total: 0,
      inherente: { bajo: 0, medio: 0, alto: 0, critico: 0 },
      residual: { bajo: 0, medio: 0, alto: 0, critico: 0 },
      porProceso: { Contratacion: 0, Pagos: 0, Obras: 0 },
      porcentajeMitigado: 0,
      criticosSinMitigar: 0
    };
  }

  const inhCount = { bajo: 0, medio: 0, alto: 0, critico: 0 };
  const resCount = { bajo: 0, medio: 0, alto: 0, critico: 0 };
  const procCount = { Contratación: 0, Pagos: 0, 'Obras Viales': 0, Otros: 0 };
  let criticosSinMitigar = 0;

  risksList.forEach(r => {
    const inhLevel = r.nivelRiesgoInherente?.toLowerCase();
    if (inhLevel === 'crítico' || inhLevel === 'critico') inhCount.critico++;
    else if (inhLevel === 'alto') inhCount.alto++;
    else if (inhLevel === 'medio') inhCount.medio++;
    else inhCount.bajo++;

    const resLevel = r.nivelRiesgoResidual?.toLowerCase();
    if (resLevel === 'crítico' || resLevel === 'critico') {
      resCount.critico++;
      criticosSinMitigar++;
    } else if (resLevel === 'alto') resCount.alto++;
    else if (resLevel === 'medio') resCount.medio++;
    else resCount.bajo++;

    const proc = r.proceso;
    if (procCount[proc] !== undefined) procCount[proc]++;
    else procCount.Otros++;
  });

  // % de mitigación: proporción de riesgos que bajaron su nivel respecto al inherente
  const mitigados = risksList.filter(r => (r.puntajeResidual || 1) < (r.puntajeInherente || 1)).length;
  const porcentajeMitigado = Math.round((mitigados / total) * 100);

  return {
    total,
    inherente: inhCount,
    residual: resCount,
    porProceso: procCount,
    porcentajeMitigado,
    criticosSinMitigar
  };
}

export function getHeatmapDistribution(risksList = [], type = 'residual') {
  // Matriz 3x3 [Probabilidad][Impacto] (1..3)
  const matrix = {
    '3-3': [], '3-2': [], '3-1': [],
    '2-3': [], '2-2': [], '2-1': [],
    '1-3': [], '1-2': [], '1-1': []
  };

  risksList.forEach(r => {
    const p = type === 'inherente' ? (r.probabilidad || 1) : Math.max(1, Math.min(3, Math.ceil((r.puntajeResidual || 1) / (r.impacto || 1))));
    const i = r.impacto || 1;
    const key = `${p}-${i}`;
    if (matrix[key]) {
      matrix[key].push(r);
    } else {
      matrix['1-1'].push(r);
    }
  });

  return matrix;
}
