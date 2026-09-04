/**
 * Motor de Diagnóstico de Brechas (Gap Analysis) y Nivel de Madurez ISO 37001
 */

export function calculateGapMaturity(gapItems = []) {
  if (!gapItems || gapItems.length === 0) {
    return {
      overallPercentage: 0,
      totalItems: 0,
      conformeCount: 0,
      parcialCount: 0,
      noConformeCount: 0,
      byChapter: {},
      readinessVerdict: 'Sin datos de diagnóstico'
    };
  }

  let totalPoints = 0;
  let maxPoints = 0;
  let conformeCount = 0;
  let parcialCount = 0;
  let noConformeCount = 0;

  const chapterMap = {};

  gapItems.forEach(item => {
    const chapter = item.capitulo || 'Otros';
    if (!chapterMap[chapter]) {
      chapterMap[chapter] = { total: 0, points: 0, items: [] };
    }

    chapterMap[chapter].total += 1;
    chapterMap[chapter].items.push(item);

    let itemPoints = 0;
    if (item.estadoConformidad === 'conforme') {
      itemPoints = 100;
      conformeCount++;
    } else if (item.estadoConformidad === 'parcial') {
      itemPoints = 50;
      parcialCount++;
    } else if (item.estadoConformidad === 'no_conforme') {
      itemPoints = 0;
      noConformeCount++;
    } else {
      // no_aplica -> no suma al maximo
      return;
    }

    chapterMap[chapter].points += itemPoints;
    totalPoints += itemPoints;
    maxPoints += 100;
  });

  const overallPercentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;

  // Resumen por capítulo
  const byChapter = {};
  Object.keys(chapterMap).forEach(chap => {
    const data = chapterMap[chap];
    const maxChapPoints = data.total * 100;
    byChapter[chap] = {
      total: data.total,
      percentage: maxChapPoints > 0 ? Math.round((data.points / maxChapPoints) * 100) : 0,
      items: data.items
    };
  });

  // Dictamen de preparación para certificación IRAM / Externa
  let readinessVerdict = '';
  let readinessBadge = '';

  if (overallPercentage >= 90 && noConformeCount === 0) {
    readinessVerdict = 'LISTO PARA AUDITORÍA DE CERTIFICACIÓN (FASE 2 IRAM). Alto grado de madurez con evidencias sólidas.';
    readinessBadge = 'success';
  } else if (overallPercentage >= 70) {
    readinessVerdict = 'APTO PARA AUDITORÍA DE ETAPA 1 (REVISIÓN DOCUMENTAL). Se deben cerrar brechas en auditoría interna y revisión directiva.';
    readinessBadge = 'warning';
  } else {
    readinessVerdict = 'EN FASE DE DISEÑO E IMPLEMENTACIÓN. Brechas significativas en controles operacionales o gobernanza.';
    readinessBadge = 'danger';
  }

  return {
    overallPercentage,
    totalItems: gapItems.length,
    conformeCount,
    parcialCount,
    noConformeCount,
    byChapter,
    readinessVerdict,
    readinessBadge
  };
}
