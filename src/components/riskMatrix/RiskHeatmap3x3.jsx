import React from 'react';
import { getHeatmapDistribution } from '../../utils/riskCalculations.js';

export default function RiskHeatmap3x3({
  risksList = [],
  selectedQuadrant,
  onSelectQuadrant,
  viewType = 'residual', // 'inherente' o 'residual'
  onViewTypeChange
}) {
  const distribution = getHeatmapDistribution(risksList, viewType);

  // Escala 3x3: P=3 (Alta), P=2 (Media), P=1 (Baja) vs I=1 (Bajo), I=2 (Medio), I=3 (Alto)
  const rows = [
    { p: 3, labelP: 'Alta (3)' },
    { p: 2, labelP: 'Media (2)' },
    { p: 1, labelP: 'Baja (1)' }
  ];

  const cols = [
    { i: 1, labelI: 'Bajo (1)' },
    { i: 2, labelI: 'Medio (2)' },
    { i: 3, labelI: 'Alto (3)' }
  ];

  const getCellColor = (p, i) => {
    const score = p * i;
    if (score >= 9) return 'bg-rose-950/70 border-rose-600 text-rose-200 hover:bg-rose-900/80';
    if (score >= 6) return 'bg-amber-950/70 border-amber-600 text-amber-200 hover:bg-amber-900/80';
    if (score >= 3) return 'bg-yellow-950/60 border-yellow-600 text-yellow-200 hover:bg-yellow-900/70';
    return 'bg-emerald-950/60 border-emerald-600 text-emerald-200 hover:bg-emerald-900/70';
  };

  const getCellLabel = (score) => {
    if (score >= 9) return 'CRÍTICO';
    if (score >= 6) return 'ALTO';
    if (score >= 3) return 'MEDIO';
    return 'BAJO';
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>Mapa de Calor 3x3 (Probabilidad x Impacto)</span>
          </h3>
          <p className="text-xs text-slate-400">
            Haga clic en cualquier celda para filtrar los riesgos específicos de ese cuadrante.
          </p>
        </div>

        {/* Selector Inherente vs Residual */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => onViewTypeChange && onViewTypeChange('residual')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              viewType === 'residual'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Riesgo Residual (Con Controles)
          </button>
          <button
            onClick={() => onViewTypeChange && onViewTypeChange('inherente')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              viewType === 'inherente'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Riesgo Inherente (Puro)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 items-center">
        {/* Etiqueta Eje Y (Probabilidad) */}
        <div className="col-span-1 flex flex-col items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-widest -rotate-90 select-none">
          Probabilidad
        </div>

        {/* Matriz 3x3 */}
        <div className="col-span-11 space-y-2">
          {rows.map(({ p, labelP }) => (
            <div key={p} className="grid grid-cols-3 gap-2">
              {cols.map(({ i, labelI }) => {
                const key = `${p}-${i}`;
                const itemsInCell = distribution[key] || [];
                const isSelected = selectedQuadrant === key;
                const score = p * i;

                return (
                  <button
                    key={key}
                    onClick={() => onSelectQuadrant(isSelected ? null : key)}
                    className={`relative p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${getCellColor(
                      p,
                      i
                    )} ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900 scale-[1.02] shadow-xl'
                        : 'opacity-90 hover:opacity-100 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full text-[10px] opacity-75 font-mono mb-1">
                      <span>P{p} × I{i}</span>
                      <span className="font-bold">{getCellLabel(score)}</span>
                    </div>

                    <div className="text-2xl font-black my-0.5 tracking-tight">
                      {itemsInCell.length}
                    </div>

                    <div className="text-[10px] text-slate-300">
                      {itemsInCell.length === 1 ? '1 riesgo' : `${itemsInCell.length} riesgos`}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Etiqueta Eje X (Impacto) */}
          <div className="grid grid-cols-3 gap-2 text-center text-slate-400 font-bold text-xs uppercase pt-1 tracking-wider">
            <div>Impacto Bajo (1)</div>
            <div>Impacto Medio (2)</div>
            <div>Impacto Alto (3)</div>
          </div>
        </div>
      </div>

      {selectedQuadrant && (
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-cyan-300 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Filtrando por Cuadrante <strong>{selectedQuadrant}</strong> ({distribution[selectedQuadrant]?.length || 0} riesgos)</span>
          </div>
          <button
            onClick={() => onSelectQuadrant(null)}
            className="text-slate-400 hover:text-white underline"
          >
            Quitar filtro de mapa
          </button>
        </div>
      )}
    </div>
  );
}
