/**
 * Adaptador de almacenamiento local para persistencia del SGAS ISO 37001 AUBASA
 */

import { INITIAL_RISK_MATRIX } from '../data/initialRiskMatrixData.js';
import { INITIAL_PARTNERS_REGISTRY } from '../data/initialDueDiligenceData.js';
import { INITIAL_POLICY_TEMPLATES } from '../data/initialPoliciesTemplates.js';
import { INITIAL_GAP_ANALYSIS_ITEMS } from '../data/initialGapAnalysisData.js';
import { INITIAL_WHISTLEBLOWING_REPORTS } from '../data/initialWhistleblowingData.js';
import { INITIAL_ROADMAP_PHASES } from '../data/initialRoadmapData.js';
import { INITIAL_RECORDS_DATA } from '../data/initialRecordsData.js';
import { TRAINING_PLAN_OVERVIEW, INITIAL_COLLABORATORS_PROGRESS } from '../data/initialTrainingData.js';

// Claves de localStorage
const STORAGE_KEYS = {
  WORKSPACE_MODE: 'aubasa_sgas_workspace_mode_v1', // 'blank' | 'demo'
  RISKS: 'aubasa_sgas_risks_v1',
  PARTNERS: 'aubasa_sgas_partners_v1',
  POLICIES: 'aubasa_sgas_policies_v1',
  GAP_ANALYSIS: 'aubasa_sgas_gap_analysis_v1',
  WHISTLEBLOWING: 'aubasa_sgas_whistleblowing_v1',
  ROADMAP: 'aubasa_sgas_roadmap_v1',
  RECORDS: 'aubasa_sgas_records_v1',
  TRAINING_PLAN: 'aubasa_sgas_training_plan_v1',
  TRAINING_COLLABORATORS: 'aubasa_sgas_training_collabs_v1',
  CERTIFICATES: 'aubasa_sgas_certificates_v1',
  CUSTOM_SETTINGS: 'aubasa_sgas_settings_v1'
};

function safeGet(key, defaultData) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultData;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error al leer ${key} de localStorage:`, error);
    return defaultData;
  }
}

function safeSet(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error al guardar ${key} en localStorage:`, error);
    return false;
  }
}

// Inicialización de Gap Analysis limpio para modo en blanco
const CLEAN_GAP_ANALYSIS = INITIAL_GAP_ANALYSIS_ITEMS.map(item => ({
  ...item,
  estadoConformidad: 'no_conforme',
  observaciones: '',
  accionRemedial: '',
  responsable: ''
}));

// Inicialización de Roadmap limpio al 0%
const CLEAN_ROADMAP = INITIAL_ROADMAP_PHASES.map(phase => ({
  ...phase,
  progreso: 0,
  estado: phase.id === 1 ? 'en_curso' : 'pendiente',
  entregables: phase.entregables?.map(h => ({ ...h, completado: false })) || []
}));

export const sgasStorage = {
  // Modo de Espacio de Trabajo
  getWorkspaceMode: () => safeGet(STORAGE_KEYS.WORKSPACE_MODE, 'blank'),
  setWorkspaceMode: (mode) => safeSet(STORAGE_KEYS.WORKSPACE_MODE, mode),

  // Riesgos (Por defecto vacío [] para carga real en blanco)
  getRisks: () => safeGet(STORAGE_KEYS.RISKS, []),
  saveRisks: (data) => safeSet(STORAGE_KEYS.RISKS, data),

  // Socios / Debida Diligencia (Por defecto vacío [] para carga real en blanco)
  getPartners: () => safeGet(STORAGE_KEYS.PARTNERS, []),
  savePartners: (data) => safeSet(STORAGE_KEYS.PARTNERS, data),

  // Políticas y Documentos (Mantiene los 10 Procedimientos Oficiales estándar)
  getPolicies: () => safeGet(STORAGE_KEYS.POLICIES, INITIAL_POLICY_TEMPLATES),
  savePolicies: (data) => safeSet(STORAGE_KEYS.POLICIES, data),

  // Gap Analysis (Mantiene los 32 requisitos normativos con campos en blanco listos para auditar)
  getGapAnalysis: () => safeGet(STORAGE_KEYS.GAP_ANALYSIS, CLEAN_GAP_ANALYSIS),
  saveGapAnalysis: (data) => safeSet(STORAGE_KEYS.GAP_ANALYSIS, data),

  // Canal Ético / Denuncias (Por defecto vacío [] para carga real)
  getReports: () => safeGet(STORAGE_KEYS.WHISTLEBLOWING, []),
  saveReports: (data) => safeSet(STORAGE_KEYS.WHISTLEBLOWING, data),

  // Roadmap (Por defecto al 0% para iniciar implementación real)
  getRoadmap: () => safeGet(STORAGE_KEYS.ROADMAP, CLEAN_ROADMAP),
  saveRoadmap: (data) => safeSet(STORAGE_KEYS.ROADMAP, data),

  // Registros y Evidencias Obligatorias Cl. 7.5 (Por defecto vacío [] para carga real)
  getRecords: () => safeGet(STORAGE_KEYS.RECORDS, []),
  saveRecords: (data) => safeSet(STORAGE_KEYS.RECORDS, data),

  // Capacitaciones & Inducciones (Mantiene plan temático pero con 0 colaboradores cargados por defecto)
  getTrainingPlan: () => safeGet(STORAGE_KEYS.TRAINING_PLAN, TRAINING_PLAN_OVERVIEW),
  saveTrainingPlan: (data) => safeSet(STORAGE_KEYS.TRAINING_PLAN, data),

  getCollaborators: () => safeGet(STORAGE_KEYS.TRAINING_COLLABORATORS, []),
  saveCollaborators: (data) => safeSet(STORAGE_KEYS.TRAINING_COLLABORATORS, data),

  getCertificates: () => safeGet(STORAGE_KEYS.CERTIFICATES, []),
  saveCertificates: (data) => safeSet(STORAGE_KEYS.CERTIFICATES, data),

  // Reset completo a estado en blanco (Carga Real)
  resetAllToDefault: () => {
    return sgasStorage.clearToBlankSlate();
  },

  // Iniciar en Blanco (Sin datos de ejemplo - listo para producción real)
  clearToBlankSlate: () => {
    try {
      safeSet(STORAGE_KEYS.WORKSPACE_MODE, 'blank');
      safeSet(STORAGE_KEYS.RISKS, []);
      safeSet(STORAGE_KEYS.PARTNERS, []);
      safeSet(STORAGE_KEYS.WHISTLEBLOWING, []);
      safeSet(STORAGE_KEYS.RECORDS, []);
      safeSet(STORAGE_KEYS.TRAINING_COLLABORATORS, []);
      safeSet(STORAGE_KEYS.CERTIFICATES, []);
      safeSet(STORAGE_KEYS.GAP_ANALYSIS, CLEAN_GAP_ANALYSIS);
      safeSet(STORAGE_KEYS.POLICIES, INITIAL_POLICY_TEMPLATES);
      safeSet(STORAGE_KEYS.ROADMAP, CLEAN_ROADMAP);
      safeSet(STORAGE_KEYS.TRAINING_PLAN, TRAINING_PLAN_OVERVIEW);
      return true;
    } catch (e) {
      console.error('Error al limpiar a estado en blanco:', e);
      return false;
    }
  },

  // Cargar datos de prueba/demostración
  loadDemoData: () => {
    try {
      safeSet(STORAGE_KEYS.WORKSPACE_MODE, 'demo');
      safeSet(STORAGE_KEYS.RISKS, INITIAL_RISK_MATRIX);
      safeSet(STORAGE_KEYS.PARTNERS, INITIAL_PARTNERS_REGISTRY);
      safeSet(STORAGE_KEYS.POLICIES, INITIAL_POLICY_TEMPLATES);
      safeSet(STORAGE_KEYS.GAP_ANALYSIS, INITIAL_GAP_ANALYSIS_ITEMS);
      safeSet(STORAGE_KEYS.WHISTLEBLOWING, INITIAL_WHISTLEBLOWING_REPORTS);
      safeSet(STORAGE_KEYS.ROADMAP, INITIAL_ROADMAP_PHASES);
      safeSet(STORAGE_KEYS.RECORDS, INITIAL_RECORDS_DATA);
      safeSet(STORAGE_KEYS.TRAINING_PLAN, TRAINING_PLAN_OVERVIEW);
      safeSet(STORAGE_KEYS.TRAINING_COLLABORATORS, INITIAL_COLLABORATORS_PROGRESS);
      safeSet(STORAGE_KEYS.CERTIFICATES, []);
      return true;
    } catch (e) {
      console.error('Error al cargar datos demo:', e);
      return false;
    }
  },

  // Comprobar si el workspace está en blanco
  isWorkspaceBlank: () => {
    const risks = sgasStorage.getRisks();
    const records = sgasStorage.getRecords();
    const partners = sgasStorage.getPartners();
    return risks.length === 0 && records.length === 0 && partners.length === 0;
  },

  // Exportar todo como objeto consolidado
  getAllData: () => ({
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    app: 'SGAS AUBASA ISO 37001',
    risks: sgasStorage.getRisks(),
    partners: sgasStorage.getPartners(),
    policies: sgasStorage.getPolicies(),
    gapAnalysis: sgasStorage.getGapAnalysis(),
    reports: sgasStorage.getReports(),
    roadmap: sgasStorage.getRoadmap(),
    records: sgasStorage.getRecords(),
    trainingPlan: sgasStorage.getTrainingPlan(),
    collaborators: sgasStorage.getCollaborators(),
    certificates: sgasStorage.getCertificates()
  }),

  // Restaurar todo desde un objeto consolidado
  restoreAllData: (bundle) => {
    if (!bundle || typeof bundle !== 'object') throw new Error('Formato de datos inválido.');
    if (bundle.risks) sgasStorage.saveRisks(bundle.risks);
    if (bundle.partners) sgasStorage.savePartners(bundle.partners);
    if (bundle.policies) sgasStorage.savePolicies(bundle.policies);
    if (bundle.gapAnalysis) sgasStorage.saveGapAnalysis(bundle.gapAnalysis);
    if (bundle.reports) sgasStorage.saveReports(bundle.reports);
    if (bundle.roadmap) sgasStorage.saveRoadmap(bundle.roadmap);
    if (bundle.records) sgasStorage.saveRecords(bundle.records);
    if (bundle.trainingPlan) sgasStorage.saveTrainingPlan(bundle.trainingPlan);
    if (bundle.collaborators) sgasStorage.saveCollaborators(bundle.collaborators);
    if (bundle.certificates) sgasStorage.saveCertificates(bundle.certificates);
    return true;
  }
};
