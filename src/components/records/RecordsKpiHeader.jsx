import React from 'react';
import {
  FolderCheck,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
  FileCheck,
  Award
} from 'lucide-react';
import { RECORD_CATEGORIES } from '../../data/initialRecordsData.js';

export default function RecordsKpiHeader({ kpis }) {
  const totalCategories = RECORD_CATEGORIES.length;
  const coveredCategories = RECORD_CATEGORIES.filter(cat => (kpis.byCategory?.[cat.id] || 0) > 0).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total de Evidencias */}
      <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all group backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Registros Oficiales (Cl. 7.5)
          </span>
          <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
            <FolderCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white font-mono">{kpis.total}</span>
          <span className="text-xs text-cyan-400 font-semibold">Evidencias activas</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
          <span>Trazabilidad IRAM</span>
          <span className="text-emerald-400 font-bold font-mono">100% Auditables</span>
        </div>
      </div>

      {/* 2. Nivel de Conformidad / Verificación */}
      <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all group backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Conformidad y Eficacia
          </span>
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-emerald-400 font-mono">
            {kpis.porcentajeVerificados}%
          </span>
          <span className="text-xs text-slate-400 font-medium">({kpis.verificados} conformes)</span>
        </div>
        <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${kpis.porcentajeVerificados}%` }}
          />
        </div>
      </div>

      {/* 3. Documentos Adjuntos y Actas */}
      <div className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all group backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Documentos y Actas
          </span>
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white font-mono">
            {kpis.totalDocumentosAdjuntos}
          </span>
          <span className="text-xs text-purple-400 font-semibold">Legajos & Hash SHA</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
          <span>Integridad probatoria</span>
          <span className="text-cyan-400 font-medium">Inmutabilidad documental</span>
        </div>
      </div>

      {/* 4. Pendientes y Observaciones */}
      <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden transition-all group backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            En Revisión / Observados
          </span>
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-amber-400 font-mono">
            {kpis.enRevision + kpis.observados}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            ({kpis.enRevision} rev / {kpis.observados} obs)
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2.5">
          <span>Tipologías ISO cubiertas</span>
          <span className="text-white font-bold font-mono">{coveredCategories} / {totalCategories} Requisitos</span>
        </div>
      </div>
    </div>
  );
}
