import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileCheck,
  Edit2,
  Save,
  User,
  BookOpen,
  FileText,
  Clock,
  ShieldCheck,
  Building2,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  Copy,
  Sparkles
} from 'lucide-react';

export default function ClauseAccordion({
  items = [],
  onUpdateItem,
  viewMode = 'checklist', // 'checklist' | 'compact'
  onNavigateToPolicy,
  onNavigateToRecords,
  onNavigateToTemplate
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const all = {};
    items.forEach(item => { all[item.id] = true; });
    setExpandedItems(all);
  };

  const collapseAll = () => {
    setExpandedItems({});
  };

  const handleStartEdit = (item) => {
    setEditingItemId(item.id);
    setEditForm({
      estadoConformidad: item.estadoConformidad || 'conforme',
      observaciones: item.observaciones || '',
      accionRemedial: item.accionRemedial || '',
      responsable: item.responsable || '',
      comoLoCumpleAubasa: item.comoLoCumpleAubasa || item.evidenciaRequerida || ''
    });
  };

  const handleSaveEdit = (item) => {
    onUpdateItem({
      ...item,
      ...editForm
    });
    setEditingItemId(null);
  };

  const handleQuickStatusChange = (item, newStatus, e) => {
    e.stopPropagation();
    onUpdateItem({
      ...item,
      estadoConformidad: newStatus
    });
  };

  return (
    <div className="space-y-3.5">
      {/* Barra de control para expandir/colapsar todos */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500">
        <span className="font-semibold">
          Mostrando <strong className="text-slate-900 font-bold">{items.length}</strong> requisitos normativos ISO 37001
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={expandAll}
            className="text-[#0284c7] hover:text-sky-700 font-bold transition-colors cursor-pointer"
          >
            Expandir todos
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={collapseAll}
            className="text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer"
          >
            Colapsar todos
          </button>
        </div>
      </div>

      {items.map((item) => {
        const isExpanded = !!expandedItems[item.id];
        const isEditing = editingItemId === item.id;
        const status = item.estadoConformidad || 'conforme';

        return (
          <div
            key={item.id}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isExpanded
                ? 'bg-white border-sky-300 shadow-md ring-1 ring-sky-200/50'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            {/* Header del Requisito */}
            <div
              onClick={() => toggleExpand(item.id)}
              className="p-4 flex flex-wrap items-center justify-between gap-3 cursor-pointer select-none"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-[300px]">
                <button
                  type="button"
                  className="mt-1 text-slate-400 hover:text-slate-700 transition-colors"
                  aria-label={isExpanded ? 'Colapsar' : 'Expandir'}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-[#0284c7]" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>

                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-black text-[#0284c7] bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200 shadow-2xs">
                      Cl. {item.clausula}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                      Capítulo: {item.capitulo}
                    </span>
                    {item.poeAsociado && (
                      <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        {item.poeAsociado.split(' ')[0]}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug pt-0.5">
                    {item.requisito}
                  </h3>

                  {/* Resumen rápido visible cuando está colapsado */}
                  {!isExpanded && item.comoLoCumpleAubasa && (
                    <p className="text-xs text-slate-600 line-clamp-1 pt-0.5">
                      <span className="text-[#0284c7] font-bold">Cumplimiento BALP:</span> {item.comoLoCumpleAubasa}
                    </p>
                  )}
                </div>
              </div>

              {/* Selector Rápido de Conformidad (Auditoría) */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={(e) => handleQuickStatusChange(item, 'conforme', e)}
                    className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                      status === 'conforme'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-emerald-700'
                    }`}
                    title="Conforme (100% de cumplimiento e implementación en BALP)"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Conforme</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickStatusChange(item, 'parcial', e)}
                    className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                      status === 'parcial'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-amber-700'
                    }`}
                    title="Parcial (50% en proceso o con observaciones abiertas)"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Parcial</span>
                  </button>

                  <button
                    onClick={(e) => handleQuickStatusChange(item, 'no_conforme', e)}
                    className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all ${
                      status === 'no_conforme'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-rose-700'
                    }`}
                    title="No Conforme (0% Brecha abierta de auditoría)"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Brecha</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contenido Desplegable Exhaustivo */}
            {isExpanded && (
              <div className="p-5 pt-3 border-t border-slate-200 bg-slate-50/50 space-y-4 text-xs">
                {/* 1. ¿QUÉ EXIGE LA NORMA ISO 37001? */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                    <BookOpen className="w-4 h-4 text-slate-600" />
                    <span>1. ¿Qué exige la Norma ISO 37001:2025 (Cl. {item.clausula})?</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {item.queExigeNorma || item.descripcionNorma}
                  </p>
                </div>

                {/* 2. ¿CÓMO LO CUMPLE AUBASA EN LA CONCESIÓN BALP? */}
                <div className="bg-sky-50/90 p-4.5 rounded-xl border-l-4 border-[#0284c7] border-y border-r border-sky-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#0284c7] font-black uppercase text-[11px] tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                      <span>2. ¿Cómo lo cumple AUBASA en la Concesión BALP (50 km)?</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#0284c7] bg-white px-2 py-0.5 rounded border border-sky-300">
                      Implementación Operativa
                    </span>
                  </div>
                  <p className="text-sky-950 font-medium leading-relaxed text-xs">
                    {item.comoLoCumpleAubasa || item.evidenciaRequerida}
                  </p>
                </div>

                {/* 3. POE ASOCIADO & REGISTROS AUDITABLES OBLIGATORIOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Procedimiento / Política Oficial */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-indigo-800 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-600" />
                      3. Procedimiento Estándar (POE) / Política:
                    </span>
                    <p className="text-slate-900 font-bold text-xs">
                      {item.poeAsociado || 'MAN-SGAS-01 / POL-SGAS-01'}
                    </p>
                    {onNavigateToPolicy && (
                      <button
                        onClick={() => onNavigateToPolicy(item.poeAsociado)}
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-700 hover:text-indigo-900 font-bold pt-1 transition-colors cursor-pointer"
                      >
                        <span>Ver texto completo del POE</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Registro / Evidencia a Llevar Adelante */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-emerald-800 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      4. Registro Auditable / Plantilla en Blanco (Cl. 7.5):
                    </span>
                    <p className="text-slate-900 font-bold text-xs">
                      {item.registroObligatorio || item.evidenciaRequerida}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500 font-medium border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Frecuencia: <strong className="text-slate-700">{item.frecuenciaRegistro || 'Periódica / Eventual'}</strong>
                      </span>
                      {onNavigateToTemplate ? (
                        <button
                          onClick={() => onNavigateToTemplate(item.registroObligatorio)}
                          className="text-[#0284c7] hover:text-sky-800 font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Ver Plantilla Oficial</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : onNavigateToRecords ? (
                        <button
                          onClick={() => onNavigateToRecords(item.clausula)}
                          className="text-emerald-700 hover:text-emerald-900 font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Ver Registros (Cl. 7.5)</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* 4. MODO DE EDICIÓN O RESUMEN DE AUDITORÍA */}
                {isEditing ? (
                  <div className="bg-white border border-sky-300 rounded-xl p-4.5 space-y-3 mt-3 shadow-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-bold text-slate-900 text-xs">Editar Hallazgos de Auditoría Interna</span>
                      <span className="text-[10px] font-mono font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        Cláusula {item.clausula}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Estado de Conformidad</label>
                        <select
                          value={editForm.estadoConformidad}
                          onChange={(e) => setEditForm({ ...editForm, estadoConformidad: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-[#0284c7] focus:outline-hidden"
                        >
                          <option value="conforme">Conforme (100% de cumplimiento)</option>
                          <option value="parcial">Parcial (50% con observaciones)</option>
                          <option value="no_conforme">No Conforme (0% brecha abierta)</option>
                          <option value="no_aplica">No Aplica</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Responsable Designado</label>
                        <input
                          type="text"
                          value={editForm.responsable}
                          onChange={(e) => setEditForm({ ...editForm, responsable: e.target.value })}
                          placeholder="Ej: Oficial de Cumplimiento / Gerencia Técnica"
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:ring-1 focus:ring-[#0284c7] focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Observaciones / Evidencias Verificadas en BALP</label>
                      <textarea
                        rows={2}
                        value={editForm.observaciones}
                        onChange={(e) => setEditForm({ ...editForm, observaciones: e.target.value })}
                        placeholder="Detalle el estado de las evidencias revisadas en auditoría..."
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-1 focus:ring-[#0284c7] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Acción Remedial para Cerrar la Brecha (CAPA Cl. 10.1)</label>
                      <textarea
                        rows={2}
                        value={editForm.accionRemedial}
                        onChange={(e) => setEditForm({ ...editForm, accionRemedial: e.target.value })}
                        placeholder="Plan de acción y fecha límite de adecuación..."
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:ring-1 focus:ring-[#0284c7] focus:outline-hidden"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingItemId(null)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(item)}
                        className="px-4 py-1.5 bg-[#0284c7] hover:bg-sky-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Guardar Hallazgos
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-slate-500 font-semibold text-[10px] uppercase block mb-1">
                          Observaciones de Auditoría:
                        </span>
                        <p className="text-slate-800 leading-relaxed text-xs">
                          {item.observaciones || 'Sin observaciones registradas.'}
                        </p>
                      </div>

                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-amber-700 font-semibold text-[10px] uppercase block mb-1">
                          Acción Remedial Requerida:
                        </span>
                        <p className="text-slate-800 leading-relaxed text-xs">
                          {item.accionRemedial || 'Ninguna acción pendiente. Requisito estabilizado.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200 text-[11px] text-slate-500 gap-2">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Responsable Operativo: <strong className="text-slate-800">{item.responsable || 'Oficial de Cumplimiento'}</strong></span>
                      </div>

                      <button
                        onClick={() => handleStartEdit(item)}
                        className="flex items-center gap-1 text-[#0284c7] hover:text-sky-800 font-bold transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>Editar Diagnóstico / Auditoría</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
