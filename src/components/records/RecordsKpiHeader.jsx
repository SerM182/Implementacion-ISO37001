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
      <div className="bg-white border border-slate-200 hover:border-[#0284c7] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Registros Oficiales (Cl. 7.5)
          </span>
          <div className="p-2.5 bg-sky-50 border border-sky-200 text-[#0284c7] rounded-xl group-hover:scale-105 transition-transform">
            <FolderCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 font-mono">{kpis.total}</span>
          <span className="text-xs text-[#0284c7] font-semibold">Evidencias activas</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2.5">
          <span>Trazabilidad IRAM</span>
          <span className="text-emerald-700 font-bold font-mono">100% Auditables</span>
        </div>
      </div>

      {/* 2. Nivel de Conformidad / Verificación */}
      <div className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Conformidad y Eficacia
          </span>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 font-mono">
            {kpis.porcentajeVerificados}%
          </span>
          <span className="text-xs text-slate-500 font-medium">({kpis.verificados} conformes)</span>
        </div>
        <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${kpis.porcentajeVerificados}%` }}
          />
        </div>
      </div>

      {/* 3. Documentos Adjuntos y Actas */}
      <div className="bg-white border border-slate-200 hover:border-purple-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Documentos y Actas
          </span>
          <div className="p-2.5 bg-purple-50 border border-purple-200 text-purple-600 rounded-xl group-hover:scale-105 transition-transform">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 font-mono">
            {kpis.totalDocumentosAdjuntos}
          </span>
          <span className="text-xs text-purple-700 font-semibold">Legajos & Hash SHA</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2.5">
          <span>Integridad probatoria</span>
          <span className="text-[#0284c7] font-medium">Inmutabilidad documental</span>
        </div>
      </div>

      {/* 4. Pendientes y Observaciones */}
      <div className="bg-white border border-slate-200 hover:border-amber-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            En Revisión / Observados
          </span>
          <div className="p-2.5 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl group-hover:scale-105 transition-transform">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-slate-900 font-mono">
            {kpis.enRevision + kpis.observados}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            ({kpis.enRevision} rev / {kpis.observados} obs)
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2.5">
          <span>Tipologías ISO cubiertas</span>
          <span className="text-slate-900 font-bold font-mono">{coveredCategories} / {totalCategories} Requisitos</span>
        </div>
      </div>
    </div>
  );
}
