import React, { useState } from 'react';
import SearchFilterBar from '../common/SearchFilterBar.jsx';
import Iso37008InvestigationModal from './Iso37008InvestigationModal.jsx';
import { ISO37002_LIFECYCLE_PHASES, ISO37002_PRINCIPLES } from '../../data/iso37002And37008Data.js';
import {
  ShieldAlert,
  Search,
  Filter,
  Eye,
  Plus,
  Clock,
  UserCheck,
  Building2,
  FileText,
  AlertOctagon,
  CheckCircle2,
  Scale,
  Save,
  MessageSquare,
  X,
  FileSearch,
  ShieldCheck,
  Lock,
  Award
} from 'lucide-react';

export default function WhistleblowingAdminHub({
  reports = [],
  onUpdateReport
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [processFilter, setProcessFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);

  // Estado para el modal pericial forense ISO/TS 37008
  const [investigationCase, setInvestigationCase] = useState(null);
  const [isInvestigationModalOpen, setIsInvestigationModalOpen] = useState(false);

  // Estados para edición del caso
  const [newActionText, setNewActionText] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editConclusion, setEditConclusion] = useState('');
  const [editPriority, setEditPriority] = useState('');

  const handleOpenCase = (report) => {
    setSelectedCase(report);
    setEditStatus(report.estado);
    setEditConclusion(report.conclusionDictamen || '');
    setEditPriority(report.prioridad || 'alta');
    setNewActionText('');
  };

  const handleOpenInvestigationModal = (report) => {
    setInvestigationCase(report);
    setIsInvestigationModalOpen(true);
  };

  const handleSaveCase = () => {
    if (!selectedCase) return;

    let updatedActions = [...(selectedCase.accionesTomadas || [])];
    if (newActionText.trim()) {
      updatedActions.push({
        fecha: new Date().toISOString().slice(0, 10),
        detalle: newActionText.trim()
      });
    }

    const updated = {
      ...selectedCase,
      estado: editStatus,
      prioridad: editPriority,
      conclusionDictamen: editConclusion,
      accionesTomadas: updatedActions
    };

    onUpdateReport(updated);
    setSelectedCase(updated);
    setNewActionText('');
  };

  const filteredReports = reports.filter(r => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchToken = r.tokenSeguimiento?.toLowerCase().includes(q);
      const matchId = r.id?.toLowerCase().includes(q);
      const matchCat = r.categoria?.toLowerCase().includes(q);
      const matchDesc = r.descripcion?.toLowerCase().includes(q);
      const matchPersons = r.personasInvolucradas?.toLowerCase().includes(q);
      if (!matchToken && !matchId && !matchCat && !matchDesc && !matchPersons) return false;
    }

    if (statusFilter !== 'all') {
      if (r.estado !== statusFilter) return false;
    }

    if (processFilter !== 'all') {
      if (r.procesoAfectado !== processFilter) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. BANNER METODOLÓGICO DE LA TRILOGÍA (ISO 37002 + ISO/TS 37008) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Gestión de Denuncias (UNE-ISO 37002:2021) & Protocolo Forense (ISO/TS 37008:2023)
              </h3>
              <p className="text-[11px] text-slate-400">
                Ciclo de vida en 4 fases con acuse formal en ≤ 7 días, garantía contra represalias y expedientes de investigación estructurados.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              ISO 37002: Trust • Impartiality • Protection
            </span>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
              ISO/TS 37008: Forense & ToR
            </span>
          </div>
        </div>

        {/* 4 Fases del Ciclo ISO 37002 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {ISO37002_LIFECYCLE_PHASES.map((fase) => (
            <div
              key={fase.id}
              className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="font-bold text-cyan-400">Fase 0{fase.fase}</span>
                <span className="text-slate-400">{fase.plazo}</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-tight">
                {fase.nombre.split(':')[1] || fase.nombre}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {fase.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Barra de Filtros */}
      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        processFilter={processFilter}
        onProcessFilterChange={setProcessFilter}
        processOptions={['all', 'Contratación', 'Pagos', 'Obras Viales', 'Operaciones']}
        secondaryFilter={statusFilter}
        onSecondaryFilterChange={setStatusFilter}
        secondaryOptions={[
          { value: 'all', label: 'Estado: Todos' },
          { value: 'recibida', label: 'Recibida / Pendiente' },
          { value: 'en_investigacion', label: 'En Investigación' },
          { value: 'comite_etica', label: 'En Comité de Ética' },
          { value: 'cerrada', label: 'Cerrada con Dictamen' }
        ]}
        placeholder="Buscar expediente por código, token, implicados o descripción..."
      />

      {/* Tabla de Expedientes */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Bandeja de Casos de Cumplimiento e Investigaciones Internas (ISO 37001 Cl. 8.10)
            </h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 font-bold">
            {filteredReports.length} {filteredReports.length === 1 ? 'caso' : 'casos'}
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No se encontraron expedientes con los filtros aplicados.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="p-3">Código / Token</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Categoría e Incidente</th>
                  <th className="p-3">Proceso</th>
                  <th className="p-3">Denunciante</th>
                  <th className="p-3">Prioridad</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <span className="font-mono font-bold text-white block">{report.id}</span>
                      <span className="font-mono text-[10px] text-cyan-400">{report.tokenSeguimiento}</span>
                    </td>

                    <td className="p-3 font-mono text-slate-400 whitespace-nowrap">
                      {report.fechaRecepcion}
                    </td>

                    <td className="p-3 max-w-xs">
                      <span className="font-bold text-slate-200 block line-clamp-1">{report.categoria}</span>
                      <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{report.descripcion}</span>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-950 text-slate-300 border border-slate-800">
                        {report.procesoAfectado}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        report.tipoDenunciante === 'anonimo'
                          ? 'bg-slate-950 text-slate-400 border border-slate-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {report.tipoDenunciante === 'anonimo' ? 'Anónimo' : 'Identificado'}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        report.prioridad === 'alta'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : report.prioridad === 'media'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}>
                        {report.prioridad}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        report.estado === 'cerrada'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : report.estado === 'comite_etica'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      }`}>
                        {report.estado.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                      <button
                        onClick={() => handleOpenCase(report)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold transition-all inline-flex items-center gap-1"
                        title="Gestionar estado y actuaciones del expediente"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>Gestionar</span>
                      </button>

                      <button
                        onClick={() => handleOpenInvestigationModal(report)}
                        className="px-2.5 py-1 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 rounded-lg text-[11px] font-bold transition-all inline-flex items-center gap-1 shadow-sm"
                        title="Abrir Expediente Forense e Investigación pericial ISO/TS 37008:2023"
                      >
                        <FileSearch className="w-3 h-3 text-indigo-400" />
                        <span>Expediente 37008</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de Gestión Detallada del Caso */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl animate-in zoom-in-95">
            {/* Header Modal */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded font-mono text-xs font-bold">
                    {selectedCase.id}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    Token: {selectedCase.tokenSeguimiento}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedCase.categoria}
                </h3>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detalles del Caso */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Fecha Recepción</span>
                  <span className="text-slate-200 font-mono">{selectedCase.fechaRecepcion}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Proceso</span>
                  <span className="text-slate-200">{selectedCase.procesoAfectado}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Ubicación</span>
                  <span className="text-slate-200">{selectedCase.ubicacion}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Denunciante</span>
                  <span className="text-slate-200">{selectedCase.nombreDenunciante || 'Anónimo'}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                  Hechos Denunciados:
                </span>
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedCase.descripcion}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Personas / Empresas Involucradas:
                  </span>
                  <p className="text-slate-200">{selectedCase.personasInvolucradas}</p>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                    Evidencias Declaradas:
                  </span>
                  <p className="text-slate-200">{selectedCase.evidenciasAportadas}</p>
                </div>
              </div>

              {/* Bitácora de Acciones Existentes */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Actuaciones Realizadas en el Expediente:
                </span>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedCase.accionesTomadas?.map((acc, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-mono text-cyan-300 font-bold mr-2">{acc.fecha}:</span>
                        <span className="text-slate-300">{acc.detalle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulario de Actualización de Expediente */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                  Actualizar Estado y Agregar Actuación de Investigación
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Estado del Expediente</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="recibida">Recibida / Pendiente</option>
                      <option value="evaluacion_preliminar">Evaluación Preliminar</option>
                      <option value="en_investigacion">En Investigación Activa</option>
                      <option value="comite_etica">Elevada a Comité de Ética</option>
                      <option value="derivacion_penal">Derivación Judicial / Penal</option>
                      <option value="cerrada">Cerrada con Dictamen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Nivel de Prioridad</label>
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                    >
                      <option value="alta">Alta (Riesgo Crítico de Soborno)</option>
                      <option value="media">Media (Irregularidad Operativa)</option>
                      <option value="baja">Baja (Formalismo / Procedimiento)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Incorporar Nueva Actuación / Evidencia</label>
                  <input
                    type="text"
                    value={newActionText}
                    onChange={(e) => setNewActionText(e.target.value)}
                    placeholder="Ej: Se llevó a cabo peritaje técnico sobre las muestras de asfalto con la UNLP..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Dictamen o Conclusión Final</label>
                  <textarea
                    rows={2}
                    value={editConclusion}
                    onChange={(e) => setEditConclusion(e.target.value)}
                    placeholder="Dictamen formal de la Función de Cumplimiento Antisoborno..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => handleOpenInvestigationModal(selectedCase)}
                className="px-3.5 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <FileSearch className="w-4 h-4 text-indigo-400" />
                <span>Abrir Expediente Forense ISO/TS 37008</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={handleSaveCase}
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Actuaciones</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Investigación Pericial Forense ISO/TS 37008 */}
      <Iso37008InvestigationModal
        isOpen={isInvestigationModalOpen}
        onClose={() => setIsInvestigationModalOpen(false)}
        report={investigationCase}
        onUpdateReport={(updatedReport) => {
          onUpdateReport(updatedReport);
          setInvestigationCase(updatedReport);
          if (selectedCase && selectedCase.id === updatedReport.id) {
            setSelectedCase(updatedReport);
          }
        }}
      />
    </div>
  );
}
