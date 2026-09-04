import React from 'react';
import { RiskBadge, ProcessBadge } from '../common/Badge.jsx';
import { Edit, Trash2, Eye, ShieldAlert } from 'lucide-react';

export default function RiskTable({
  risks = [],
  onEditRisk,
  onDeleteRisk
}) {
  if (risks.length === 0) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center">
        <ShieldAlert className="w-10 h-10 text-slate-500 mx-auto mb-3" />
        <h4 className="text-sm font-semibold text-slate-300">No se encontraron riesgos</h4>
        <p className="text-xs text-slate-500 mt-1">
          Ajuste los filtros de búsqueda o registre un nuevo riesgo antisoborno.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">ID & Proceso</th>
              <th className="py-3 px-4">Escenario de Soborno / Fraude</th>
              <th className="py-3 px-3 text-center">R. Inherente</th>
              <th className="py-3 px-4">Controles Existentes</th>
              <th className="py-3 px-3 text-center">R. Residual</th>
              <th className="py-3 px-3">Responsable</th>
              <th className="py-3 px-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {risks.map((risk) => (
              <tr key={risk.id} className="hover:bg-slate-800/40 transition-colors">
                {/* ID & Proceso */}
                <td className="py-3 px-4 whitespace-nowrap align-top">
                  <div className="font-mono font-bold text-white text-xs">{risk.id}</div>
                  <div className="mt-1">
                    <ProcessBadge process={risk.proceso} />
                  </div>
                  {risk.subproceso && (
                    <div className="text-[10px] text-slate-400 mt-1">{risk.subproceso}</div>
                  )}
                </td>

                {/* Escenario de Riesgo */}
                <td className="py-3 px-4 max-w-sm align-top">
                  <p className="text-slate-100 font-medium leading-relaxed">
                    {risk.escenarioRiesgo}
                  </p>
                  {risk.planTratamiento && (
                    <div className="mt-2 text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-900/40 rounded p-1.5">
                      <span className="font-semibold text-cyan-400">Tratamiento:</span> {risk.planTratamiento}
                    </div>
                  )}
                </td>

                {/* Riesgo Inherente */}
                <td className="py-3 px-3 text-center align-top whitespace-nowrap">
                  <div className="font-mono text-xs text-slate-300 mb-1">
                    P{risk.probabilidad || 1} × I{risk.impacto || 1} = <span className="font-bold">{risk.puntajeInherente || 1}</span>
                  </div>
                  <RiskBadge level={risk.nivelRiesgoInherente} />
                </td>

                {/* Controles */}
                <td className="py-3 px-4 align-top max-w-xs">
                  <div className="text-slate-300 text-[11px] leading-snug">
                    {risk.controlesExistentes || 'Sin control documentado'}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <span>Efectividad:</span>
                    <span className={`font-semibold capitalize ${
                      risk.efectividadControles === 'alta' ? 'text-emerald-400' :
                      risk.efectividadControles === 'media' ? 'text-yellow-400' : 'text-rose-400'
                    }`}>
                      {risk.efectividadControles || 'Baja'}
                    </span>
                  </div>
                </td>

                {/* Riesgo Residual */}
                <td className="py-3 px-3 text-center align-top whitespace-nowrap">
                  <div className="font-mono text-xs text-slate-300 mb-1">
                    Score: <span className="font-bold">{risk.puntajeResidual || 1}</span>
                  </div>
                  <RiskBadge level={risk.nivelRiesgoResidual} />
                </td>

                {/* Responsable */}
                <td className="py-3 px-3 align-top whitespace-nowrap text-[11px] text-slate-400">
                  {risk.responsableControl || 'Cumplimiento'}
                </td>

                {/* Acciones */}
                <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditRisk(risk)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                      title="Editar riesgo"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`¿Eliminar el riesgo ${risk.id}?`)) {
                          onDeleteRisk(risk.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                      title="Eliminar riesgo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
