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
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Clasificación Normativa de Evidencias (Cláusula 7.5)
        </h3>
        <span className="text-[11px] text-[#0284c7] font-mono font-bold">
          {RECORD_CATEGORIES.length} Tipologías Obligatorias AUBASA
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-2">
        {/* Pestaña: Todos */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#0284c7] border-[#0284c7] text-white shadow-sm ring-2 ring-sky-300'
              : 'bg-white border-slate-200 text-slate-700 hover:text-[#0284c7] hover:bg-slate-50'
          }`}
        >
          <Layers className={`w-5 h-5 mb-1 ${selectedCategory === 'all' ? 'text-white' : 'text-[#0284c7]'}`} />
          <span className="text-xs font-bold leading-tight">Todos</span>
          <span className={`mt-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
            selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-800'
          }`}>
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
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all relative cursor-pointer ${
                isSelected
                  ? 'bg-sky-50 border-[#0284c7] text-sky-950 shadow-sm ring-2 ring-sky-300'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <IconComponent className={`w-4 h-4 mb-1 ${isSelected ? 'text-[#0284c7]' : 'text-slate-500'}`} />
              <span className="text-[11px] font-bold leading-tight line-clamp-1">
                {cat.shortName}
              </span>
              <span className="text-[9px] text-slate-500 font-mono mt-0.5">{cat.clausulaIso}</span>
              <span className={`mt-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                isSelected ? 'bg-sky-200 text-sky-900 border border-sky-300' : 'bg-slate-100 text-slate-600'
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
