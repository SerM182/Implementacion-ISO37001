import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Plus,
  Trash2,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  UserCheck,
  Gift,
  FileSearch,
  AlertOctagon,
  Handshake,
  Receipt,
  HardHat,
  Hash
} from 'lucide-react';
import { RECORD_CATEGORIES } from '../../data/initialRecordsData.js';

const CATEGORY_DEFAULT_CLAUSES = {
  capacitacion: 'Cl. 7.2 & 7.3',
  conflicto_interes: 'Cl. 7.2',
  regalos: 'Cl. 8.7',
  auditoria: 'Cl. 9.2 & 9.3',
  no_conformidad: 'Cl. 10.1 & 10.2',
  integridad_terceros: 'Cl. 8.6',
  controles_financieros: 'Cl. 8.3',
  ensayo_asfalto: 'Cl. 8.4',
  evaluacion_riesgo: 'Cl. 4.5 & 6.1',
  debida_diligencia: 'Cl. 8.2',
  canal_etico: 'Cl. 8.9',
  investigacion: 'Cl. 8.10',
  objetivos: 'Cl. 6.2',
  comunicacion: 'Cl. 7.4',
  revision_cumplimiento: 'Cl. 9.4',
  seguimiento_medicion: 'Cl. 9.1'
};

const INITIAL_FORM_STATE = {
  tipoRegistro: 'capacitacion',
  clausulaIso: 'Cl. 7.2 & 7.3',
  titulo: '',
  fecha: new Date().toISOString().split('T')[0],
  responsable: '',
  areaUbicacion: '',
  estadoVerificacion: 'verificado',
  resumenEvidencia: '',
  metadatosEspecificos: {},
  documentosAdjuntos: []
};

// Generador simple de hash SHA simulado para trazabilidad
function generateMockHash() {
  const chars = '0123456789abcdef';
  let hash = 'sha256:';
  for (let i = 0; i < 16; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export default function RecordFormModal({
  isOpen,
  onClose,
  onSave,
  initialRecord = null
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [newDocName, setNewDocName] = useState('');

  useEffect(() => {
    if (initialRecord) {
      setFormData({
        ...INITIAL_FORM_STATE,
        ...initialRecord,
        metadatosEspecificos: initialRecord.metadatosEspecificos || {},
        documentosAdjuntos: initialRecord.documentosAdjuntos || []
      });
    } else {
      setFormData({
        ...INITIAL_FORM_STATE,
        fecha: new Date().toISOString().split('T')[0]
      });
    }
    setErrors({});
    setNewDocName('');
  }, [initialRecord, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setFormData(prev => ({
      ...prev,
      tipoRegistro: newCat,
      clausulaIso: CATEGORY_DEFAULT_CLAUSES[newCat] || prev.clausulaIso,
      metadatosEspecificos: {}
    }));
  };

  const handleMetadataChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      metadatosEspecificos: {
        ...prev.metadatosEspecificos,
        [key]: value
      }
    }));
  };

  const handleAddAttachment = () => {
    if (!newDocName.trim()) return;
    const newDoc = {
      nombre: newDocName.trim(),
      hash: generateMockHash()
    };
    setFormData(prev => ({
      ...prev,
      documentosAdjuntos: [...prev.documentosAdjuntos, newDoc]
    }));
    setNewDocName('');
  };

  const handleRemoveAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      documentosAdjuntos: prev.documentosAdjuntos.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.titulo.trim()) errs.titulo = 'El título de la evidencia es obligatorio.';
    if (!formData.responsable.trim()) errs.responsable = 'El responsable/auditor es obligatorio.';
    if (!formData.areaUbicacion.trim()) errs.areaUbicacion = 'La ubicación o sector es obligatoria.';
    if (!formData.resumenEvidencia.trim()) errs.resumenEvidencia = 'El resumen de hechos o evidencias es obligatorio.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 transform transition-all text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
              ISO 37001:2016 — Cláusula 7.5
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              {initialRecord ? 'Editar Registro de Evidencia' : 'Cargar Nueva Evidencia de Cumplimiento'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">

          {/* Fila 1: Tipología & Cláusula */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                Tipología de Evidencia *
              </label>
              <select
                value={formData.tipoRegistro}
                onChange={handleCategoryChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
              >
                {RECORD_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre} ({cat.clausulaIso})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                Cláusula ISO 37001 Requisito
              </label>
              <input
                type="text"
                value={formData.clausulaIso}
                onChange={(e) => setFormData({ ...formData, clausulaIso: e.target.value })}
                placeholder="Ej. Cl. 8.4"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Fila 2: Título de la Evidencia */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
              Título Oficial de la Evidencia / Registro *
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Ej. Acta de Ensayo de Probetas Asfálticas Tramo Autovía 2 Km 180"
              className={`w-full bg-slate-950 border rounded-xl p-2.5 text-white outline-none focus:border-cyan-400 ${
                errors.titulo ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.titulo && <span className="text-rose-400 text-[10px] mt-1 block">{errors.titulo}</span>}
          </div>

          {/* Fila 3: Fecha, Ubicación, Responsable, Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                Fecha de Emisión *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                Ubicación / Área *
              </label>
              <input
                type="text"
                value={formData.areaUbicacion}
                onChange={(e) => setFormData({ ...formData, areaUbicacion: e.target.value })}
                placeholder="Ej. Peaje Dock Sud / Peaje Hudson / Obras BALP"
                className={`w-full bg-slate-950 border rounded-xl p-2.5 text-white outline-none focus:border-cyan-400 ${
                  errors.areaUbicacion ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              {errors.areaUbicacion && <span className="text-rose-400 text-[10px] mt-1 block">{errors.areaUbicacion}</span>}
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                Responsable *
              </label>
              <input
                type="text"
                value={formData.responsable}
                onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                placeholder="Ej. Ing. Martín Ramos"
                className={`w-full bg-slate-950 border rounded-xl p-2.5 text-white outline-none focus:border-cyan-400 ${
                  errors.responsable ? 'border-rose-500' : 'border-slate-700'
                }`}
              />
              {errors.responsable && <span className="text-rose-400 text-[10px] mt-1 block">{errors.responsable}</span>}
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
                Estado Verificación
              </label>
              <select
                value={formData.estadoVerificacion}
                onChange={(e) => setFormData({ ...formData, estadoVerificacion: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
              >
                <option value="verificado">Verificado / Conforme</option>
                <option value="en_revision">En Revisión Técnica</option>
                <option value="observado">Con Observaciones</option>
              </select>
            </div>
          </div>

          {/* Fila 4: Resumen de Hechos / Evidencias */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5 uppercase text-[10px] tracking-wider">
              Resumen de la Evidencia & Hechos Documentados *
            </label>
            <textarea
              rows={3}
              value={formData.resumenEvidencia}
              onChange={(e) => setFormData({ ...formData, resumenEvidencia: e.target.value })}
              placeholder="Describa de forma clara y auditable los hechos, hallazgos, resultados técnicos y controles antisoborno verificados..."
              className={`w-full bg-slate-950 border rounded-xl p-3 text-white outline-none focus:border-cyan-400 leading-relaxed ${
                errors.resumenEvidencia ? 'border-rose-500' : 'border-slate-700'
              }`}
            />
            {errors.resumenEvidencia && <span className="text-rose-400 text-[10px] mt-1 block">{errors.resumenEvidencia}</span>}
          </div>

          {/* Fila 5: Parámetros Técnicos Específicos por Tipo */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Parámetros y Métricas de Control para esta Tipología
            </span>

            {/* Renderizado condicional según tipo */}
            {formData.tipoRegistro === 'capacitacion' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Asistencia (%)</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.asistenciaPorcentaje || ''}
                    onChange={(e) => handleMetadataChange('asistenciaPorcentaje', e.target.value)}
                    placeholder="Ej. 98%"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Horas de Capacitación</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.horasCapacitacion || ''}
                    onChange={(e) => handleMetadataChange('horasCapacitacion', e.target.value)}
                    placeholder="Ej. 16 hs"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Evaluación de Eficacia</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.evaluacionEficaciaPromedio || ''}
                    onChange={(e) => handleMetadataChange('evaluacionEficaciaPromedio', e.target.value)}
                    placeholder="Ej. 9.4/10"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'conflicto_interes' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Declarante</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.declarante || ''}
                    onChange={(e) => handleMetadataChange('declarante', e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Cargo / Función</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.cargo || ''}
                    onChange={(e) => handleMetadataChange('cargo', e.target.value)}
                    placeholder="Ej. Miembro Comisión Evaluadora"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">¿Declara Conflicto?</label>
                  <select
                    value={formData.metadatosEspecificos.poseeConflicto === false ? 'No' : (formData.metadatosEspecificos.poseeConflicto === true ? 'Sí' : 'No')}
                    onChange={(e) => handleMetadataChange('poseeConflicto', e.target.value === 'Sí')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  >
                    <option value="No">No declara conflictos</option>
                    <option value="Sí">Sí, declara potenciales vínculos</option>
                  </select>
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'regalos' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Remitente / Proveedor</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.remitente || ''}
                    onChange={(e) => handleMetadataChange('remitente', e.target.value)}
                    placeholder="Ej. VialConstrucciones S.A."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Valor Estimado (USD)</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.valorEstimadoUsd || ''}
                    onChange={(e) => handleMetadataChange('valorEstimadoUsd', e.target.value)}
                    placeholder="Ej. USD 150"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Decisión Oficial Cumplimiento</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.decisionOficialCumplimiento || ''}
                    onChange={(e) => handleMetadataChange('decisionOficialCumplimiento', e.target.value)}
                    placeholder="Ej. Rechazado y devuelto con acta"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'auditoria' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Equipo Auditor</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.equipoAuditor || ''}
                    onChange={(e) => handleMetadataChange('equipoAuditor', e.target.value)}
                    placeholder="Ej. Auditoría Interna AUBASA"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Hallazgos Mayores</label>
                  <input
                    type="number"
                    value={formData.metadatosEspecificos.hallazgosMayores ?? 0}
                    onChange={(e) => handleMetadataChange('hallazgosMayores', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Hallazgos Menores</label>
                  <input
                    type="number"
                    value={formData.metadatosEspecificos.hallazgosMenores ?? 0}
                    onChange={(e) => handleMetadataChange('hallazgosMenores', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'no_conformidad' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Causa Raíz Identificada</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.causaRaiz || ''}
                    onChange={(e) => handleMetadataChange('causaRaiz', e.target.value)}
                    placeholder="Ej. Falta de verificación cruzada"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Acción Inmediata Implementada</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.accionInmediata || ''}
                    onChange={(e) => handleMetadataChange('accionInmediata', e.target.value)}
                    placeholder="Ej. Bloqueo de proveedor y revisión técnica"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'integridad_terceros' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Contratista / Razón Social</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.contratista || ''}
                    onChange={(e) => handleMetadataChange('contratista', e.target.value)}
                    placeholder="Ej. Pavimentos del Plata S.A."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">CUIT</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.cuit || ''}
                    onChange={(e) => handleMetadataChange('cuit', e.target.value)}
                    placeholder="Ej. 30-71458923-8"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Licitación Vinculada</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.licitacionVinculada || ''}
                    onChange={(e) => handleMetadataChange('licitacionVinculada', e.target.value)}
                    placeholder="Ej. LP N° 04/2026"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'controles_financieros' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Proveedor / Beneficiario</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.proveedorBeneficiario || ''}
                    onChange={(e) => handleMetadataChange('proveedorBeneficiario', e.target.value)}
                    placeholder="Ej. Vial Construcciones S.A."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Monto Transferido (ARS)</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.montoTransferidoArs || ''}
                    onChange={(e) => handleMetadataChange('montoTransferidoArs', e.target.value)}
                    placeholder="Ej. $48.500.000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Doble Firma Electrónica</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.verificacionDobleFirma || ''}
                    onChange={(e) => handleMetadataChange('verificacionDobleFirma', e.target.value)}
                    placeholder="Ej. Token Finanzas + Token Directorio"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'ensayo_asfalto' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Laboratorio de Ensayo</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.laboratorio || ''}
                    onChange={(e) => handleMetadataChange('laboratorio', e.target.value)}
                    placeholder="Ej. LEMIT / CIC"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Densidad Marshall Obtenida</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.densidadObtenida || ''}
                    onChange={(e) => handleMetadataChange('densidadObtenida', e.target.value)}
                    placeholder="Ej. 98.6% (Exigido >= 97%)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Espesor Capa Rodamiento</label>
                  <input
                    type="text"
                    value={formData.metadatosEspecificos.espesorCapa || ''}
                    onChange={(e) => handleMetadataChange('espesorCapa', e.target.value)}
                    placeholder="Ej. 52 mm (Pliego: 50 mm)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'evaluacion_riesgo' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Metodología</label>
                  <input type="text" value={formData.metadatosEspecificos.metodologia || ''}
                    onChange={(e) => handleMetadataChange('metodologia', e.target.value)}
                    placeholder="Ej. ISO 31000 / Matriz 5x5"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Escenarios Identificados</label>
                  <input type="number" value={formData.metadatosEspecificos.escenariosIdentificados ?? ''}
                    onChange={(e) => handleMetadataChange('escenariosIdentificados', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Riesgos Críticos</label>
                  <input type="number" value={formData.metadatosEspecificos.riesgosCriticos ?? ''}
                    onChange={(e) => handleMetadataChange('riesgosCriticos', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Riesgo Residual</label>
                  <input type="text" value={formData.metadatosEspecificos.riesgoResidual || ''}
                    onChange={(e) => handleMetadataChange('riesgoResidual', e.target.value)}
                    placeholder="Ej. Medio (controlado)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Próxima Revisión</label>
                  <input type="date" value={formData.metadatosEspecificos.proximaRevision || ''}
                    onChange={(e) => handleMetadataChange('proximaRevision', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'debida_diligencia' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Razón Social</label>
                  <input type="text" value={formData.metadatosEspecificos.razonSocial || ''}
                    onChange={(e) => handleMetadataChange('razonSocial', e.target.value)}
                    placeholder="Ej. UTE Pavimentos Bonaerenses"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">CUIT</label>
                  <input type="text" value={formData.metadatosEspecificos.cuit || ''}
                    onChange={(e) => handleMetadataChange('cuit', e.target.value)}
                    placeholder="Ej. 30-71889922-4"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Puntaje DD (0-100)</label>
                  <input type="number" value={formData.metadatosEspecificos.puntajeDD ?? ''}
                    onChange={(e) => handleMetadataChange('puntajeDD', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Nivel de Riesgo</label>
                  <select value={formData.metadatosEspecificos.nivelRiesgo || 'Bajo'}
                    onChange={(e) => handleMetadataChange('nivelRiesgo', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white">
                    <option value="Bajo">Bajo</option>
                    <option value="Medio">Medio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Screening PEP</label>
                  <input type="text" value={formData.metadatosEspecificos.screeningPEP || ''}
                    onChange={(e) => handleMetadataChange('screeningPEP', e.target.value)}
                    placeholder="Ej. Sin coincidencias"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'canal_etico' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Nº de Caso</label>
                  <input type="text" value={formData.metadatosEspecificos.numeroCaso || ''}
                    onChange={(e) => handleMetadataChange('numeroCaso', e.target.value)}
                    placeholder="Ej. CASO-2026-014"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Canal de Recepción</label>
                  <input type="text" value={formData.metadatosEspecificos.canalRecepcion || ''}
                    onChange={(e) => handleMetadataChange('canalRecepcion', e.target.value)}
                    placeholder="Ej. Portal Web cifrado"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">¿Anónima?</label>
                  <select value={formData.metadatosEspecificos.anonima === false ? 'No' : (formData.metadatosEspecificos.anonima === true ? 'Sí' : 'Sí')}
                    onChange={(e) => handleMetadataChange('anonima', e.target.value === 'Sí')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white">
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Estado de Triaje</label>
                  <input type="text" value={formData.metadatosEspecificos.estadoTriage || ''}
                    onChange={(e) => handleMetadataChange('estadoTriage', e.target.value)}
                    placeholder="Ej. Admisible"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'investigacion' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Nº de Caso</label>
                  <input type="text" value={formData.metadatosEspecificos.numeroCaso || ''}
                    onChange={(e) => handleMetadataChange('numeroCaso', e.target.value)}
                    placeholder="Ej. CASO-2026-009"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-mono" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Conclusión</label>
                  <input type="text" value={formData.metadatosEspecificos.conclusion || ''}
                    onChange={(e) => handleMetadataChange('conclusion', e.target.value)}
                    placeholder="Ej. Soborno comprobado"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Medida Disciplinaria</label>
                  <input type="text" value={formData.metadatosEspecificos.medidaDisciplinaria || ''}
                    onChange={(e) => handleMetadataChange('medidaDisciplinaria', e.target.value)}
                    placeholder="Ej. Despido con causa"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">¿Denuncia Penal?</label>
                  <select value={formData.metadatosEspecificos.denunciaPenal === false ? 'No' : (formData.metadatosEspecificos.denunciaPenal === true ? 'Sí' : 'No')}
                    onChange={(e) => handleMetadataChange('denunciaPenal', e.target.value === 'Sí')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white">
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                  </select>
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'objetivos' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Objetivo</label>
                  <input type="text" value={formData.metadatosEspecificos.objetivo || ''}
                    onChange={(e) => handleMetadataChange('objetivo', e.target.value)}
                    placeholder="Ej. 100% contratos con cláusula"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Indicador (KPI)</label>
                  <input type="text" value={formData.metadatosEspecificos.indicadorKpi || ''}
                    onChange={(e) => handleMetadataChange('indicadorKpi', e.target.value)}
                    placeholder="Ej. % pliegos con CLA-SGAS-01"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Meta Anual</label>
                  <input type="text" value={formData.metadatosEspecificos.metaAnual || ''}
                    onChange={(e) => handleMetadataChange('metaAnual', e.target.value)}
                    placeholder="Ej. 100%"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Valor Actual</label>
                  <input type="text" value={formData.metadatosEspecificos.valorActual || ''}
                    onChange={(e) => handleMetadataChange('valorActual', e.target.value)}
                    placeholder="Ej. 96%"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'comunicacion' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Canal</label>
                  <input type="text" value={formData.metadatosEspecificos.canal || ''}
                    onChange={(e) => handleMetadataChange('canal', e.target.value)}
                    placeholder="Ej. Cartelería e intranet"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Audiencia</label>
                  <input type="text" value={formData.metadatosEspecificos.audiencia || ''}
                    onChange={(e) => handleMetadataChange('audiencia', e.target.value)}
                    placeholder="Ej. Personal de peaje"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Alcance</label>
                  <input type="text" value={formData.metadatosEspecificos.alcance || ''}
                    onChange={(e) => handleMetadataChange('alcance', e.target.value)}
                    placeholder="Ej. 4 estaciones troncales"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Medio de Verificación</label>
                  <input type="text" value={formData.metadatosEspecificos.medioVerificacion || ''}
                    onChange={(e) => handleMetadataChange('medioVerificacion', e.target.value)}
                    placeholder="Ej. Acta de distribución firmada"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'revision_cumplimiento' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Periodo</label>
                  <input type="text" value={formData.metadatosEspecificos.periodo || ''}
                    onChange={(e) => handleMetadataChange('periodo', e.target.value)}
                    placeholder="Ej. 1er Semestre 2026"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Conclusión General</label>
                  <input type="text" value={formData.metadatosEspecificos.conclusionGeneral || ''}
                    onChange={(e) => handleMetadataChange('conclusionGeneral', e.target.value)}
                    placeholder="Ej. SGAS eficaz"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Recomendaciones</label>
                  <input type="number" value={formData.metadatosEspecificos.recomendaciones ?? ''}
                    onChange={(e) => handleMetadataChange('recomendaciones', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">¿Presentado a Directorio?</label>
                  <select value={formData.metadatosEspecificos.presentadoADirectorio === false ? 'No' : (formData.metadatosEspecificos.presentadoADirectorio === true ? 'Sí' : 'Sí')}
                    onChange={(e) => handleMetadataChange('presentadoADirectorio', e.target.value === 'Sí')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white">
                    <option value="Sí">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            )}

            {formData.tipoRegistro === 'seguimiento_medicion' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Periodo</label>
                  <input type="text" value={formData.metadatosEspecificos.periodo || ''}
                    onChange={(e) => handleMetadataChange('periodo', e.target.value)}
                    placeholder="Ej. Q2 2026"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">KPIs Monitoreados</label>
                  <input type="number" value={formData.metadatosEspecificos.kpisMonitoreados ?? ''}
                    onChange={(e) => handleMetadataChange('kpisMonitoreados', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Tendencia de Denuncias</label>
                  <input type="text" value={formData.metadatosEspecificos.tendenciaDenuncias || ''}
                    onChange={(e) => handleMetadataChange('tendenciaDenuncias', e.target.value)}
                    placeholder="Ej. Estable"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Efectividad de Controles</label>
                  <input type="text" value={formData.metadatosEspecificos.efectividadControles || ''}
                    onChange={(e) => handleMetadataChange('efectividadControles', e.target.value)}
                    placeholder="Ej. En alza (89%)"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Fila 6: Documentos y Archivos de Respaldo */}
          <div className="space-y-2">
            <label className="block text-slate-300 font-bold uppercase text-[10px] tracking-wider">
              Legajos & Archivos de Respaldo (Trazabilidad Inmutable)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newDocName}
                onChange={(e) => setNewDocName(e.target.value)}
                placeholder="Nombre del documento oficial (ej. Informe_Ensayo_LEMIT_092.pdf)"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adjuntar
              </button>
            </div>

            {/* Lista de adjuntos */}
            {formData.documentosAdjuntos.length > 0 && (
              <div className="space-y-1.5 mt-2">
                {formData.documentosAdjuntos.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-slate-200">{doc.nombre}</span>
                      <span className="text-[9px] text-slate-500 font-mono bg-slate-900 px-1.5 py-0.5 rounded">
                        {doc.hash}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </form>

        {/* Footer */}
        <div className="bg-slate-950/80 p-4 px-6 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Registro Auditable</span>
          </button>
        </div>

      </div>
    </div>
  );
}
