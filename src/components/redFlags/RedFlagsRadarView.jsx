import React, { useState, useMemo } from 'react';
import WhistleblowingPortal from './WhistleblowingPortal.jsx';
import WhistleblowingAdminHub from './WhistleblowingAdminHub.jsx';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import {
  Radar,
  ShieldAlert,
  Lock,
  Scale,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  FileText,
  Search,
  Building2,
  HelpCircle
} from 'lucide-react';

export default function RedFlagsRadarView({
  redFlags = [],
  whistleblowingReports = [],
  onUpdateReports,
  onCreateReport
}) {
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' | 'portal' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [processFilter, setProcessFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Filtrado de Red Flags
  const filteredFlags = useMemo(() => {
    return redFlags.filter(rf => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchAlert = rf.alerta?.toLowerCase().includes(q);
        const matchDesc = rf.descripcion?.toLowerCase().includes(q);
        const matchCat = rf.categoria?.toLowerCase().includes(q);
        const matchProc = rf.proceso?.toLowerCase().includes(q);
        const matchMed = rf.medidaInmediata?.toLowerCase().includes(q);
        if (!matchAlert && !matchDesc && !matchCat && !matchProc && !matchMed) return false;
      }

      if (processFilter !== 'all') {
        if (rf.proceso !== processFilter) return false;
      }

      if (severityFilter !== 'all') {
        if (rf.severidad !== severityFilter) return false;
      }

      return true;
    });
  }, [redFlags, searchQuery, processFilter, severityFilter]);

  const handleUpdateSingleReport = (updatedReport) => {
    const nextList = whistleblowingReports.map(r => r.id === updatedReport.id ? updatedReport : r);
    onUpdateReports(nextList);
  };

  const handleCreateSingleReport = (newReport) => {
    onCreateReport(newReport);
  };

  const openCasesCount = whistleblowingReports.filter(r => r.estado !== 'cerrada').length;

  return (
    <div className="space-y-6">
      {/* Header del Módulo */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-wide">
              Canal Ético, Investigaciones Forenses & Radar Red Flags
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-[#0284c7] border border-sky-200">
                ISO 37001 (8.9/8.10)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                UNE-ISO 37002
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                ISO/TS 37008
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Plataforma integral de detección de irregularidades, recepción segura de denuncias y conducción pericial de investigaciones bajo estándares internacionales.
          </p>
        </div>

        {/* Pestañas de Navegación del Módulo */}
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'radar'
                ? 'bg-[#0284c7] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Radar className="w-4 h-4" />
            <span>Radar Red Flags ({redFlags.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('portal')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'portal'
                ? 'bg-[#0284c7] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Canal Denuncias (ISO 37002)</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all relative ${
              activeTab === 'admin'
                ? 'bg-[#0284c7] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Gestión & Investigaciones (37008)</span>
            {openCasesCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            )}
          </button>
        </div>
      </div>

      {/* Contenido según pestaña */}
      {activeTab === 'radar' && (
        <div className="space-y-6">
          {/* Tarjetas KPI de Red Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span className="text-xs font-bold uppercase">Total Indicadores</span>
                <Radar className="w-4 h-4 text-[#0284c7]" />
              </div>
              <div className="text-2xl font-black text-slate-900">{redFlags.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Alertas operativas catalogadas</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-rose-600 mb-1">
                <span className="text-xs font-bold uppercase">Severidad Alta (Críticas)</span>
                <AlertOctagon className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl font-black text-rose-700">
                {redFlags.filter(r => r.severidad === 'alta').length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Exigen intervención inmediata</div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-sm">
              <div className="flex items-center justify-between text-amber-600 mb-1">
                <span className="text-xs font-bold uppercase">Severidad Media</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700">
                {redFlags.filter(r => r.severidad === 'media').length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Requieren auditoría o revisión</div>
            </div>
          </div>

          {/* Barra de Búsqueda y Filtros */}
          <SearchFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            processFilter={processFilter}
            onProcessFilterChange={setProcessFilter}
            processOptions={['all', 'Contratación', 'Pagos', 'Obras Viales']}
            secondaryFilter={severityFilter}
            onSecondaryFilterChange={setSeverityFilter}
            secondaryOptions={[
              { value: 'all', label: 'Severidad: Todas' },
              { value: 'alta', label: 'Severidad Alta (Crítica)' },
              { value: 'media', label: 'Severidad Media' },
              { value: 'baja', label: 'Severidad Baja' }
            ]}
            placeholder="Buscar por señal de alerta, descripción o medida inmediata..."
          />

          {/* Grid de Red Flags */}
          {filteredFlags.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
              <Radar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-slate-800">No se encontraron alertas</h4>
              <p className="text-xs text-slate-500 mt-1">
                Ajuste los criterios de búsqueda o el filtro de proceso.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFlags.map((flag) => (
                <div
                  key={flag.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all space-y-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {flag.proceso}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{flag.id}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        flag.severidad === 'alta'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : flag.severidad === 'media'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}>
                        {flag.severidad === 'alta' ? 'Severidad Crítica' : 'Severidad Media'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mt-2.5 leading-snug">
                      {flag.alerta}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {flag.descripcion}
                    </p>
                  </div>

                  {/* Medida Preventiva Inmediata */}
                  <div className="p-3 bg-amber-50/80 rounded-lg border-l-4 border-amber-500 space-y-1">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      Protocolo de Acción Inmediata:
                    </span>
                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      {flag.medidaInmediata}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'portal' && (
        <WhistleblowingPortal
          reports={whistleblowingReports}
          onCreateReport={handleCreateSingleReport}
        />
      )}

      {activeTab === 'admin' && (
        <WhistleblowingAdminHub
          reports={whistleblowingReports}
          onUpdateReport={handleUpdateSingleReport}
        />
      )}
    </div>
  );
}
