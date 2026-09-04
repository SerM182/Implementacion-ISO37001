import React from 'react';
import {
  X,
  FileText,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  AlertTriangle,
  Paperclip,
  GraduationCap,
  UserCheck,
  Gift,
  FileSearch,
  AlertOctagon,
  Handshake,
  Receipt,
  HardHat,
  Hash,
  CheckCircle2,
  Calendar,
  Layers,
  Edit2,
  Printer,
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

export default function RecordDetailModal({
  record,
  isOpen,
  onClose,
  onEdit
}) {
  if (!isOpen || !record) return null;

  const statusConfig = getStatusBadgeConfig(record.estadoVerificacion);
  const IconComp = CATEGORY_ICONS[record.tipoRegistro] || FileText;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 transform transition-all text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 flex items-start justify-between relative">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <IconComp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                  {record.id}
                </span>
                <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  {record.clausulaIso}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                  {statusConfig.label}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">
                {record.titulo}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

          {/* Ficha de Identificación Rápida */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Fecha de Registro</span>
                <span className="text-xs font-mono font-semibold text-slate-200">{record.fecha}</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Ubicación / Sector</span>
                <span className="text-xs font-semibold text-slate-200 truncate block max-w-[170px]" title={record.areaUbicacion}>
                  {record.areaUbicacion}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Responsable</span>
                <span className="text-xs font-semibold text-slate-200 truncate block max-w-[170px]" title={record.responsable}>
                  {record.responsable}
                </span>
              </div>
            </div>
          </div>

          {/* Resumen de Hechos / Evidencias */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Resumen de la Evidencia & Hechos Documentados
            </h4>
            <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
              {record.resumenEvidencia}
            </div>
          </div>

          {/* Parámetros Técnicos y Métricas Específicas */}
          {record.metadatosEspecificos && Object.keys(record.metadatosEspecificos).length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Parámetros Técnicos & Métricas de Control SGAS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {Object.entries(record.metadatosEspecificos).map(([k, v]) => (
                  <div key={k} className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block mb-1">
                      {k.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 block">
                      {typeof v === 'boolean' ? (v ? 'Sí / Conforme' : 'No / No Conforme') : String(v)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legajos y Documentos de Respaldo Criptográfico */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              Legajos y Documentos de Respaldo Inmutable (Hash SHA-256)
            </h4>
            {record.documentosAdjuntos && record.documentosAdjuntos.length > 0 ? (
              <div className="space-y-2">
                {record.documentosAdjuntos.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-slate-200">
                        {doc.nombre}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <Hash className="w-3 h-3 text-cyan-400" />
                        {doc.hash}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-center text-xs text-slate-500">
                No hay archivos adjuntos registrados para esta evidencia.
              </div>
            )}
          </div>

          {/* Garantía de Inmutabilidad y Trazabilidad */}
          <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div className="text-[11px] text-slate-300">
              <strong className="text-cyan-300">Trazabilidad ISO 37001 Cl. 7.5:</strong> Este registro cuenta con control de versión, identificación unívoca y archivo digital para garantizar su inmutabilidad frente a auditorías externas de IRAM / ISO.
            </div>
          </div>

        </div>

        {/* Footer con Acciones */}
        <div className="bg-slate-950/80 p-4 px-6 border-t border-slate-800 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            Imprimir Ficha
          </button>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(record);
                }}
                className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Editar Evidencia
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
