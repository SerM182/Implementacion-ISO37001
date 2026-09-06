import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal.jsx';
import { DUE_DILIGENCE_CRITERIA } from '../../data/initialDueDiligenceData.js';
import { calculateDueDiligenceScore } from '../../utils/dueDiligenceScoring.js';
import { RiskBadge } from '../common/Badge.jsx';
import { CheckCircle2, AlertTriangle, ShieldAlert, FileText, Check } from 'lucide-react';

export default function PartnerEvaluatorModal({
  isOpen,
  onClose,
  partnerToEdit,
  onSavePartner
}) {
  const [partnerInfo, setPartnerInfo] = useState({
    id: '',
    razonSocial: '',
    cuit: '',
    rubro: 'Repavimentación y Obras Viales',
    contacto: '',
    email: '',
    contratoActual: '',
    montoContratoARS: 0,
    hallazgos: '',
    oficialEvaluador: ''
  });

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (partnerToEdit) {
      setPartnerInfo({
        id: partnerToEdit.id || `PROV-${Date.now().toString().slice(-3)}`,
        razonSocial: partnerToEdit.razonSocial || '',
        cuit: partnerToEdit.cuit || '',
        rubro: partnerToEdit.rubro || 'Repavimentación y Obras Viales',
        contacto: partnerToEdit.contacto || '',
        email: partnerToEdit.email || '',
        contratoActual: partnerToEdit.contratoActual || '',
        montoContratoARS: partnerToEdit.montoContratoARS || 0,
        hallazgos: partnerToEdit.hallazgos || '',
        oficialEvaluador: partnerToEdit.oficialEvaluador || ''
      });

      // Si ya tenía respuestas guardadas o calculamos defaults conformes
      const initialAnswers = {};
      DUE_DILIGENCE_CRITERIA.forEach(crit => {
        crit.preguntas.forEach(q => {
          initialAnswers[q.id] = partnerToEdit.puntajeDD >= 70 ? true : false;
        });
      });
      setAnswers(initialAnswers);
    } else {
      setPartnerInfo({
        id: `PROV-${Date.now().toString().slice(-3)}`,
        razonSocial: '',
        cuit: '',
        rubro: 'Repavimentación y Obras Viales',
        contacto: '',
        email: '',
        contratoActual: '',
        montoContratoARS: 0,
        hallazgos: '',
        oficialEvaluador: ''
      });

      const defaultAnswers = {};
      DUE_DILIGENCE_CRITERIA.forEach(crit => {
        crit.preguntas.forEach(q => {
          defaultAnswers[q.id] = true; // Por defecto marcado conforme
        });
      });
      setAnswers(defaultAnswers);
    }
  }, [partnerToEdit, isOpen]);

  // Scoring en tiempo real
  const evaluation = calculateDueDiligenceScore(answers, DUE_DILIGENCE_CRITERIA);

  const toggleQuestion = (questionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSelectAll = (val) => {
    const next = {};
    DUE_DILIGENCE_CRITERIA.forEach(crit => {
      crit.preguntas.forEach(q => {
        next[q.id] = val;
      });
    });
    setAnswers(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + evaluation.vigenciaMeses);

    const fullPartner = {
      ...partnerInfo,
      puntajeDD: evaluation.totalScore,
      nivelRiesgo: evaluation.nivelRiesgo,
      tipoDebidaDiligencia: evaluation.tipoDD,
      fechaEvaluacion: today,
      fechaVencimiento: expDate.toISOString().slice(0, 10),
      dictamenOficial: evaluation.dictamenSugerido,
      dimensionResults: evaluation.dimensionResults,
      isPEP: evaluation.isPEP
    };

    onSavePartner(fullPartner);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={partnerToEdit ? `Evaluación DD: ${partnerToEdit.razonSocial}` : 'Nueva Debida Diligencia de Contratista / Proveedor'}
      subtitle="Cuestionario ponderado ISO 37001 Cl. 8.2 & Ley 27.401 para Concesiones AUBASA"
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos Identificatorios del Contratista */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            1. Datos Societarios y Comerciales
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Razón Social *</label>
              <input
                type="text"
                required
                placeholder="Ej: Vial Construcciones S.A."
                value={partnerInfo.razonSocial}
                onChange={(e) => setPartnerInfo({ ...partnerInfo, razonSocial: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">CUIT *</label>
              <input
                type="text"
                required
                placeholder="30-XXXXXXXX-X"
                value={partnerInfo.cuit}
                onChange={(e) => setPartnerInfo({ ...partnerInfo, cuit: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Rubro / Objeto Principal</label>
              <input
                type="text"
                value={partnerInfo.rubro}
                onChange={(e) => setPartnerInfo({ ...partnerInfo, rubro: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Representante / Contacto</label>
              <input
                type="text"
                placeholder="Ing. Juan Pérez"
                value={partnerInfo.contacto}
                onChange={(e) => setPartnerInfo({ ...partnerInfo, contacto: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Correo Electrónico</label>
              <input
                type="email"
                placeholder="contacto@empresa.com"
                value={partnerInfo.email}
                onChange={(e) => setPartnerInfo({ ...partnerInfo, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Monto Estimado Contrato (ARS)</label>
              <input
                type="number"
                value={partnerInfo.montoContratoARS}
                onChange={(e) => setPartnerInfo({ ...partnerInfo, montoContratoARS: parseFloat(e.target.value) || 0 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Panel de Puntuación en Tiempo Real */}
        <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${
          evaluation.nivelRiesgo === 'alto'
            ? 'bg-rose-950/50 border-rose-700/60'
            : evaluation.nivelRiesgo === 'medio'
            ? 'bg-amber-950/50 border-amber-700/60'
            : 'bg-emerald-950/50 border-emerald-700/60'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-white">{evaluation.totalScore} / 100 pts</span>
              <RiskBadge level={evaluation.nivelRiesgo} />
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Debida Diligencia: <strong>{evaluation.tipoDD}</strong> (Vigencia: {evaluation.vigenciaMeses} meses)
            </p>
          </div>

          <div className="text-right max-w-sm">
            {evaluation.isPEP && (
              <div className="text-[11px] font-bold text-rose-300 bg-rose-900/60 px-2 py-1 rounded border border-rose-600 mb-1">
                ⚠️ PERSONA EXPUESTA POLÍTICAMENTE (PEP) DETECTADA
              </div>
            )}
            {evaluation.requiereAprobacionDirectorio ? (
              <span className="text-[11px] text-amber-300 font-semibold">
                Requiere elevación formal y autorización de Directorio.
              </span>
            ) : (
              <span className="text-[11px] text-emerald-300 font-semibold">
                Aprobación ordinaria por el Oficial de Cumplimiento.
              </span>
            )}
          </div>
        </div>

        {/* Cuestionario Ponderado de 15 Puntos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Cuestionario de Integridad y Verificaciones (ISO 37001 Cl. 8.2)
            </h4>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSelectAll(true)}
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                Marcar Todo Conforme
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleSelectAll(false)}
                className="text-slate-400 hover:text-white underline"
              >
                Desmarcar Todo
              </button>
            </div>
          </div>

          {DUE_DILIGENCE_CRITERIA.map((crit, idx) => (
            <div key={crit.id} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300">
                  {idx + 1}. {crit.dimension}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Peso: {crit.peso} pts
                </span>
              </div>

              <div className="space-y-2">
                {crit.preguntas.map((q) => {
                  const isChecked = !!answers[q.id];
                  return (
                    <div
                      key={q.id}
                      onClick={() => toggleQuestion(q.id)}
                      className={`p-2.5 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-slate-900/90 border-slate-700 hover:border-cyan-500'
                          : 'bg-rose-950/20 border-rose-900/50 hover:border-rose-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border flex-shrink-0 transition-colors ${
                        isChecked ? 'bg-cyan-600 border-cyan-400 text-white' : 'border-slate-600 bg-slate-950'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>

                      <div className="flex-1 text-xs">
                        <span className={isChecked ? 'text-slate-200' : 'text-slate-400'}>
                          {q.texto}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono font-bold text-slate-400 flex-shrink-0">
                        +{q.puntos} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Hallazgos e Informes de Campo */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Hallazgos de Verificación y Observaciones de Cumplimiento
          </label>
          <textarea
            rows={2}
            placeholder="Aclaraciones sobre plantas de asfalto, verificación de maquinarias o antecedentes societarios..."
            value={partnerInfo.hallazgos}
            onChange={(e) => setPartnerInfo({ ...partnerInfo, hallazgos: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
          />
        </div>

        {/* Dictamen Oficial Sugerido */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Dictamen Oficial de Cumplimiento Antisoborno
          </span>
          <p className="text-xs text-cyan-200 italic leading-relaxed">
            "{evaluation.dictamenSugerido}"
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold shadow-md shadow-cyan-950 transition-all"
          >
            Guardar y Emitir Dictamen
          </button>
        </div>
      </form>
    </Modal>
  );
}
