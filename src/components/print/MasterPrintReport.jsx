import React from 'react';
import { calculateGapMaturity } from '../../utils/gapAnalysisScoring.js';
import {
  Printer,
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
  Building2,
  CreditCard,
  HardHat,
  FolderCheck,
  FileCheck2,
  Hash,
  GraduationCap,
  BookOpen
} from 'lucide-react';

export default function MasterPrintReport({
  isOpen,
  onClose,
  risks = [],
  partners = [],
  policies = [],
  gapItems = [],
  reports = [],
  records = [],
  trainingPlan = {},
  collaborators = [],
  roadmapPhases = []
}) {
  if (!isOpen) return null;

  const gapMaturity = calculateGapMaturity(gapItems);
  const highRisks = risks.filter(r => r.evaluacionResidual?.nivel === 'alto');
  const mediumRisks = risks.filter(r => r.evaluacionResidual?.nivel === 'medio');

  const verifiedRecords = records.filter(r => r.estadoVerificacion === 'verificado');
  const inRevisionRecords = records.filter(r => r.estadoVerificacion === 'en_revision');
  const observedRecords = records.filter(r => r.estadoVerificacion === 'observado');

  const certifiedCollaborators = collaborators.filter(c => c.estadoCertificacion === 'certificado');
  const totalTrainingHours = collaborators.reduce((acc, c) => acc + (c.horasAcumuladas || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl print:max-w-none print:w-full print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black print:p-8 text-slate-800">

        {/* Barra de Acciones Superior (Oculta al Imprimir) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#0284c7]" />
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Informe Oficial Ejecutivo de Implementación SGAS (ISO 37001 / 37002 / 37008)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0284c7] hover:bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Exportar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DOCUMENTO CONTROLADO OFICIAL (FORMATO PARA IMPRESIÓN Y AUDITORÍA) */}
        <div className="space-y-6 print:space-y-5 text-slate-800 print:text-slate-900 text-xs leading-relaxed">

          {/* Encabezado Oficial Institucional */}
          <div className="border-2 border-slate-300 print:border-black p-4 rounded-xl print:rounded-none flex items-center justify-between bg-slate-50">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0284c7] print:text-slate-800">
                AUTOPISTAS DE BUENOS AIRES S.A. (AUBASA)
              </span>
              <h1 className="text-base font-black text-slate-900 print:text-black uppercase">
                Informe Ejecutivo de Integridad, Prevención del Soborno e Investigaciones
              </h1>
              <p className="text-[11px] text-slate-600 print:text-slate-700">
                Alcance: Contratación, Pagos y Planificación y Ejecución de Obras Viales — Autopista BALP (50 km)
              </p>
            </div>

            <div className="text-right font-mono text-[10px] space-y-0.5 border-l border-slate-300 print:border-black pl-4">
              <div><strong>Código:</strong> INF-SGAS-2026-001</div>
              <div><strong>Versión:</strong> 2.0 (Trilogía Oficial)</div>
              <div><strong>Fecha:</strong> {new Date().toLocaleDateString('es-AR')}</div>
              <div><strong>Normas:</strong> ISO 37001 / 37002 / 37008</div>
            </div>
          </div>

          {/* 1. Resumen Ejecutivo y Dictamen de Preparación */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0284c7] print:text-black border-b border-slate-200 print:border-black pb-1">
              1. Resumen Ejecutivo y Nivel de Madurez para Certificación
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
              <div className="p-3 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-200 print:border-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 print:text-slate-600 block">Conformidad Global</span>
                <span className="text-xl font-black text-slate-900 print:text-black font-mono">{gapMaturity.overallPercentage}%</span>
              </div>
              <div className="p-3 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-200 print:border-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 print:text-slate-600 block">Riesgos SGAS</span>
                <span className="text-xl font-black text-slate-900 print:text-black font-mono">{risks.length}</span>
              </div>
              <div className="p-3 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-200 print:border-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 print:text-slate-600 block">Socios DD</span>
                <span className="text-xl font-black text-slate-900 print:text-black font-mono">{partners.length}</span>
              </div>
              <div className="p-3 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-200 print:border-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 print:text-slate-600 block">Evidencias (7.5)</span>
                <span className="text-xl font-black text-[#0284c7] print:text-black font-mono">{records.length}</span>
              </div>
              <div className="p-3 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-200 print:border-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 print:text-slate-600 block">Formados (7.3)</span>
                <span className="text-xl font-black text-indigo-700 print:text-black font-mono">{collaborators.length}</span>
              </div>
              <div className="p-3 bg-slate-50 print:bg-slate-100 rounded-lg border border-slate-200 print:border-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-500 print:text-slate-600 block">Canal Ético</span>
                <span className="text-xl font-black text-slate-900 print:text-black font-mono">{reports.length} Casos</span>
              </div>
            </div>
            <p className="p-3 bg-slate-50 print:bg-slate-50 border border-slate-200 print:border-slate-400 rounded-lg text-slate-700">
              <strong>Dictamen de Auditoría IRAM:</strong> {gapMaturity.readinessVerdict}. AUBASA cuenta con {gapMaturity.conformeCount} requisitos con conformidad total, {gapMaturity.parcialCount} en calibración operativa y {gapMaturity.noConformeCount} brechas pendientes de cierre antes de la auditoría de Etapa 2.
            </p>
          </div>

          {/* 2. Diagnóstico por Capítulos ISO 37001 */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0284c7] print:text-black border-b border-slate-200 print:border-black pb-1">
              2. Diagnóstico de Brechas por Capítulos Normativos (Cl. 4 a 10)
            </h2>
            <table className="w-full text-left text-[11px] border border-slate-200 print:border-black border-collapse">
              <thead>
                <tr className="bg-slate-100 print:bg-slate-200 border-b border-slate-200 print:border-black text-slate-800">
                  <th className="p-2 font-bold">Capítulo ISO 37001</th>
                  <th className="p-2 font-bold text-center">Requisitos</th>
                  <th className="p-2 font-bold text-center">Conformes</th>
                  <th className="p-2 font-bold text-center">Parciales</th>
                  <th className="p-2 font-bold text-center">No Conformes</th>
                  <th className="p-2 font-bold text-right">% Cumplimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 print:divide-slate-400">
                {Object.entries(gapMaturity.byChapter).map(([capName, capData]) => (
                  <tr key={capName} className="hover:bg-slate-50">
                    <td className="p-2 font-semibold text-slate-900">{capName}</td>
                    <td className="p-2 text-center font-mono">{capData.total}</td>
                    <td className="p-2 text-center font-mono text-emerald-700 font-bold">{capData.conforme}</td>
                    <td className="p-2 text-center font-mono text-amber-700">{capData.parcial}</td>
                    <td className="p-2 text-center font-mono text-rose-700">{capData.noConforme}</td>
                    <td className="p-2 text-right font-mono font-bold text-[#0284c7]">{capData.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Matriz de Riesgos Principales */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0284c7] print:text-black border-b border-slate-200 print:border-black pb-1">
              3. Resumen de Riesgos Críticos de Soborno por Proceso
            </h2>
            <table className="w-full text-left text-[11px] border border-slate-200 print:border-black border-collapse">
              <thead>
                <tr className="bg-slate-100 print:bg-slate-200 border-b border-slate-200 print:border-black text-slate-800">
                  <th className="p-2 font-bold">Código</th>
                  <th className="p-2 font-bold">Proceso</th>
                  <th className="p-2 font-bold">Riesgo Identificado</th>
                  <th className="p-2 font-bold text-center">Riesgo Inherente</th>
                  <th className="p-2 font-bold text-center">Riesgo Residual</th>
                  <th className="p-2 font-bold">Control Clave de Mitigación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 print:divide-slate-400">
                {risks.slice(0, 6).map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-bold whitespace-nowrap text-[#0284c7]">{r.id}</td>
                    <td className="p-2 whitespace-nowrap font-medium text-slate-700">{r.proceso}</td>
                    <td className="p-2 font-medium text-slate-900">{r.titulo}</td>
                    <td className="p-2 text-center font-mono">{r.evaluacionInherente?.puntaje} ({r.evaluacionInherente?.nivel})</td>
                    <td className="p-2 text-center font-mono font-bold text-emerald-700">{r.evaluacionResidual?.puntaje} ({r.evaluacionResidual?.nivel})</td>
                    <td className="p-2 text-[10px] text-slate-600">{r.controlesExistentes?.[0]?.descripcion || 'Control preventivo'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Programa Anual de Capacitación & Competencias (Cl. 7.2 & 7.3) */}
          <div className="space-y-2">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#0284c7] print:text-black border-b border-slate-200 print:border-black pb-1">
              4. Programa Anual de Capacitación & Evaluación de Eficacia (Cl. 7.2 & 7.3)
            </h2>
            <div className="p-2.5 bg-slate-50 print:bg-slate-100 border border-slate-200 print:border-slate-400 rounded-lg flex flex-wrap items-center justify-between text-[11px] mb-2 text-slate-700">
              <span>Personal Capacitado y Evaluado: <strong className="font-mono text-slate-900 print:text-black">{collaborators.length} personas</strong></span>
              <span>Acreditados con Certificado: <strong className="font-mono text-emerald-700 print:text-black">{certifiedCollaborators.length}</strong></span>
              <span>Horas de Formación Acumuladas: <strong className="font-mono text-[#0284c7] print:text-black">{totalTrainingHours} hrs</strong></span>
              <span>Meta Cobertura Anual: <strong className="font-mono text-slate-900 print:text-black">{trainingPlan.metaCobertura || 95}%</strong></span>
            </div>

            <table className="w-full text-left text-[11px] border border-slate-200 print:border-black border-collapse">
              <thead>
                <tr className="bg-slate-100 print:bg-slate-200 border-b border-slate-200 print:border-black text-slate-800">
                  <th className="p-2 font-bold">Colaborador / Legajo</th>
                  <th className="p-2 font-bold">Área Operativa / Cargo</th>
                  <th className="p-2 font-bold text-center">Horas Formación</th>
                  <th className="p-2 font-bold text-center">Eficacia Evaluada</th>
                  <th className="p-2 font-bold text-center">Estado Competencia</th>
                  <th className="p-2 font-bold text-right">Fecha Certificación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 print:divide-slate-400">
                {collaborators.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-2 font-medium text-slate-900">
                      <strong>{c.nombre}</strong>
                      <span className="block text-[9px] text-slate-500 font-mono">{c.legajo}</span>
                    </td>
                    <td className="p-2 text-[10px]">
                      <div className="text-slate-800 font-medium">{c.cargo}</div>
                      <div className="text-slate-500">{c.area}</div>
                    </td>
                    <td className="p-2 text-center font-mono">{c.horasAcumuladas} hrs</td>
                    <td className="p-2 text-center font-mono font-bold text-emerald-700 print:text-black">{c.calificacionPromedio}%</td>
                    <td className="p-2 text-center font-mono text-[10px] font-bold text-[#0284c7] print:text-black">
                      COMPETENTE (Cl. 7.2)
                    </td>
                    <td className="p-2 text-right font-mono text-[10px]">{c.fechaUltimaCertificacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 5. Procedimientos Operativos Estándar (POEs) y Manual SGAS */}
          {policies.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-cyan-300 print:text-black border-b border-slate-700 print:border-black pb-1">
                5. Compendio de Procedimientos Operativos Estándar (POEs / SOPs)
              </h2>
              <table className="w-full text-left text-[11px] border border-slate-800 print:border-black border-collapse">
                <thead>
                  <tr className="bg-slate-950 print:bg-slate-200 border-b border-slate-800 print:border-black">
                    <th className="p-2 font-bold">Código</th>
                    <th className="p-2 font-bold">Cláusula ISO</th>
                    <th className="p-2 font-bold">Título del Procedimiento / Política</th>
                    <th className="p-2 font-bold">Responsable / Órgano Emisor</th>
                    <th className="p-2 font-bold text-center">Versión</th>
                    <th className="p-2 font-bold text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-400">
                  {policies.map((p) => (
                    <tr key={p.id}>
                      <td className="p-2 font-mono font-bold whitespace-nowrap text-cyan-400 print:text-black">{p.codigo}</td>
                      <td className="p-2 font-mono whitespace-nowrap">{p.clausulaIso}</td>
                      <td className="p-2 font-medium">{p.titulo}</td>
                      <td className="p-2 text-[10px]">{p.responsable}</td>
                      <td className="p-2 text-center font-mono">v{p.version}</td>
                      <td className="p-2 text-center whitespace-nowrap font-mono text-[10px] font-bold text-emerald-400 print:text-black">
                        {p.estado === 'vigente' ? 'VIGENTE' : p.estado.toUpperCase()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 6. Registros y Evidencias Obligatorias Cl. 7.5 */}
          {records.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xs font-black uppercase tracking-wider text-cyan-300 print:text-black border-b border-slate-700 print:border-black pb-1">
                6. Registros y Evidencias Obligatorias (Cl. 7.5 Información Documentada)
              </h2>
              <div className="p-2.5 bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-400 rounded-lg flex flex-wrap items-center justify-between text-[11px] mb-2">
                <span>Total de Evidencias: <strong className="font-mono">{records.length}</strong></span>
                <span>Conformes / Verificados: <strong className="font-mono text-emerald-400 print:text-black">{verifiedRecords.length}</strong></span>
                <span>En Revisión: <strong className="font-mono text-amber-400 print:text-black">{inRevisionRecords.length}</strong></span>
                <span>Con Observaciones: <strong className="font-mono text-rose-400 print:text-black">{observedRecords.length}</strong></span>
              </div>
              <table className="w-full text-left text-[11px] border border-slate-800 print:border-black border-collapse">
                <thead>
                  <tr className="bg-slate-950 print:bg-slate-200 border-b border-slate-800 print:border-black">
                    <th className="p-2 font-bold">Código / Fecha</th>
                    <th className="p-2 font-bold">Cláusula</th>
                    <th className="p-2 font-bold">Título de la Evidencia</th>
                    <th className="p-2 font-bold">Responsable / Ubicación</th>
                    <th className="p-2 font-bold text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-400">
                  {records.slice(0, 8).map((rec) => (
                    <tr key={rec.id}>
                      <td className="p-2 font-mono whitespace-nowrap">
                        <strong>{rec.id}</strong>
                        <span className="block text-[9px] text-slate-500">{rec.fecha}</span>
                      </td>
                      <td className="p-2 font-mono font-bold whitespace-nowrap text-cyan-400 print:text-black">
                        {rec.clausulaIso}
                      </td>
                      <td className="p-2 font-medium">{rec.titulo}</td>
                      <td className="p-2 text-[10px]">
                        <div>{rec.responsable}</div>
                        <div className="text-slate-500">{rec.areaUbicacion}</div>
                      </td>
                      <td className="p-2 text-center whitespace-nowrap font-mono text-[10px] font-bold">
                        {rec.estadoVerificacion === 'verificado' ? 'CONFORME' : rec.estadoVerificacion === 'en_revision' ? 'EN REVISIÓN' : 'OBSERVADO'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 7. Bloque Formal de Firmas y Validación Institucional */}
          <div className="pt-8 border-t-2 border-slate-300 print:border-black space-y-6">
            <p className="text-[10px] text-slate-500 print:text-slate-600 italic text-center">
              El presente informe refleja fielmente el estado documental, operativo y de control del Sistema de Gestión Antisoborno de AUBASA, en estricto cumplimiento con la Norma IRAM-ISO 37001:2025, UNE-ISO 37002, ISO/TS 37008 y la Ley Nacional 27.401.
            </p>

            <div className="grid grid-cols-2 gap-12 pt-6 text-center">
              <div className="border-t border-slate-300 print:border-black pt-2">
                <span className="font-bold text-slate-900 print:text-black block text-xs">
                  Dr. Martín Valenzuela
                </span>
                <span className="text-[10px] text-slate-600 print:text-slate-700 block">
                  Oficial de Cumplimiento Antisoborno (Cl. 5.3)
                </span>
                <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                  Autopistas de Buenos Aires S.A.
                </span>
              </div>

              <div className="border-t border-slate-300 print:border-black pt-2">
                <span className="font-bold text-slate-900 print:text-black block text-xs">
                  Directorio / Presidencia
                </span>
                <span className="text-[10px] text-slate-600 print:text-slate-700 block">
                  Órgano de Gobierno y Alta Dirección (Cl. 5.1)
                </span>
                <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                  Autopistas de Buenos Aires S.A.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
