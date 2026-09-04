import React from 'react';
import { Search, Plus, Filter, X, Download } from 'lucide-react';

export default function RecordsFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  isoClauseFilter,
  onIsoClauseFilterChange,
  onOpenNewRecordModal,
  onExportCsv,
  filteredCount,
  totalCount
}) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

        {/* Barra de búsqueda de texto */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por código, título, responsable, peaje, contratista o cláusula..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filtro por Estado */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              aria-label="Filtrar por estado de verificación"
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">Todos los Estados</option>
              <option value="verificado">Verificado / Conforme</option>
              <option value="en_revision">En Revisión Técnica</option>
              <option value="observado">Con Observaciones</option>
            </select>
          </div>

          {/* Filtro por Cláusula ISO */}
          <div className="relative">
            <select
              value={isoClauseFilter}
              onChange={(e) => onIsoClauseFilterChange(e.target.value)}
              aria-label="Filtrar por cláusula ISO 37001"
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">Todas las Cláusulas ISO</option>
              <option value="4.5">Cl. 4.5 Evaluación de Riesgos</option>
              <option value="6.1">Cl. 6.1 Acciones para Tratar Riesgos</option>
              <option value="6.2">Cl. 6.2 Objetivos Antisoborno</option>
              <option value="7.2">Cl. 7.2 Competencia & DDJJ</option>
              <option value="7.3">Cl. 7.3 Toma de Conciencia</option>
              <option value="7.4">Cl. 7.4 Comunicación</option>
              <option value="8.2">Cl. 8.2 Debida Diligencia</option>
              <option value="8.3">Cl. 8.3 Controles Financieros</option>
              <option value="8.4">Cl. 8.4 Controles No Financieros / Obras</option>
              <option value="8.6">Cl. 8.6 Compromisos Antisoborno</option>
              <option value="8.7">Cl. 8.7 Regalos & Hospitalidad</option>
              <option value="8.9">Cl. 8.9 Canal Ético / Denuncias</option>
              <option value="8.10">Cl. 8.10 Investigaciones</option>
              <option value="9.1">Cl. 9.1 Seguimiento y Medición</option>
              <option value="9.2">Cl. 9.2 Auditoría Interna</option>
              <option value="9.3">Cl. 9.3 Revisión por la Dirección</option>
              <option value="9.4">Cl. 9.4 Revisión Función de Cumplimiento</option>
              <option value="10.1">Cl. 10.1 No Conformidad & CAPA</option>
              <option value="10.2">Cl. 10.2 Acciones Correctivas</option>
            </select>
          </div>

          {/* Botón Exportar CSV */}
          {onExportCsv && (
            <button
              onClick={onExportCsv}
              className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Exportar registros filtrados a CSV"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          )}

          {/* Botón Nuevo Registro */}
          <button
            onClick={onOpenNewRecordModal}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Cargar Nueva Evidencia</span>
          </button>
        </div>

      </div>

      {/* Resumen de Resultados */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2 px-1">
        <div>
          Mostrando <strong className="text-white font-mono">{filteredCount}</strong> de <strong className="text-white font-mono">{totalCount}</strong> registros de evidencias auditables
        </div>
        {(searchQuery || statusFilter !== 'all' || isoClauseFilter !== 'all') && (
          <button
            onClick={() => {
              onSearchChange('');
              onStatusFilterChange('all');
              onIsoClauseFilterChange('all');
            }}
            className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px]"
          >
            <X className="w-3 h-3" />
            Limpiar filtros activos
          </button>
        )}
      </div>
    </div>
  );
}
