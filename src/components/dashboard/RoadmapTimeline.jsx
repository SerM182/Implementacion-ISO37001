import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  Layers,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function RoadmapTimeline({
  phases = [],
  onUpdatePhases
}) {
  const [expandedPhaseId, setExpandedPhaseId] = useState(2); // Fase 2 por defecto

  const toggleExpand = (id) => {
    setExpandedPhaseId(prev => prev === id ? null : id);
  };

  const handleToggleDeliverable = (phaseId, deliverableId) => {
    if (!onUpdatePhases) return;

    const nextPhases = phases.map(phase => {
      if (phase.id !== phaseId) return phase;

      const nextDeliverables = phase.entregables.map(ent => {
        if (ent.id === deliverableId) {
          return { ...ent, completado: !ent.completado };
        }
        return ent;
      });

      const completedCount = nextDeliverables.filter(e => e.completado).length;
      const totalCount = nextDeliverables.length;
      const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      let newStatus = 'pendiente';
      if (newProgress === 100) {
        newStatus = 'completada';
      } else if (newProgress > 0) {
        newStatus = 'en_curso';
      }

      return {
        ...phase,
        entregables: nextDeliverables,
        progreso: newProgress,
        estado: newStatus
      };
    });

    onUpdatePhases(nextPhases);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0284c7]" />
            Cronograma Estratégico de Implementación (6 Fases hacia IRAM ISO 37001)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Hitos obligatorios para la certificación del SGAS en AUBASA. Marque los entregables a medida que se completen.
          </p>
        </div>
      </div>

      {/* Listado de Fases del Roadmap */}
      <div className="space-y-3">
        {phases.map((phase) => {
          const isExpanded = expandedPhaseId === phase.id;
          const completedEntregables = phase.entregables?.filter(e => e.completado).length || 0;
          const totalEntregables = phase.entregables?.length || 0;

          return (
            <div
              key={phase.id}
              className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-50/70 border-sky-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header de la Fase */}
              <div
                onClick={() => toggleExpand(phase.id)}
                className="p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-[280px]">
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-[#0284c7]" /> : <ChevronRight className="w-4 h-4" />}
                  </button>

                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border ${
                    phase.estado === 'completada'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : phase.estado === 'en_curso'
                      ? 'bg-sky-100 text-[#0284c7] border-sky-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {phase.id}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#0284c7]">
                        {phase.fase}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono font-medium">
                        ({phase.duracion})
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      {phase.titulo}
                    </h4>
                  </div>
                </div>

                {/* Progreso y Badge de Estado */}
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-slate-500 font-mono block font-semibold">
                      {completedEntregables}/{totalEntregables} entregables
                    </span>
                    <div className="w-28 bg-slate-200 rounded-full h-1.5 mt-1 border border-slate-300/60 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          phase.progreso === 100 ? 'bg-emerald-500' : 'bg-[#0284c7]'
                        }`}
                        style={{ width: `${phase.progreso}%` }}
                      />
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                    phase.estado === 'completada'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : phase.estado === 'en_curso'
                      ? 'bg-sky-100 text-[#0284c7] border border-sky-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {phase.estado.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Contenido Desplegable de la Fase */}
              {isExpanded && (
                <div className="p-4 pt-0 border-t border-slate-200/80 bg-white space-y-4 text-xs">
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Objetivo Estratégico de la Fase:
                    </span>
                    <p className="text-slate-700 leading-relaxed font-medium">
                      {phase.objetivo}
                    </p>
                  </div>

                  {/* Cláusulas ISO asociadas */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">Cláusulas Normativas:</span>
                    {phase.clausulasIso?.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-50 text-[#0284c7] border border-sky-200"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Entregables con Checkbox Interactivo */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      Entregables y Evidencias Documentadas:
                    </span>
                    <div className="space-y-1.5">
                      {phase.entregables?.map((ent) => (
                        <div
                          key={ent.id}
                          onClick={() => handleToggleDeliverable(phase.id, ent.id)}
                          className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            ent.completado
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={ent.completado}
                              onChange={() => {}}
                              className="w-4 h-4 rounded border-slate-300 text-[#0284c7] focus:ring-0 cursor-pointer"
                            />
                            <span className={`text-xs ${ent.completado ? 'line-through text-slate-400 font-medium' : 'font-medium'}`}>
                              {ent.nombre}
                            </span>
                          </div>

                          {ent.completado && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <span>Responsable: <strong className="text-slate-800">{phase.responsable}</strong></span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
