import React, { useState } from 'react';
import {
  FileText,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HardHat,
  Receipt,
  UserCheck,
  Gift,
  GraduationCap,
  FileSearch,
  Handshake,
  AlertOctagon,
  Paperclip,
  ExternalLink,
  ShieldAlert,
  SearchCheck,
  Megaphone,
  Gavel,
  Target,
  Send,
  ClipboardCheck,
  TrendingUp
} from 'lucide-react';
import { getStatusBadgeConfig } from '../../utils/recordsFilterEngine.js';

const CATEGORY_ICONS = {
  capacitacion: GraduationCap,
  conflicto_interes: UserCheck,
  regalos: Gift,
  auditoria: FileSearch,
  no_conformidad: AlertOctagon,
  integridad_terceros: Handshake,
  controles_financieros: Receipt,
  ensayo_asfalto: HardHat,
  evaluacion_riesgo: ShieldAlert,
  debida_diligencia: SearchCheck,
  canal_etico: Megaphone,
  investigacion: Gavel,
  objetivos: Target,
  comunicacion: Send,
  revision_cumplimiento: ClipboardCheck,
  seguimiento_medicion: TrendingUp
};

export default function RecordsTable({
  records = [],
  onViewRecord,
  onEditRecord,
  onDeleteRecord
}) {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  if (records.length === 0) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
          <FileText className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white">No se encontraron registros de evidencias</h4>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          No hay evidencias documentadas que coincidan con los filtros seleccionados. Prueba cambiando la categoría o limpiando la búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="p-3.5 pl-4 w-10"></th>
              <th className="p-3.5">Código / Fecha</th>
              <th className="p-3.5">Tipo & Cláusula</th>
              <th className="p-3.5 min-w-[260px]">Título de la Evidencia / Ubicación</th>
              <th className="p-3.5">Responsable</th>
              <th className="p-3.5 text-center">Adjuntos</th>
              <th className="p-3.5 text-center">Estado Verificación</th>
              <th className="p-3.5 pr-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-300">
            {records.map((item) => {
              const isExpanded = expandedRowId === item.id;
              const statusConfig = getStatusBadgeConfig(item.estadoVerificacion);
              const IconComp = CATEGORY_ICONS[item.tipoRegistro] || FileText;

              return (
                <React.Fragment key={item.id}>
                  <tr
                    className={`hover:bg-slate-800/50 transition-colors group cursor-pointer ${
                      isExpanded ? 'bg-slate-800/40' : ''
                    }`}
                    onClick={() => toggleRow(item.id)}
                  >
                    {/* Botón Expansor */}
                    <td className="p-3.5 pl-4 text-center">
                      <button
                        type="button"
                        aria-label={isExpanded ? "Colapsar fila de detalle" : "Expandir fila de detalle"}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRow(item.id);
                        }}
                        className="p-1 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Código y Fecha */}
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-mono font-bold text-cyan-300 block">{item.id}</span>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {item.fecha}
                      </span>
                    </td>

                    {/* Categoría & Cláusula */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded-md bg-slate-800 text-cyan-400">
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-slate-200 capitalize">
                          {item.tipoRegistro?.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        {item.clausulaIso}
                      </span>
                    </td>

                    {/* Título y Ubicación */}
                    <td className="p-3.5">
                      <div className="font-semibold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                        {item.titulo}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        📍 {item.areaUbicacion}
                      </div>
                    </td>

                    {/* Responsable */}
                    <td className="p-3.5 text-[11px] text-slate-300 max-w-[160px] truncate">
                      {item.responsable}
                    </td>

                    {/* Adjuntos */}
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        <Paperclip className="w-3 h-3" />
                        {item.documentosAdjuntos?.length || 0}
                      </span>
                    </td>

                    {/* Estado de Verificación */}
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                        {statusConfig.label}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="p-3.5 pr-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onViewRecord(item)}
                          className="p-1.5 text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all"
                          title="Ver detalle completo y evidencias"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEditRecord(item)}
                          className="p-1.5 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all"
                          title="Editar registro"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteRecord(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                          title="Eliminar evidencia"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Fila Expandida de Metadatos y Evidencias */}
                  {isExpanded && (
                    <tr className="bg-slate-950/60 border-b border-slate-800">
                      <td colSpan={8} className="p-4 pl-12 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Resumen de los hechos y hallazgos */}
                          <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5 space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                              Resumen de la Evidencia / Hechos Documentados
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {item.resumenEvidencia}
                            </p>
                          </div>

                          {/* Metadatos Específicos del Registro */}
                          <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3.5 space-y-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                              Parámetros Técnicos y Métricas Específicas
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                              {item.metadatosEspecificos && Object.entries(item.metadatosEspecificos).map(([k, v]) => (
                                <div key={k} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                                  <span className="text-slate-500 block text-[9px] uppercase font-mono">{k}</span>
                                  <span className="text-slate-200 font-semibold">{String(v)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Documentos Adjuntos y Trazabilidad Hash */}
                        {item.documentosAdjuntos?.length > 0 && (
                          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block">
                              Legajos y Archivos de Respaldo Inmutable
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {item.documentosAdjuntos.map((doc, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px]"
                                >
                                  <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                                  <span className="text-slate-200 font-medium">{doc.nombre}</span>
                                  <span className="text-[9px] text-slate-500 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                                    {doc.hash}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
