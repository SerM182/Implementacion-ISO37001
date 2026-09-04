import React, { useState, useMemo } from 'react';
import PolicyEditorPreview from './PolicyEditorPreview.jsx';
import ClausePackBuilder from './ClausePackBuilder.jsx';
import OperationalRecordsGuide from '../policies/OperationalRecordsGuide.jsx';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import {
  FileText,
  BookOpen,
  PlusCircle,
  FileCode,
  Printer,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Download,
  FolderCheck,
  ClipboardList
} from 'lucide-react';

export default function PolicySuiteView({
  policiesList = [],
  onUpdatePolicies,
  onNavigateToRecords
}) {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'catalog'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modales
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isClauseBuilderOpen, setIsClauseBuilderOpen] = useState(false);

  // Lista de categorías únicas
  const categories = useMemo(() => {
    const set = new Set(policiesList.map(p => p.categoria).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [policiesList]);

  // Lista filtrada
  const filteredPolicies = useMemo(() => {
    return policiesList.filter(p => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.titulo?.toLowerCase().includes(q);
        const matchCode = p.codigo?.toLowerCase().includes(q);
        const matchIso = p.clausulaIso?.toLowerCase().includes(q);
        const matchDesc = p.descripcion?.toLowerCase().includes(q);
        if (!matchTitle && !matchCode && !matchIso && !matchDesc) return false;
      }

      if (categoryFilter !== 'all') {
        if (p.categoria !== categoryFilter) return false;
      }

      return true;
    });
  }, [policiesList, searchQuery, categoryFilter]);

  const handleSavePolicy = (updatedPolicy) => {
    const updatedList = policiesList.map(p => (p.id === updatedPolicy.id ? updatedPolicy : p));
    onUpdatePolicies(updatedList);
    setSelectedPolicy(updatedPolicy);
  };

  const handleDownloadAllMarkdown = () => {
    const fullText = policiesList.map(p => `=== ${p.codigo}: ${p.titulo} (${p.clausulaIso}) ===\n\n${p.contenidoMarkdown}`).join('\n\n\n============================================================\n\n\n');
    const element = document.createElement('a');
    const file = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `COMPENDIO_POLITICAS_SGAS_AUBASA_ISO37001.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-white tracking-wide">
              Suite de Políticas y Procedimientos Oficiales del SGAS
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              ISO 37001:2016
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Documentos controlados, protocolos operacionales y cláusulas anticorrupción para pliegos de AUBASA.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsClauseBuilderOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800/60 rounded-xl text-xs font-bold transition-all"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            Generador de Cláusulas para Pliegos
          </button>

          <button
            onClick={handleDownloadAllMarkdown}
            className="flex items-center gap-2 px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-950 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            Descargar Compendio .MD
          </button>
        </div>
      </div>

      {/* Selector de Modo de Visualización (Guía Operativa vs Catálogo de Documentos) */}
      <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-fit shadow-md">
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'guide'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderCheck className="w-4 h-4" />
          <span>Guía Maestra de Registros & POEs</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-white/20 text-white font-mono">
            12 Registros / 10 POEs
          </span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'catalog'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo y Editor de POEs & Manual</span>
          <span className="px-1.5 py-0.2 text-[10px] rounded bg-white/20 text-white font-mono">
            {policiesList.length}
          </span>
        </button>
      </div>

      {/* VISTA 1: GUÍA MAESTRA DE REGISTROS A LLEVAR ADELANTE & POES */}
      {activeTab === 'guide' ? (
        <OperationalRecordsGuide
          onNavigateToRecords={onNavigateToRecords}
          onNavigateToPolicy={(poeCode) => {
            const found = policiesList.find(p => p.codigo === poeCode);
            if (found) {
              setSelectedPolicy(found);
            } else {
              setActiveTab('catalog');
            }
          }}
        />
      ) : (
        <>
          {/* Tarjetas de Resumen Rápido */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-xs font-semibold uppercase">Documentos Oficiales</span>
                <BookOpen className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">{policiesList.length}</div>
              <div className="text-[11px] text-slate-400 mt-1">Políticas, protocolos y manuales</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between text-emerald-400 mb-1">
                <span className="text-xs font-semibold uppercase">Gobernanza & Política</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-300">Cl. 5.2 / 5.3</div>
              <div className="text-[11px] text-slate-400 mt-1">Aprobadas por Directorio</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between text-amber-400 mb-1">
                <span className="text-xs font-semibold uppercase">Controles Operacionales</span>
                <Layers className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-300">Cl. 8.2 / 8.3 / 8.4</div>
              <div className="text-[11px] text-slate-400 mt-1">Compras, pagos y obras viales</div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-md">
              <div className="flex items-center justify-between text-cyan-400 mb-1">
                <span className="text-xs font-semibold uppercase">Canal Ético & Cláusulas</span>
                <Award className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-cyan-300">Cl. 8.6 / 8.9</div>
              <div className="text-[11px] text-slate-400 mt-1">Línea 0800 y pliegos de licitación</div>
            </div>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            secondaryFilter={categoryFilter}
            onSecondaryFilterChange={setCategoryFilter}
            secondaryOptions={[
              { value: 'all', label: 'Categorías: Todas' },
              ...categories.filter(c => c !== 'all').map(c => ({ value: c, label: c }))
            ]}
            placeholder="Buscar documento por código, título, cláusula ISO o descripción..."
          />

          {/* Grid de Tarjetas de Políticas */}
          {filteredPolicies.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center">
              <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-slate-300">No se encontraron documentos</h4>
              <p className="text-xs text-slate-500 mt-1">
                Ajuste el texto de búsqueda o el filtro de categoría.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPolicies.map((policy) => (
                <div
                  key={policy.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {policy.codigo}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                          {policy.clausulaIso}
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {policy.categoria}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mt-3 leading-snug">
                      {policy.titulo}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {policy.descripcion}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      ISO 37001 & Ley 27.401
                    </span>

                    <button
                      onClick={() => setSelectedPolicy(policy)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600/90 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ver y Editar Documento</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal de Previsualización y Edición */}
      <PolicyEditorPreview
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        policy={selectedPolicy}
        onSavePolicy={handleSavePolicy}
      />

      {/* Modal del Generador de Cláusulas Contractuales */}
      <ClausePackBuilder
        isOpen={isClauseBuilderOpen}
        onClose={() => setIsClauseBuilderOpen(false)}
      />
    </div>
  );
}
