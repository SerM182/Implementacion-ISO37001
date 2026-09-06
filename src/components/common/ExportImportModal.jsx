import React, { useRef, useState } from 'react';
import Modal from './Modal.jsx';
import {
  Download,
  Upload,
  FileSpreadsheet,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileJson,
  Cloud,
  CloudUpload,
  CloudDownload,
  Database
} from 'lucide-react';
import {
  exportAllDataBackup,
  importAllDataBackup,
  exportRisksToCSV,
  exportPartnersToCSV
} from '../../utils/exportImport.js';
import { sgasStorage } from '../../utils/storage.js';
import { supabaseSync } from '../../utils/supabaseSync.js';
import { isSupabaseConfigured } from '../../utils/supabaseClient.js';

export default function ExportImportModal({
  isOpen,
  onClose,
  risksList = [],
  partnersList = [],
  onDataReloaded
}) {
  const fileInputRef = useRef(null);
  const [feedback, setFeedback] = useState(null);

  const handleExportJSON = () => {
    exportAllDataBackup();
    setFeedback({ type: 'success', text: 'Copia de respaldo JSON descargada con éxito.' });
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      const res = importAllDataBackup(content);
      if (res.success) {
        setFeedback({ type: 'success', text: 'Base de datos restaurada correctamente.' });
        if (onDataReloaded) onDataReloaded();
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const [syncLoading, setSyncLoading] = useState(false);
  const isCloudReady = isSupabaseConfigured();

  const handleSyncPush = async () => {
    setSyncLoading(true);
    setFeedback(null);
    const res = await supabaseSync.pushToCloud();
    setSyncLoading(false);
    if (res.success) {
      setFeedback({ type: 'success', text: 'Datos locales sincronizados y guardados en Supabase Cloud con éxito.' });
    } else {
      setFeedback({ type: 'error', text: 'Error al subir a Supabase: ' + (res.error || res.message) });
    }
  };

  const handleSyncPull = async () => {
    setSyncLoading(true);
    setFeedback(null);
    const res = await supabaseSync.pullFromCloud();
    setSyncLoading(false);
    if (res.success) {
      // Descarga explícita solicitada por el usuario: la nube reemplaza los
      // datos locales sin condiciones (a diferencia del auto-pull al iniciar).
      const { data } = res;
      if (data.risks) sgasStorage.saveRisks(data.risks);
      if (data.partners) sgasStorage.savePartners(data.partners);
      if (data.records) sgasStorage.saveRecords(data.records);
      if (data.reports) sgasStorage.saveReports(data.reports);
      if (data.collaborators) sgasStorage.saveCollaborators(data.collaborators);
      if (data.users) sgasStorage.saveUsers(data.users);
      if (data.gapItems) sgasStorage.saveGapAnalysis(data.gapItems);
      setFeedback({ type: 'success', text: 'Datos descargados desde Supabase Cloud y cargados en la aplicación.' });
      if (onDataReloaded) onDataReloaded();
    } else {
      setFeedback({ type: 'error', text: 'Error al descargar de Supabase: ' + (res.error || res.message) });
    }
  };

  const handleExportRisksCSV = () => {
    exportRisksToCSV(risksList);
    setFeedback({ type: 'success', text: 'Matriz de Riesgos exportada a CSV.' });
  };

  const handleExportPartnersCSV = () => {
    exportPartnersToCSV(partnersList);
    setFeedback({ type: 'success', text: 'Registro de Debida Diligencia exportado a CSV.' });
  };

  const handleClearToBlank = () => {
    if (window.confirm('¿Desea iniciar en BLANCO para carga real? Esta acción vaciará los riesgos, proveedores, denuncias y evidencias cargadas de ejemplo, manteniendo intactos los 36 requisitos normativos, las 14 plantillas oficiales y los 10 procedimientos estándar.')) {
      sgasStorage.clearToBlankSlate();
      setFeedback({ type: 'success', text: 'Workspace listo en BLANCO para la carga real de AUBASA.' });
      if (onDataReloaded) onDataReloaded();
    }
  };

  const handleLoadDemoData = () => {
    if (window.confirm('¿Desea cargar los datos de ejemplo y demostración del sistema?')) {
      sgasStorage.loadDemoData();
      setFeedback({ type: 'success', text: 'Datos de ejemplo cargados con éxito.' });
      if (onDataReloaded) onDataReloaded();
    }
  };

  const handleResetData = () => {
    if (window.confirm('¿Está seguro de restablecer todos los registros a los valores iniciales de AUBASA? Se perderán las modificaciones locales no respaldadas.')) {
      sgasStorage.resetAllToDefault();
      setFeedback({ type: 'success', text: 'Todos los datos fueron restablecidos a la configuración oficial inicial.' });
      if (onDataReloaded) onDataReloaded();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Gestión de Base de Datos, Respaldo y Workspace"
      subtitle="Sistema de Gestión Antisoborno ISO 37001 / 37002 / 37008 — AUBASA"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {feedback && (
          <div className={`p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-semibold border ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* 1. MODO DE TRABAJO (EN BLANCO VS DEMO) */}
        <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]"></span>
              Modo de Espacio de Trabajo (Workspace)
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#0284c7] border border-sky-300">
              Carga Real vs Demostración
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Selecciona si deseas trabajar con un sistema <strong>completamente en blanco</strong> listo para registrar los datos reales de AUBASA BALP o si prefieres explorar con <strong>datos de demostración pre-cargados</strong>.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              onClick={handleClearToBlank}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#0284c7] hover:bg-sky-600 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Iniciar en Blanco (Carga Real)</span>
            </button>

            <button
              onClick={handleLoadDemoData}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <FileJson className="w-4 h-4 text-amber-500" />
              <span>Cargar Datos de Ejemplo</span>
            </button>
          </div>
        </div>

        {/* 2. SINCRONIZACIÓN CON SUPABASE CLOUD */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4.5 space-y-3 shadow-md border border-slate-700">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Cloud className="w-4 h-4 text-sky-400" />
              Base de Datos en la Nube (Supabase Cloud)
            </h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              isCloudReady
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}>
              {isCloudReady ? '● Conectado (pjjoulwltioxqbgukoti)' : '○ Clave pendiente'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Permite a tu equipo de 4 personas compartir la misma información en tiempo real desde cualquier computadora.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <button
              onClick={handleSyncPush}
              disabled={syncLoading || !isCloudReady}
              className="flex items-center gap-2 px-3.5 py-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <CloudUpload className="w-4 h-4" />
              <span>{syncLoading ? 'Subiendo...' : 'Guardar Todo en la Nube'}</span>
            </button>

            <button
              onClick={handleSyncPull}
              disabled={syncLoading || !isCloudReady}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white border border-slate-600 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <CloudDownload className="w-4 h-4 text-sky-300" />
              <span>{syncLoading ? 'Descargando...' : 'Descargar desde la Nube'}</span>
            </button>
          </div>
        </div>

        {/* 2. Sección de Respaldo Completo (JSON) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 shadow-2xs">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileJson className="w-4 h-4 text-[#0284c7]" />
            Copia de Seguridad Integral del SGAS (JSON)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Descarga o restaura toda la base de datos local: matriz de riesgos, registro de contratistas, diagnósticos de gap analysis, evidencias cargadas, capacitaciones y canal ético.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Copia JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-[#0284c7]" />
              <span>Restaurar desde Archivo JSON</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportJSON}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* 3. Sección de Exportación a Planillas Excel / CSV */}
        <div className="bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 shadow-2xs">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Exportación para Auditoría y Tablas (CSV / Excel)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Genera archivos compatibles con Microsoft Excel (UTF-8 con codificación oficial) para comisiones de auditoría y directorio.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={handleExportRisksCSV}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Exportar Matriz de Riesgos (.CSV)</span>
            </button>

            <button
              onClick={handleExportPartnersCSV}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Exportar Proveedores / DD (.CSV)</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
