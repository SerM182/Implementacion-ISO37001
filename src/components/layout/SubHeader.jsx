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
    <div className="bg-[#0284c7] text-white text-[11px] sm:text-xs py-2 px-2 sm:px-4 lg:px-6 border-b border-sky-700/60 shadow-inner no-print select-none w-full">
      <div className="w-full flex flex-wrap items-center justify-between gap-2">
        {/* Alcance y Rutas - Estilo barra azul de la imagen de referencia */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-white">
          <div className="flex items-center gap-1 font-extrabold uppercase tracking-wide bg-sky-900/40 px-2 py-0.5 sm:py-1 rounded-md border border-sky-400/30">
            <Route className="w-3 h-3 text-sky-200" />
            <span className="text-[10px] sm:text-xs">ALCANCE BALP (50 KM):</span>
          </div>
          <span className="font-semibold text-sky-100 hidden sm:inline">CABA — La Plata</span>
          <span className="text-sky-300 hidden sm:inline">•</span>
          <span className="text-sky-100 hidden md:inline">Peajes Dock Sud & Hudson</span>
          <span className="text-sky-300 hidden md:inline">•</span>
          <span className="bg-emerald-500 text-white font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
            Contratación + Pagos + Obras Viales
          </span>
        </div>

        {/* Indicadores en Tiempo Real con estilo blanco limpio */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[11px]">
          <div className="flex items-center gap-1 bg-sky-800/60 px-2 py-0.5 sm:py-1 rounded-md border border-sky-400/20 text-white" title="Total de Registros de Evidencias Auditables Cl. 7.5">
            <FolderCheck className="w-3 h-3 text-sky-200" />
            <span className="text-sky-100 font-medium hidden lg:inline">Evidencias (7.5):</span>
            <span className="text-sky-100 font-medium lg:hidden">Evid:</span>
            <strong className="text-white font-mono font-bold">{recordsCount}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2 py-0.5 sm:py-1 rounded-md border border-sky-400/20 text-white" title="Capacitaciones & Competencia Cl. 7.2/7.3">
            <GraduationCap className="w-3 h-3 text-sky-200" />
            <span className="text-sky-100 font-medium hidden lg:inline">Formados:</span>
            <span className="text-sky-100 font-medium lg:hidden">Form:</span>
            <strong className="text-white font-mono font-bold">{collabsCount || 4}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2 py-0.5 sm:py-1 rounded-md border border-sky-400/20 text-white" title="Riesgos identificados en la Matriz SGAS">
            <AlertOctagon className="w-3 h-3 text-amber-300" />
            <span className="text-sky-100 font-medium hidden lg:inline">Riesgos:</span>
            <span className="text-sky-100 font-medium lg:hidden">Riesg:</span>
            <strong className="text-amber-200 font-mono font-bold">{risksCount}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2 py-0.5 sm:py-1 rounded-md border border-sky-400/20 text-white" title="Socios de Negocios en Debida Diligencia">
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            <span className="text-sky-100 font-medium hidden lg:inline">Contratistas:</span>
            <span className="text-sky-100 font-medium lg:hidden">Contrat:</span>
            <strong className="text-emerald-200 font-mono font-bold">{partnersCount}</strong>
          </div>

          <div className="flex items-center gap-1 bg-sky-800/60 px-2 py-0.5 sm:py-1 rounded-md border border-sky-400/20 text-white" title="Canal Ético ISO 37002 / Investigaciones Forenses ISO 37008">
            <Scale className="w-3 h-3 text-pink-300" />
            <span className="text-sky-100 font-medium hidden lg:inline">Canal Ético:</span>
            <strong className="text-pink-200 font-mono font-bold">{reportsCount > 0 ? `${reportsCount}` : 'Activo'}</strong>
          </div>

          {onOpenAdvisor && (
            <button
              onClick={onOpenAdvisor}
              className="flex items-center gap-1 bg-white text-[#0284c7] hover:bg-sky-50 px-2 py-0.5 sm:py-1 rounded-md font-bold text-[11px] sm:text-xs transition-colors shadow-xs ml-1 cursor-pointer"
            >
              <HelpCircle className="w-3 h-3 text-[#0284c7]" />
              <span className="hidden sm:inline">Asistente IA</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

