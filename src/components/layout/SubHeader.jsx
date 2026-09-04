import React from 'react';
import { Route, ShieldCheck, FolderCheck, AlertOctagon, HelpCircle, GraduationCap, UserCheck, Scale } from 'lucide-react';

export default function SubHeader({
  activeTab,
  risksCount = 0,
  partnersCount = 0,
  gapItemsCount = 0,
  reportsCount = 0,
  recordsCount = 0,
  collabsCount = 0,
  onOpenAdvisor
}) {
  return (
    <div className="bg-[#0284c7] text-white text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-sky-700/60 shadow-inner no-print select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Alcance y Rutas - Estilo barra azul de la imagen de referencia */}
        <div className="flex items-center flex-wrap gap-2 text-white">
          <div className="flex items-center gap-1.5 font-extrabold uppercase tracking-wide bg-sky-900/40 px-2.5 py-1 rounded-md border border-sky-400/30">
            <Route className="w-3.5 h-3.5 text-sky-200" />
            <span>ALCANCE BALP (50 KM):</span>
          </div>
          <span className="font-semibold text-sky-100">CABA — La Plata</span>
          <span className="text-sky-300">•</span>
          <span className="text-sky-100">Peajes Dock Sud & Hudson</span>
          <span className="text-sky-300">•</span>
          <span className="bg-emerald-500 text-white font-black text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
            Contratación + Pagos + Obras Viales
          </span>
        </div>

        {/* Indicadores en Tiempo Real con estilo blanco limpio */}
        <div className="flex items-center flex-wrap gap-2.5 text-xs">
          <div className="flex items-center gap-1 bg-sky-800/60 px-2.5 py-1 rounded-md border border-sky-400/20 text-white" title="Total de Registros de Evidencias Auditables Cl. 7.5">
            <FolderCheck className="w-3.5 h-3.5 text-sky-200" />
            <span className="text-sky-100 font-medium">Evidencias (7.5):</span>
            <strong className="text-white font-mono font-bold">{recordsCount}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2.5 py-1 rounded-md border border-sky-400/20 text-white" title="Capacitaciones & Competencia Cl. 7.2/7.3">
            <GraduationCap className="w-3.5 h-3.5 text-sky-200" />
            <span className="text-sky-100 font-medium">Formados:</span>
            <strong className="text-white font-mono font-bold">{collabsCount || 4}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2.5 py-1 rounded-md border border-sky-400/20 text-white" title="Riesgos identificados en la Matriz SGAS">
            <AlertOctagon className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-sky-100 font-medium">Riesgos:</span>
            <strong className="text-amber-200 font-mono font-bold">{risksCount}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2.5 py-1 rounded-md border border-sky-400/20 text-white" title="Socios de Negocios en Debida Diligencia">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-sky-100 font-medium">Contratistas:</span>
            <strong className="text-emerald-200 font-mono font-bold">{partnersCount}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2.5 py-1 rounded-md border border-sky-400/20 text-white" title="Canal Ético ISO 37002 / Investigaciones Forenses ISO 37008">
            <Scale className="w-3.5 h-3.5 text-pink-300" />
            <span className="text-sky-100 font-medium">Canal Ético:</span>
            <strong className="text-pink-200 font-mono font-bold">{reportsCount > 0 ? `${reportsCount} Casos` : 'Activo'}</strong>
          </div>

          {onOpenAdvisor && (
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1 bg-white text-[#0284c7] hover:bg-sky-50 px-2.5 py-1 rounded-md font-bold text-xs transition-colors shadow-xs ml-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Asistente IA</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

