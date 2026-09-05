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
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">

        {/* Barra de búsqueda de texto */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por código, título, responsable, peaje, contratista o cláusula..."
            className="w-full bg-slate-50 border border-slate-200 focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-800 placeholder-slate-400 transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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
              className="bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs text-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 cursor-pointer"
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
              className="bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs text-slate-700 rounded-xl px-3 py-2.5 outline-none focus:border-[#0284c7] focus:ring-2 focus:ring-sky-200 cursor-pointer"
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
              className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Exportar registros filtrados a CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#0284c7]" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          )}

          {/* Botón Nuevo Registro */}
          <button
            onClick={onOpenNewRecordModal}
            className="px-4 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Cargar Nueva Evidencia</span>
          </button>
        </div>

      </div>

      {/* Resumen de Resultados */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 px-1">
        <div>
          Mostrando <strong className="text-slate-900 font-mono font-bold">{filteredCount}</strong> de <strong className="text-slate-900 font-mono font-bold">{totalCount}</strong> registros de evidencias auditables
        </div>
        {(searchQuery || statusFilter !== 'all' || isoClauseFilter !== 'all') && (
          <button
            onClick={() => {
              onSearchChange('');
              onStatusFilterChange('all');
              onIsoClauseFilterChange('all');
            }}
            className="text-[#0284c7] hover:underline flex items-center gap-1 text-[11px] font-bold cursor-pointer"
          >
            <X className="w-3 h-3" />
            Limpiar filtros activos
          </button>
        )}
      </div>
    </div>
  );
}
