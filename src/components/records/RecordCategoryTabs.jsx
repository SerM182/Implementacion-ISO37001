import React from 'react';
import {
  GraduationCap,
  UserCheck,
  Gift,
  FileSearch,
  AlertOctagon,
  Handshake,
  Receipt,
  HardHat,
  Layers,
  ShieldAlert,
  SearchCheck,
  Megaphone,
  Gavel,
  Target,
  Send,
  ClipboardCheck,
  TrendingUp
} from 'lucide-react';
import { RECORD_CATEGORIES } from '../../data/initialRecordsData.js';

const ICON_MAP = {
  GraduationCap,
  UserCheck,
  Gift,
  FileSearch,
  AlertOctagon,
  Handshake,
  Receipt,
  HardHat,
  ShieldAlert,
  SearchCheck,
  Megaphone,
  Gavel,
  Target,
  Send,
  ClipboardCheck,
  TrendingUp
};

export default function RecordCategoryTabs({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {}
}) {
  const totalCount = Object.values(categoryCounts).reduce((acc, curr) => acc + (curr || 0), 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Clasificación Normativa de Evidencias (Cláusula 7.5)
        </h3>
        <span className="text-[11px] text-cyan-400 font-mono">
          {RECORD_CATEGORIES.length} Tipologías Obligatorias AUBASA
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2">
        {/* Pestaña: Todos */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 hover:border-slate-700'
          }`}
        >
          <Layers className="w-5 h-5 mb-1 text-cyan-400" />
          <span className="text-xs font-bold leading-tight">Todos</span>
          <span className="mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-cyan-300">
            {totalCount}
          </span>
        </button>

        {/* Categorías */}
        {RECORD_CATEGORIES.map(cat => {
          const IconComponent = ICON_MAP[cat.iconName] || Layers;
          const count = categoryCounts[cat.id] || 0;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all relative ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 hover:border-slate-700'
              }`}
            >
              <IconComponent className={`w-4 h-4 mb-1 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span className="text-[11px] font-bold leading-tight line-clamp-1">
                {cat.shortName}
              </span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">{cat.clausulaIso}</span>
              <span className={`mt-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
