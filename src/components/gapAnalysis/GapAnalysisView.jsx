import React, { useState, useMemo } from 'react';
import ClauseAccordion from './ClauseAccordion.jsx';
import RoadmapTimeline from '../dashboard/RoadmapTimeline.jsx';
import BlankTemplatesViewer, { BLANK_TEMPLATES_DATA } from '../records/BlankTemplatesViewer.jsx';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import { calculateGapMaturity } from '../../utils/gapAnalysisScoring.js';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  FileCheck2,
  Layers,
  Award,
  AlertOctagon,
  ArrowUpRight,
  ClipboardList,
  CheckSquare,
  Printer,
  Download,
  BookOpen,
  Sparkles,
  Calendar,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Building2,
  TrendingUp
} from 'lucide-react';

export default function GapAnalysisView({
  gapItems = [],
  onUpdateGapItems,
  roadmapPhases = [],
  onUpdatePhases,
  onNavigateToPolicy,
  onNavigateToRecords
}) {
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'roadmap' | 'templates' | 'maturity' | 'poes'
  const [searchQuery, setSearchQuery] = useState('');
  const [chapterFilter, setChapterFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Cálculos de madurez y preparación
  const maturity = useMemo(() => calculateGapMaturity(gapItems), [gapItems]);

  // Lista de capítulos únicos
  const chapters = useMemo(() => {
    const list = Array.from(new Set(gapItems.map(i => i.capitulo).filter(Boolean)));
    return ['all', ...list];
  }, [gapItems]);

  // Filtrado reactivo de items
  const filteredItems = useMemo(() => {
    return gapItems.filter(item => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchReq = item.requisito?.toLowerCase().includes(q);
        const matchClause = item.clausula?.toLowerCase().includes(q);
        const matchChap = item.capitulo?.toLowerCase().includes(q);
        const matchNorma = item.queExigeNorma?.toLowerCase().includes(q) || item.descripcionNorma?.toLowerCase().includes(q);
        const matchAubasa = item.comoLoCumpleAubasa?.toLowerCase().includes(q) || item.evidenciaRequerida?.toLowerCase().includes(q);
        const matchPoe = item.poeAsociado?.toLowerCase().includes(q);
        const matchReg = item.registroObligatorio?.toLowerCase().includes(q);
        const matchObs = item.observaciones?.toLowerCase().includes(q);
        if (!matchReq && !matchClause && !matchChap && !matchNorma && !matchAubasa && !matchPoe && !matchReg && !matchObs) return false;
      }

      if (chapterFilter !== 'all') {
        if (item.capitulo !== chapterFilter) return false;
      }

      if (statusFilter !== 'all') {
        if (item.estadoConformidad !== statusFilter) return false;
      }

      return true;
    });
  }, [gapItems, searchQuery, chapterFilter, statusFilter]);

  const handleUpdateItem = (updatedItem) => {
    const nextItems = gapItems.map(i => (i.id === updatedItem.id ? updatedItem : i));
    onUpdateGapItems(nextItems);
  };

  const handleExportMarkdown = () => {
    const markdown = `# CHECKLIST MAESTRO DE REQUISITOS ISO 37001:2025 - AUBASA
**Alcance:** Concesión Autopista Buenos Aires - La Plata (BALP - 50 km)
**Fecha de Generación:** ${new Date().toLocaleDateString('es-AR')}
**Nivel de Conformidad Global:** ${maturity.overallPercentage}% (${maturity.readinessVerdict})

---

${gapItems.map((item, idx) => `
### ${idx + 1}. Cláusula ${item.clausula}: ${item.requisito}
- **Capítulo:** ${item.capitulo}
- **Estado de Conformidad:** ${item.estadoConformidad ? item.estadoConformidad.toUpperCase() : 'CONFORME'}
- **¿Qué exige la norma ISO 37001?:** ${item.queExigeNorma || item.descripcionNorma || '-'}
- **¿Cómo lo cumple AUBASA en BALP?:** ${item.comoLoCumpleAubasa || item.evidenciaRequerida || '-'}
- **Procedimiento / POE Asociado:** ${item.poeAsociado || 'MAN-SGAS-01'}
- **Registro Obligatorio (Cl. 7.5):** ${item.registroObligatorio || '-'} (Frecuencia: ${item.frecuenciaRegistro || 'Periódica'})
- **Responsable:** ${item.responsable || 'Oficial de Cumplimiento'}
- **Observaciones:** ${item.observaciones || 'Sin observaciones'}
- **Acción Remedial:** ${item.accionRemedial || 'Ninguna acción pendiente'}
`).join('\n---\n')}
`;

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AUBASA_Checklist_Maestro_ISO37001_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Listado de POEs para la solapa de Procedimientos
  const poesList = [
    { codigo: 'POE-SGAS-01', titulo: 'Procedimiento de Evaluación de Riesgos y Controles Antisoborno', clausula: 'Cl. 4.5 & 8.5', area: 'Oficial de Cumplimiento & Gerencias' },
    { codigo: 'POE-SGAS-02', titulo: 'Debida Diligencia de Contratistas, Socios de Negocios y Proveedores', clausula: 'Cl. 8.2 & 8.6', area: 'Compras, Licitaciones y Cumplimiento' },
    { codigo: 'POE-SGAS-03', titulo: 'Controles Financieros, Doble Firma y Pagos Bancarios', clausula: 'Cl. 8.3', area: 'Administración y Finanzas / Tesorería' },
    { codigo: 'POE-SGAS-04', titulo: 'Controles en Recaudación y Arqueos en Estaciones de Peaje (Hudson y Dock Sud)', clausula: 'Cl. 8.4', area: 'Operaciones & Supervisión de Peajes' },
    { codigo: 'POE-SGAS-05', titulo: 'Gestión y Certificación de Obras Viales y Ensayos Técnicos de Laboratorio', clausula: 'Cl. 8.4 & 8.5', area: 'Gerencia de Obras Viales & LEMIT / UNLP' },
    { codigo: 'POE-SGAS-06', titulo: 'Política de Regalos, Hospitalidad, Donaciones y Patrocinios', clausula: 'Cl. 8.7', area: 'Todo el Personal AUBASA BALP' },
    { codigo: 'POE-SGAS-07', titulo: 'Gestión de Denuncias, Protección al Informante e Investigaciones (37002 / 37008)', clausula: 'Cl. 8.9 & 8.10', area: 'Canal Ético & Comité de Integridad' },
    { codigo: 'POE-SGAS-08', titulo: 'Gestión de No Conformidades y Acciones Correctivas (CAPA)', clausula: 'Cl. 10.1', area: 'Calidad & Oficial de Cumplimiento' },
    { codigo: 'POE-SGAS-09', titulo: 'Programa de Auditorías Internas y Revisión por la Dirección', clausula: 'Cl. 9.2 & 9.3', area: 'Directorio & Equipo Auditor SGAS' },
    { codigo: 'POE-SGAS-10', titulo: 'Capacitación, Concientización y Declaraciones de Conflicto de Intereses', clausula: 'Cl. 7.2 & 7.3', area: 'Recursos Humanos & Cumplimiento' }
  ];

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-wide">
              Checklist Maestro, Ruta Paso a Paso & Plantillas Oficiales
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-[#0284c7] border border-sky-200">
                ISO 37001 (4.1 a 10.2)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                BALP (50 km)
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Asistente paso a paso para implementar la Norma ISO 37001 en AUBASA. Consulte cómo cumplir cada requisito, gestione el cronograma de 6 fases y acceda a las {BLANK_TEMPLATES_DATA.length} plantillas oficiales en blanco.
          </p>
        </div>

        {/* Botón Exportar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-[#0284c7] border border-sky-200 hover:border-sky-300 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#0284c7]" />
            <span>Exportar Checklist .MD</span>
          </button>
        </div>
      </div>

      {/* Selector de 5 Solapas Claras y Visibles */}
      <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'checklist'
              ? 'bg-[#0284c7] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>1. Requisitos: ¿Cómo lo Cumplo?</span>
          <span className={`px-1.5 py-0.2 text-[10px] rounded font-mono ${
            activeTab === 'checklist' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            {gapItems.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'roadmap'
              ? 'bg-[#0284c7] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>2. Ruta Paso a Paso (6 Fases)</span>
        </button>

        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'templates'
              ? 'bg-[#0284c7] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>3. Plantillas y Registros en Blanco</span>
          <span className={`px-1.5 py-0.2 text-[10px] rounded font-mono font-bold ${
            activeTab === 'templates' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {BLANK_TEMPLATES_DATA.length} REC
          </span>
        </button>

        <button
          onClick={() => setActiveTab('maturity')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'maturity'
              ? 'bg-[#0284c7] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>4. Diagnóstico de Madurez de Certificación</span>
          <span className={`px-1.5 py-0.2 text-[10px] rounded font-mono ${
            activeTab === 'maturity' ? 'bg-white/20 text-white' : 'bg-sky-100 text-[#0284c7]'
          }`}>
            {maturity.overallPercentage}%
          </span>
        </button>

        <button
          onClick={() => setActiveTab('poes')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'poes'
              ? 'bg-[#0284c7] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>5. Procedimientos (POEs)</span>
        </button>
      </div>

      {/* SOLAPA 1: CHECKLIST REQUISITOS "¿CÓMO LO CUMPLO?" */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {/* Banner Resumen de Madurez y Dictamen */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg border ${
                maturity.overallPercentage >= 85
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : maturity.overallPercentage >= 65
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}>
                {maturity.overallPercentage}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Dictamen de Conformidad ISO 37001:
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-sky-50 text-[#0284c7] border border-sky-200">
                    BALP 50 KM
                  </span>
                </div>
                <p className="text-sm font-black text-slate-900 mt-0.5">
                  {maturity.readinessVerdict}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-600 block font-mono font-semibold">
                {maturity.conformeCount} Conformes • {maturity.parcialCount} Parciales • {maturity.noConformeCount} Brechas
              </span>
              <div className="w-52 bg-slate-200 rounded-full h-2 mt-1.5 border border-slate-300 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    maturity.overallPercentage >= 85 ? 'bg-emerald-500' :
                    maturity.overallPercentage >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${maturity.overallPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            processFilter={chapterFilter}
            onProcessFilterChange={setChapterFilter}
            processOptions={['all', ...chapters.filter(c => c !== 'all')]}
            secondaryFilter={statusFilter}
            onSecondaryFilterChange={setStatusFilter}
            secondaryOptions={[
              { value: 'all', label: 'Estado: Todos' },
              { value: 'conforme', label: 'Conformes (100%)' },
              { value: 'parcial', label: 'Parciales (50%)' },
              { value: 'no_conforme', label: 'Brechas (0%)' }
            ]}
            placeholder="Buscar por cláusula, requisito, cumplimiento BALP, POE o registro..."
          />

          {/* Acordeón de Requisitos */}
          {filteredItems.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
              <FileCheck2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-slate-800">No se encontraron requisitos coincidentes</h4>
              <p className="text-xs text-slate-500 mt-1">
                Ajuste los criterios de búsqueda o desmarque los filtros de capítulo o estado.
              </p>
            </div>
          ) : (
            <ClauseAccordion
              items={filteredItems}
              onUpdateItem={handleUpdateItem}
              viewMode="checklist"
              onNavigateToPolicy={onNavigateToPolicy}
              onNavigateToRecords={onNavigateToRecords}
              onNavigateToTemplate={() => setActiveTab('templates')}
            />
          )}
        </div>
      )}

      {/* SOLAPA 2: RUTA PASO A PASO (6 FASES HACIA LA CERTIFICACIÓN) */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3 text-xs text-sky-950">
            <ShieldCheck className="w-5 h-5 text-[#0284c7] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-sky-900 block mb-0.5">
                Metodología de Implementación Progresiva para AUBASA BALP (50 km):
              </strong>
              Siga cada una de las 6 fases estratégicas. Haga click en cada fase para desplegar sus objetivos normativos, entregables clave y responsables. Puede marcar con un click cada entregable completado para actualizar el progreso general.
            </div>
          </div>

          <RoadmapTimeline
            phases={roadmapPhases}
            onUpdatePhases={onUpdatePhases}
          />
        </div>
      )}

      {/* SOLAPA 3: PLANTILLAS Y REGISTROS EN BLANCO */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-950">
            <FileCheck2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-emerald-900 block mb-0.5">
                Repositorio Oficial de Formularios y Plantillas en Blanco (Cl. 7.5):
              </strong>
              Aquí dispone de los {BLANK_TEMPLATES_DATA.length} registros maestros oficiales con encabezado oficial de AUBASA S.A. y campos listos para completar. Puede <strong>Copiar el Formato</strong> al portapapeles, <strong>Descargar en Texto (.txt)</strong> o <strong>Imprimir</strong> el documento oficial.
            </div>
          </div>

          <BlankTemplatesViewer />
        </div>
      )}

      {/* SOLAPA 4: DIAGNÓSTICO DE MADUREZ & AUDITORÍA DE CERTIFICACIÓN */}
      {activeTab === 'maturity' && (
        <div className="space-y-6">
          {/* Tarjetas KPI de Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-bold uppercase">Total Requisitos</span>
                <Layers className="w-4 h-4 text-[#0284c7]" />
              </div>
              <div className="text-2xl font-black text-slate-900">{maturity.totalItems}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Cláusulas 4.1 a 10.2</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <span className="text-xs font-bold uppercase">Conformes (100%)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700">{maturity.conformeCount}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Evidencias operativas en BALP</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-amber-700 mb-1">
                <span className="text-xs font-bold uppercase">Parciales (50%)</span>
                <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700">{maturity.parcialCount}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">En proceso de calibración</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-rose-700 mb-1">
                <span className="text-xs font-bold uppercase">Brechas (0%)</span>
                <XCircle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700">{maturity.noConformeCount}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Requisitos pendientes</div>
            </div>
          </div>

          {/* Desglose de Madurez por Capítulos ISO 37001 */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0284c7]" />
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Cumplimiento Normativo por Capítulo ISO 37001
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                Auditoría de Certificación
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(maturity.byChapter).map(([chapterName, chapData]) => (
                <div
                  key={chapterName}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 line-clamp-1">{chapterName}</span>
                    <span className="font-mono text-[#0284c7]">{chapData.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full ${
                        chapData.percentage >= 85 ? 'bg-emerald-500' :
                        chapData.percentage >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${chapData.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{chapData.total} {chapData.total === 1 ? 'requisito' : 'requisitos'}</span>
                    <span>{chapData.conforme} conformes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SOLAPA 5: PROCEDIMIENTOS ESTÁNDAR (POES) */}
      {activeTab === 'poes' && (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3 text-xs text-indigo-950">
            <BookOpen className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-indigo-900 block mb-0.5">
                Procedimientos Operativos Estándar (POEs) y Manual SGAS AUBASA:
              </strong>
              Los 10 procedimientos obligatorios que rigen la operación en los 50 km de la Autopista BALP, estaciones de peaje Hudson y Dock Sud, comisiones de compra y obras viales.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {poesList.map((poe) => (
              <div
                key={poe.codigo}
                className="bg-white border border-slate-200 hover:border-sky-300 rounded-xl p-5 shadow-sm space-y-3 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {poe.codigo}
                    </span>
                    <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      {poe.clausula}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {poe.titulo}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2">
                    Área Responsable: <strong className="text-slate-700">{poe.area}</strong>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">Estado: Vigente y Aprobado</span>
                  {onNavigateToPolicy && (
                    <button
                      onClick={() => onNavigateToPolicy(poe.codigo)}
                      className="text-[#0284c7] hover:text-sky-800 font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Ver POE Completo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
