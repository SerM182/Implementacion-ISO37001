import React, { useState, useMemo } from 'react';
import { COMPLIANCE_KNOWLEDGE_BASE } from '../../data/complianceKnowledgeBase.js';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import {
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Award,
  AlertOctagon,
  Scale,
  Sparkles
} from 'lucide-react';

export default function QuickScenarioCards() {
  const scenarios = COMPLIANCE_KNOWLEDGE_BASE.escenariosFrecuentes || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState(null);

  const categories = useMemo(() => {
    const list = Array.from(new Set(scenarios.map(s => s.categoria).filter(Boolean)));
    return ['all', ...list];
  }, [scenarios]);

  const filteredScenarios = useMemo(() => {
    return scenarios.filter(s => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.titulo?.toLowerCase().includes(q);
        const matchSit = s.situacion?.toLowerCase().includes(q);
        const matchDict = s.dictamen?.toLowerCase().includes(q);
        const matchCat = s.categoria?.toLowerCase().includes(q);
        if (!matchTitle && !matchSit && !matchDict && !matchCat) return false;
      }

      if (categoryFilter !== 'all') {
        if (s.categoria !== categoryFilter) return false;
      }

      return true;
    });
  }, [scenarios, searchQuery, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        secondaryFilter={categoryFilter}
        onSecondaryFilterChange={setCategoryFilter}
        secondaryOptions={[
          { value: 'all', label: 'Categorías: Todas' },
          ...categories.filter(c => c !== 'all').map(c => ({ value: c, label: c }))
        ]}
        placeholder="Buscar escenario por situación, proceso, dictamen o palabra clave..."
      />

      {/* Grid de Escenarios */}
      {filteredScenarios.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center">
          <ShieldAlert className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-slate-300">No se encontraron casos prácticos</h4>
          <p className="text-xs text-slate-500 mt-1">
            Ajuste el criterio de búsqueda o el filtro de categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredScenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {scenario.categoria}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{scenario.id}</span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2 leading-snug">
                  {scenario.titulo}
                </h3>

                {/* Situación planteada */}
                <div className="mt-3 bg-slate-950/70 border border-slate-800/80 rounded-lg p-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Situación en Operación / Obra Vial:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{scenario.situacion}"
                  </p>
                </div>

                {/* Dictamen y resolución */}
                <div className="mt-3 bg-slate-950/90 border-l-4 border-cyan-500 rounded-r-lg p-3">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                    Dictamen Técnico de Compliance:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {scenario.dictamen}
                  </p>
                </div>
              </div>

              {/* Cláusulas aplicables */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] text-slate-500 font-semibold">Cláusulas:</span>
                {scenario.clausulas?.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-slate-950 text-slate-300 border border-slate-800 rounded text-[10px] font-mono"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
