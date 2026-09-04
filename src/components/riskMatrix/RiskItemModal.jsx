import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal.jsx';
import { calculateInherentRisk, calculateResidualRisk } from '../../utils/riskCalculations.js';
import { RiskBadge } from '../common/Badge.jsx';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function RiskItemModal({
  isOpen,
  onClose,
  riskToEdit,
  onSave
}) {
  const [formData, setFormData] = useState({
    id: '',
    proceso: 'Contratación',
    subproceso: '',
    escenarioRiesgo: '',
    probabilidad: 2,
    impacto: 2,
    controlesExistentes: '',
    efectividadControles: 'media',
    planTratamiento: '',
    responsableControl: 'Oficial de Cumplimiento'
  });

  useEffect(() => {
    if (riskToEdit) {
      setFormData({
        id: riskToEdit.id || `RSK-${Date.now().toString().slice(-4)}`,
        proceso: riskToEdit.proceso || 'Contratación',
        subproceso: riskToEdit.subproceso || '',
        escenarioRiesgo: riskToEdit.escenarioRiesgo || '',
        probabilidad: riskToEdit.probabilidad || 2,
        impacto: riskToEdit.impacto || 2,
        controlesExistentes: riskToEdit.controlesExistentes || '',
        efectividadControles: riskToEdit.efectividadControles || 'media',
        planTratamiento: riskToEdit.planTratamiento || '',
        responsableControl: riskToEdit.responsableControl || 'Oficial de Cumplimiento'
      });
    } else {
      setFormData({
        id: `RSK-${Date.now().toString().slice(-4)}`,
        proceso: 'Contratación',
        subproceso: '',
        escenarioRiesgo: '',
        probabilidad: 2,
        impacto: 2,
        controlesExistentes: '',
        efectividadControles: 'media',
        planTratamiento: '',
        responsableControl: 'Oficial de Cumplimiento'
      });
    }
  }, [riskToEdit, isOpen]);

  // Cálculos reactivos en tiempo real
  const inh = calculateInherentRisk(formData.probabilidad, formData.impacto);
  const res = calculateResidualRisk(inh.score, formData.efectividadControles);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalRisk = {
      ...formData,
      puntajeInherente: inh.score,
      nivelRiesgoInherente: inh.nivel,
      puntajeResidual: res.score,
      nivelRiesgoResidual: res.nivel
    };
    onSave(finalRisk);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={riskToEdit ? `Editar Riesgo: ${riskToEdit.id}` : 'Nuevo Riesgo Antisoborno (ISO 37001)'}
      subtitle="Evaluación del riesgo inherente, efectividad de controles y nivel residual"
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* ID */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Código ID</label>
            <input
              type="text"
              required
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          {/* Proceso */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Proceso Principal</label>
            <select
              value={formData.proceso}
              onChange={(e) => setFormData({ ...formData, proceso: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            >
              <option value="Contratación">Contratación (Licitaciones/Compras)</option>
              <option value="Pagos">Pagos y Tesorería (Financiero)</option>
              <option value="Obras Viales">Obras Viales (Inspección/Calidad)</option>
            </select>
          </div>

          {/* Subproceso */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subproceso / Área</label>
            <input
              type="text"
              placeholder="Ej: Licitación, Calados, Fondo Fijo"
              value={formData.subproceso}
              onChange={(e) => setFormData({ ...formData, subproceso: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        {/* Escenario de Riesgo */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Descripción del Escenario de Soborno o Fraude
          </label>
          <textarea
            rows={3}
            required
            placeholder="Describa la conducta indebida potencial, personas involucradas y beneficio ilícito perseguido..."
            value={formData.escenarioRiesgo}
            onChange={(e) => setFormData({ ...formData, escenarioRiesgo: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white placeholder-slate-500"
          />
        </div>

        {/* Panel de Cálculo de Riesgo Inherente */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              1. Evaluación del Riesgo Inherente (Puro)
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Puntaje: {inh.score} / 9</span>
              <RiskBadge level={inh.nivel} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Probabilidad: {formData.probabilidad} ({formData.probabilidad === 3 ? 'Alta' : formData.probabilidad === 2 ? 'Media' : 'Baja'})
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={formData.probabilidad}
                onChange={(e) => setFormData({ ...formData, probabilidad: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">
                Impacto: {formData.impacto} ({formData.impacto === 3 ? 'Alto' : formData.impacto === 2 ? 'Medio' : 'Bajo'})
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={formData.impacto}
                onChange={(e) => setFormData({ ...formData, impacto: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Controles Existentes y Efectividad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Controles Preventivos / Detectivos Existentes
            </label>
            <input
              type="text"
              placeholder="Ej: Doble firma bancaria, ensayos ciegos en UNLP, debida diligencia"
              value={formData.controlesExistentes}
              onChange={(e) => setFormData({ ...formData, controlesExistentes: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Efectividad del Control</label>
            <select
              value={formData.efectividadControles}
              onChange={(e) => setFormData({ ...formData, efectividadControles: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            >
              <option value="alta">Alta (Reduce fuertemente el riesgo)</option>
              <option value="media">Media (Reduce moderadamente)</option>
              <option value="baja">Baja / Ninguna (Sin mitigación)</option>
            </select>
          </div>
        </div>

        {/* Panel de Resultado Residual */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              2. Riesgo Residual Resultante
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Puntaje Residual: {res.score} / 9 (Nivel con controles operando)
            </p>
          </div>
          <RiskBadge level={res.nivel} />
        </div>

        {/* Plan de Tratamiento y Responsable */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Plan de Tratamiento / Mitigación Adicional
            </label>
            <input
              type="text"
              placeholder="Medida correctiva o refuerzo de control planificado..."
              value={formData.planTratamiento}
              onChange={(e) => setFormData({ ...formData, planTratamiento: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Responsable</label>
            <input
              type="text"
              value={formData.responsableControl}
              onChange={(e) => setFormData({ ...formData, responsableControl: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold shadow-md shadow-cyan-950 transition-all"
          >
            {riskToEdit ? 'Guardar Cambios' : 'Registrar Riesgo'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
