import React, { useState, useMemo } from 'react';
import RiskHeatmap3x3 from './RiskHeatmap3x3.jsx';
import RiskTable from './RiskTable.jsx';
import RiskItemModal from './RiskItemModal.jsx';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import { computeRiskStatistics } from '../../utils/riskCalculations.js';
import { ShieldCheck, AlertOctagon, PlusCircle, Layers, ArrowDownRight } from 'lucide-react';

export default function RiskMatrixView({
  risksList = [],
  onUpdateRisks
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [processFilter, setProcessFilter] = useState('Todos');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [heatmapViewType, setHeatmapViewType] = useState('residual');

  // Modal de Edición / Creación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [riskToEdit, setRiskToEdit] = useState(null);

  // Estadísticas calculadas
  const stats = useMemo(() => computeRiskStatistics(risksList), [risksList]);

  // Filtrado reactivo de la lista
  const filteredRisks = useMemo(() => {
    return risksList.filter(r => {
      // 1. Filtro de búsqueda
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchId = r.id?.toLowerCase().includes(q);
        const matchDesc = r.escenarioRiesgo?.toLowerCase().includes(q);
        const matchSub = r.subproceso?.toLowerCase().includes(q);
        const matchResp = r.responsableControl?.toLowerCase().includes(q);
        if (!matchId && !matchDesc && !matchSub && !matchResp) return false;
      }

      // 2. Filtro de Proceso
      if (processFilter !== 'Todos' && r.proceso !== processFilter) {
        return false;
      }

      // 3. Filtro de Severidad Residual
      if (severityFilter !== 'all') {
        if (r.nivelRiesgoResidual?.toLowerCase() !== severityFilter.toLowerCase()) {
          return false;
        }
      }

      // 4. Filtro por Cuadrante del Heatmap
      if (selectedQuadrant) {
        const [p, i] = selectedQuadrant.split('-').map(Number);
        const pRisk = heatmapViewType === 'inherente' ? (r.probabilidad || 1) : Math.max(1, Math.min(3, Math.ceil((r.puntajeResidual || 1) / (r.impacto || 1))));
        const iRisk = r.impacto || 1;
        if (pRisk !== p || iRisk !== i) return false;
      }

      return true;
    });
  }, [risksList, searchQuery, processFilter, severityFilter, selectedQuadrant, heatmapViewType]);

  const handleSaveRisk = (savedRisk) => {
    let updated;
    const exists = risksList.some(r => r.id === savedRisk.id);
    if (exists) {
      updated = risksList.map(r => (r.id === savedRisk.id ? savedRisk : r));
    } else {
      updated = [savedRisk, ...risksList];
    }
    onUpdateRisks(updated);
  };

  const handleDeleteRisk = (riskId) => {
    const updated = risksList.filter(r => r.id !== riskId);
    onUpdateRisks(updated);
  };

  const handleOpenNewRisk = () => {
    setRiskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditRisk = (risk) => {
    setRiskToEdit(risk);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-wide">
              Matriz de Riesgos Antisoborno (ISO 37001 Cl. 4.5 & 6.1)
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 shrink-0">
              AUBASA
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Evaluación sistemática de riesgos inherentes y residuales en Contratación, Pagos y Planificación/Ejecución de Obras Viales.
          </p>
        </div>

        <button
          onClick={handleOpenNewRisk}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          Registrar Nuevo Riesgo
        </button>
      </div>

      {/* Tarjetas KPI de Resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold uppercase">Total Riesgos</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.total}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Contratación ({stats.porProceso.Contratación || 0}) • Pagos ({stats.porProceso.Pagos || 0}) • Obras ({stats.porProceso['Obras Viales'] || 0})
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-xs font-semibold uppercase">R. Inherente Alto/Crítico</span>
            <AlertOctagon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-300">
            {(stats.inherente.critico || 0) + (stats.inherente.alto || 0)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {stats.inherente.critico || 0} Críticos • {stats.inherente.alto || 0} Altos
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-cyan-400 mb-1">
            <span className="text-xs font-semibold uppercase">R. Residual Crítico</span>
            <AlertOctagon className="w-4 h-4 text-rose-400" />
          </div>
          <div className={`text-2xl font-black ${stats.residual.critico > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
            {stats.residual.critico || 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {stats.residual.alto || 0} Altos • {stats.residual.medio || 0} Medios • {stats.residual.bajo || 0} Bajos
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
          <div className="flex items-center justify-between text-emerald-400 mb-1">
            <span className="text-xs font-semibold uppercase">Eficacia de Control</span>
            <ArrowDownRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-300">{stats.porcentajeMitigado}%</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Riesgos reducidos por controles preventivos
          </div>
        </div>
      </div>

      {/* Mapa de Calor 3x3 Interactivo */}
      <RiskHeatmap3x3
        risksList={risksList}
        selectedQuadrant={selectedQuadrant}
        onSelectQuadrant={setSelectedQuadrant}
        viewType={heatmapViewType}
        onViewTypeChange={setHeatmapViewType}
      />

      {/* Barra de Filtros y Búsqueda */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        processFilter={processFilter}
        onProcessFilterChange={setProcessFilter}
        processOptions={['Todos', 'Contratación', 'Pagos', 'Obras Viales']}
        secondaryFilter={severityFilter}
        onSecondaryFilterChange={setSeverityFilter}
        secondaryOptions={[
          { value: 'all', label: 'Severidad Residual: Todas' },
          { value: 'crítico', label: 'Solo Críticos' },
          { value: 'alto', label: 'Solo Altos' },
          { value: 'medio', label: 'Solo Medios' },
          { value: 'bajo', label: 'Solo Bajos' }
        ]}
        placeholder="Buscar por código de riesgo, escenario, subproceso o responsable..."
      />

      {/* Tabla de Riesgos */}
      <RiskTable
        risks={filteredRisks}
        onEditRisk={handleEditRisk}
        onDeleteRisk={handleDeleteRisk}
      />

      {/* Modal de Creación / Edición */}
      <RiskItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        riskToEdit={riskToEdit}
        onSave={handleSaveRisk}
      />
    </div>
  );
}
