/**
 * Utilidades para exportación e importación de datos (JSON y CSV)
 * Compatible con Excel en español (UTF-8 con BOM)
 */

import { sgasStorage } from './storage.js';

export function downloadJSON(data, filename = 'AUBASA_SGAS_ISO37001_Backup.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportAllDataBackup() {
  const allData = sgasStorage.getAllData();
  const dateStr = new Date().toISOString().slice(0, 10);
  downloadJSON(allData, `AUBASA_SGAS_ISO37001_Backup_${dateStr}.json`);
}

export function importAllDataBackup(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('El archivo no contiene un objeto JSON válido.');
    }
    sgasStorage.restoreAllData(parsed);
    return { success: true, message: 'Datos restaurados correctamente.' };
  } catch (err) {
    return { success: false, message: `Error al importar: ${err.message}` };
  }
}

export function exportRisksToCSV(risksList = []) {
  if (risksList.length === 0) return;

  const headers = [
    'ID',
    'Proceso',
    'Actividad / Subproceso',
    'Escenario de Soborno',
    'Probabilidad Inherente',
    'Impacto Inherente',
    'Puntaje Inherente',
    'Nivel Inherente',
    'Controles Preventivos / Mitigantes',
    'Efectividad Controles',
    'Puntaje Residual',
    'Nivel Residual',
    'Responsable de Control'
  ];

  const rows = risksList.map(r => [
    `"${r.id || ''}"`,
    `"${r.proceso || ''}"`,
    `"${r.subproceso || ''}"`,
    `"${(r.escenarioRiesgo || '').replace(/"/g, '""')}"`,
    r.probabilidad || '',
    r.impacto || '',
    r.puntajeInherente || '',
    `"${r.nivelRiesgoInherente || ''}"`,
    `"${(r.controlesExistentes || '').replace(/"/g, '""')}"`,
    `"${r.efectividadControles || ''}"`,
    r.puntajeResidual || '',
    `"${r.nivelRiesgoResidual || ''}"`,
    `"${(r.responsableControl || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AUBASA_Matriz_Riesgos_ISO37001_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportPartnersToCSV(partnersList = []) {
  if (partnersList.length === 0) return;

  const headers = [
    'ID',
    'Razón Social',
    'CUIT',
    'Rubro',
    'Puntaje DD (0-100)',
    'Nivel de Riesgo',
    'Tipo Debida Diligencia',
    'Fecha Evaluación',
    'Fecha Vencimiento',
    'Dictamen Oficial',
    'Oficial Evaluador'
  ];

  const rows = partnersList.map(p => [
    `"${p.id || ''}"`,
    `"${(p.razonSocial || '').replace(/"/g, '""')}"`,
    `"${p.cuit || ''}"`,
    `"${(p.rubro || '').replace(/"/g, '""')}"`,
    p.puntajeDD || 0,
    `"${p.nivelRiesgo || ''}"`,
    `"${p.tipoDebidaDiligencia || ''}"`,
    `"${p.fechaEvaluacion || ''}"`,
    `"${p.fechaVencimiento || ''}"`,
    `"${(p.dictamenOficial || '').replace(/"/g, '""')}"`,
    `"${(p.oficialEvaluador || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `AUBASA_Registro_Debida_Diligencia_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
