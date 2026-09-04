/**
 * Utilidades de Filtrado, Búsqueda y Cálculo de Estadísticas para
 * el Gestor de Registros y Evidencias Obligatorias ISO 37001 (Cl. 7.5)
 */

import { RECORD_CATEGORIES } from '../data/initialRecordsData.js';

/**
 * Calcula los KPIs y métricas clave sobre el conjunto de registros de evidencias
 */
export function calculateRecordsKpis(records = []) {
  const total = records.length;
  if (total === 0) {
    return {
      total: 0,
      verificados: 0,
      enRevision: 0,
      observados: 0,
      porcentajeVerificados: 0,
      totalDocumentosAdjuntos: 0,
      byCategory: {},
      coberturaClausulasCount: 0
    };
  }

  let verificados = 0;
  let enRevision = 0;
  let observados = 0;
  let totalDocumentosAdjuntos = 0;
  const categoriesCount = {};
  const clausesSet = new Set();

  RECORD_CATEGORIES.forEach(cat => {
    categoriesCount[cat.id] = 0;
  });

  records.forEach(r => {
    if (r.estadoVerificacion === 'verificado') verificados++;
    else if (r.estadoVerificacion === 'en_revision') enRevision++;
    else observados++;

    if (Array.isArray(r.documentosAdjuntos)) {
      totalDocumentosAdjuntos += r.documentosAdjuntos.length;
    }

    if (categoriesCount[r.tipoRegistro] !== undefined) {
      categoriesCount[r.tipoRegistro]++;
    } else {
      categoriesCount[r.tipoRegistro] = 1;
    }

    if (r.clausulaIso) {
      clausesSet.add(r.clausulaIso);
    }
  });

  const porcentajeVerificados = Math.round((verificados / total) * 100);

  return {
    total,
    verificados,
    enRevision,
    observados,
    porcentajeVerificados,
    totalDocumentosAdjuntos,
    byCategory: categoriesCount,
    coberturaClausulasCount: clausesSet.size
  };
}

/**
 * Filtra la lista de registros según criterios múltiples
 */
export function filterRecords(records = [], {
  category = 'all',
  status = 'all',
  searchQuery = '',
  isoClause = 'all'
} = {}) {
  const query = searchQuery.trim().toLowerCase();

  return records.filter(item => {
    // Filtro por categoría
    if (category !== 'all' && item.tipoRegistro !== category) {
      return false;
    }

    // Filtro por estado
    if (status !== 'all' && item.estadoVerificacion !== status) {
      return false;
    }

    // Filtro por cláusula ISO
    if (isoClause !== 'all' && !item.clausulaIso?.includes(isoClause)) {
      return false;
    }

    // Filtro por búsqueda de texto
    if (query) {
      const matchTitle = item.titulo?.toLowerCase().includes(query);
      const matchId = item.id?.toLowerCase().includes(query);
      const matchDesc = item.resumenEvidencia?.toLowerCase().includes(query);
      const matchResp = item.responsable?.toLowerCase().includes(query);
      const matchLoc = item.areaUbicacion?.toLowerCase().includes(query);
      const matchClause = item.clausulaIso?.toLowerCase().includes(query);

      return matchTitle || matchId || matchDesc || matchResp || matchLoc || matchClause;
    }

    return true;
  });
}

/**
 * Retorna las clases Tailwind de estilo para el estado de verificación
 */
export function getStatusBadgeConfig(status) {
  switch (status) {
    case 'verificado':
      return {
        label: 'Verificado / Conforme',
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-400'
      };
    case 'en_revision':
      return {
        label: 'En Revisión Técnica',
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        dot: 'bg-amber-400'
      };
    case 'observado':
      return {
        label: 'Con Observaciones',
        bg: 'bg-rose-500/15',
        text: 'text-rose-400',
        border: 'border-rose-500/30',
        dot: 'bg-rose-400'
      };
    default:
      return {
        label: status || 'Registrado',
        bg: 'bg-slate-800',
        text: 'text-slate-300',
        border: 'border-slate-700',
        dot: 'bg-slate-400'
      };
  }
}
