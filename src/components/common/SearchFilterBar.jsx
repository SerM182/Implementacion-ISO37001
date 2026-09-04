import React from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function SearchFilterBar({
  searchQuery,
  onSearchChange,
  processFilter,
  onProcessFilterChange,
  processOptions = ['Todos', 'Contratación', 'Pagos', 'Obras Viales'],
  secondaryFilter,
  onSecondaryFilterChange,
  secondaryOptions = [],
  placeholder = 'Buscar por palabra clave, ID o descripción...'
}) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center gap-3 shadow-md">
      {/* Input de Búsqueda */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-950 border border-slate-700/80 rounded-lg pl-9 pr-8 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filtro por Proceso */}
      {processFilter !== undefined && (
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={processFilter}
            onChange={(e) => onProcessFilterChange(e.target.value)}
            className="bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {processOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-slate-900">
                Proceso: {opt}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filtro Secundario (Severidad, Nivel, etc) */}
      {secondaryFilter !== undefined && secondaryOptions.length > 0 && (
        <select
          value={secondaryFilter}
          onChange={(e) => onSecondaryFilterChange(e.target.value)}
          className="bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-cyan-500"
        >
          {secondaryOptions.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
