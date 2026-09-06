import React from 'react';
import Modal from '../common/Modal.jsx';
import { ShieldCheck, Printer, Calendar, CheckCircle2, AlertOctagon, Stamp } from 'lucide-react';
import { formatCurrencyARS, formatDate } from '../../utils/formatters.js';
import { RiskBadge } from '../common/Badge.jsx';
import { AUBASA_CONTEXT } from '../../data/aubasaContext.js';

export default function DueDiligenceCertificate({
  isOpen,
  onClose,
  partner
}) {
  if (!partner) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Certificado Oficial de Debida Diligencia Antisoborno"
      subtitle="Documento controlado del SGAS - Norma ISO 37001:2016 Cláusula 8.2"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Barra de Herramientas */}
        <div className="flex items-center justify-end gap-2 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Guardar como PDF
          </button>
        </div>

        {/* Certificado Formal */}
        <div className="bg-white text-slate-900 p-8 rounded-xl border border-slate-300 shadow-2xl space-y-6 font-sans print-card">
          {/* Encabezado Oficial */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-wider">
                AUTOPISTAS DE BUENOS AIRES S.A.
              </h2>
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Gerencia de Integridad, Transparencia y Cumplimiento Normativo
              </p>
              <p className="text-[11px] text-slate-500">
                Sistema de Gestión Antisoborno • ISO 37001:2016 (Cl. 8.2) & Ley 27.401
              </p>
            </div>
            <div className="text-right font-mono text-xs text-slate-600">
              <div className="font-bold text-slate-900">DICTAMEN N° {partner.id}/2026</div>
              <div>Fecha: {formatDate(partner.fechaEvaluacion)}</div>
            </div>
          </div>

          {/* Título del Documento */}
          <div className="text-center py-2">
            <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900">
              CERTIFICADO DE DEBIDA DILIGENCIA Y APTITUD ÉTICA DE SOCIO COMERCIAL
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Evaluación de Integridad, Prevención de Soborno y Screening PEP
            </p>
          </div>

          {/* Datos del Socio Evaluado */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="font-bold text-slate-700">Razón Social:</span>
                <p className="font-semibold text-slate-900 text-sm">{partner.razonSocial}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700">CUIT:</span>
                <p className="font-mono text-slate-900 font-bold">{partner.cuit}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700">Rubro Principal:</span>
                <p className="text-slate-800">{partner.rubro}</p>
              </div>
              <div>
                <span className="font-bold text-slate-700">Contrato / Objeto:</span>
                <p className="text-slate-800">{partner.contratoActual || 'Contratación General'}</p>
              </div>
            </div>
          </div>

          {/* Resultados de la Evaluación Ponderada */}
          <div className="border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Calificación Obtenida en Matriz de Integridad
              </span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-900">{partner.puntajeDD} / 100 Pts</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  partner.nivelRiesgo === 'alto' ? 'bg-red-100 text-red-800 border border-red-300' :
                  partner.nivelRiesgo === 'medio' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}>
                  Riesgo {partner.nivelRiesgo?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div>• Tipo de Debida Diligencia: <strong>{partner.tipoDebidaDiligencia}</strong></div>
              <div>• Vigencia del Certificado: <strong>Hasta {formatDate(partner.fechaVencimiento)}</strong></div>
            </div>
          </div>

          {/* Dictamen y Conclusiones del Oficial */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase">Dictamen Conclusivo de Compliance:</h4>
            <div className="p-3 bg-slate-100 border-l-4 border-cyan-600 text-slate-800 italic leading-relaxed">
              "{partner.dictamenOficial || 'El proveedor cumple satisfactoriamente los estándares del SGAS.'}"
            </div>
            {partner.hallazgos && (
              <p className="text-[11px] text-slate-600 pt-1">
                <strong>Observaciones Técnicas:</strong> {partner.hallazgos}
              </p>
            )}
          </div>

          {/* Firmas y Sellos Institucionales */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center text-slate-400 text-xs">
                Firma: _______________________
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                {partner.oficialEvaluador || '_______________________'}
              </div>
              <div className="text-[10px] text-slate-600">Oficial de Cumplimiento Antisoborno (ISO 37001)</div>
              <div className="text-[10px] text-slate-500">AUBASA S.A.</div>
            </div>

            <div className="space-y-1">
              <div className="h-10 flex items-center justify-center">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-50 border-2 border-cyan-700 text-cyan-900 rounded font-black text-[10px] tracking-widest uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" />
                  SGAS VERIFICADO
                </div>
              </div>
              <div className="border-t border-slate-400 pt-1 font-bold text-slate-900">
                Comité de Integridad y Ética Pública
              </div>
              <div className="text-[10px] text-slate-600">Dirección de Auditoría y Asuntos Jurídicos</div>
              <div className="text-[10px] text-slate-500">Provincia de Buenos Aires</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
