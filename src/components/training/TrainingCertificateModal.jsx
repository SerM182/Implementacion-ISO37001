import React, { useState } from 'react';
import {
  Printer,
  X,
  Award,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  Lock,
  Building2,
  Calendar,
  UserCheck
} from 'lucide-react';
import { convertCertificateToRecord } from '../../utils/trainingEngine.js';

export default function TrainingCertificateModal({
  certificate,
  isOpen,
  onClose,
  onAddRecord
}) {
  if (!isOpen || !certificate) return null;

  const [isSavedToRecords, setIsSavedToRecords] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToRecords = () => {
    if (onAddRecord && !isSavedToRecords) {
      const record = convertCertificateToRecord(certificate);
      onAddRecord(record);
      setIsSavedToRecords(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full max-h-[95vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl print:max-w-none print:w-full print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black print:p-6">

        {/* Barra Superior de Acciones (Oculta al Imprimir) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Acreditación Oficial de Competencia ISO 37001
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToRecords}
              disabled={isSavedToRecords}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isSavedToRecords
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 cursor-default'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
              }`}
            >
              {isSavedToRecords ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Registrado en Cl. 7.5</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Guardar en Evidencias (Cl. 7.5)</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DIPLOMA / CERTIFICADO OFICIAL */}
        <div className="border-4 border-double border-slate-700 print:border-black p-6 sm:p-10 rounded-2xl print:rounded-none bg-slate-950/80 print:bg-white text-center space-y-6 relative overflow-hidden">
          {/* Sello de Marca de Agua decorativo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none print:opacity-10">
            <ShieldCheck className="w-96 h-96 text-cyan-400 print:text-black" />
          </div>

          {/* Encabezado Institucional */}
          <div className="space-y-1 relative z-10">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-cyan-400 print:text-slate-700 block">
              AUTOPISTAS DE BUENOS AIRES S.A. &bull; AUBASA
            </span>
            <h1 className="text-lg sm:text-2xl font-black text-white print:text-black uppercase tracking-wide">
              Certificado de Acreditación y Competencia
            </h1>
            <p className="text-xs font-mono text-slate-400 print:text-slate-600">
              Sistema de Gestión Antisoborno &bull; Norma IRAM ISO 37001:2016 (Cl. 7.2 & 7.3)
            </p>
          </div>

          <div className="w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto print:bg-black" />

          {/* Cuerpo del Certificado */}
          <div className="space-y-4 relative z-10 text-xs sm:text-sm text-slate-200 print:text-slate-800 leading-relaxed">
            <p className="text-xs text-slate-400 print:text-slate-600">
              Se certifica que:
            </p>

            <div className="py-2">
              <h2 className="text-xl sm:text-2xl font-black text-cyan-300 print:text-black uppercase tracking-wider font-serif">
                {certificate.nombreColaborador}
              </h2>
              <p className="text-xs font-mono text-slate-400 print:text-slate-700 mt-1">
                DNI: <strong>{certificate.dni}</strong> &bull; Legajo: <strong>{certificate.legajo}</strong> &bull; Área: <strong>{certificate.area}</strong>
              </p>
            </div>

            <p className="max-w-xl mx-auto text-xs text-slate-300 print:text-slate-800">
              Ha completado satisfactoriamente los módulos pedagógicos y aprobado la evaluación situacional de dilemas éticos y controles operativos del programa:
            </p>

            <div className="p-4 bg-slate-900/90 print:bg-slate-50 border border-slate-800 print:border-slate-300 rounded-xl max-w-lg mx-auto">
              <span className="text-[10px] font-mono text-cyan-400 print:text-black font-bold block">
                {certificate.codigoCurso} &bull; {certificate.duracionHoras} Horas Acreditadas
              </span>
              <h3 className="text-sm sm:text-base font-black text-white print:text-black mt-0.5">
                {certificate.tituloCurso}
              </h3>
              <div className="flex items-center justify-center gap-4 mt-2 text-[11px] font-mono text-slate-400 print:text-slate-700">
                <span>Eficacia: <strong className="text-emerald-400 print:text-black">{certificate.calificacion}%</strong></span>
                <span>&bull;</span>
                <span>Estado: <strong className="text-cyan-300 print:text-black">COMPETENTE</strong></span>
              </div>
            </div>
          </div>

          {/* Firmas y Validación Institucional */}
          <div className="pt-8 grid grid-cols-2 gap-8 relative z-10 max-w-lg mx-auto">
            <div className="border-t border-slate-700 print:border-black pt-2 text-center">
              <span className="text-xs font-bold text-white print:text-black block">
                Dr. Martín Valenzuela
              </span>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">
                Oficial de Cumplimiento Antisoborno
              </span>
              <span className="text-[9px] text-slate-500 print:text-slate-500 font-mono block">
                Oficina de Integridad AUBASA
              </span>
            </div>

            <div className="border-t border-slate-700 print:border-black pt-2 text-center">
              <span className="text-xs font-bold text-white print:text-black block">
                Lic. Claudia Morales
              </span>
              <span className="text-[10px] text-slate-400 print:text-slate-600 block">
                Gerencia de Recursos Humanos
              </span>
              <span className="text-[9px] text-slate-500 print:text-slate-500 font-mono block">
                Capacitación y Desarrollo
              </span>
            </div>
          </div>

          {/* Trazabilidad Criptográfica */}
          <div className="pt-4 border-t border-slate-800/80 print:border-slate-300 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 print:text-slate-600 font-mono">
            <div>
              <span>ID Certificado: </span>
              <strong className="text-slate-300 print:text-black">{certificate.id}</strong>
            </div>
            <div>
              <span>Emisión: {certificate.fechaEmision} &bull; Vigencia: {certificate.fechaExpiracion}</span>
            </div>
            <div className="truncate max-w-xs" title={certificate.hashSha256}>
              <span className="text-cyan-400 print:text-black">Hash SHA-256: </span>
              <span>{certificate.hashSha256.substring(0, 18)}...</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
